import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export default function AndroidFrameToggle({ isAndroidView, setIsAndroidView }) {
  return (
    <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg text-xs">
      <span className="text-slate-400 font-medium hidden sm:inline">Preview Mode:</span>
      <button
        onClick={() => setIsAndroidView(true)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
          isAndroidView
            ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>Android App</span>
      </button>
      <button
        onClick={() => setIsAndroidView(false)}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
          !isAndroidView
            ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
            : 'text-slate-300 hover:text-white hover:bg-slate-800'
        }`}
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>Web / Desktop</span>
      </button>
    </div>
  );
}
