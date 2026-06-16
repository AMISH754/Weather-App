import React from "react";

// Import local animated weather SVG icons
import dayIcon from "../assets/animated/day.svg";
import nightIcon from "../assets/animated/night.svg";
import cloudyDay1 from "../assets/animated/cloudy-day-1.svg";
import cloudyNight1 from "../assets/animated/cloudy-night-1.svg";
import cloudyDay3 from "../assets/animated/cloudy-day-3.svg";
import cloudyNight3 from "../assets/animated/cloudy-night-3.svg";
import cloudy from "../assets/animated/cloudy.svg";
import rainy1 from "../assets/animated/rainy-1.svg";
import rainy3 from "../assets/animated/rainy-3.svg";
import rainy5 from "../assets/animated/rainy-5.svg";
import rainy6 from "../assets/animated/rainy-6.svg";
import snowy6 from "../assets/animated/snowy-6.svg";
import thunder from "../assets/animated/thunder.svg";
import weatherDefault from "../assets/animated/weather.svg";
import sunsetIcon from "../assets/animated/weather_sunset.svg";

function Body(props) {
  const { weather, forecast, unit, recentSearches, onWeather } = props;

  // Group forecast list by local day and extract min/max and icon
  const getDailyForecast = (list) => {
    if (!list) return [];
    const daysMap = {};
    list.forEach(item => {
      // Adjust Unix time to city timezone for date calculations
      const date = new Date((item.dt + weather.timezone) * 1000);
      const dayKey = date.getUTCDay();
      if (!daysMap[dayKey]) {
        daysMap[dayKey] = [];
      }
      daysMap[dayKey].push(item);
    });
    
    const result = [];
    const orderedKeys = Object.keys(daysMap);
    
    orderedKeys.forEach(key => {
      const items = daysMap[key];
      let maxTemp = -999;
      let minTemp = 999;
      items.forEach(item => {
        if (item.main.temp_max > maxTemp) maxTemp = item.main.temp_max;
        if (item.main.temp_min < minTemp) minTemp = item.main.temp_min;
      });
      
      const representativeItem = items[Math.floor(items.length / 2)];
      const dateObj = new Date((representativeItem.dt + weather.timezone) * 1000);
      
      result.push({
        dayName: dateObj.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
        dateStr: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
        max: Math.round(maxTemp),
        min: Math.round(minTemp),
        icon: representativeItem.weather[0].icon,
        description: representativeItem.weather[0].description
      });
    });
    return result.slice(0, 5);
  };

  const dailyForecast = forecast ? getDailyForecast(forecast.list) : [];
  const hourlyForecast = forecast ? forecast.list.slice(0, 8) : [];

  // Map icon codes to local animated SVGs
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
        return dayIcon;
      case "01n":
        return nightIcon;
      case "02d":
        return cloudyDay1;
      case "02n":
        return cloudyNight1;
      case "03d":
        return cloudyDay3;
      case "03n":
        return cloudyNight3;
      case "04d":
      case "04n":
        return cloudy;
      case "09d":
      case "09n":
        return rainy6;
      case "10d":
        return rainy1;
      case "10n":
        return rainy5;
      case "11d":
      case "11n":
        return thunder;
      case "13d":
      case "13n":
        return snowy6;
      case "50d":
      case "50n":
        return cloudy;
      default:
        return weatherDefault;
    }
  };

  const isMetric = unit === "metric";
  const tempUnit = isMetric ? "°C" : "°F";
  const windUnit = isMetric ? "m/s" : "mph";

  // Formats UTC timestamp using city timezone offset to get local time of that city
  const formatCityTime = (timestamp, offsetSec) => {
    const d = new Date((timestamp + offsetSec) * 1000);
    const hours = d.getUTCHours();
    const minutes = d.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hr = hours % 12 || 12;
    const min = minutes.toString().padStart(2, "0");
    return `${hr}:${min} ${ampm}`;
  };

  // Gets the city's current local date
  const getCityDate = (offsetSec) => {
    const utcDate = new Date();
    // Offset in milliseconds
    const cityTime = new Date(utcDate.getTime() + offsetSec * 1000 + utcDate.getTimezoneOffset() * 60000);
    return cityTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric"
    });
  };

  const mainWeather = weather.weather[0];
  const animatedIcon = getWeatherIcon(mainWeather.icon);

  // Derive extra details
  const humidityRating = (h) => {
    if (h < 30) return "Dry & Crisp";
    if (h <= 60) return "Comfortable";
    return "Sticky / Humid";
  };

  const visibilityVal = isMetric 
    ? (weather.visibility / 1000).toFixed(1) + " km" 
    : (weather.visibility / 1609.34).toFixed(1) + " mi";

  const visibilityRating = (v) => {
    const meters = v || 10000;
    if (meters > 9000) return "Perfect";
    if (meters > 5000) return "Clear";
    if (meters > 2000) return "Moderate Haze";
    return "Poor Visibility";
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-4 px-2 sm:px-4 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Primary Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[440px]">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-16 -mb-16 animate-pulse-slow"></div>

            {/* Top Row: Date & Temperature */}
            <div className="relative z-10">
              <span className="bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/5 uppercase tracking-wider">
                Current Weather
              </span>
              <div className="mt-6">
                <h1 className="text-3xl font-black tracking-tight text-white">{weather.name}</h1>
                <p className="text-sm font-semibold text-slate-300 mt-1">{getCityDate(weather.timezone)}</p>
              </div>
            </div>

            {/* Middle Row: Temperature & Animated Icon */}
            <div className="flex items-center justify-between my-8 relative z-10">
              <div>
                <span className="text-6xl md:text-7xl font-extrabold tracking-tighter text-white font-display flex">
                  {Math.round(weather.main.temp)}
                  <span className="text-4xl md:text-5xl font-medium text-pink-400 mt-1">{tempUnit}</span>
                </span>
                <p className="text-lg md:text-xl font-bold text-slate-200 capitalize mt-2 flex items-center gap-2">
                  {mainWeather.description}
                </p>
                <div className="flex items-center gap-3 mt-3 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    H: {Math.round(weather.main.temp_max)}°
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    L: {Math.round(weather.main.temp_min)}°
                  </span>
                </div>
              </div>
              <div className="relative">
                <img
                  src={animatedIcon}
                  alt={mainWeather.description}
                  className="w-32 h-32 md:w-36 md:h-36 filter drop-shadow-[0_8px_16px_rgba(255,255,255,0.08)] animate-float"
                />
              </div>
            </div>

            {/* Bottom Row: Recent Searches */}
            {recentSearches && recentSearches.length > 0 && (
              <div className="border-t border-white/10 pt-4 mt-2 relative z-10">
                <p className="text-xxs font-extrabold text-slate-400 uppercase tracking-widest mb-2">Jump back to</p>
                <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto no-scrollbar">
                  {recentSearches.slice(0, 3).map((city, idx) => (
                    <button
                      key={idx}
                      onClick={() => onWeather(city)}
                      className="bg-slate-950/40 hover:bg-slate-900/60 border border-white/5 hover:border-pink-500/20 px-2.5 py-1 rounded-lg text-xxs font-bold text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Grid of Metrics */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4">
          
          {/* Card 1: Feels Like */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-pink-500/20 hover:bg-slate-900/25 transition-all duration-300 group flex flex-col justify-between h-[160px]">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Feels Like</span>
              <svg className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-display">
                {Math.round(weather.main.feels_like)}°
              </span>
              <p className="text-xs font-medium text-slate-300 mt-2">
                {weather.main.feels_like > weather.main.temp ? "Feels warmer than actual." : weather.main.feels_like < weather.main.temp ? "Feels cooler than actual." : "Feels same as actual."}
              </p>
            </div>
          </div>

          {/* Card 2: Wind */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-pink-500/20 hover:bg-slate-900/25 transition-all duration-300 group flex flex-col justify-between h-[160px]">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Wind</span>
              <div className="flex items-center gap-1 text-sky-400">
                {/* Wind direction arrow */}
                <svg 
                  className="w-4 h-4 transition-transform duration-700 ease-out" 
                  style={{ transform: `rotate(${weather.wind.deg || 0}deg)` }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707-.707" /></svg>
              </div>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-display">
                {weather.wind.speed} <span className="text-lg font-medium text-slate-400">{windUnit}</span>
              </span>
              <p className="text-xs font-medium text-slate-300 mt-2">
                Direction: {weather.wind.deg || 0}°
              </p>
            </div>
          </div>

          {/* Card 3: Humidity */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-pink-500/20 hover:bg-slate-900/25 transition-all duration-300 group flex flex-col justify-between h-[160px]">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Humidity</span>
              <svg className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-display">
                {weather.main.humidity}%
              </span>
              <p className="text-xs font-medium text-slate-300 mt-2">
                Status: {humidityRating(weather.main.humidity)}
              </p>
            </div>
          </div>

          {/* Card 4: Pressure */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-pink-500/20 hover:bg-slate-900/25 transition-all duration-300 group flex flex-col justify-between h-[160px]">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Pressure</span>
              <svg className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-display">
                {weather.main.pressure} <span className="text-base font-semibold text-slate-400">hPa</span>
              </span>
              <p className="text-xs font-medium text-slate-300 mt-2">
                {weather.main.pressure > 1013 ? "High pressure system." : weather.main.pressure < 1009 ? "Low pressure system." : "Standard pressure."}
              </p>
            </div>
          </div>

          {/* Card 5: Clouds */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-pink-500/20 hover:bg-slate-900/25 transition-all duration-300 group flex flex-col justify-between h-[160px]">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Clouds</span>
              <svg className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
            </div>
            <div className="my-2">
              <span className="text-3xl font-extrabold tracking-tight text-white font-display">
                {weather.clouds.all}%
              </span>
              <p className="text-xs font-medium text-slate-300 mt-2">
                Visibility: {visibilityRating(weather.visibility)} ({visibilityVal})
              </p>
            </div>
          </div>

          {/* Card 6: Sunrise & Sunset */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-pink-500/20 hover:bg-slate-900/25 transition-all duration-300 group flex flex-col justify-between h-[160px] relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider">Sun Phase</span>
              <img src={sunsetIcon} alt="Sun Phase" className="w-6 h-6 animate-pulse-slow filter invert brightness-200" />
            </div>
            <div className="flex flex-col gap-1.5 my-1.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xxs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                  <span className="text-amber-400 font-semibold">↑</span> Sunrise
                </span>
                <span className="text-xs font-extrabold text-white">
                  {formatCityTime(weather.sys.sunrise, weather.timezone)}
                </span>
              </div>
              <div className="w-full h-px bg-white/10 my-0.5"></div>
              <div className="flex items-center justify-between">
                <span className="text-xxs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                  <span className="text-indigo-400 font-semibold">↓</span> Sunset
                </span>
                <span className="text-xs font-extrabold text-white">
                  {formatCityTime(weather.sys.sunset, weather.timezone)}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Forecast Sections */}
      {forecast && (
        <div className="mt-8 flex flex-col gap-6 w-full relative z-10">
          
          {/* Hourly Forecast Card */}
          <div className="glass-panel p-6 rounded-3xl relative overflow-hidden shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-pink-400 animate-pulse-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hourly Forecast (Next 24 Hours)
            </h3>
            <div className="flex overflow-x-auto gap-4 pb-2 pt-1 no-scrollbar scroll-smooth">
              {hourlyForecast.map((item, idx) => (
                <div 
                  key={idx}
                  className="glass-panel-light flex-shrink-0 w-24 py-4 rounded-2xl border border-white/5 hover:border-pink-500/20 hover:bg-slate-900/40 transition-all duration-300 flex flex-col items-center justify-between text-center"
                >
                  <span className="text-xxs font-bold text-slate-400">
                    {formatCityTime(item.dt, weather.timezone)}
                  </span>
                  <img
                    src={getWeatherIcon(item.weather[0].icon)}
                    alt={item.weather[0].description}
                    className="w-12 h-12 my-2 animate-float"
                  />
                  <span className="text-base font-extrabold text-white font-display">
                    {Math.round(item.main.temp)}°
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Day Forecast Card */}
          <div className="glass-panel p-6 rounded-3xl relative overflow-hidden shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              5-Day Weather Forecast
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {dailyForecast.map((dayData, idx) => (
                <div 
                  key={idx}
                  className="glass-panel-light p-4 rounded-2xl border border-white/5 hover:border-pink-500/20 hover:bg-slate-900/40 transition-all duration-300 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-center gap-3"
                >
                  <div className="text-left sm:text-center">
                    <p className="text-sm font-extrabold text-white">{dayData.dayName}</p>
                    <p className="text-xxs font-semibold text-slate-400 mt-0.5">{dayData.dateStr}</p>
                  </div>
                  <img
                    src={getWeatherIcon(dayData.icon)}
                    alt={dayData.description}
                    className="w-12 h-12 sm:my-1 animate-float"
                  />
                  <div className="text-right sm:text-center">
                    <p className="text-xxs font-bold text-slate-300 capitalize max-w-[90px] overflow-hidden text-ellipsis whitespace-nowrap hidden sm:block">
                      {dayData.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1 justify-end sm:justify-center text-xs font-bold">
                      <span className="text-rose-400">{dayData.max}°</span>
                      <span className="text-slate-500 font-normal">|</span>
                      <span className="text-sky-400">{dayData.min}°</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default Body;