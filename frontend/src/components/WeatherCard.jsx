import React from "react";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Eye, ArrowUp, ArrowDown } from "lucide-react";

const CONDITION_META = {
  Clear:        { emoji: "☀️",  gradient: "linear-gradient(135deg, #f59e0b22, #fbbf2411)" },
  Clouds:       { emoji: "☁️",  gradient: "linear-gradient(135deg, #64748b22, #94a3b811)" },
  Rain:         { emoji: "🌧️", gradient: "linear-gradient(135deg, #3b82f622, #60a5fa11)" },
  Drizzle:      { emoji: "🌦️", gradient: "linear-gradient(135deg, #3b82f622, #93c5fd11)" },
  Thunderstorm: { emoji: "⛈️",  gradient: "linear-gradient(135deg, #6366f122, #8b5cf611)" },
  Snow:         { emoji: "❄️",  gradient: "linear-gradient(135deg, #e0f2fe22, #bae6fd11)" },
  Mist:         { emoji: "🌫️", gradient: "linear-gradient(135deg, #94a3b822, #cbd5e111)" },
  Fog:          { emoji: "🌫️", gradient: "linear-gradient(135deg, #94a3b822, #cbd5e111)" },
};

const stat = (icon, label, value, color) => ({ icon, label, value, color });

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
  const temp       = Math.round(weather.main.temp);
  const tempMax    = Math.round(weather.main.temp_max);
  const tempMin    = Math.round(weather.main.temp_min);
  const condition  = weather.weather[0].main;
  const desc       = weather.weather[0].description;
  const meta       = CONDITION_META[condition] ?? { emoji: "🌡️", gradient: "linear-gradient(135deg, #3b82f622, #60a5fa11)" };

  const stats = [
    stat(<Thermometer />, "Feels like", `${Math.round(weather.main.feels_like ?? temp)}°C`, "#f59e0b"),
    stat(<Droplets />,    "Humidity",   `${weather.main.humidity}%`,                         "#3b82f6"),
    stat(<Wind />,        "Wind",       `${weather.wind.speed} m/s`,                          "#10b981"),
    stat(<Eye />,         "Visibility", weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : "—", "#8b5cf6"),
  ];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: isDark
          ? "rgba(15,23,42,0.75)"
          : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${isDark ? "rgba(148,163,184,0.12)" : "rgba(59,130,246,0.18)"}`,
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: isDark
          ? "0 20px 60px rgba(0,0,0,0.4)"
          : "0 20px 60px rgba(59,130,246,0.12)",
      }}
    >
      {/* Top section — condition gradient */}
      <div
        style={{
          background: meta.gradient,
          padding: "1.75rem 1.75rem 1.25rem",
          borderBottom: `1px solid ${isDark ? "rgba(148,163,184,0.08)" : "rgba(59,130,246,0.1)"}`,
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
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  marginLeft: "8px",
                }}
              >
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
                color: "var(--accent-blue)",
                margin: "4px 0 0",
                lineHeight: 1,
              }}
            >
              {temp}°C
            </motion.p>
          </div>
        </div>

        {/* High / Low row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              fontSize: "0.82rem",
              color: "#f87171",
              fontWeight: 600,
            }}
          >
            <ArrowUp style={{ width: 13, height: 13 }} /> {tempMax}°
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              fontSize: "0.82rem",
              color: "#60a5fa",
              fontWeight: 600,
            }}
          >
            <ArrowDown style={{ width: 13, height: 13 }} /> {tempMin}°
          </span>
        </motion.div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: isDark ? "rgba(148,163,184,0.08)" : "rgba(59,130,246,0.08)",
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            custom={i}
            style={{
              padding: "1.1rem 1.25rem",
              background: isDark ? "rgba(15,23,42,0.75)" : "rgba(255,255,255,0.8)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: s.color,
              }}
            >
              {React.cloneElement(s.icon, { style: { width: 15, height: 15 } })}
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                {s.label}
              </span>
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {s.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
