import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart } from 'lucide-react';

/**
 * Wishing Page - Romantic Elegance Design
 * Features: Animated greeting message, timed photo gallery with staggered reveals
 */
export default function Wishing() {
  const [, setLocation] = useLocation();
  const [showMessage, setShowMessage] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6, 7, 8].map(
        (index) => new URL(`../../../media/image${index}.jpeg`, import.meta.url).href
      ),
    []
  );

  useEffect(() => {
    const messageTimer = setTimeout(() => setShowMessage(true), 500);
    const galleryTimer = setTimeout(() => setShowGallery(true), 1800);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(galleryTimer);
    };
  }, []);

  useEffect(() => {
    if (!showGallery) {
      return;
    }

    setRevealedCount(0);
    setActiveIndex(null);

    const sequenceStart = 200;
    const revealTimers = images.map((_, index) => {
      const delay = sequenceStart + index * 2000;

      const stageTimer = setTimeout(() => setActiveIndex(index), delay);
      const settleTimer = setTimeout(() => {
        setRevealedCount((prev) => Math.max(prev, index + 1));
        setActiveIndex((current) => (current === index ? null : current));
      }, delay + 1200);

      return [stageTimer, settleTimer] as const;
    });

    const completionTimer = setTimeout(() => {
      setRevealedCount(images.length);
      setActiveIndex(null);
    }, sequenceStart + images.length * 2000 + 200);

    return () => {
      clearTimeout(completionTimer);
      revealTimers.forEach(([stageTimer, settleTimer]) => {
        clearTimeout(stageTimer);
        clearTimeout(settleTimer);
      });
    };
  }, [images, showGallery]);

  const allImagesShown = revealedCount >= images.length;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-[#FFFBF7] to-[#F5E6E0]">
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 80 + 30 + 'px',
              height: Math.random() * 80 + 30 + 'px',
              background: `radial-gradient(circle, #E8B4C8, transparent)`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 25 + 20}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F0C0D0]/35" style={{ animation: 'orbit-spin 28s linear infinite' }} />
        <div className="absolute left-1/2 top-1/2 h-[54vmin] w-[54vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8B4C8]/25" style={{ animation: 'orbit-spin-reverse 22s linear infinite' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Greeting Message Section */}
          <div className="mb-12 sm:mb-16 text-center">
            <div
              className={`transform transition-all duration-1000 ${showMessage
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
            >
              <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-[#8B6B7F] mb-4 sm:mb-6">
                Happy Girlfriend's Day
              </h1>
              <p className="font-lato text-base sm:text-lg text-[#2D2D2D] max-w-2xl mx-auto leading-relaxed mb-3 sm:mb-4 px-2">
                Today, we celebrate you—the incredible woman who brings joy, warmth, and beauty into my life every single day.
              </p>
              <p className="font-cormorant text-lg sm:text-2xl text-[#E8B4C8] flex items-center justify-center gap-2">
                <Heart className="w-6 h-6 fill-current" />
                You mean the world to me
                <Heart className="w-6 h-6 fill-current" />
              </p>
            </div>
          </div>

          {/* Photo Gallery Section */}
          <div className="mb-12 sm:mb-16">


            {showGallery && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {images.map((image, index) => {
                  const isRevealed = index < revealedCount;
                  const isActive = activeIndex === index;
                  const revealClass = index % 2 === 0 ? 'gallery-flip-in' : 'gallery-rotate-in';

                  return (
                    <div
                      key={index}
                      className={`gallery-card relative group overflow-hidden rounded-xl shadow-lg ${isRevealed ? 'gallery-settled' : 'opacity-0 scale-90'} ${isActive ? `gallery-active ${revealClass}` : ''}`}
                      style={{
                        animationDelay: `${index * 120}ms`,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Memory ${index + 1}`}
                        className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-64"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#E8B4C8]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Heart className="h-6 w-6 fill-white text-white sm:h-8 sm:w-8" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/20 to-transparent px-3 py-2 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="font-cormorant text-sm text-white/90">Memory {index + 1}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeIndex !== null && !allImagesShown && (
              <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center px-4">
                <div className={`gallery-stage relative aspect-4/5 w-[min(78vw,22rem)] overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_30px_90px_rgba(232,180,200,0.35)] backdrop-blur-xl ${activeIndex % 2 === 0 ? 'gallery-flip-in' : 'gallery-rotate-in'}`}>
                  <img
                    src={images[activeIndex]}
                    alt={`Memory ${activeIndex + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#E8B4C8]/25 via-transparent to-transparent" />
                </div>
              </div>
            )}
          </div>

          {/* Next Button */}
          {allImagesShown && (
            <div
              className={`flex justify-center transform transition-all duration-700 ${allImagesShown
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}
            >
              <Button
                onClick={() => setLocation('/letter')}
                className="group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-linear-to-r from-[#E8B4C8] to-[#D4A5B8] text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Read My Letter
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.3;
          }
        }

        @keyframes orbit-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes orbit-spin-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        @keyframes gallery-flip-in {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.35) rotateY(180deg);
            filter: blur(12px);
          }
          45% {
            opacity: 1;
            transform: translateY(-10px) scale(1.08) rotateY(20deg);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg);
            filter: blur(0);
          }
        }

        @keyframes gallery-rotate-in {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.4) rotate(-220deg);
            filter: blur(12px);
          }
          45% {
            opacity: 1;
            transform: translateY(-10px) scale(1.08) rotate(8deg);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
            filter: blur(0);
          }
        }

        @keyframes gallery-settled {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .gallery-card {
          animation: gallery-settled 700ms ease-out both;
        }

        .gallery-active {
          z-index: 30;
          animation-duration: 2s;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: both;
        }

        .gallery-flip-in {
          animation-name: gallery-flip-in;
        }

        .gallery-rotate-in {
          animation-name: gallery-rotate-in;
        }

        .gallery-settled {
          animation: gallery-settled 900ms ease-out both;
        }
      `}</style>
    </div>
  );
}
