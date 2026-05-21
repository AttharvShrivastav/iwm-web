import type { VercelRequest, VercelResponse } from '@vercel/node';

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  pageUrl?: string;
  website?: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const {
      name,
      email,
      subject,
      message,
      pageUrl,
      website,
    } = req.body as ContactPayload;

    // Honeypot spam protection
    if (website) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for your message.',
      });
    }

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.',
      });
    }

    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
    const secret = process.env.N8N_CONTACT_SECRET;

    if (!webhookUrl || !secret) {
      return res.status(500).json({
        success: false,
        message: 'Server is not configured correctly.',
      });
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-contact-secret': secret,
      },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        name: name.trim(),
        email: email.trim(),
        phone: '',
        company: '',
        subject: subject.trim(),
        message: message.trim(),
        pageUrl: pageUrl || '',
        source: 'Website Contact Form',
        status: 'New',
      }),
    });

    if (!n8nResponse.ok) {
      return res.status(502).json({
        success: false,
        message: 'Could not submit the form. Please try again.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
}