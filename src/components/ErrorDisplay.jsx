import React from "react";

function ErrorDisplay(props) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
      <div className="glass-panel w-full p-8 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Warning accent top bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 to-amber-500"></div>

        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-400 mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight">Search Issue</h2>
        <p className="text-sm text-slate-300 mt-2 font-medium max-w-xs leading-relaxed">
          {props.errorMessage || "We couldn't retrieve weather details for that city."}
        </p>

        <button 
          onClick={props.onRetry}
          className="mt-6 px-6 py-2.5 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 rounded-xl text-xs font-bold text-white transition-all duration-300 shadow-md shadow-pink-500/15 active:scale-95 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorDisplay;