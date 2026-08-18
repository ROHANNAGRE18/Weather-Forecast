/**
 * Returns a structured outfit breakdown as an array of clothing item objects.
 * Each item has: { emoji, label, note? }
 */
export function getOutfitItems(temp, condition) {
  const items = [];

  // ── Top ──────────────────────────────────────────────
  if (temp < 10) {
    items.push({ slot: "Top",    emoji: "🧥", label: "Heavy Jacket",     note: "Insulated / down" });
    items.push({ slot: "Layer",  emoji: "🧣", label: "Thermal Layer",    note: "Keep warm inside" });
    items.push({ slot: "Head",   emoji: "🧢", label: "Warm Hat",         note: "Beanie or cap" });
    items.push({ slot: "Hands",  emoji: "🧤", label: "Gloves",           note: "Essential below 10°C" });
  } else if (temp <= 17) {
    items.push({ slot: "Top",    emoji: "🧥", label: "Light Jacket",     note: "For the breeze" });
    items.push({ slot: "Mid",    emoji: "👔", label: "Long-sleeve Shirt", note: "Cotton or flannel" });
  } else if (temp <= 22) {
    items.push({ slot: "Top",    emoji: "👕", label: "T-Shirt",          note: "Light cotton" });
    items.push({ slot: "Layer",  emoji: "🧥", label: "Hoodie / Sweater", note: "For cool evenings" });
  } else if (temp <= 30) {
    items.push({ slot: "Top",    emoji: "👕", label: "T-Shirt",          note: "Breathable fabric" });
  } else {
    items.push({ slot: "Top",    emoji: "👕", label: "Sleeveless Top",   note: "Stay cool" });
  }

  // ── Bottom ───────────────────────────────────────────
  if (temp < 10) {
    items.push({ slot: "Bottom", emoji: "👖", label: "Thick Trousers",   note: "Thermal lining" });
  } else if (temp <= 22) {
    items.push({ slot: "Bottom", emoji: "👖", label: "Jeans / Trousers", note: "Comfortable fit" });
  } else {
    items.push({ slot: "Bottom", emoji: "🩳", label: "Shorts",           note: "Light & airy" });
  }

  // ── Shoes ────────────────────────────────────────────
  if (["Rain", "Drizzle", "Thunderstorm"].includes(condition)) {
    items.push({ slot: "Shoes",  emoji: "🥾", label: "Waterproof Boots", note: "Keep feet dry" });
  } else if (temp < 10) {
    items.push({ slot: "Shoes",  emoji: "👢", label: "Warm Boots",       note: "Insulated sole" });
  } else if (temp > 28) {
    items.push({ slot: "Shoes",  emoji: "👡", label: "Sandals",          note: "Open & breezy" });
  } else {
    items.push({ slot: "Shoes",  emoji: "👟", label: "Sneakers",         note: "Everyday comfort" });
  }

  // ── Accessories ──────────────────────────────────────
  if (["Rain", "Drizzle", "Thunderstorm"].includes(condition)) {
    items.push({ slot: "Acc",    emoji: "☂️",  label: "Umbrella",        note: "Must-have today" });
  }
  if (condition === "Clear" && temp > 18) {
    items.push({ slot: "Acc",    emoji: "🕶️", label: "Sunglasses",       note: "UV protection" });
  }
  if (temp > 25 && condition === "Clear") {
    items.push({ slot: "Acc",    emoji: "🧴", label: "Sunscreen",        note: "SPF 30+" });
  }
  if (condition === "Snow") {
    items.push({ slot: "Acc",    emoji: "🧣", label: "Scarf",            note: "Wrap up warm" });
  }

  return items;
}

/** Legacy plain-text version (kept for backward compat if needed) */
export function getOutfitRecommendation(temp, condition) {
  const items = getOutfitItems(temp, condition);
  return items.map((i) => `${i.emoji} ${i.label}`).join("  ·  ");
}
