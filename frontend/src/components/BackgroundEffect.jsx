import React, { useEffect, useRef } from "react";

// Generates a deterministic set of particles so SSR/hydration is stable
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: (i * 37 + 11) % 97,          // 0-97%
  size: 3 + (i * 13) % 10,            // 3-13px
  duration: 12 + (i * 7) % 18,        // 12-30s
  delay: (i * 4.3) % 14,              // 0-14s stagger
  opacity: 0.25 + ((i * 11) % 40) / 100, // 0.25-0.65
}));

const STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: (i * 53 + 7) % 100,
  top: (i * 41 + 3) % 100,
  size: 1 + (i * 3) % 3,
  twinkleDuration: 2 + (i * 0.7) % 4,
  twinkleDelay: (i * 0.5) % 3,
}));

export default function BackgroundEffect({ theme }) {
  const isDark = theme === "dark";

  return (
    <div className="bg-canvas">
      {/* ── Gradient base ───────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? "radial-gradient(ellipse at 20% 50%, #0d1f3c 0%, #0f172a 40%, #020617 100%)"
            : "radial-gradient(ellipse at 20% 50%, #dbeafe 0%, #e8f0fe 40%, #c7d9ff 100%)",
          transition: "background 0.5s ease",
        }}
      />

      {/* ── Animated gradient orbs ───────────────────────── */}
      <div
        className="animate-orb-1"
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="animate-orb-2"
        style={{
          position: "absolute",
          top: "55%",
          right: "8%",
          width: "440px",
          height: "440px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="animate-orb-3"
        style={{
          position: "absolute",
          top: "30%",
          left: "55%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />

      {/* ── Twinkling stars (dark mode only) ────────────── */}
      {isDark &&
        STARS.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: "white",
              opacity: 0,
              animation: `blink ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`,
            }}
          />
        ))}

      {/* ── Floating particles ───────────────────────────── */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-20px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: isDark
              ? `rgba(99,179,237,${p.opacity})`
              : `rgba(37,99,235,${p.opacity * 0.8})`,
            boxShadow: isDark
              ? `0 0 ${p.size * 2}px rgba(99,179,237,0.4)`
              : `0 0 ${p.size * 2}px rgba(37,99,235,0.3)`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* ── Mesh grid overlay ───────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: isDark
            ? "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)"
            : "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}
