import React from "react";

function Loading() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
      <div className="glass-panel w-full p-10 rounded-3xl shadow-2xl flex flex-col items-center justify-center">
        {/* Animated Loading Icon */}
        <div className="relative w-24 h-24 mb-6">
          {/* Inner pulse */}
          <div className="absolute inset-0 bg-pink-500/10 rounded-full animate-ping"></div>
          {/* Outer spinner */}
          <svg className="w-full h-full text-pink-500 animate-spin" viewBox="0 0 100 100">
            <circle 
              className="opacity-25" 
              cx="50" 
              cy="50" 
              r="40" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 50a46 46 0 0 1 82.2-27.8l-5.7 4.1A39.4 39.4 0 0 0 50 11v-7z" 
            />
          </svg>
          {/* Center icon */}
          <div className="absolute inset-5 bg-slate-900 rounded-full border border-white/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-pink-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707-.707" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white tracking-tight">Gathering weather metrics...</h2>
        <p className="text-xs text-slate-400 font-medium mt-2">Checking atmospheric details & sensor arrays</p>
      </div>
    </div>
  );
}

export default Loading;