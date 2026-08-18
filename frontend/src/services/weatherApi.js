const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const USE_MOCK = false;

if (!API_KEY) {
  console.warn("VITE_OPENWEATHER_API_KEY is not set in .env");
}
if (!BACKEND_URL) {
  console.warn("VITE_BACKEND_URL is not set in .env");
}

// 1. Fetch live weather from OpenWeatherMap API
export async function fetchWeatherData(city) {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (city.toLowerCase() === "error") throw new Error("City not found.");
    return {
      name: city.charAt(0).toUpperCase() + city.slice(1),
      sys: { country: "IN" },
      main: { temp: 28, temp_min: 24, temp_max: 32, humidity: 75, feels_like: 30 },
      weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
      wind: { speed: 3.5 },
      visibility: 10000,
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) throw new Error("City not found.");
    if (response.status === 401) throw new Error("Invalid OpenWeatherMap API key.");
    throw new Error("Failed to load weather data.");
  }

  return await response.json();
}

// 2. Send weather data to the Node.js backend to get Gemini AI recommendations
export async function fetchAISuggestions(weatherData) {
  const response = await fetch(`${BACKEND_URL}/api/ai-suggestions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      city: weatherData.name,
      temp: Math.round(weatherData.main.temp),
      condition: weatherData.weather[0].main,
      humidity: weatherData.main.humidity,
      wind: weatherData.wind.speed,
    }),
  });

  if (!response.ok) throw new Error("AI recommendation server error.");
  return await response.json();
}
