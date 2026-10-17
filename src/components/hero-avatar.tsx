"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Application } from "@splinetool/runtime";
import { DevAvatarScene } from "@/components/dev-avatar-scene";

/**
 * Your Spline scene URL.
 *
 * In the Spline editor: Export -> Code -> React, then copy the `scene` URL
 * (it looks like https://prod.spline.design/<id>/scene.splinecode) into
 * NEXT_PUBLIC_SPLINE_SCENE_URL in .env.local.
 *
 * Until one is set, the panel renders the static fallback below.
 */
const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? "";

/** Optional "Open in Spline" link shown next to the credit. */
const SCENE_EDIT_URL = process.env.NEXT_PUBLIC_SPLINE_EDIT_URL ?? "";

// Loaded on demand so the ~1 MB runtime never blocks the first paint.
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

// The hero's default visual: a real WebGL scene. Dynamic + client-only so
// three.js never lands in the server bundle or the initial JS payload.
const ThreeDevScene = dynamic(
  () => import("@/components/three-dev-scene").then((m) => m.ThreeDevScene),
  { ssr: false, loading: () => <ScenePoster /> }
);

/** Default hero visual: the developer-at-desk illustration. */
function AvatarFallback() {
  return <DevAvatarScene className="absolute inset-0 h-full w-full" />;
}

/** Shown while the 3D scene (or the .splinecode file) loads. */
function ScenePoster() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
      <span className="h-8 w-8 rounded-full border-2 border-white/25 border-t-white animate-spin" />
      <span className="text-[10px] uppercase tracking-wide text-white/55">
        Loading 3D scene
      </span>
    </div>
  );
}

/** react-spline rethrows load failures, so keep one close by. */
class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function HeroAvatar() {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const reducedRef = useRef(false);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const [noWebGL, setNoWebGL] = useState(false);

  const handleUnsupported = useCallback(() => setNoWebGL(true), []);

  // Only mount the runtime once the panel is near the viewport.
  useEffect(() => {
    const el = hostRef.current;
    if (!el || !SCENE_URL) return;
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause the scene when it scrolls away or the tab is hidden.
  useEffect(() => {
    const app = appRef.current;
    const el = hostRef.current;
    if (!ready || !app || !el) return;

    if (reducedRef.current) {
      app.stop();
      return;
    }

    let visible = true;
    const sync = () => {
      if (visible && !document.hidden) app.play();
      else app.stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ready]);

  const handleLoad = (app: Application) => {
    appRef.current = app;
    app.setZoom(0.9);
    setReady(true);
  };

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* Accent aura */}
      <div className="absolute -inset-8 rounded-[3rem] bg-primary/25 blur-3xl -z-10" />

      {/* Avatar panel */}
      <div
        ref={hostRef}
        className="spline-host relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#2a1a4f] to-[#1b1136] shadow-xl shadow-primary/15 ring-1 ring-black/5"
      >
        {SCENE_URL && armed ? (
          <SceneErrorBoundary fallback={<AvatarFallback />}>
            <Spline
              scene={SCENE_URL}
              onLoad={handleLoad}
              className="absolute inset-0"
              aria-label="Interactive 3D avatar"
            >
              <ScenePoster />
            </Spline>
          </SceneErrorBoundary>
        ) : noWebGL ? (
          <AvatarFallback />
        ) : (
          <ThreeDevScene
            onUnsupported={handleUnsupported}
            className="absolute inset-0 h-full w-full"
          />
        )}

        {/* Name plate */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-3.5 pt-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <span className="text-sm font-semibold text-white">Selva Agashu</span>
            <span className="ml-auto text-[10px] font-medium text-white/75">
              Backend · Cloud
            </span>
          </div>
        </div>
      </div>

      {/* Spline credit (required by Spline's terms when embedding a scene) */}
      {SCENE_URL ? (
        <p className="mt-2 px-1 text-right text-[10px] text-muted-foreground">
          {SCENE_EDIT_URL ? (
            <>
              <a
                href={SCENE_EDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Open in Spline
              </a>
              {" · "}
            </>
          ) : null}
          <a
            href="https://spline.design"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Made with Spline
          </a>
        </p>
      ) : null}
    </div>
  );
}
