// /**
//  * @license
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Lenis from 'lenis';
// import { Navbar } from './components/common/Navbar';
// import { NavMenu } from './components/common/NavMenu';
// import { Footer } from './components/common/Footer';
// import { HomePage } from './pages/HomePage';
// import { AboutPage } from './pages/AboutPage';
// import { ServicesPage } from './pages/ServicesPage';
// import { PeoplePage } from './pages/PeoplePage';
// import { ContactPage } from './pages/ContactPage';
// import { ApplyPage } from './pages/ApplyPage';
// import { NotFoundPage } from './pages/NotFoundPage';
// import { ServiceDetailPage } from './pages/ServiceDetailPage';

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// function AppContent() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     const lenis = new Lenis();

//     function raf(time: number) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   return (
//     <main className="relative min-h-screen bg-[#f8f7f2] overflow-x-hidden">
//       <ScrollToTop />
//       <Navbar 
//         isMenuOpen={isMenuOpen} 
//         toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
//       />
      
//       <NavMenu 
//         isOpen={isMenuOpen} 
//         onClose={() => setIsMenuOpen(false)} 
//       />

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/services" element={<ServicesPage />} />
//         <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
//         <Route path="/people" element={<PeoplePage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/apply" element={<ApplyPage />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>

//       <Footer />
//     </main>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }


import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/common/Navbar';
import { NavMenu } from './components/common/NavMenu';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PeoplePage } from './pages/PeoplePage';
import { ContactPage } from './pages/ContactPage';
import { ApplyPage } from './pages/ApplyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { Preloader } from './components/common/Preloader'; // Ensure path matches where you save it

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent({ onLoaded }: { onLoaded: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!onLoaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis scrolling with GSAP ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [onLoaded]);

  return (
    <main className="relative min-h-screen bg-[#f8f7f2] overflow-x-hidden">
      <ScrollToTop />
      <Navbar 
        isMenuOpen={isMenuOpen} 
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
      />
      
      <NavMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <Router>
      <Preloader onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && <AppContent onLoaded={loadingComplete} />}
    </Router>
  );
}