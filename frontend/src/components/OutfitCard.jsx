import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Snowflake, Sun, Cloud } from "lucide-react";
import { getOutfitItems } from "../utils/outfitRules";

function getWeatherMeta(temp, condition) {
  if (temp < 10)
    return { icon: <Snowflake />, color: "#60a5fa", label: "Cold",  bg: "rgba(96,165,250,0.12)",  heroEmoji: "🥶" };
  if (temp <= 22)
    return { icon: <Cloud />,    color: "#10b981", label: "Mild",  bg: "rgba(16,185,129,0.12)",  heroEmoji: "😊" };
  if (temp <= 30)
    return { icon: <Sun />,      color: "#f59e0b", label: "Warm",  bg: "rgba(245,158,11,0.12)",  heroEmoji: "😎" };
  return   { icon: <Sun />,      color: "#ef4444", label: "Hot",   bg: "rgba(239,68,68,0.12)",   heroEmoji: "🥵" };
}

// Slot display order and colours
const SLOT_META = {
  Top:    { color: "#60a5fa", bg: "rgba(96,165,250,0.12)",   border: "rgba(96,165,250,0.25)"   },
  Layer:  { color: "#a78bfa", bg: "rgba(167,139,250,0.12)",  border: "rgba(167,139,250,0.25)"  },
  Mid:    { color: "#818cf8", bg: "rgba(129,140,248,0.12)",  border: "rgba(129,140,248,0.25)"  },
  Bottom: { color: "#34d399", bg: "rgba(52,211,153,0.12)",   border: "rgba(52,211,153,0.25)"   },
  Shoes:  { color: "#fb923c", bg: "rgba(251,146,60,0.12)",   border: "rgba(251,146,60,0.25)"   },
  Head:   { color: "#f472b6", bg: "rgba(244,114,182,0.12)",  border: "rgba(244,114,182,0.25)"  },
  Hands:  { color: "#94a3b8", bg: "rgba(148,163,184,0.12)",  border: "rgba(148,163,184,0.25)"  },
  Acc:    { color: "#fbbf24", bg: "rgba(251,191,36,0.12)",   border: "rgba(251,191,36,0.25)"   },
};

function ClothingChip({ item, index }) {
  const m = SLOT_META[item.slot] ?? SLOT_META.Acc;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 + index * 0.07 }}
      whileHover={{ scale: 1.06, y: -2 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        padding: "0.85rem 0.75rem",
        borderRadius: "1rem",
        background: m.bg,
        border: `1px solid ${m.border}`,
        cursor: "default",
        minWidth: "80px",
        flex: "1 1 80px",
        maxWidth: "110px",
      }}
    >
      {/* Big emoji */}
      <span style={{ fontSize: "1.9rem", lineHeight: 1 }}>{item.emoji}</span>

      {/* Item name */}
      <span
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: m.color,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {item.label}
      </span>

      {/* Sub-note */}
      {item.note && (
        <span
          style={{
            fontSize: "0.62rem",
            color: "var(--text-muted)",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {item.note}
        </span>
      )}
    </motion.div>
  );
}

export default function OutfitCard({ temp, condition, theme }) {
  const isDark = theme === "dark";
  const meta  = getWeatherMeta(temp, condition);
  const items = getOutfitItems(temp, condition);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: isDark ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.78)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${isDark ? "rgba(148,163,184,0.12)" : "rgba(59,130,246,0.15)"}`,
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: isDark ? "0 16px 48px rgba(0,0,0,0.35)" : "0 16px 48px rgba(59,130,246,0.1)",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "1.1rem 1.4rem",
          borderBottom: `1px solid ${isDark ? "rgba(148,163,184,0.08)" : "rgba(59,130,246,0.1)"}`,
          background: meta.bg,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        {/* Icon box */}
        <motion.div
          initial={{ rotate: -20, scale: 0.7 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          style={{
            width: 40, height: 40, borderRadius: "10px",
            background: meta.bg,
            border: `1px solid ${meta.color}35`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: meta.color, flexShrink: 0,
          }}
        >
          {React.cloneElement(meta.icon, { style: { width: 19, height: 19 } })}
        </motion.div>

        {/* Title + badge */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
            Outfit Suggestion
          </span>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              padding: "2px 9px", borderRadius: "100px",
              background: meta.bg, border: `1px solid ${meta.color}40`,
              color: meta.color, fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.06em", width: "fit-content",
            }}
          >
            {meta.label.toUpperCase()} · {temp}°C · {condition}
          </span>
        </div>

        {/* Hero emoji */}
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring" }}
          style={{ marginLeft: "auto", fontSize: "1.9rem" }}
        >
          {meta.heroEmoji}
        </motion.span>
      </div>

      {/* ── Clothing chips grid ── */}
      <div style={{ padding: "1.1rem 1.25rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
          }}
        >
          {items.map((item, i) => (
            <ClothingChip key={`${item.slot}-${i}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
