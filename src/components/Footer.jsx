import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-slate-950/60 border-t border-white/5 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-200">VortexCast</span>
          <span>•</span>
          <p>© {new Date().getFullYear()} Copyright Reserved, Amish Kumar Dubey</p>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Atmospheric Diagnostics Suite
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;