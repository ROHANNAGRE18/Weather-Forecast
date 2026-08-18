import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shirt, Utensils, ShieldAlert, Sparkles, Loader2,
  Bike, HeartPulse, Car, Home
} from "lucide-react";

const SECTIONS = [
  {
    key: "clothing",
    icon: <Shirt />,
    label: "What to Wear",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.2)",
    span: 1,
  },
  {
    key: "food_drink",
    icon: <Utensils />,
    label: "Food & Drinks",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
    span: 1,
  },
  {
    key: "activity",
    icon: <Bike />,
    label: "Activities",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.1)",
    border: "rgba(244,114,182,0.2)",
    span: 1,
  },
  {
    key: "health",
    icon: <HeartPulse />,
    label: "Health Tips",
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.2)",
    span: 1,
  },
  {
    key: "travel",
    icon: <Car />,
    label: "Travel & Commute",
    color: "#fb923c",
    bg: "rgba(251,146,60,0.1)",
    border: "rgba(251,146,60,0.2)",
    span: 1,
  },
  {
    key: "home",
    icon: <Home />,
    label: "Home Environment",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.2)",
    span: 1,
  },
  {
    key: "precautions",
    icon: <ShieldAlert />,
    label: "Safety Precautions",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.25)",
    span: 2, // full-width row
  },
];

function SkeletonRow({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={{
        padding: "1rem 1.25rem",
        borderRadius: "0.9rem",
        background: "rgba(148,163,184,0.07)",
        border: "1px solid rgba(148,163,184,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div style={{ width: 28, height: 28, borderRadius: "7px", background: "rgba(148,163,184,0.15)", animation: "pulse 1.8s ease-in-out infinite" }} />
        <div style={{ width: "35%", height: 12, borderRadius: 6, background: "rgba(148,163,184,0.15)", animation: "pulse 1.8s ease-in-out infinite" }} />
      </div>
      {[100, 85, 65].map((w, i) => (
        <div key={i} style={{ width: `${w}%`, height: 10, borderRadius: 5, marginBottom: 6, background: "rgba(148,163,184,0.1)", animation: `pulse 1.8s ${i * 0.15}s ease-in-out infinite` }} />
      ))}
    </motion.div>
  );
}

function SectionCard({ s, value, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.07, ease: "easeOut" }}
      style={{
        gridColumn: s.span === 2 ? "1 / -1" : "span 1",
        padding: "1.1rem 1.25rem",
        borderRadius: "0.9rem",
        background: s.bg,
        border: `1px solid ${s.border}`,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", color: s.color }}>
        {React.cloneElement(s.icon, { style: { width: 15, height: 15, flexShrink: 0 } })}
        <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.03em" }}>
          {s.label}
        </span>
      </div>

      {/* Content */}
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: 0, lineHeight: 1.7 }}>
        {value}
      </p>
    </motion.div>
  );
}

export default function AICard({ suggestions, loading, theme }) {
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: isDark ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.78)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${isDark ? "rgba(148,163,184,0.12)" : "rgba(139,92,246,0.18)"}`,
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: isDark ? "0 16px 48px rgba(0,0,0,0.35)" : "0 16px 48px rgba(139,92,246,0.1)",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: `1px solid ${isDark ? "rgba(148,163,184,0.08)" : "rgba(139,92,246,0.1)"}`,
          background: "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.07) 100%)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <motion.div
          animate={loading ? { rotate: 360 } : { rotate: 0 }}
          transition={loading ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
          style={{
            width: 42, height: 42, borderRadius: "10px",
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#a78bfa", flexShrink: 0,
          }}
        >
          {loading
            ? <Loader2 style={{ width: 20, height: 20 }} />
            : <Sparkles style={{ width: 20, height: 20 }} />
          }
        </motion.div>

        <div>
          <p style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", margin: 0 }}>
            Gemini AI Lifestyle Guide
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
            {loading ? "Generating personalised advice…" : "7 categories · tailored to your city's weather"}
          </p>
        </div>

        {!loading && suggestions && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            style={{
              marginLeft: "auto",
              padding: "3px 10px",
              borderRadius: "100px",
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#34d399",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
            }}
          >
            ✓ READY
          </motion.span>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonRow key={i} delay={i * 0.06} />
              ))}
            </motion.div>
          ) : suggestions ? (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "0.85rem",
              }}
            >
              {SECTIONS.map((s, i) => (
                <SectionCard key={s.key} s={s} value={suggestions[s.key]} index={i} />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
