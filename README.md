# 🌦️ Weather Forecast — AI-Powered Weather App

A full-stack weather application that provides **real-time weather information** along with **AI-powered lifestyle recommendations** based on the weather conditions of any searched city.

The application combines weather data from the **OpenWeatherMap API** with **Google Gemini AI** to provide useful and personalized recommendations for clothing, food, activities, health, travel, home environment, and safety.

---

## ✨ Features

### 🌡️ Real-Time Weather Information

Search for any city and get current weather information, including:

* Temperature
* Feels-like temperature
* High and low temperature
* Humidity
* Wind speed
* Visibility
* Weather condition
* Weather-specific emoji

### 👕 Smart Outfit Recommendations

The application analyzes the temperature and weather condition using frontend rules and recommends suitable clothing.

Recommendations can include:

* Tops
* Layers
* Bottoms
* Shoes
* Accessories

### 🤖 AI Lifestyle Guide

The application uses **Google Gemini AI** to generate weather-specific lifestyle recommendations across 7 categories:

* 👕 What to Wear
* 🍲 Food & Drinks
* 🏃 Activities
* ❤️ Health Tips
* 🚗 Travel & Commute
* 🏠 Home Environment
* ⚠️ Safety Precautions

The recommendations are dynamically generated according to the weather conditions of the selected city.

### 🔐 Secure AI API Integration

The Gemini API is accessed through the **Node.js/Express backend** instead of directly from the frontend.

This helps prevent exposing the Gemini API key in the client-side application.

### 🎨 Responsive & Interactive UI

* Responsive design
* Modern card-based interface
* Smooth animations
* Weather-specific visual elements
* Interactive search experience

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React

### Backend

* Node.js
* Express.js

### APIs

* OpenWeatherMap API
* Google Gemini API
---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ROHANNAGRE18/Weather-Forecast.git
```

Navigate into the project:

```bash
cd Weather-Forecast
```

---

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` directory and add your OpenWeatherMap API key:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

Start the development server:

```bash
npm run dev
```

---

## ⚙️ Backend Setup

Open another terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

If your backend does not use a development script, you can start it with:

```bash
npm start
```

---

## 🔑 API Keys

This project requires API keys from:

### OpenWeatherMap

Used to retrieve real-time weather information.

### Google Gemini

Used to generate personalized lifestyle recommendations.

**Never commit your `.env` files or API keys to GitHub.**

Make sure your `.gitignore` contains:

```text
.env
.env.local
node_modules/
```

---

## 🔄 How It Works

```text
User enters a city
        ↓
Frontend sends request to OpenWeatherMap
        ↓
Real-time weather data is received
        ↓
Weather information is displayed
        ↓
Frontend determines outfit recommendations
        ↓
Backend receives weather information
        ↓
Backend sends prompt to Gemini API
        ↓
Gemini generates lifestyle recommendations
        ↓
AI recommendations are displayed to the user
```

---

## 📸 Application Flow

1. Open the application.
2. Enter a city name in the search bar.
3. Search for the city.
4. View real-time weather information.
5. View recommended outfits based on the weather.
6. Get AI-generated lifestyle recommendations.

---

## 🎯 Learning Outcomes

This project helped in understanding and implementing:

* React component architecture
* React state management
* REST API integration
* Frontend-backend communication
* Node.js and Express.js
* Environment variables
* API security
* AI API integration
* Responsive UI development
* Third-party API handling
* Dynamic weather-based logic
---

## 👨‍💻 Author

**Rohan Nagre**

GitHub: [@ROHANNAGRE18](https://github.com/ROHANNAGRE18)

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub!
