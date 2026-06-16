import React from "react";

const POPULAR_CITIES = [
  { name: "London", country: "UK", icon: "🌧️" },
  { name: "New York", country: "US", icon: "🗽" },
  { name: "Tokyo", country: "JP", icon: "🍣" },
  { name: "Paris", country: "FR", icon: "🗼" },
  { name: "Sydney", country: "AU", icon: "🐨" }
];

function BeforeSearch(props) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-4 py-8 animate-fade-in">
      {/* Welcome Card */}
      <div className="glass-panel w-full p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative ambient blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32"></div>
        
        <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-400 to-indigo-400 font-display tracking-tight mb-4 animate-pulse-slow">
          VortexCast Weather Dashboard
        </h1>
        <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
          Get real-time weather details, dynamic atmosphere conditions, and fluid visual diagnostics for any city around the globe.
        </p>

        {/* Recent Searches (if any) */}
        {props.recentSearches && props.recentSearches.length > 0 && (
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Recently Searched</p>
            <div className="flex flex-wrap justify-center gap-2">
              {props.recentSearches.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => props.onWeather(city)}
                  className="bg-slate-900/50 hover:bg-slate-800/80 hover:border-pink-500/40 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Cities Grid */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Quick Search Popular Cities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {POPULAR_CITIES.map((city) => (
              <div
                key={city.name}
                onClick={() => props.onWeather(city.name)}
                className="glass-panel-light p-4 rounded-2xl border border-white/5 hover:border-pink-500/40 hover:bg-slate-900/40 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center group"
              >
                <span className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">{city.icon}</span>
                <span className="text-sm font-bold text-slate-200 group-hover:text-pink-400 transition-colors duration-200">{city.name}</span>
                <span className="text-xxs text-slate-400 font-medium">{city.country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforeSearch;