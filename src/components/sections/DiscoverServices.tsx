import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, X } from "lucide-react";
import "./Spotlight.css";

import { servicesData, Service } from "../../pages/ServicesPage";

export const DiscoverServices = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [cursorLabel, setCursorLabel] = useState("Scroll");


  const spotlightRef = useRef<HTMLDivElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const spotlightHeaderRef = useRef<HTMLDivElement>(null);
  const titlesContainerElementRef = useRef<HTMLDivElement>(null);
  const introText1Ref = useRef<HTMLDivElement>(null);
  const introText2Ref = useRef<HTMLDivElement>(null);
  const imageElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleElementsRef = useRef<NodeListOf<HTMLHeadingElement> | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const config = {
    gap: 0.15,
    speed: 0.4,
    arcRadius: 500,
  };

  useEffect(() => {
  if (selectedService) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  return () => {
    document.body.style.overflow = "unset";
  };
}, [selectedService]);

  const currentActiveIndexRef = useRef<number>(0);
  const bgImgRef = useRef<HTMLImageElement>(null);

  const spotlightItems = [
  {
    name: "Integrated Facility Management",
    img: "/assets/home/services/service-1.webp",
    fallback:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Mechanized Road Sweeping",
    img: "/assets/home/services/service-2.webp",
    fallback:
      "https://images.unsplash.com/photo-1617112848923-9223a4334b92?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Manual Road Sweeping",
    img: "/assets/home/services/service-3.webp",
    fallback:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "High Pressure Jet Cleaning",
    img: "/assets/home/services/service-4.webp",
    fallback:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Door to Door Collection",
    img: "/assets/home/services/service-5.webp",
    fallback:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop",
  },
  {
    name: "Maintenance of Landscapes",
    img: "/assets/home/services/service-6.webp",
    fallback:
      "https://images.unsplash.com/photo-1591193516411-ac56d827aa2d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Bio Remidation",
    img: "/assets/home/services/service-7.webp",
    fallback:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=2076&auto=format&fit=crop",
  },
  {
    name: "Water Rejuvenation",
    img: "/assets/home/services/service-8.webp",
    fallback:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Sewage System Inspection",
    img: "/assets/home/services/service-9.webp",
    fallback:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=2074&auto=format&fit=crop",
  },
];


const normalizeText = (value: string) => {
  return value
    .toLowerCase()
    .replace("remidation", "remediation")
    .replace(/[^a-z0-9]/g, "");
};

