# VortexCast Weather App

VortexCast is a premium, modern, glassmorphic weather dashboard designed to give you real-time atmospheric diagnostics, coordinates-based tracking, and fluid daily/hourly forecasts.

**Live Demo:** [weather-app-opal-eight-42.vercel.app](https://weather-app-opal-eight-42.vercel.app/)

Built with **React**, **Vite**, and **Tailwind CSS v4**, the application is fully responsive and integrates beautiful local animated weather icons.

---

## Key Features

*   **Dynamic Background Gradients:** The dashboard transitions smoothly between ambient color gradients depending on the weather state of the queried location (e.g., clear day, clear night, overcast clouds, rain, snow, mist).
*   **Premium Glassmorphic UI:** Card overlays styled with subtle translucent borders, shadows, and deep backdrop-blur filters.
*   **Animated Local SVGs:** Mapped static OpenWeatherMap API codes to clean, fluidly animated local SVG vector icons.
*   **5-Day & Hourly Forecasts:**
    *   *Hourly (Next 24h):* A horizontal scrolling row showing times, local weather states, and temperature trends in 3-hour increments.
    *   *5-Day Forecast:* A detailed 5-day summary grid displaying dates, conditions, and high/low temperature bounds.
*   **Geolocation Finder:** Built-in GPS locator button inside the search bar to immediately pull weather metrics for your current location.
*   **Celsius & Fahrenheit Support:** Easily toggle units of temperature, wind speed, and visibility dynamically without reloading the page.
*   **Recent Searches & Quick Links:** Keeps track of your top 5 searched cities (using `localStorage`) and presents popular city cards for quick lookups.

---

## Tech Stack

*   **Core:** React 19, JavaScript (ES6+)
*   **Build Tool:** Vite 7 (extremely fast development and compilation)
*   **Styling:** Tailwind CSS v4 (theme extensions, fluid layouts, keyframe animations)
*   **HTTP Client:** Axios (concurrent API loading for current and forecast requests)
*   **Data Source:** OpenWeatherMap API (Current Weather and 5-Day Forecast endpoints)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/AMISH754/Weather-App.git
```

### 2. Set Up Environment Variables
Create a file named `.env` in the `react+vite` folder:
```env
VITE_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
```

### 3. Install Dependencies
Ensure you are in the project folder containing `package.json` and run:
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser to view the app!

### 5. Build for Production
```bash
npm run build
```
This generates optimized static files inside `react+vite/dist`, ready to deploy to hosting services like Vercel or Netlify.
