"use client";

import { useEffect, useRef } from "react";

type StreamParticle = {
  phase: number;
  offset: number;
  size: number;
  speed: number;
  alpha: number;
  color: number;
  glyph: string | null;
  shape: number;
};

const glyphs = ["∞", "λ", "∑", "π", "∇", "φ", "0", "1", "⌁", "·"];

function createParticles(count: number) {
  let seed = 0x1f2e3d4c;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  return Array.from({ length: count }, (): StreamParticle => {
    const glyphChance = random();
    return {
      phase: random() * Math.PI * 2,
      offset: (random() - 0.5) * (0.3 + random() * 1.7),
      size: 0.7 + random() * 2.05,
      speed: 0.00009 + random() * 0.00012,
      alpha: 0.3 + random() * 0.7,
      color: random(),
      glyph:
        glyphChance > 0.86
          ? glyphs[Math.floor(random() * glyphs.length)]
          : null,
      shape: random(),
    };
  });
}

export function SymbolStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const targetCanvas = canvasRef.current;
    if (!targetCanvas) return;
    const canvas: HTMLCanvasElement = targetCanvas;
    const targetContext = canvas.getContext("2d");
    if (!targetContext) return;
    const context: CanvasRenderingContext2D = targetContext;

    const particles = createParticles(1080);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let width = 1;
    let height = 1;
    let frame = 0;
    let running = true;
    const startTime = performance.now();

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.65);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function onPointerMove(event: PointerEvent) {
      pointer.targetX = event.clientX / window.innerWidth - 0.5;
      pointer.targetY = event.clientY / window.innerHeight - 0.5;
    }

    function draw(now: number) {
      if (!running) return;
      const elapsed = reducedMotion ? 9000 : now - startTime;
      pointer.x += (pointer.targetX - pointer.x) * 0.025;
      pointer.y += (pointer.targetY - pointer.y) * 0.025;

      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const centerX = width * 0.5 + pointer.x * 18;
      const centerY = height * 0.32 + pointer.y * 10;
      const scaleX = Math.min(width * 0.42, 540);
      const scaleY = Math.min(height * 0.2, 154);

      const lineGradient = context.createLinearGradient(
        centerX - scaleX,
        centerY,
        centerX + scaleX,
        centerY,
      );
      lineGradient.addColorStop(0, "rgba(85, 128, 255, 0)");
      lineGradient.addColorStop(0.28, "rgba(92, 151, 255, 0.18)");
      lineGradient.addColorStop(0.55, "rgba(224, 239, 255, 0.32)");
      lineGradient.addColorStop(0.8, "rgba(137, 105, 255, 0.16)");
      lineGradient.addColorStop(1, "rgba(90, 120, 255, 0)");

      context.beginPath();
      for (let index = 0; index <= 260; index += 1) {
        const phase = (index / 260) * Math.PI * 2;
        const x = centerX + Math.sin(phase) * scaleX;
        const y =
          centerY + Math.sin(phase) * Math.cos(phase) * scaleY;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = lineGradient;
      context.lineWidth = 1;
      context.stroke();

      particles.forEach((particle, index) => {
        const phase = particle.phase + elapsed * particle.speed;
        const curveX = Math.sin(phase);
        const curveY = Math.sin(phase) * Math.cos(phase);
        const tangentX = Math.cos(phase) * scaleX;
        const tangentY = Math.cos(phase * 2) * scaleY;
        const tangentLength = Math.hypot(tangentX, tangentY) || 1;
        const normalX = -tangentY / tangentLength;
        const normalY = tangentX / tangentLength;
        const depth = 0.5 + Math.cos(phase + 0.55) * 0.5;
        const spread = (16 + (1 - depth) * 42) * particle.offset;
        const x =
          centerX +
          curveX * scaleX +
          normalX * spread +
          Math.sin(elapsed * 0.0006 + index) * 0.65;
        const y =
          centerY +
          curveY * scaleY +
          normalY * spread * 0.62 +
          Math.cos(elapsed * 0.00055 + index * 0.7) * 0.45;
        const shimmer =
          0.72 + Math.sin(elapsed * 0.002 + index * 1.73) * 0.28;
        const alpha =
          particle.alpha * (0.34 + depth * 1.02) * shimmer;

        const color =
          particle.color < 0.54
            ? `rgba(205, 229, 255, ${alpha})`
            : particle.color < 0.82
              ? `rgba(112, 174, 255, ${alpha * 0.9})`
              : `rgba(167, 126, 255, ${alpha * 0.82})`;

        context.fillStyle = color;
        context.strokeStyle = color;

        if (particle.glyph) {
          const glyphSize = 6 + particle.size * (1.55 + depth * 2.05);
          context.font = `${glyphSize}px "SFMono-Regular", "Geist Mono", monospace`;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.shadowColor = color;
          context.shadowBlur = 6 + depth * 9;
          context.fillText(particle.glyph, x, y);
          context.shadowBlur = 0;
          return;
        }

        const particleSize = particle.size * (0.62 + depth * 1.28);
        if (particle.shape > 0.82) {
          context.lineWidth = Math.max(0.5, particleSize * 0.45);
          context.beginPath();
          context.moveTo(x - tangentX / tangentLength * particleSize * 2.4, y);
          context.lineTo(x + tangentX / tangentLength * particleSize * 2.4, y);
          context.stroke();
        } else if (particle.shape > 0.5) {
          context.fillRect(x, y, particleSize * 1.45, particleSize * 0.75);
        } else {
          context.beginPath();
          context.arc(x, y, Math.max(0.42, particleSize * 0.48), 0, Math.PI * 2);
          context.fill();
        }
      });

      context.globalCompositeOperation = "source-over";
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="symbol-stream" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
