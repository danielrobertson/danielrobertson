import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { AnimatePresence, motion } from "motion/react";

export interface Pin {
  id: string;
  location: [number, number];
  label: string;
  image: string;
  rotate: number;
}

interface GlobeProps {
  pins: Pin[];
}

// Matches the cobe docs "Polaroids" showcase preset; dark variant follows
// the classic cobe dark example, tuned for the zinc-900 page background.
const THEMES = {
  light: {
    dark: 0,
    diffuse: 1.5,
    mapBrightness: 9,
    baseColor: [1, 1, 1] as [number, number, number],
    glowColor: [0.94, 0.93, 0.91] as [number, number, number],
    markerColor: [0.4, 0.6, 0.9] as [number, number, number],
    opacity: 0.7,
  },
  dark: {
    dark: 1,
    diffuse: 1.2,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3] as [number, number, number],
    glowColor: [0.2, 0.2, 0.2] as [number, number, number],
    markerColor: [0.4, 0.6, 0.9] as [number, number, number],
    opacity: 0.9,
  },
};

export default function Globe({ pins }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isDarkRef = useRef(true);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !container || !wrapper) return;

    const readTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    readTheme();
    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const measure = () =>
      Math.max(1, Math.min(container.clientWidth, container.clientHeight, 640));

    let size = measure();
    const applySize = () => {
      wrapper.style.width = `${size}px`;
      wrapper.style.height = `${size}px`;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };
    applySize();

    // Start facing Europe, where most of the pins are.
    let phi = Math.PI - ((10 * Math.PI) / 180 - Math.PI / 2);
    let renderedSize = size;
    const theme = () => (isDarkRef.current ? THEMES.dark : THEMES.light);

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: size,
      height: size,
      phi,
      theta: 0.2,
      mapSamples: 16000,
      markerElevation: 0,
      markers: pins.map((p) => ({ location: p.location, size: 0.02, id: p.id })),
      ...theme(),
    });

    // cobe v2 only renders when update() is called, so drive it with rAF.
    let raf = 0;
    const frame = () => {
      if (pointerInteracting.current === null) phi += 0.003;
      globe.update({
        phi: phi + pointerMovement.current,
        theta: 0.2,
        ...theme(),
        ...(size !== renderedSize ? { width: size, height: size } : {}),
      });
      renderedSize = size;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    setTimeout(() => {
      canvas.style.opacity = "1";
    });

    const onResize = () => {
      size = measure();
      applySize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      globe.destroy();
    };
  }, [pins]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPin(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = e.clientX;
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
  }, []);

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current;
      pointerMovement.current = delta * 0.005;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-full"
    >
      <style>{`
        .travel-polaroid {
          position: absolute;
          bottom: anchor(top);
          left: anchor(center);
          translate: -50% 0;
          margin-bottom: 8px;
          background: #fff;
          border: none;
          padding: 6px 6px 24px;
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.15),
            0 1px 2px rgba(0, 0, 0, 0.1);
          transform: rotate(var(--polaroid-rotate, 0deg));
          transition: opacity 0.3s, filter 0.3s;
          pointer-events: auto;
          cursor: pointer;
        }
        .travel-polaroid img {
          display: block;
          width: 60px;
          height: 60px;
          object-fit: cover;
        }
        .travel-polaroid-caption {
          position: absolute;
          bottom: 5px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.5rem;
          color: #333;
          letter-spacing: 0.02em;
        }
        @media (max-width: 640px) {
          .travel-polaroid {
            padding: 4px 4px 18px;
          }
          .travel-polaroid img {
            width: 45px;
            height: 45px;
          }
          .travel-polaroid-caption {
            font-size: 0.4rem;
            bottom: 4px;
          }
        }
        @supports not (anchor-name: --test) {
          .travel-polaroid {
            display: none;
          }
        }
      `}</style>

      <div ref={wrapperRef} className="relative">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerOut={onPointerUp}
          onPointerMove={onPointerMove}
          style={{
            cursor: "grab",
            opacity: 0,
            transition: "opacity 0.5s ease",
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          {pins.map((pin) => (
            <button
              key={pin.id}
              className="travel-polaroid"
              style={
                {
                  positionAnchor: `--cobe-${pin.id}`,
                  opacity: `var(--cobe-visible-${pin.id}, 0)`,
                  filter: `blur(calc((1 - var(--cobe-visible-${pin.id}, 0)) * 8px))`,
                  "--polaroid-rotate": `${pin.rotate}deg`,
                } as React.CSSProperties
              }
              onClick={() => setSelectedPin(pin)}
              aria-label={`View photo of ${pin.label}`}
            >
              <img src={pin.image} alt={pin.label} loading="lazy" />
              <span className="travel-polaroid-caption">{pin.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPin(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 2 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white p-3 pb-14 shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPin.image}
                alt={selectedPin.label}
                className="w-64 sm:w-72 h-auto object-cover"
              />
              <p className="absolute bottom-4 left-0 right-0 text-center text-zinc-600 text-sm font-medium tracking-wide">
                {selectedPin.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
