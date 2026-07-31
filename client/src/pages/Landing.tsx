import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { CuteCartoonImage } from '@/components/CuteCartoonImage';
import { Heart } from 'lucide-react';

/**
 * Landing Page - Romantic Elegance Design
 * Features: 3D animated figure, floating particles, romantic greeting
 */
export default function Landing() {
  const [, setLocation] = useLocation();

  const floatingOrbs = [
    { size: 260, top: '8%', left: '8%', delay: '0s', duration: '18s', opacity: 0.42 },
    { size: 180, top: '18%', left: '78%', delay: '2s', duration: '16s', opacity: 0.3 },
    { size: 320, top: '62%', left: '4%', delay: '1s', duration: '24s', opacity: 0.22 },
    { size: 220, top: '68%', left: '76%', delay: '3s', duration: '20s', opacity: 0.26 },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_top,#fffdfd_0%,#fff5f8_36%,#f7e3ea_100%)]">
      {/* Floating background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 h-[72vw] w-[72vw] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E8B4C8]/30"
          style={{ animation: 'orbit-spin 32s linear infinite' }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[54vw] w-[54vw] max-h-[680px] max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A5B8]/20"
          style={{ animation: 'orbit-spin-reverse 26s linear infinite' }}
        />
        {floatingOrbs.map((orb, index) => (
          <div
            key={index}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              top: orb.top,
              left: orb.left,
              opacity: orb.opacity,
              background: 'radial-gradient(circle, rgba(255,193,212,0.9), rgba(255,193,212,0))',
              animation: `float ${orb.duration} ease-in-out infinite`,
              animationDelay: orb.delay,
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#F4DDE5] to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* Header with local logo */}
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-3 flex justify-center sm:mb-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-linear-to-br from-[#ffd4e3] via-[#f8b7cd] to-[#d8a0b8] shadow-[0_12px_35px_rgba(232,180,200,0.35)] animate-pulse">
              <span className="font-playfair text-xl font-bold text-white">GD</span>
              <Heart className="absolute -bottom-1 -right-1 h-5 w-5 fill-white text-white" />
            </div>
          </div>
          <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-[#8B6B7F] mb-3 sm:mb-4">
            Girlfriend's Day
          </h1>
          <p className="font-lato text-sm sm:text-base text-[#8B6B7F] max-w-md mx-auto">
            A special celebration for the woman who makes every moment unforgettable
          </p>
        </div>

        {/* Cute animated cartoon image */}
        <div
          className="mb-8 w-full max-w-md sm:mb-12"
          style={{ perspective: '1400px' }}
        >
          <div className="relative rounded-4xl border border-white/60 bg-white/40 p-3 shadow-[0_24px_70px_rgba(232,180,200,0.25)] backdrop-blur-xl">
            <div
              className="absolute inset-3 rounded-[1.6rem] border border-[#F4BED0]/40"
              style={{ animation: 'orbit-spin 22s linear infinite' }}
            />
            <CuteCartoonImage className="relative z-10" />
          </div>
        </div>

        {/* Greeting message */}
        <div className="text-center mb-8 sm:mb-12 max-w-xl px-4">
          <p className="font-cormorant text-xl sm:text-2xl text-[#E8B4C8] mb-4 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 fill-current" />
            Let's celebrate you
            <Heart className="w-5 sm:w-6 h-5 sm:h-6 fill-current" />
          </p>
          <p className="font-lato text-xs sm:text-sm text-[#2D2D2D] leading-relaxed">
            Click the button below to embark on a journey through memories, messages, and moments we've shared together.
          </p>
        </div>

        {/* Call-to-action button */}
        <Button
          onClick={() => setLocation('/wishing')}
          className="group relative px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-linear-to-r from-[#E8B4C8] to-[#D4A5B8] text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <span className="flex items-center gap-2">
            Let's Begin
            <Heart className="w-4 sm:w-5 h-4 sm:h-5 group-hover:animate-pulse" />
          </span>
        </Button>

        {/* Decorative bottom element */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#F5E6E0] to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.3;
          }
        }

        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit-spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
