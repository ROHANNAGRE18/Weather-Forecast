import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, Moon, Cloud, Wind, Droplets, Thermometer,
  Sparkles, ArrowRight, MapPin, Zap, Star, ChevronDown
} from "lucide-react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import OutfitCard from "./components/OutfitCard";
import AICard from "./components/AICard";
import BackgroundEffect from "./components/BackgroundEffect";
import { fetchWeatherData, fetchAISuggestions } from "./services/weatherApi";

// ── Home page feature cards ──────────────────────────────────────
const FEATURES = [
  {
    icon: <Thermometer className="w-6 h-6" />,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    title: "Live Weather Data",
    desc: "Real-time conditions from OpenWeatherMap — temperature, humidity, wind speed and more.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    title: "AI Insights",
    desc: "Personalised lifestyle tips powered by AI — what to wear, eat, and watch out for.",
  },
  {
    icon: <Wind className="w-6 h-6" />,
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    title: "Outfit Suggestions",
    desc: "Smart clothing recommendations based on the current temperature and weather condition.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    title: "Any City, Instantly",
    desc: "Search any city worldwide and get accurate weather data in under a second.",
  },
];

// ── Floating stat pills on the home hero ────────────────────────
const STATS = [
  { label: "Cities covered", value: "200K+" },
  { label: "AI-powered tips", value: "7" },
  { label: "Data refresh", value: "Live" },
];

// ── Framer-motion variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardStagger = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

// ── HomePage component ───────────────────────────────────────────
function HomePage({ onSearch, theme }) {
  const isDark = theme === "dark";

  return (
    <motion.div
      key="home"
      {...pageTransition}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* ── Hero section ── */}
      <div style={{ maxWidth: "720px", width: "100%", textAlign: "center", paddingTop: "clamp(3rem, 10vh, 6rem)" }}>

        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 16px",
              borderRadius: "100px",
              background: isDark ? "rgba(59,130,246,0.15)" : "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: isDark ? "#93c5fd" : "#2563eb",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              marginBottom: "1.5rem",
            }}
          >
            <Zap style={{ width: 13, height: 13 }} />
            AI-POWERED WEATHER INSIGHTS
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            color: "var(--text-primary)",
          }}
        >
          Know your weather.{" "}
          <span className="text-shimmer">Dress the part.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "540px",
            margin: "0 auto 2.5rem",
          }}
        >
          Real-time weather for any city on earth, paired with AI lifestyle
          tips — so you always step out perfectly prepared.
        </motion.p>

        {/* Search bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          style={{ marginBottom: "2rem" }}
        >
          <SearchBar onSearch={onSearch} isHome theme={theme} />
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(1rem, 4vw, 2.5rem)",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #3b82f6, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  margin: 0,
                }}
              >
                {s.value}
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "2px 0 0" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-muted)",
            fontSize: "0.78rem",
          }}
        >
          <span>Discover features</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
            <ChevronDown style={{ width: 18, height: 18 }} />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Features grid ── */}
      <div
        style={{
          maxWidth: "860px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1.25rem",
          padding: "4rem 0 2rem",
        }}
      >
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={i}
            whileHover={{ y: -6, scale: 1.02 }}
            style={{
              background: isDark ? "rgba(30,41,59,0.6)" : "#ffffff",
              backdropFilter: isDark ? "blur(20px)" : "none",
              WebkitBackdropFilter: isDark ? "blur(20px)" : "none",
              border: `1.5px solid ${isDark ? "rgba(148,163,184,0.12)" : "rgba(59,130,246,0.12)"}`,
              borderRadius: "1.25rem",
              padding: "1.75rem",
              cursor: "default",
              transition: "box-shadow 0.3s",
              boxShadow: isDark
                ? "0 4px 20px rgba(0,0,0,0.3)"
                : "0 2px 8px rgba(59,130,246,0.06), 0 8px 24px rgba(59,130,246,0.08)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                background: f.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: f.color,
                marginBottom: "1rem",
              }}
            >
              {f.icon}
            </div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: "0 0 0.5rem",
              }}
            >
              {f.title}
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── CTA strip ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          maxWidth: "860px",
          width: "100%",
          marginBottom: "3rem",
          borderRadius: "1.5rem",
          padding: "2.5rem",
          background: isDark
            ? "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.15) 100%)"
            : "linear-gradient(135deg, #eff6ff 0%, #faf5ff 100%)",
          border: `1.5px solid ${isDark ? "rgba(59,130,246,0.25)" : "rgba(59,130,246,0.15)"}`,
          boxShadow: isDark ? "none" : "0 4px 24px rgba(59,130,246,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Star style={{ color: "#f59e0b", width: 20, height: 20 }} />
          <Star style={{ color: "#f59e0b", width: 20, height: 20 }} />
          <Star style={{ color: "#f59e0b", width: 20, height: 20 }} />
          <Star style={{ color: "#f59e0b", width: 20, height: 20 }} />
          <Star style={{ color: "#f59e0b", width: 20, height: 20 }} />
        </div>
        <h2 style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
          Ready to check your city?
        </h2>
        <p style={{ color: "var(--text-secondary)", margin: 0, maxWidth: "420px", lineHeight: 1.6 }}>
          Type any city above and get live weather plus AI-powered advice in seconds.
        </p>
      </motion.div>

      {/* Footer */}
      <p style={{ color: "var(--text-muted)", fontSize: "0.78rem", paddingBottom: "2rem" }}>
        Built with React · OpenWeatherMap · AI Suggestions
      </p>
    </motion.div>
  );
}

