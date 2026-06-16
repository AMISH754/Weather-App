import React, { useState } from "react";
import weathericon from "../assets/static/weatherIcon.svg";

function Navbar(props) {
  const [cityName, setCityName] = useState("");

  function handleChange(event) {
    setCityName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (cityName.trim()) {
      props.onWeather(cityName.trim());
    }
  }

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          props.onWeather(null, props.unit, { lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Could not access location. Please check browser location permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/50 backdrop-blur-md border-b border-white/5 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Section */}
        <div 
          onClick={props.onHome}
          className="flex items-center space-x-3 cursor-pointer group transition-all duration-300"
        >
          <div className="bg-gradient-to-tr from-pink-500/20 to-indigo-500/20 p-2 rounded-xl border border-white/10 group-hover:scale-105 group-hover:border-pink-500/30 transition-all duration-300">
            <img 
              src={weathericon} 
              alt="VortexCast Icon" 
              className="w-8 h-8 filter drop-shadow-[0_2px_8px_rgba(236,72,153,0.3)] animate-pulse-slow" 
            />
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-indigo-400 font-display tracking-tight">
            VortexCast
          </span>
        </div>

        {/* Navigation / Actions */}
        <div className="flex items-center space-x-6 flex-1 justify-end w-full sm:w-auto">
          <button 
            onClick={props.onHome} 
            className="text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer hidden md:block"
          >
            Home
          </button>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="relative w-full max-w-sm sm:w-64 md:w-80">
            <div className="relative flex items-center">
              {/* Search Icon */}
              <svg 
                className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                className="w-full pl-10 pr-28 py-2 text-sm bg-slate-950/60 border border-white/10 rounded-xl focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/40 text-slate-100 placeholder-slate-400 transition-all duration-200 outline-none" 
                type="text" 
                placeholder="Search city..." 
                autoComplete="off" 
                value={cityName} 
                onChange={handleChange}
              />
              <div className="absolute right-1 flex items-center space-x-1.5">
                {/* Geolocation Button */}
                <button
                  type="button"
                  onClick={handleLocationClick}
                  title="Use my location"
                  className="p-1 text-slate-400 hover:text-pink-400 transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button 
                  type="submit" 
                  className="px-2.5 py-1 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 rounded-lg hover:from-pink-500 hover:to-rose-400 transition-all duration-200 shadow-md shadow-pink-500/20 active:scale-95 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* C / F Unit Toggle */}
          <div className="flex items-center space-x-0.5 bg-slate-950/40 p-1 rounded-xl border border-white/5">
            <button 
              type="button" 
              onClick={() => props.onToggleUnit("metric")} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${props.unit === "metric" ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25" : "text-slate-400 hover:text-slate-200"}`}
            >
              °C
            </button>
            <button 
              type="button" 
              onClick={() => props.onToggleUnit("imperial")} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${props.unit === "imperial" ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25" : "text-slate-400 hover:text-slate-200"}`}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;