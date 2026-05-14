# Production Deployment & Asset Guidelines

Follow these technical best practices to ensure the IWM website performs at a "Masterpiece" level in production.

---

## 1. Asset Optimization (End-to-End)

To maintain fast load speeds (LCP) and smooth animations, follow these image standards:

- **Format**: Always prefer **WebP** over PNG/JPG. It offers ~30% better compression with no quality loss.
- **Compression**: Run all images through [Squoosh.app](https://squoosh.app/) or [TinyPNG](https://tinypng.com/) before uploading.
- **Dimensions**: Do not upload 4K images if the container is only 1920px wide. Crop to the exact aspect ratios mentioned in `CONTENT_GUIDELINES.md`.
- **Favicon**: Upload a `favicon.svg` and `logo192.png` to the `/public` folder.

---

## 2. Image Loading Strategies

The code is already configured with these strategies, but keep them in mind for new sections:

- **Eager Loading**: Hero images use `loading="eager"` and `fetchpriority="high"`. This tells the browser to download these first.
- **Lazy Loading**: All other images should use `loading="lazy"` to save bandwidth for off-screen content.
- **Fallbacks**: Always include an `onError` handler to catch broken paths and prevent "missing image" icons.
  ```tsx
  <img 
    src="/path/to/local.png" 
    onError={(e) => { e.currentTarget.src = "https://fallback.url"; }} 
  />
  ```

---

## 3. Animation Stability (SplitText Safety)

When doing character or line-level animations with GSAP, follow the **"Idempotency Rule"**. If a component re-renders, the split logic should not run again on already-split text.

**The Best Practice Pattern:**
```tsx
useGSAP(() => {
  if (!textRef.current) return;

  // 1. Check if already split to prevent "Double Splitting"
  if (!textRef.current.querySelector('.char')) {
    const text = textRef.current.innerText;
    textRef.current.innerHTML = text
      .split('')
      .map(char => char === ' ' ? ' ' : `<span class="char">${char}</span>`)
      .join('');
  }

  // 2. Animate
  const chars = textRef.current.querySelectorAll('.char');
  gsap.to(chars, { opacity: 1, stagger: 0.1 });
}, { scope: containerRef });
```

---

## 4. Video Guidelines

For background videos (like the Hero background):
- **Codec**: Use **H.264** or **H.265 (HEVC)**.
- **Muted**: Videos MUST be muted for autoplay to work in browsers.
- **Poster**: Always provide a `poster` image (a frame from the video) so users see something while the video loads.
- **Looping**: Ensure the video loops seamlessly.

---

## 5. Deployment Check
1. **Run Lint**: `npm run lint` to catch syntax errors.
2. **Build Test**: `npm run build` to ensure the production bundle generates correctly.
3. **Environment Variables**: Ensure any API keys (if added later) are set in the production environment.
4. **Metadata**: Verify `metadata.json` has the correct `name` and `description` as these generate your SEO tags.

---

**Technical Goal**: Aim for a Lighthouse performance score of **90+**. This is achieved by combining these asset optimizations with the efficient GSAP animations we've implemented.