// ── Results page component ───────────────────────────────────────
function ResultsPage({ weather, aiSuggestions, aiLoading, error, onBack, theme, onSearch }) {
  return (
    <motion.div
      key="results"
      {...pageTransition}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 1rem 4rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* ── Top bar: back + search ── */}
      <div style={{ width: "100%", maxWidth: "960px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.75rem",
            flexWrap: "nowrap",
          }}
        >
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onBack}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "var(--bg-card)",
              border: `1.5px solid var(--border-color)`,
              borderRadius: "0.6rem",
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              padding: "8px 14px",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-blue)";
              e.currentTarget.style.borderColor = "var(--accent-blue)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            ← Home
          </motion.button>

          {/* Compact search bar fills remaining width */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <SearchBar isHome={false} theme={theme} onSearch={onSearch} embedded />
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                color: "#f87171",
                padding: "1rem",
                borderRadius: "0.75rem",
                textAlign: "center",
                marginBottom: "1.25rem",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Cards grid ── */}
        <AnimatePresence>
          {weather && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Row 1: WeatherCard + OutfitCard side by side */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <WeatherCard weather={weather} theme={theme} />
                <OutfitCard
                  temp={Math.round(weather.main.temp)}
                  condition={weather.weather[0].main}
                  theme={theme}
                />
              </div>

              {/* Row 2: AI card full width */}
              <AICard suggestions={aiSuggestions} loading={aiLoading} theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Root App ─────────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home"); // "home" | "results"
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleSearch = async (searchCity) => {
    const target = (searchCity || city).trim();
    if (!target) return;

    setCity(target);
    setLoading(true);
    setAiLoading(true);
    setError(null);
    setWeather(null);
    setAiSuggestions(null);
    setPage("results");

    try {
      const weatherData = await fetchWeatherData(target);
      setWeather(weatherData);
      setLoading(false);

      const aiData = await fetchAISuggestions(weatherData);
      setAiSuggestions(aiData);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Animated background */}
      <BackgroundEffect theme={theme} />

      {/* Theme toggle */}
      <motion.button
        className="theme-toggle"
        onClick={toggleTheme}
        whileTap={{ scale: 0.9 }}
        title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        aria-label="Toggle colour theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex" }}
            >
              <Sun style={{ width: 18, height: 18, color: "#f59e0b" }} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex" }}
            >
              <Moon style={{ width: 18, height: 18, color: "#6366f1" }} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Page content */}
      <AnimatePresence mode="wait">
        {page === "home" ? (
          <HomePage key="home" onSearch={handleSearch} theme={theme} />
        ) : (
          <ResultsPage
            key="results"
            weather={weather}
            aiSuggestions={aiSuggestions}
            aiLoading={aiLoading}
            error={error}
            onBack={() => setPage("home")}
            theme={theme}
            onSearch={handleSearch}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
