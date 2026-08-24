import React from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Eye, ArrowUp, ArrowDown } from "lucide-react";

const CONDITION_META = {
  Clear:        { emoji: "☀️",  gradient: "linear-gradient(135deg, #fef3c722, #fde68a18)" },
  Clouds:       { emoji: "☁️",  gradient: "linear-gradient(135deg, #f1f5f922, #e2e8f018)" },
  Rain:         { emoji: "🌧️", gradient: "linear-gradient(135deg, #dbeafe22, #bfdbfe18)" },
  Drizzle:      { emoji: "🌦️", gradient: "linear-gradient(135deg, #dbeafe22, #e0f2fe18)" },
  Thunderstorm: { emoji: "⛈️",  gradient: "linear-gradient(135deg, #ede9fe22, #ddd6fe18)" },
  Snow:         { emoji: "❄️",  gradient: "linear-gradient(135deg, #f0f9ff22, #e0f2fe18)" },
  Mist:         { emoji: "🌫️", gradient: "linear-gradient(135deg, #f8fafc22, #f1f5f918)" },
  Fog:          { emoji: "🌫️", gradient: "linear-gradient(135deg, #f8fafc22, #f1f5f918)" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const statVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: 0.25 + i * 0.07, ease: "easeOut" },
  }),
};

export default function WeatherCard({ weather, theme }) {
  const isDark = theme === "dark";
  const temp      = Math.round(weather.main.temp);
  const tempMax   = Math.round(weather.main.temp_max);
  const tempMin   = Math.round(weather.main.temp_min);
  const condition = weather.weather[0].main;
  const desc      = weather.weather[0].description;
  const meta      = CONDITION_META[condition] ?? { emoji: "🌡️", gradient: "linear-gradient(135deg, #dbeafe22, #bfdbfe18)" };

  const stats = [
    { icon: <Thermometer />, label: "Feels like", value: `${Math.round(weather.main.feels_like ?? temp)}°C`, color: "#f59e0b", darkColor: "#fbbf24" },
    { icon: <Droplets />,    label: "Humidity",   value: `${weather.main.humidity}%`,                        color: "#2563eb", darkColor: "#60a5fa" },
    { icon: <Wind />,        label: "Wind",        value: `${weather.wind.speed} m/s`,                       color: "#059669", darkColor: "#34d399" },
    { icon: <Eye />,         label: "Visibility",  value: weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : "—", color: "#7c3aed", darkColor: "#a78bfa" },
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: isDark ? "rgba(15,23,42,0.78)" : "#ffffff",
        backdropFilter: isDark ? "blur(24px)" : "none",
        WebkitBackdropFilter: isDark ? "blur(24px)" : "none",
        border: `1.5px solid ${isDark ? "rgba(148,163,184,0.12)" : "rgba(59,130,246,0.15)"}`,
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: isDark
          ? "0 20px 60px rgba(0,0,0,0.45)"
          : "0 4px 6px rgba(59,130,246,0.05), 0 12px 40px rgba(59,130,246,0.1), 0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Top: condition hero ── */}
      <div
        style={{
          background: isDark
            ? meta.gradient
            : "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
          padding: "1.75rem 1.75rem 1.4rem",
          borderBottom: `1.5px solid ${isDark ? "rgba(148,163,184,0.08)" : "rgba(59,130,246,0.1)"}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* City & description */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              style={{
                fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {weather.name}
              <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-muted)", marginLeft: "8px" }}>
                {weather.sys.country}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                color: "var(--text-secondary)",
                textTransform: "capitalize",
                margin: "4px 0 0",
                fontSize: "0.95rem",
              }}
            >
              {desc}
            </motion.p>
          </div>

          {/* Emoji + temp */}
          <div style={{ textAlign: "right" }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
              style={{ fontSize: "3rem", lineHeight: 1 }}
            >
              {meta.emoji}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: 900,
                background: "linear-gradient(135deg, var(--accent-blue), var(--accent-emerald))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                margin: "4px 0 0",
                lineHeight: 1,
              }}
            >
              {temp}°C
            </motion.p>
          </div>
        </div>

        {/* High / Low */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "0.82rem", color: "#ef4444", fontWeight: 700 }}>
            <ArrowUp style={{ width: 13, height: 13 }} /> {tempMax}°
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "0.82rem", color: "#3b82f6", fontWeight: 700 }}>
            <ArrowDown style={{ width: 13, height: 13 }} /> {tempMin}°
          </span>
        </motion.div>
      </div>

      {/* ── Stats grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: isDark ? "rgba(148,163,184,0.08)" : "rgba(59,130,246,0.08)",
        }}
      >
        {stats.map((s, i) => {
          const iconColor = isDark ? s.darkColor : s.color;
          return (
            <motion.div
              key={s.label}
              variants={statVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              style={{
                padding: "1.1rem 1.25rem",
                background: isDark ? "rgba(15,23,42,0.78)" : "#ffffff",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {React.cloneElement(s.icon, { style: { width: 14, height: 14, color: iconColor, flexShrink: 0 } })}
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {s.label}
                </span>
              </div>
              <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {s.value}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