const openServiceModal = (serviceName: string) => {
  const matchedService = servicesData.find(
    (service) => normalizeText(service.title) === normalizeText(serviceName)
  );

  if (matchedService) {
    setSelectedService(matchedService);
  }
};

  useGSAP(() => {
    if (!spotlightRef.current) return;
    
    const introTextElements = [introText1Ref.current, introText2Ref.current];
    gsap.registerPlugin(ScrollTrigger);

    const initializeSpotlight = () => {
      const titlesContainer = titlesContainerRef.current;
      const imagesContainer = imagesContainerRef.current;
      const spotlightHeader = spotlightHeaderRef.current;
      const titlesContainerElement = titlesContainerElementRef.current;
      const imageElements = imageElementsRef.current;

      if (
        !titlesContainer ||
        !imagesContainer ||
        !spotlightHeader ||
        !titlesContainerElement
      ) {
        return false;
      }

      titlesContainer.innerHTML = "";
      imagesContainer.innerHTML = "";
      imageElements.length = 0;

      spotlightItems.forEach((item, index) => {
       const titleElement = document.createElement("h1");
        titleElement.textContent = item.name;
        titleElement.style.opacity = index === 0 ? "1" : "0.35";
        titleElement.style.cursor = "pointer";

        titleElement.addEventListener("click", () => {
          if (index === currentActiveIndexRef.current) {
            openServiceModal(item.name);
          }
        });

titlesContainer.appendChild(titleElement);
        titlesContainer.appendChild(titleElement);

        const imgWrapper = document.createElement("div");
        imgWrapper.className = "spotlight-img";
        const imgElement = document.createElement("img");
        imgElement.src = item.img;
        imgElement.alt = "";
        imgElement.onerror = () => {
          imgElement.src = item.fallback;
        };
        imgWrapper.appendChild(imgElement);
        imagesContainer.appendChild(imgWrapper);
        imageElements.push(imgWrapper);
      });

      const titleElements = titlesContainer.querySelectorAll("h1");
      titleElementsRef.current = titleElements;

      return titleElements.length > 0;
    };

    let initialized = initializeSpotlight();

    if (!initialized) {
      const initInterval = setInterval(() => {
        initialized = initializeSpotlight();
        if (initialized) clearInterval(initInterval);
      }, 50);
      setTimeout(() => clearInterval(initInterval), 2000);
    }

    if (!initialized) return;

    const titlesContainer = titlesContainerRef.current!;
    const imagesContainer = imagesContainerRef.current!; // Added reference to get container width
    const spotlightHeader = spotlightHeaderRef.current!;
    const titlesContainerElement = titlesContainerElementRef.current!;
    const imageElements = imageElementsRef.current;
    const titleElements = titleElementsRef.current!;

    const isCursorNearActiveTitle = (e: MouseEvent) => {
      const activeTitle = titleElements[currentActiveIndexRef.current] as HTMLElement;

      if (!activeTitle) return false;

      const rect = activeTitle.getBoundingClientRect();

      // Bigger invisible hover zone around the active title
      const horizontalPadding = window.innerWidth < 768 ? 40 : 90;
      const verticalPadding = window.innerWidth < 768 ? 28 : 45;

      const expandedRect = {
        left: rect.left - horizontalPadding,
        right: rect.right + horizontalPadding,
        top: rect.top - verticalPadding,
        bottom: rect.bottom + verticalPadding,
      };

      return (
        e.clientX >= expandedRect.left &&
        e.clientX <= expandedRect.right &&
        e.clientY >= expandedRect.top &&
        e.clientY <= expandedRect.bottom
      );
    };

    const isMobile = window.innerWidth < 1000;
    const containerWidth = isMobile ? window.innerWidth * 0.4 : window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const imgWidth = isMobile ? 70 : 100;

    let arcStartX = isMobile ? containerWidth - 40 : containerWidth - 100;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;

    // --- OVERFLOW FIX ---
    // Calculate the physical max boundary within the right-aligned container
    const imagesContainerRect = imagesContainer.getBoundingClientRect();
    const maxSafeX = imagesContainerRect.width - imgWidth - 20; // 20px safety buffer from the edge

    // 1. Clamp the starting coordinate so images don't spawn off-screen
    arcStartX = Math.min(arcStartX, maxSafeX - 50);

    // 2. Calculate the original intended curve bulge
    let arcControlPointX = arcStartX + (isMobile ? 250 : 600);
    
    // 3. The furthest right point (peak) of this curve is exactly between Start and Control
    const currentPeakX = (arcStartX + arcControlPointX) / 2;

    // 4. If the curve's peak overflows the safe edge, algebraically pull the control point back
    if (currentPeakX > maxSafeX) {
      arcControlPointX = (maxSafeX * 2) - arcStartX;
    }

    const arcControlPointY = containerHeight / 2;

    function getBezierPosition(t: number) {
      const x = (1 - t) * (1 - t) * arcStartX + 2 * (1 - t) * t * arcControlPointX + t * t * arcStartX;
      const y = (1 - t) * (1 - t) * arcStartY + 2 * (1 - t) * t * arcControlPointY + t * t * arcEndY;
      return { x, y };
    }

    imageElements.forEach((img) => img && gsap.set(img, { opacity: 0 }));

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 15}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.15) {
          const animationProgress = progress / 0.15;
          const moveDistance = window.innerWidth * 0.6;
          
          if (introTextElements[0]) gsap.set(introTextElements[0], { x: -animationProgress * moveDistance, opacity: 1 });
          if (introTextElements[1]) gsap.set(introTextElements[1], { x: animationProgress * moveDistance, opacity: 1 });

          gsap.set(".spotlight-bg-img", { transform: `scale(${animationProgress})`, opacity: 0.8 });
          gsap.set(".spotlight-bg-img img", { transform: `scale(${1.5 - animationProgress * 0.5})` });

          imageElements.forEach((img) => img && gsap.set(img, { opacity: 0 }));
          spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, { "--before-opacity": "0", "--after-opacity": "0" });
          
          if (bgImgRef.current && bgImgRef.current.src !== spotlightItems[0].img) {
            bgImgRef.current.src = spotlightItems[0].img;
            currentActiveIndexRef.current = 0;
            titleElements.forEach((t, i) => t.style.opacity = i === 0 ? "1" : "0.35");
          }
        } else if (progress > 0.15 && progress <= 0.2) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)", opacity: 0.8 });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });
          if (introTextElements[0]) gsap.set(introTextElements[0], { opacity: 0 });
          if (introTextElements[1]) gsap.set(introTextElements[1], { opacity: 0 });
          imageElements.forEach((img) => img && gsap.set(img, { opacity: 0 }));
          spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, { "--before-opacity": "1", "--after-opacity": "1" });
        } else if (progress > 0.2 && progress <= 0.95) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)", opacity: 0.8 });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });
          if (introTextElements[0]) gsap.set(introTextElements[0], { opacity: 0 });
          if (introTextElements[1]) gsap.set(introTextElements[1], { opacity: 0 });
          
          if (isMobile) {
            spotlightHeader.style.opacity = "0";
            gsap.set(".spotlight-titles h1", { fontSize: "clamp(14px, 4.5vw, 22px)", maxWidth: "50vw" });
          } else {
            spotlightHeader.style.opacity = "1";
          }
          
          gsap.set(titlesContainerElement, { "--before-opacity": "1", "--after-opacity": "1" });

          const switchProgress = (progress - 0.2) / 0.75;
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesContainer.scrollHeight;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(".spotlight-titles", { transform: `translateY(${currentY}px)` });

          // Calculate center positions for each title to sync images
          const titleOffsets = Array.from(titleElements).map((title) => {
            const el = title as HTMLElement;
            return el.offsetTop - viewportHeight / 2 + el.offsetHeight / 2;
          });

          imageElements.forEach((img, index) => {
            if (!img) return;
            
            // Sync image progress with title center position
            const centerProgress = (viewportHeight + titleOffsets[index]) / totalDistance;
            const startTime = centerProgress - config.speed / 2;
            const imageProgress = (switchProgress - startTime) / config.speed;

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              const imgWidth = isMobile ? 70 : 100;
              const imgHeight = isMobile ? 50 : 75;
              gsap.set(img, { x: pos.x - imgWidth, y: pos.y - imgHeight, opacity: 1 });
            }
          });

          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElements.forEach((title, index) => {
            const titleRect = title.getBoundingClientRect();
            const titleCenter = titleRect.top + titleRect.height / 2;
            const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);
            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          if (closestIndex !== currentActiveIndexRef.current) {
            if (titleElements[currentActiveIndexRef.current]) {
              titleElements[currentActiveIndexRef.current].style.opacity = "0.35";
            }
            if (titleElements[closestIndex]) {
              titleElements[closestIndex].style.opacity = "1";
            }
            if (bgImgRef.current) {
              bgImgRef.current.src = spotlightItems[closestIndex].img;
            }
            currentActiveIndexRef.current = closestIndex;
          }
        } else if (progress > 0.95) {
          spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, { "--before-opacity": "0", "--after-opacity": "0" });
        }
      },
    });

    // Cursor logic
    const cursor = cursorRef.current;
    if (cursor) {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);

          if (isCursorNearActiveTitle(e)) {
            setCursorLabel("View");
          } else {
            setCursorLabel("Scroll");
          }
      };

      const handleMouseEnter = () => {
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.3 });
      };
      
      const spotlight = spotlightRef.current;
      if (spotlight) {
        spotlight.addEventListener("mousemove", handleMouseMove);
        spotlight.addEventListener("mouseenter", handleMouseEnter);
        spotlight.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
        if (spotlight) {
          spotlight.removeEventListener("mousemove", handleMouseMove);
          spotlight.removeEventListener("mouseenter", handleMouseEnter);
          spotlight.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }

    return () => {
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
    };
  }, []);

  return (
    <section className="spotlight" ref={spotlightRef}>
      {/* Custom Scroll Cursor */}
      <div ref={cursorRef} className="spotlight-cursor">
        <ArrowDown />
        <span>{cursorLabel}</span>
      </div>  

      <div className="spotlight-inner">
        <div className="spotlight-intro-text-wrapper">
          <div
            className="spotlight-intro-text"
            ref={introText1Ref}
          >
            <p>DISCOVER</p>
          </div>
          <div
            className="spotlight-intro-text"
            ref={introText2Ref}
          >
            <p>Services</p>
          </div>
        </div>
        <div className="spotlight-bg-img">
          <img 
            ref={bgImgRef}
            src={spotlightItems[0].img} 
            alt="" 
            referrerPolicy="no-referrer" 
            onError={(e) => {
              const currentItem = spotlightItems.find(item => item.img === e.currentTarget.getAttribute('src') || item.fallback === e.currentTarget.getAttribute('src'));
              if (currentItem) {
                e.currentTarget.src = currentItem.fallback;
              } else {
                e.currentTarget.src = spotlightItems[0].fallback;
              }
            }}
          />
        </div>
      </div>
      <div
        className="spotlight-titles-container"
        ref={titlesContainerElementRef}
      >
        <div className="spotlight-titles" ref={titlesContainerRef}></div>
      </div>
      <div className="spotlight-images" ref={imagesContainerRef}></div>
      <div className="spotlight-header hidden md:flex" ref={spotlightHeaderRef}>
        <p>Discover</p>
      </div>
      <div className="spotlight-outline"></div>

      <AnimatePresence>
  {selectedService && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedService(null)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-sm overflow-hidden flex flex-col shadow-2xl z-10"
      >
        <button
          onClick={() => setSelectedService(null)}
          className="absolute top-6 right-6 z-20 text-zinc-400 hover:text-black transition-colors p-2 bg-white/50 rounded-full backdrop-blur-md"
          aria-label="Close service popup"
        >
          <X size={24} />
        </button>

        <div
          data-lenis-prevent
          className="w-full p-8 md:p-16 lg:p-24 overflow-y-auto bg-white"
        >
          <div className="max-w-2xl mx-auto flex flex-col gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 border-b border-zinc-200 pb-8">
              <div className="flex items-center gap-3">
                <span className="text-zinc-500 font-bold tracking-[0.2em] text-[10px] uppercase">
                  Service Specialization
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-medium text-black font-agrandir leading-tight">
                {selectedService.title}
              </h2>
            </div>

            <div className="flex flex-col gap-8 pt-4">
              <p className="text-lg md:text-xl text-zinc-700 leading-relaxed font-sans">
                {selectedService.fullWriteup}
              </p>

              <div className="flex flex-col gap-4 pt-4">
                <p className="text-zinc-500 text-sm leading-relaxed max-w-lg italic border-l-2 border-zinc-200 pl-4">
                  At IWM, our operational philosophy is built on three pillars:
                  visibility of results, relentless innovation, and radical
                  dignity for our staff. This approach allows us to deliver
                  scale and consistency where others see only complexity.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setSelectedService(null)}
                className="relative overflow-hidden w-full md:w-auto bg-black text-white px-10 py-5 text-[12px] font-bold tracking-widest hover:bg-zinc-800 transition-colors whitespace-nowrap rounded-none"
              >
                <span className="relative z-10 block">CONTACT OUR TEAM</span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-1.5 w-full bg-zinc-100" />
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </section>
  );
};
