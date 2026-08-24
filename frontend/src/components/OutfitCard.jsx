import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Snowflake, Sun, Cloud, Thermometer } from "lucide-react";
import { getOutfitItems } from "../utils/outfitRules";

function getWeatherMeta(temp) {
  if (temp < 10)
    return {
      icon: <Snowflake />,
      color: "#2563eb",
      darkColor: "#60a5fa",
      label: "Cold",
      bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      darkBg: "rgba(96,165,250,0.1)",
      heroEmoji: "🥶",
    };
  if (temp <= 22)
    return {
      icon: <Cloud />,
      color: "#059669",
      darkColor: "#34d399",
      label: "Mild",
      bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
      darkBg: "rgba(16,185,129,0.1)",
      heroEmoji: "😊",
    };
  if (temp <= 30)
    return {
      icon: <Sun />,
      color: "#d97706",
      darkColor: "#fbbf24",
      label: "Warm",
      bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
      darkBg: "rgba(245,158,11,0.1)",
      heroEmoji: "😎",
    };
  return {
    icon: <Thermometer />,
    color: "#dc2626",
    darkColor: "#f87171",
    label: "Hot",
    bg: "linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)",
    darkBg: "rgba(239,68,68,0.1)",
    heroEmoji: "🥵",
  };
}

const SLOT_META = {
  Top:    { color: "#2563eb", darkColor: "#60a5fa", bg: "rgba(37,99,235,0.06)",   darkBg: "rgba(96,165,250,0.12)",   border: "rgba(37,99,235,0.15)",   darkBorder: "rgba(96,165,250,0.25)"   },
  Layer:  { color: "#7c3aed", darkColor: "#a78bfa", bg: "rgba(124,58,237,0.06)",  darkBg: "rgba(167,139,250,0.12)",  border: "rgba(124,58,237,0.15)",  darkBorder: "rgba(167,139,250,0.25)"  },
  Mid:    { color: "#4f46e5", darkColor: "#818cf8", bg: "rgba(79,70,229,0.06)",   darkBg: "rgba(129,140,248,0.12)",  border: "rgba(79,70,229,0.15)",   darkBorder: "rgba(129,140,248,0.25)"  },
  Bottom: { color: "#059669", darkColor: "#34d399", bg: "rgba(5,150,105,0.06)",   darkBg: "rgba(52,211,153,0.12)",   border: "rgba(5,150,105,0.15)",   darkBorder: "rgba(52,211,153,0.25)"   },
  Shoes:  { color: "#c2410c", darkColor: "#fb923c", bg: "rgba(194,65,12,0.06)",   darkBg: "rgba(251,146,60,0.12)",   border: "rgba(194,65,12,0.15)",   darkBorder: "rgba(251,146,60,0.25)"   },
  Head:   { color: "#be185d", darkColor: "#f472b6", bg: "rgba(190,24,93,0.06)",   darkBg: "rgba(244,114,182,0.12)",  border: "rgba(190,24,93,0.15)",   darkBorder: "rgba(244,114,182,0.25)"  },
  Hands:  { color: "#475569", darkColor: "#94a3b8", bg: "rgba(71,85,105,0.06)",   darkBg: "rgba(148,163,184,0.12)",  border: "rgba(71,85,105,0.15)",   darkBorder: "rgba(148,163,184,0.25)"  },
  Acc:    { color: "#b45309", darkColor: "#fbbf24", bg: "rgba(180,83,9,0.06)",    darkBg: "rgba(251,191,36,0.12)",   border: "rgba(180,83,9,0.15)",    darkBorder: "rgba(251,191,36,0.25)"   },
};

function ClothingChip({ item, index, isDark }) {
  const m = SLOT_META[item.slot] ?? SLOT_META.Acc;
  const chipColor  = isDark ? m.darkColor  : m.color;
  const chipBg     = isDark ? m.darkBg     : m.bg;
  const chipBorder = isDark ? m.darkBorder : m.border;

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
        background: chipBg,
        border: `1.5px solid ${chipBorder}`,
        cursor: "default",
        minWidth: "80px",
        flex: "1 1 80px",
        maxWidth: "110px",
        transition: "box-shadow 0.2s",
        boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <span style={{ fontSize: "1.9rem", lineHeight: 1 }}>{item.emoji}</span>
      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: chipColor, textAlign: "center", lineHeight: 1.3 }}>
        {item.label}
      </span>
      {item.note && (
        <span style={{ fontSize: "0.62rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.3 }}>
          {item.note}
        </span>
      )}
    </motion.div>
  );
}

export default function OutfitCard({ temp, condition, theme }) {
  const isDark = theme === "dark";
  const meta   = getWeatherMeta(temp);
  const items  = getOutfitItems(temp, condition);

  const headerColor  = isDark ? meta.darkColor  : meta.color;
  const headerBg     = isDark ? meta.darkBg     : meta.bg;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: isDark ? "rgba(15,23,42,0.78)" : "#ffffff",
        backdropFilter: isDark ? "blur(24px)" : "none",
        WebkitBackdropFilter: isDark ? "blur(24px)" : "none",
        border: `1.5px solid ${isDark ? "rgba(148,163,184,0.12)" : "rgba(59,130,246,0.15)"}`,
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: isDark
          ? "0 16px 48px rgba(0,0,0,0.4)"
          : "0 4px 6px rgba(59,130,246,0.05), 0 12px 40px rgba(59,130,246,0.1), 0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "1.1rem 1.4rem",
          borderBottom: `1.5px solid ${isDark ? "rgba(148,163,184,0.08)" : "rgba(59,130,246,0.1)"}`,
          background: headerBg,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <motion.div
          initial={{ rotate: -20, scale: 0.7 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
          style={{
            width: 40, height: 40, borderRadius: "10px",
            background: isDark ? meta.darkBg : "rgba(255,255,255,0.7)",
            border: `1.5px solid ${headerColor}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: headerColor, flexShrink: 0,
            boxShadow: isDark ? "none" : `0 2px 8px ${meta.color}18`,
          }}
        >
          {React.cloneElement(meta.icon, { style: { width: 19, height: 19 } })}
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
            Outfit Suggestion
          </span>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              padding: "2px 10px", borderRadius: "100px",
              background: isDark ? `${meta.darkColor}18` : "rgba(255,255,255,0.7)",
              border: `1.5px solid ${headerColor}30`,
              color: headerColor, fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.06em", width: "fit-content",
              boxShadow: isDark ? "none" : `0 1px 4px ${meta.color}18`,
            }}
          >
            {meta.label.toUpperCase()} · {temp}°C · {condition}
          </span>
        </div>

        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring" }}
          style={{ marginLeft: "auto", fontSize: "1.9rem" }}
        >
          {meta.heroEmoji}
        </motion.span>
      </div>

      {/* ── Chips ── */}
      <div style={{ padding: "1.1rem 1.25rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
          {items.map((item, i) => (
            <ClothingChip key={`${item.slot}-${i}`} item={item} index={i} isDark={isDark} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
