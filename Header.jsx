import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles, 
  Bell, 
  X, 
  ExternalLink,
  Flame
} from 'lucide-react';
import { BENGALURU_LOCALITIES, CIVIC_DEPARTMENTS } from '../data/localities';

export default function Header({ 
  selectedLocality, 
  setSelectedLocality, 
  searchQuery, 
  setSearchQuery,
  onOpenNewPost,
  onOpenProfile,
  onOpenHelpline,
  currentUser
}) {
  const [showHelplineModal, setShowHelplineModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto">
          
          {/* Logo & Locality Tag */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-lg">
              ಬೆಂ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1">
                  Namma <span className="text-amber-400">Bengaluru</span>
                </span>
                <span className="text-[10px] uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded">
                  Civic X
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                People's Civic Voice to Bengaluru Government
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search potholes, water cuts, BBMP tickets..."
              className="w-full pl-9 pr-8 py-1.5 bg-slate-900/90 border border-slate-800 rounded-full text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Action Chips & Profile */}
          <div className="flex items-center gap-2">
            
            {/* Locality Selector Dropdown */}
            <div className="relative hidden md:flex items-center">
              <MapPin className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 pointer-events-none" />
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="pl-7 pr-4 py-1.5 bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 rounded-full focus:outline-none focus:border-amber-500 cursor-pointer appearance-none"
              >
                {BENGALURU_LOCALITIES.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} {loc.ward !== 'All Wards' ? `(${loc.ward})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 24x7 Helplines button */}
            <button
              onClick={() => setShowHelplineModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold transition-all"
              title="24x7 Emergency Civic Helplines"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Helplines</span>
            </button>

            {/* Citizen 18+ Verification Pill */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-full transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-amber-500/50"
              />
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-200">
                  <span>{currentUser.name.split(' ')[0]}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-[9px] text-amber-400 font-medium">
                  Karma: {currentUser.karma} pts
                </div>
              </div>
            </button>

          </div>
        </div>
      </header>

      {/* 24x7 Helplines Modal */}
      {showHelplineModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Emergency Bengaluru Helplines</h3>
                  <p className="text-xs text-slate-400">Direct 24x7 Official Contact Desks</p>
                </div>
              </div>
              <button 
                onClick={() => setShowHelplineModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {CIVIC_DEPARTMENTS.map((dept) => (
                <div key={dept.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-amber-400">{dept.name}</span>
                    <p className="text-[11px] text-slate-400">{dept.fullName}</p>
                    <p className="text-xs font-mono text-slate-200 mt-0.5 font-bold">{dept.helpline}</p>
                  </div>
                  <a
                    href={`tel:${dept.helpline.split('/')[0].trim()}`}
                    className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition-all"
                  >
                    Call Now
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowHelplineModal(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
