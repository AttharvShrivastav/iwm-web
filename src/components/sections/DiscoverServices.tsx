import { useRef, useState, useEffect, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, X } from "lucide-react";
import "./Spotlight.css";

import { servicesData, Service } from "../../pages/ServicesPage";

gsap.registerPlugin(ScrollTrigger);

type CursorMode = "Scroll" | "View" | "Close";

interface FloatingSpotlightCursorProps {
  spotlightRef: RefObject<HTMLDivElement | null>;
  titleElementsRef: RefObject<NodeListOf<HTMLHeadingElement> | null>;
  currentActiveIndexRef: RefObject<number>;
  selectedServiceRef: RefObject<Service | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}

const FloatingSpotlightCursor = ({
  spotlightRef,
  titleElementsRef,
  currentActiveIndexRef,
  selectedServiceRef,
  closeButtonRef,
}: FloatingSpotlightCursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const modeRef = useRef<CursorMode>("Scroll");

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;

    if (!cursor || !label) return;

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    let rafId: number | null = null;
    let isRunning = false;

    const setCursorLabel = (mode: CursorMode) => {
      if (modeRef.current === mode) return;

      modeRef.current = mode;
      label.textContent = mode;
    };

    const getCursorTransform = (scale: number) => {
      return `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const showCursor = () => {
      cursor.style.opacity = "1";
      cursor.style.transform = getCursorTransform(1);
    };

    const hideCursor = () => {
      cursor.style.opacity = "0";
      cursor.style.transform = getCursorTransform(0);
    };

    const updateCursorState = () => {
      if (selectedServiceRef.current) {
        showCursor();

        if (isNearCloseButton()) {
          setCursorLabel("Close");
        } else {
          setCursorLabel("Scroll");
        }

        return;
      }

      if (!isInsideSpotlight()) {
        hideCursor();
        setCursorLabel("Scroll");
        return;
      }

      showCursor();

      if (isNearActiveTitle()) {
        setCursorLabel("View");
      } else {
        setCursorLabel("Scroll");
      }
    };

    const animateCursor = () => {
      // Lower = more delay, higher = tighter follow
      const ease = 0.14;

      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      updateCursorState();

      rafId = window.requestAnimationFrame(animateCursor);
    };

    const isInsideSpotlight = () => {
      const spotlight = spotlightRef.current;

      if (!spotlight) return false;

      const rect = spotlight.getBoundingClientRect();

      return (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      );
    };

    const isNearActiveTitle = () => {
      const titleElements = titleElementsRef.current;

      if (!titleElements) return false;

      const activeTitle = titleElements[
        currentActiveIndexRef.current
      ] as HTMLElement | undefined;

      if (!activeTitle) return false;

      const rect = activeTitle.getBoundingClientRect();

      const horizontalPadding = window.innerWidth < 768 ? 80 : 180;
      const verticalPadding = window.innerWidth < 768 ? 45 : 80;

      return (
        mouseX >= rect.left - horizontalPadding &&
        mouseX <= rect.right + horizontalPadding &&
        mouseY >= rect.top - verticalPadding &&
        mouseY <= rect.bottom + verticalPadding
      );
    };

    const isNearCloseButton = () => {
      const closeButton = closeButtonRef.current;

      if (!closeButton) return false;

      const rect = closeButton.getBoundingClientRect();
      const padding = 70;

      return (
        mouseX >= rect.left - padding &&
        mouseX <= rect.right + padding &&
        mouseY >= rect.top - padding &&
        mouseY <= rect.bottom + padding
      );
    };

    const updateCursor = () => {
      rafId = null;

      if (selectedServiceRef.current) {
        showCursor();

        if (isNearCloseButton()) {
          setCursorLabel("Close");
        } else {
          setCursorLabel("Scroll");
        }

        return;
      }

      if (!isInsideSpotlight()) {
        hideCursor();
        setCursorLabel("Scroll");
        return;
      }

      showCursor();

      if (isNearActiveTitle()) {
        setCursorLabel("View");
      } else {
        setCursorLabel("Scroll");
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isRunning) {
        isRunning = true;
        currentX = mouseX;
        currentY = mouseY;
        rafId = window.requestAnimationFrame(animateCursor);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      isRunning = false;
    };
  }, [
    spotlightRef,
    titleElementsRef,
    currentActiveIndexRef,
    selectedServiceRef,
    closeButtonRef,
  ]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="floating-spotlight-cursor" ref={cursorRef}>
      <ArrowDown />
      <span ref={labelRef}>Scroll</span>
    </div>,
    document.body
  );
};

export const DiscoverServices = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

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

  const selectedServiceRef = useRef<Service | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentActiveIndexRef = useRef<number>(0);
  const bgImgRef = useRef<HTMLImageElement>(null);

  const config = {
    gap: 0.15,
    speed: 0.4,
    arcRadius: 500,
  };

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

  const openServiceModal = (serviceName: string, index?: number) => {
    const matchedService = servicesData.find(
      (service) => normalizeText(service.title) === normalizeText(serviceName)
    );

    if (matchedService) {
      selectedServiceRef.current = matchedService;
      setSelectedService(matchedService);
      return;
    }

    if (typeof index === "number" && servicesData[index]) {
      selectedServiceRef.current = servicesData[index];
      setSelectedService(servicesData[index]);
    }
  };

  const closeServiceModal = () => {
    selectedServiceRef.current = null;
    setSelectedService(null);
  };

  useEffect(() => {
    selectedServiceRef.current = selectedService;
  }, [selectedService]);

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

  useGSAP(() => {
    if (!spotlightRef.current) return;

    const introTextElements = [introText1Ref.current, introText2Ref.current];

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
        titleElement.style.cursor = "none";
        titleElement.style.pointerEvents = "auto";

        titleElement.addEventListener("click", (e) => {
          e.stopPropagation();

          if (index === currentActiveIndexRef.current) {
            openServiceModal(item.name, index);
          }
        });

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
      const initInterval = window.setInterval(() => {
        initialized = initializeSpotlight();

        if (initialized) {
          window.clearInterval(initInterval);
        }
      }, 50);

      window.setTimeout(() => {
        window.clearInterval(initInterval);
      }, 2000);
    }

    if (!initialized) return;

    const titlesContainer = titlesContainerRef.current!;
    const imagesContainer = imagesContainerRef.current!;
    const spotlightHeader = spotlightHeaderRef.current!;
    const titlesContainerElement = titlesContainerElementRef.current!;
    const imageElements = imageElementsRef.current;
    const titleElements = titleElementsRef.current!;

    const isCursorNearActiveTitle = (e: MouseEvent) => {
      const activeTitle = titleElements[
        currentActiveIndexRef.current
      ] as HTMLElement | undefined;

      if (!activeTitle) return false;

      const rect = activeTitle.getBoundingClientRect();

      const horizontalPadding = window.innerWidth < 768 ? 80 : 180;
      const verticalPadding = window.innerWidth < 768 ? 45 : 80;

      return (
        e.clientX >= rect.left - horizontalPadding &&
        e.clientX <= rect.right + horizontalPadding &&
        e.clientY >= rect.top - verticalPadding &&
        e.clientY <= rect.bottom + verticalPadding
      );
    };

    const isMobile = window.innerWidth < 1000;
    const containerWidth = isMobile
      ? window.innerWidth * 0.4
      : window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const imgWidth = isMobile ? 70 : 100;

    let arcStartX = isMobile ? containerWidth - 40 : containerWidth - 100;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;

    const imagesContainerRect = imagesContainer.getBoundingClientRect();
    const maxSafeX = imagesContainerRect.width - imgWidth - 20;

    arcStartX = Math.min(arcStartX, maxSafeX - 50);

    let arcControlPointX = arcStartX + (isMobile ? 250 : 600);
    const currentPeakX = (arcStartX + arcControlPointX) / 2;

    if (currentPeakX > maxSafeX) {
      arcControlPointX = maxSafeX * 2 - arcStartX;
    }

    const arcControlPointY = containerHeight / 2;

    function getBezierPosition(t: number) {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;

      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;

      return { x, y };
    }

    imageElements.forEach((img) => {
      if (img) {
        gsap.set(img, { opacity: 0 });
      }
    });

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

          if (introTextElements[0]) {
            gsap.set(introTextElements[0], {
              x: -animationProgress * moveDistance,
              opacity: 1,
            });
          }

          if (introTextElements[1]) {
            gsap.set(introTextElements[1], {
              x: animationProgress * moveDistance,
              opacity: 1,
            });
          }

          gsap.set(".spotlight-bg-img", {
            transform: `scale(${animationProgress})`,
            opacity: 0.8,
          });

          gsap.set(".spotlight-bg-img img", {
            transform: `scale(${1.5 - animationProgress * 0.5})`,
          });

          imageElements.forEach((img) => {
            if (img) {
              gsap.set(img, { opacity: 0 });
            }
          });

          spotlightHeader.style.opacity = "0";

          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });

          if (
            bgImgRef.current &&
            bgImgRef.current.getAttribute("src") !== spotlightItems[0].img
          ) {
            bgImgRef.current.src = spotlightItems[0].img;
            currentActiveIndexRef.current = 0;

            titleElements.forEach((title, index) => {
              title.style.opacity = index === 0 ? "1" : "0.35";
            });
          }
        } else if (progress > 0.15 && progress <= 0.2) {
          gsap.set(".spotlight-bg-img", {
            transform: "scale(1)",
            opacity: 0.8,
          });

          gsap.set(".spotlight-bg-img img", {
            transform: "scale(1)",
          });

          if (introTextElements[0]) {
            gsap.set(introTextElements[0], { opacity: 0 });
          }

          if (introTextElements[1]) {
            gsap.set(introTextElements[1], { opacity: 0 });
          }

          imageElements.forEach((img) => {
            if (img) {
              gsap.set(img, { opacity: 0 });
            }
          });

          spotlightHeader.style.opacity = "1";

          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });
        } else if (progress > 0.2 && progress <= 0.95) {
          gsap.set(".spotlight-bg-img", {
            transform: "scale(1)",
            opacity: 0.8,
          });

          gsap.set(".spotlight-bg-img img", {
            transform: "scale(1)",
          });

          if (introTextElements[0]) {
            gsap.set(introTextElements[0], { opacity: 0 });
          }

          if (introTextElements[1]) {
            gsap.set(introTextElements[1], { opacity: 0 });
          }

          if (isMobile) {
            spotlightHeader.style.opacity = "0";

            gsap.set(".spotlight-titles h1", {
              fontSize: "clamp(14px, 4.5vw, 22px)",
              maxWidth: "50vw",
            });
          } else {
            spotlightHeader.style.opacity = "1";
          }

          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          const switchProgress = (progress - 0.2) / 0.75;
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesContainer.scrollHeight;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(".spotlight-titles", {
            transform: `translateY(${currentY}px)`,
          });

          const titleOffsets = Array.from(titleElements).map((title) => {
            const el = title as HTMLElement;
            return el.offsetTop - viewportHeight / 2 + el.offsetHeight / 2;
          });

          imageElements.forEach((img, index) => {
            if (!img) return;

            const centerProgress =
              (viewportHeight + titleOffsets[index]) / totalDistance;
            const startTime = centerProgress - config.speed / 2;
            const imageProgress = (switchProgress - startTime) / config.speed;

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              const imgWidth = isMobile ? 70 : 100;
              const imgHeight = isMobile ? 50 : 75;

              gsap.set(img, {
                x: pos.x - imgWidth,
                y: pos.y - imgHeight,
                opacity: 1,
              });
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
              titleElements[currentActiveIndexRef.current].style.opacity =
                "0.35";
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

          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      },
    });

    const handleSpotlightClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest("[data-service-modal]")) return;

      if (!isCursorNearActiveTitle(e)) return;

      const activeIndex = currentActiveIndexRef.current;
      const activeItem = spotlightItems[activeIndex];

      if (activeItem) {
        openServiceModal(activeItem.name, activeIndex);
      }
    };

    const spotlight = spotlightRef.current;

    if (spotlight) {
      spotlight.addEventListener("click", handleSpotlightClick);
    }

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      if (spotlight) {
        spotlight.removeEventListener("click", handleSpotlightClick);
      }
    };
  }, []);

  return (
    <section className="spotlight" ref={spotlightRef}>
      <FloatingSpotlightCursor
        spotlightRef={spotlightRef}
        titleElementsRef={titleElementsRef}
        currentActiveIndexRef={currentActiveIndexRef}
        selectedServiceRef={selectedServiceRef}
        closeButtonRef={closeButtonRef}
      />

      <div className="spotlight-inner">
        <div className="spotlight-intro-text-wrapper">
          <div className="spotlight-intro-text" ref={introText1Ref}>
            <p>DISCOVER</p>
          </div>

          <div className="spotlight-intro-text" ref={introText2Ref}>
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
              const currentSrc = e.currentTarget.getAttribute("src");

              const currentItem = spotlightItems.find(
                (item) =>
                  item.img === currentSrc || item.fallback === currentSrc
              );

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
          <div
            data-service-modal
            className="fixed inset-0 z-[100] flex items-center justify-center cursor-none p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeServiceModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-none"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-sm overflow-hidden flex flex-col shadow-2xl z-10 cursor-none"
            >
              <button
                ref={closeButtonRef}
                onClick={closeServiceModal}
                className="absolute top-6 right-6 z-20 text-zinc-400 hover:text-black transition-colors p-2 bg-white/50 rounded-full backdrop-blur-md cursor-none"
                aria-label="Close service popup"
              >
                <X size={24} />
              </button>

              <div
                data-lenis-prevent
                className="w-full p-8 md:p-16 lg:p-24 overflow-y-auto bg-white cursor-none"
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
                        At IWM, our operational philosophy is built on three
                        pillars: visibility of results, relentless innovation,
                        and radical dignity for our staff. This approach allows
                        us to deliver scale and consistency where others see
                        only complexity.
                      </p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <Link
                      to="/contact"
                      onClick={closeServiceModal}
                      className="relative overflow-hidden w-full md:w-auto inline-flex items-center justify-center bg-black text-white px-10 py-5 text-[12px] font-bold tracking-widest hover:bg-zinc-800 transition-colors whitespace-nowrap rounded-none cursor-none"
                    >
                      <span className="relative z-10 block">
                        CONTACT OUR TEAM
                      </span>
                    </Link>
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