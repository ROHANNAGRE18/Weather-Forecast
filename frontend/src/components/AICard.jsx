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
    color: "#2563eb",
    darkColor: "#60a5fa",
    bg: "rgba(37,99,235,0.06)",
    darkBg: "rgba(96,165,250,0.1)",
    border: "rgba(37,99,235,0.14)",
    darkBorder: "rgba(96,165,250,0.2)",
  },
  {
    key: "food_drink",
    icon: <Utensils />,
    label: "Food & Drinks",
    color: "#059669",
    darkColor: "#34d399",
    bg: "rgba(5,150,105,0.06)",
    darkBg: "rgba(52,211,153,0.1)",
    border: "rgba(5,150,105,0.14)",
    darkBorder: "rgba(52,211,153,0.2)",
  },
  {
    key: "activity",
    icon: <Bike />,
    label: "Activities",
    color: "#be185d",
    darkColor: "#f472b6",
    bg: "rgba(190,24,93,0.06)",
    darkBg: "rgba(244,114,182,0.1)",
    border: "rgba(190,24,93,0.14)",
    darkBorder: "rgba(244,114,182,0.2)",
  },
  {
    key: "health",
    icon: <HeartPulse />,
    label: "Health Tips",
    color: "#dc2626",
    darkColor: "#f87171",
    bg: "rgba(220,38,38,0.06)",
    darkBg: "rgba(248,113,113,0.1)",
    border: "rgba(220,38,38,0.14)",
    darkBorder: "rgba(248,113,113,0.2)",
  },
  {
    key: "travel",
    icon: <Car />,
    label: "Travel & Commute",
    color: "#c2410c",
    darkColor: "#fb923c",
    bg: "rgba(194,65,12,0.06)",
    darkBg: "rgba(251,146,60,0.1)",
    border: "rgba(194,65,12,0.14)",
    darkBorder: "rgba(251,146,60,0.2)",
  },
  {
    key: "home",
    icon: <Home />,
    label: "Home Environment",
    color: "#7c3aed",
    darkColor: "#a78bfa",
    bg: "rgba(124,58,237,0.06)",
    darkBg: "rgba(167,139,250,0.1)",
    border: "rgba(124,58,237,0.14)",
    darkBorder: "rgba(167,139,250,0.2)",
  },
  {
    key: "precautions",
    icon: <ShieldAlert />,
    label: "Safety Precautions",
    color: "#b45309",
    darkColor: "#fbbf24",
    bg: "rgba(180,83,9,0.06)",
    darkBg: "rgba(251,191,36,0.1)",
    border: "rgba(180,83,9,0.16)",
    darkBorder: "rgba(251,191,36,0.25)",
    span: 2,
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

function SectionCard({ s, value, index, isDark }) {
  const color  = isDark ? s.darkColor  : s.color;
  const bg     = isDark ? s.darkBg     : s.bg;
  const border = isDark ? s.darkBorder : s.border;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.07, ease: "easeOut" }}
      style={{
        gridColumn: s.span === 2 ? "1 / -1" : "span 1",
        padding: "1.1rem 1.25rem",
        borderRadius: "0.9rem",
        background: bg,
        border: `1.5px solid ${border}`,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Label row */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", color }}>
        {React.cloneElement(s.icon, { style: { width: 15, height: 15, flexShrink: 0 } })}
        <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {s.label}
        </span>
      </div>
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
        background: isDark ? "rgba(15,23,42,0.78)" : "#ffffff",
        backdropFilter: isDark ? "blur(24px)" : "none",
        WebkitBackdropFilter: isDark ? "blur(24px)" : "none",
        border: `1.5px solid ${isDark ? "rgba(148,163,184,0.12)" : "rgba(124,58,237,0.15)"}`,
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: isDark
          ? "0 16px 48px rgba(0,0,0,0.4)"
          : "0 4px 6px rgba(124,58,237,0.05), 0 12px 40px rgba(124,58,237,0.1), 0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "1.25rem 1.5rem",
          borderBottom: `1.5px solid ${isDark ? "rgba(148,163,184,0.08)" : "rgba(124,58,237,0.1)"}`,
          background: isDark
            ? "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.07) 100%)"
            : "linear-gradient(135deg, #faf5ff 0%, #eff6ff 100%)",
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
            background: isDark ? "rgba(139,92,246,0.15)" : "rgba(124,58,237,0.08)",
            border: `1.5px solid ${isDark ? "rgba(139,92,246,0.3)" : "rgba(124,58,237,0.2)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: isDark ? "#a78bfa" : "#7c3aed", flexShrink: 0,
            boxShadow: isDark ? "none" : "0 2px 8px rgba(124,58,237,0.12)",
          }}
        >
          {loading
            ? <Loader2 style={{ width: 20, height: 20 }} />
            : <Sparkles style={{ width: 20, height: 20 }} />
          }
        </motion.div>

        <div>
          <p style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", margin: 0 }}>
            AI Lifestyle Guide
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
              padding: "4px 12px",
              borderRadius: "100px",
              background: isDark ? "rgba(16,185,129,0.12)" : "rgba(5,150,105,0.08)",
              border: `1.5px solid ${isDark ? "rgba(16,185,129,0.25)" : "rgba(5,150,105,0.2)"}`,
              color: isDark ? "#34d399" : "#059669",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              boxShadow: isDark ? "none" : "0 1px 4px rgba(5,150,105,0.1)",
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
                <SectionCard key={s.key} s={s} value={suggestions[s.key]} index={i} isDark={isDark} />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
