import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/api/ai-suggestions", async (req, res) => {
  try {
    const { city, temp, condition, humidity, wind } = req.body;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("Gemini API request timed out after 15s")),
        15000,
      ),
    );

    const aiPromise = ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        The user is in ${city}. Current weather: Temperature ${temp}°C, Condition: ${condition}, 
        Humidity: ${humidity}%, Wind: ${wind} m/s.
        Give detailed, helpful, and friendly lifestyle advice covering all 7 categories below.
      `,
      config: {
        systemInstruction: `
          You are a knowledgeable and friendly lifestyle assistant who gives rich, practical advice based on weather conditions.
          For each category, write 2-3 complete sentences with specific, actionable tips tailored to the exact weather.
          Be warm, conversational, and genuinely helpful — not generic.
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            clothing: {
              type: "STRING",
              description: "Detailed outfit advice: what to wear top to bottom, fabrics, layers, accessories like hat/scarf/sunglasses. 2-3 sentences."
            },
            food_drink: {
              type: "STRING",
              description: "What to eat and drink — warm/cool foods, hydration tips, comfort foods suited to the weather. 2-3 sentences."
            },
            activity: {
              type: "STRING",
              description: "Best outdoor or indoor activities suited to this weather, and the ideal time of day to go out. 2-3 sentences."
            },
            health: {
              type: "STRING",
              description: "Health tips: allergies, UV exposure, hydration needs, respiratory concerns, or cold/heat-related advice. 2-3 sentences."
            },
            travel: {
              type: "STRING",
              description: "Travel and commute tips: road conditions, visibility, traffic, whether to drive or use public transport. 2-3 sentences."
            },
            home: {
              type: "STRING",
              description: "Home environment tips: whether to open windows, use AC/heating, humidity control, or energy saving advice. 2-3 sentences."
            },
            precautions: {
              type: "STRING",
              description: "Key safety precautions and warnings based on the weather — lightning, flooding, heatstroke, frostbite risk, etc. 2-3 sentences."
            },
          },
          required: ["clothing", "food_drink", "activity", "health", "travel", "home", "precautions"],
        },
      },
    });

    const response = await Promise.race([aiPromise, timeoutPromise]);
    const suggestions = JSON.parse(response.text);

    return res.json(suggestions);
  } catch (error) {
    console.error("--- BACKEND ERROR ---", error.message);

    const t = req.body.temp;
    const c = req.body.condition;

    return res.json({
      clothing: `Dress appropriately for ${t}°C ${c} weather. Layer up if it's cool, or go light and breathable if it's warm. Don't forget accessories like a hat or umbrella based on conditions.`,
      food_drink: `Stay hydrated and choose meals that complement the weather. Warm soups and teas work well in cold weather, while salads and chilled drinks are great when it's hot. Try to eat fresh, seasonal produce.`,
      activity: `Choose activities that match the weather conditions. If outdoors, plan around the most comfortable time of day. Consider indoor alternatives if the weather is extreme.`,
      health: `Pay attention to your body's response to the temperature. Stay hydrated, protect your skin from UV or cold, and rest if you feel any discomfort. Check air quality if there's high humidity or wind.`,
      travel: `Check road and transit conditions before heading out. Allow extra travel time if visibility is low or weather is severe. Keep your vehicle or bag prepared for the current conditions.`,
      home: `Adjust your home environment to stay comfortable. Open windows for fresh air if the weather is mild, or use heating/cooling as needed. Monitor indoor humidity to keep it in a healthy range.`,
      precautions: `Be aware of any weather-related safety risks. Stay updated on local alerts and avoid exposed areas during severe weather. Keep an emergency kit handy if conditions are extreme.`,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend server running on http://localhost:${PORT}`),
);
