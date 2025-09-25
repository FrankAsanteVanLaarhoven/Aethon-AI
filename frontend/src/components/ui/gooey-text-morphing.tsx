"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1.5,
  cooldownTime = 0.5,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const animationRef = React.useRef<number>();
  const isInitialized = React.useRef(false);

  React.useEffect(() => {
    if (!texts.length || texts.length < 2) return;

    let textIndex = 0;
    let time = performance.now();
    let morph = 0;
    let cooldown = cooldownTime;
    let isAnimating = false;

    // Initialize text content
    if (text1Ref.current && text2Ref.current && !isInitialized.current) {
      text1Ref.current.textContent = texts[0];
      text2Ref.current.textContent = texts[1];
      text1Ref.current.style.opacity = "1";
      text1Ref.current.style.filter = "blur(0px)";
      text2Ref.current.style.opacity = "0";
      text2Ref.current.style.filter = "blur(10px)";
      isInitialized.current = true;
    }

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;

      // Smooth easing function for more natural animation
      const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const easedFraction = easeInOutCubic(fraction);

      // More gradual blur and opacity transitions
      const blurAmount = Math.max(0, 12 * (1 - easedFraction));
      const opacityAmount = Math.pow(easedFraction, 0.3);

      text2Ref.current.style.filter = `blur(${blurAmount}px)`;
      text2Ref.current.style.opacity = `${opacityAmount}`;

      const reverseFraction = 1 - easedFraction;
      const reverseBlur = Math.max(0, 12 * (1 - reverseFraction));
      const reverseOpacity = Math.pow(reverseFraction, 0.3);

      text1Ref.current.style.filter = `blur(${reverseBlur}px)`;
      text1Ref.current.style.opacity = `${reverseOpacity}`;
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "blur(10px)";
        text2Ref.current.style.opacity = "0";
        text1Ref.current.style.filter = "blur(0px)";
        text1Ref.current.style.opacity = "1";
      }
    };

    const doMorph = () => {
      if (isAnimating) return;
      isAnimating = true;

      morph += 0.016; // ~60fps
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction >= 1) {
        cooldown = cooldownTime;
        fraction = 1;
        morph = 0;
        
        // Switch text content
        textIndex = (textIndex + 1) % texts.length;
        if (text1Ref.current && text2Ref.current) {
          text1Ref.current.textContent = texts[textIndex];
          text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
        }
        
        isAnimating = false;
      }

      setMorph(fraction);
      if (fraction < 1) {
        isAnimating = false;
      }
    };

    const animate = (currentTime: number) => {
      const dt = (currentTime - time) / 1000;
      time = currentTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        doMorph();
      } else {
        doCooldown();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative w-full", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center min-h-[160px] md:min-h-[180px] lg:min-h-[200px] pb-6"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center leading-tight tracking-tight",
            "text-6xl md:text-7xl lg:text-8xl font-bold",
            textClassName
          )}
          style={{
            willChange: "opacity, filter",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)"
          }}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center leading-tight tracking-tight",
            "text-6xl md:text-7xl lg:text-8xl font-bold",
            textClassName
          )}
          style={{
            willChange: "opacity, filter",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)"
          }}
        />
      </div>
    </div>
  );
}
