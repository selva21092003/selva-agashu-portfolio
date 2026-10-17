"use client";

import { useRef, useEffect, useCallback } from "react";

interface TiltOptions {
  maxRotation?: number; // max tilt degrees (e.g. 10)
  perspective?: number; // perspective in px (e.g. 1000)
  scale?: number; // scale on hover (e.g. 1.02)
  glare?: boolean;
}

export function use3DTilt<T extends HTMLElement = HTMLDivElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const { maxRotation = 8, perspective = 1000, scale = 1.02, glare = true } = options;

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxRotation;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare) {
        const glarePercentX = (x / rect.width) * 100;
        const glarePercentY = (y / rect.height) * 100;
        el.style.setProperty("--glare-x", `${glarePercentX}%`);
        el.style.setProperty("--glare-y", `${glarePercentY}%`);
        el.style.setProperty("--glare-opacity", "0.25");
      }
    },
    [maxRotation, perspective, scale, glare]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    if (glare) {
      el.style.setProperty("--glare-opacity", "0");
    }
  }, [perspective, glare]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "transform 0.15s ease-out";
    el.style.transformStyle = "preserve-3d";

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return ref;
}
