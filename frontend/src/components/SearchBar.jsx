import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";

export default function SearchBar({ onSearch, isHome = false, theme, embedded = false }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const isDark = theme === "dark";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim() || loading) return;
    setLoading(true);
    try {
      await onSearch(city.trim());
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: isHome ? "1rem 1rem 1rem 3rem" : "0.75rem 0.75rem 0.75rem 2.75rem",
    fontSize: isHome ? "1rem" : "0.9rem",
    borderRadius: "0.9rem",
    background: isDark
      ? focused ? "rgba(30,41,59,0.9)" : "rgba(30,41,59,0.7)"
      : focused ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)",
    border: `1.5px solid ${
      focused
        ? isDark ? "rgba(59,130,246,0.7)" : "rgba(59,130,246,0.6)"
        : isDark ? "rgba(148,163,184,0.15)" : "rgba(59,130,246,0.2)"
    }`,
    color: "var(--text-primary)",
    outline: "none",
    transition: "all 0.25s ease",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: focused
      ? isDark
        ? "0 0 0 3px rgba(59,130,246,0.15), 0 8px 24px rgba(0,0,0,0.3)"
        : "0 0 0 3px rgba(59,130,246,0.12), 0 8px 24px rgba(0,0,0,0.08)"
      : "0 4px 16px rgba(0,0,0,0.15)",
  };

  const btnStyle = {
    padding: isHome ? "1rem 1.75rem" : "0.75rem 1.25rem",
    fontSize: isHome ? "1rem" : "0.875rem",
    fontWeight: 700,
    borderRadius: "0.9rem",
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    background: loading
      ? isDark ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.4)"
      : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
    boxShadow: loading ? "none" : "0 4px 16px rgba(59,130,246,0.35)",
    opacity: loading ? 0.7 : 1,
    flexShrink: 0,
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "0.6rem",
        width: "100%",
        maxWidth: isHome ? "560px" : "100%",
        margin: isHome ? "0 auto" : "0",
        alignItems: "center",
      }}
    >
      {/* Input wrapper */}
      <div style={{ position: "relative", flex: 1 }}>
        <div
          style={{
            position: "absolute",
            left: "0.9rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: focused ? "var(--accent-blue)" : "var(--text-muted)",
            transition: "color 0.25s",
            display: "flex",
            pointerEvents: "none",
          }}
        >
          <Search style={{ width: isHome ? 20 : 17, height: isHome ? 20 : 17 }} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={isHome ? "Search any city worldwide…" : "Search another city…"}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="City name"
          autoComplete="off"
        />
      </div>

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={loading || !city.trim()}
        style={btnStyle}
        whileHover={!loading ? { scale: 1.04, boxShadow: "0 6px 24px rgba(59,130,246,0.5)" } : {}}
        whileTap={!loading ? { scale: 0.97 } : {}}
      >
        {loading ? (
          <>
            <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
            {isHome ? "Searching…" : "…"}
          </>
        ) : (
          <>
            {isHome && <Search style={{ width: 16, height: 16 }} />}
            {isHome ? "Search" : "Go"}
          </>
        )}
      </motion.button>
    </form>
  );
}
