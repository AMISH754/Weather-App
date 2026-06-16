import { useState } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import axios from "axios";
import Loading from './components/Loading';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from "./components/Footer";
import BeforeSearch from './components/BeforeSearch';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [isCity, setIsCity] = useState(false);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");
  
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem("recent_searches");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  async function fetchWeather(city, currentUnit = unit, coords = null) {
    if (!city && !coords) return;
    try {
      setIsCity(true);
      setError("");
      setLoading(true);
      
      let weatherUrl = "";
      let forecastUrl = "";
      
      if (coords) {
        weatherUrl = `${API_URL}?lat=${coords.lat}&lon=${coords.lon}&units=${currentUnit}&appid=${API_KEY}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=${currentUnit}&appid=${API_KEY}`;
      } else {
        weatherUrl = `${API_URL}?q=${encodeURIComponent(city)}&units=${currentUnit}&appid=${API_KEY}`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=${currentUnit}&appid=${API_KEY}`;
      }
      
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl)
      ]);
      
      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
      
      const cityName = weatherRes.data.name;
      // Update recent searches
      setRecentSearches(prev => {
        const filtered = prev.filter(c => c.toLowerCase() !== cityName.toLowerCase());
        const updated = [cityName, ...filtered].slice(0, 5);
        localStorage.setItem("recent_searches", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("City not found. Try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleUnit = (newUnit) => {
    setUnit(newUnit);
    if (weather) {
      fetchWeather(null, newUnit, weather.coord);
    }
  };

  const handleHome = () => {
    setIsCity(false);
    setWeather(null);
    setForecast(null);
    setError("");
  };

  const getBackgroundClass = (weatherData) => {
    if (!weatherData) return "from-slate-950 via-slate-900 to-indigo-950";
    const main = weatherData.weather[0].main.toLowerCase();
    const icon = weatherData.weather[0].icon;
    const isNight = icon.includes("n");

    if (isNight) {
      return "from-slate-950 via-indigo-950 to-zinc-950";
    }

    switch (main) {
      case "thunderstorm":
        return "from-slate-900 via-zinc-850 to-slate-950";
      case "drizzle":
      case "rain":
        return "from-slate-800 via-slate-900 to-indigo-950";
      case "snow":
        return "from-blue-900 via-slate-800 to-sky-950";
      case "clear":
        return "from-sky-400 via-blue-500 to-indigo-600";
      case "clouds":
        return "from-slate-700 via-slate-800 to-slate-900";
      default:
        return "from-zinc-800 via-stone-850 to-zinc-900";
    }
  };

  const bgClass = getBackgroundClass(weather);

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${bgClass} transition-all duration-1000 ease-in-out text-slate-100`}>
      <Navbar onWeather={fetchWeather} unit={unit} onToggleUnit={handleToggleUnit} onHome={handleHome} />
      
      <main className="flex-1 flex flex-col justify-center items-center py-6 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        {!isCity && <BeforeSearch onWeather={fetchWeather} recentSearches={recentSearches} />}
        {loading && <Loading />}
        {error && <ErrorDisplay errorMessage={error} onRetry={() => weather ? fetchWeather(null, unit, weather.coord) : setIsCity(false)} />}
        {weather && !loading && (
          <Body 
            weather={weather} 
            forecast={forecast}
            unit={unit} 
            recentSearches={recentSearches} 
            onWeather={fetchWeather} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
