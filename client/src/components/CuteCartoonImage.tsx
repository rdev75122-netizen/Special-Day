import { cn } from "@/lib/utils";

type CuteCartoonImageProps = {
    className?: string;
};

export function CuteCartoonImage({ className }: CuteCartoonImageProps) {
    return (
        <div className={cn("relative mx-auto aspect-square w-full max-w-md", className)}>
            <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(255,239,245,0.72)_45%,rgba(232,180,200,0.18))] blur-2xl" />

            <div className="cute-cartoon-frame relative h-full w-full overflow-hidden rounded-[30px] border border-white/60 bg-white/50 shadow-[0_30px_90px_rgba(232,180,200,0.28)] backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.95),transparent_22%),radial-gradient(circle_at_80%_15%,rgba(255,198,220,0.38),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(255,220,232,0.45),transparent_28%)]" />

                <svg viewBox="0 0 600 600" className="relative h-full w-full" role="img" aria-label="Cute cartoon girl with floating hearts">
                    <defs>
                        <linearGradient id="cartoon-sky" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFF8FB" />
                            <stop offset="100%" stopColor="#F8DCE8" />
                        </linearGradient>
                        <linearGradient id="cartoon-hair" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7B4F66" />
                            <stop offset="100%" stopColor="#57384B" />
                        </linearGradient>
                        <linearGradient id="cartoon-dress" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F6AFC7" />
                            <stop offset="100%" stopColor="#E58FB0" />
                        </linearGradient>
                        <filter id="cartoon-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="12" result="blur" />
                            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.96 0 1 0 0 0.72 0 0 1 0 0.82 0 0 0 0.7 0" />
                        </filter>
                    </defs>

                    <rect width="600" height="600" fill="url(#cartoon-sky)" />

                    <g className="cartoon-float">
                        <circle cx="300" cy="300" r="140" fill="#FFFFFF" opacity="0.5" filter="url(#cartoon-glow)" />
                        <circle cx="300" cy="300" r="118" fill="#FFF1F7" opacity="0.8" />
                    </g>

                    <g className="cartoon-stars" fill="#FFFFFF" opacity="0.95">
                        <path d="M118 160l8 16 16 8-16 8-8 16-8-16-16-8 16-8z" />
                        <path d="M490 150l6 12 12 6-12 6-6 12-6-12-12-6 12-6z" />
                        <path d="M484 432l7 14 14 7-14 7-7 14-7-14-14-7 14-7z" />
                    </g>

                    <g className="cartoon-heart heart-one">
                        <path d="M175 215c-18-18-51-8-51 21 0 29 51 63 51 63s51-34 51-63c0-29-33-39-51-21z" fill="#FF9FBC" />
                    </g>
                    <g className="cartoon-heart heart-two">
                        <path d="M444 202c-14-14-40-6-40 16 0 22 40 49 40 49s40-27 40-49c0-22-26-30-40-16z" fill="#FFC1D4" />
                    </g>

                    <g className="cartoon-bob">
                        <ellipse cx="300" cy="470" rx="95" ry="24" fill="#E6A8C0" opacity="0.22" />

                        <path d="M206 333c0-82 46-150 94-150s94 68 94 150v23c0 61-42 110-94 110s-94-49-94-110v-23z" fill="url(#cartoon-dress)" />
                        <path d="M246 300c17 18 39 27 54 27s37-9 54-27c-12-23-31-37-54-37s-42 14-54 37z" fill="#FDE5EE" opacity="0.65" />

                        <path d="M255 181c0-46 20-78 45-78s45 32 45 78c0 12-2 25-6 37h-78c-4-12-6-25-6-37z" fill="url(#cartoon-hair)" />
                        <path d="M218 208c0-49 37-89 82-89s82 40 82 89c0 33-16 63-40 78-12-11-27-17-42-17s-30 6-42 17c-24-15-40-45-40-78z" fill="#F7D9C8" />
                        <path d="M232 207c0-42 31-76 68-76s68 34 68 76c0 20-7 38-18 51-4-12-15-22-31-28-18-7-40-7-58 0-16 6-27 16-31 28-11-13-18-31-18-51z" fill="url(#cartoon-hair)" opacity="0.96" />
                        <circle cx="275" cy="215" r="7" fill="#4B2F3E" />
                        <circle cx="325" cy="215" r="7" fill="#4B2F3E" />
                        <path d="M287 236c10 9 26 9 36 0" stroke="#D46D8D" strokeWidth="5" strokeLinecap="round" fill="none" />
                        <path d="M250 238c-14 18-18 35-14 50" stroke="url(#cartoon-hair)" strokeWidth="10" strokeLinecap="round" fill="none" />
                        <path d="M350 238c14 18 18 35 14 50" stroke="url(#cartoon-hair)" strokeWidth="10" strokeLinecap="round" fill="none" />

                        <ellipse cx="258" cy="255" rx="12" ry="8" fill="#F3B0C5" opacity="0.45" />
                        <ellipse cx="342" cy="255" rx="12" ry="8" fill="#F3B0C5" opacity="0.45" />

                        <path d="M219 345c-8-8-15-15-25-17-9 0-16 6-19 14l40 16 4-13z" fill="#F7D9C8" />
                        <path d="M381 345c8-8 15-15 25-17 9 0 16 6 19 14l-40 16-4-13z" fill="#F7D9C8" />

                        <path d="M262 365c8 13 18 20 38 20s30-7 38-20" stroke="#D9749A" strokeWidth="5" strokeLinecap="round" fill="none" />
                        <path d="M247 391c11 12 31 20 53 20s42-8 53-20" stroke="#E86F95" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.8" />

                        <path d="M246 318c16 18 33 26 54 26s38-8 54-26" stroke="#FFEBF2" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.9" />
                        <path d="M300 392c0 41-7 79-21 112" stroke="#F7D9C8" strokeWidth="16" strokeLinecap="round" fill="none" />
                        <path d="M300 392c0 41 7 79 21 112" stroke="#F7D9C8" strokeWidth="16" strokeLinecap="round" fill="none" />
                        <path d="M228 520h144" stroke="#D9749A" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.85" />

                        <path d="M245 408l-24 82" stroke="#F7D9C8" strokeWidth="14" strokeLinecap="round" fill="none" />
                        <path d="M355 408l24 82" stroke="#F7D9C8" strokeWidth="14" strokeLinecap="round" fill="none" />
                        <path d="M237 486l-26 20" stroke="#F7D9C8" strokeWidth="14" strokeLinecap="round" fill="none" />
                        <path d="M363 486l26 20" stroke="#F7D9C8" strokeWidth="14" strokeLinecap="round" fill="none" />
                        <path d="M279 517c0 14-12 26-26 26s-26-12-26-26" stroke="#F7D9C8" strokeWidth="14" strokeLinecap="round" fill="none" />
                        <path d="M373 517c0 14-12 26-26 26s-26-12-26-26" stroke="#F7D9C8" strokeWidth="14" strokeLinecap="round" fill="none" />

                        <g className="cartoon-sparkle sparkle-one" fill="#FFF4F8">
                            <path d="M108 290l7 13 13 7-13 7-7 13-7-13-13-7 13-7z" />
                        </g>
                        <g className="cartoon-sparkle sparkle-two" fill="#FFF4F8">
                            <path d="M494 284l6 11 11 6-11 6-6 11-6-11-11-6 11-6z" />
                        </g>
                    </g>
                </svg>
            </div>

            <style>{`
        .cute-cartoon-frame {
          transform: perspective(1200px) rotateX(10deg) rotateY(-8deg);
          animation: frame-tilt 12s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        .cartoon-bob {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: cartoon-bob 4.8s ease-in-out infinite;
        }

        .cartoon-float {
          transform-box: fill-box;
          transform-origin: center;
          animation: cartoon-float 6s ease-in-out infinite;
        }

        .cartoon-heart {
          transform-box: fill-box;
          transform-origin: center;
          animation: cartoon-heart 2.8s ease-in-out infinite;
        }

        .heart-two {
          animation-delay: 0.8s;
        }

        .cartoon-stars,
        .cartoon-sparkle {
          animation: cartoon-twinkle 3.4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        .sparkle-two {
          animation-delay: 1.1s;
        }

        @keyframes frame-tilt {
          0%, 100% { transform: perspective(1200px) rotateX(10deg) rotateY(-8deg) translateY(0); }
          50% { transform: perspective(1200px) rotateX(14deg) rotateY(6deg) translateY(-8px); }
        }

        @keyframes cartoon-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes cartoon-float {
          0%, 100% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.02) translateY(-8px); }
        }

        @keyframes cartoon-heart {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.95; }
          50% { transform: scale(1.12) rotate(-6deg); opacity: 1; }
        }

        @keyframes cartoon-twinkle {
          0%, 100% { opacity: 0.65; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
        </div>
    );
}

export default CuteCartoonImage;