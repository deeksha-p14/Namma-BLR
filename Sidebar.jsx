import React from 'react';
import { 
  Home, 
  Bot, 
  Flame, 
  BarChart3, 
  User, 
  PlusCircle, 
  ShieldAlert, 
  Building2,
  Sparkles,
  Award
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  onOpenNewPost, 
  unreadBotCount = 0,
  isOfficialMode = false,
  onToggleOfficialMode
}) {
  const navItems = [
    { id: 'feed', label: 'Civic Feed', icon: Home, kannada: 'ಮುಖಪುಟ' },
    { id: 'ai-mitra', label: 'Namma Mitra AI', icon: Bot, badge: 'AI Bot', special: true, kannada: 'ನಮ್ಮ ಮಿತ್ರ' },
    { id: 'trending', label: 'Critical / Trending', icon: Flame, kannada: 'ಟ್ರೆಂಡಿಂಗ್' },
    { id: 'wards', label: 'Ward Analytics', icon: BarChart3, kannada: 'ವಾರ್ಡ್ ಅಂಕಿಅಂಶ' },
    { id: 'official', label: isOfficialMode ? 'Official Portal (BBMP)' : 'Gov Desk View', icon: Building2, highlight: true },
    { id: 'profile', label: 'Citizen Profile', icon: User, kannada: 'ನನ್ನ ಖಾತೆ' },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="w-64 p-4 border-r border-slate-800/80 hidden md:flex flex-col justify-between h-[calc(100vh-61px)] sticky top-[61px] bg-slate-950/60 backdrop-blur-md">
        <div className="space-y-6">
          
          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : item.special ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      isActive 
                        ? 'bg-slate-950 text-amber-400' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* New Grievance Button (Twitter Tweet Style) */}
          <button
            onClick={onOpenNewPost}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Post Grievance</span>
          </button>
        </div>

        {/* Civic Karma & AI Moderation Info Card */}
        <div className="p-3.5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              AI Guard Active
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
              Live Safe
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            All posts are pre-scanned by AI to prevent harassment and auto-tag BBMP, BESCOM & BWSSB engineers.
          </p>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300 font-medium">
            <span>Citizenship:</span>
            <span className="text-amber-400 font-bold">18+ Bengaluru</span>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Android Native App Bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 px-3 py-2 flex items-center justify-around shadow-2xl">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all relative ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400 scale-110' : ''} transition-transform`} />
                {item.id === 'ai-mitra' && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
              <span className="text-[10px] font-medium leading-none">
                {item.id === 'ai-mitra' ? 'Namma AI' : item.id === 'trending' ? 'Trending' : item.id === 'wards' ? 'Wards' : item.id === 'official' ? 'Gov Desk' : 'Feed'}
              </span>
            </button>
          );
        })}

        {/* Mobile Floating Action Button */}
        <button
          onClick={onOpenNewPost}
          className="w-11 h-11 -mt-5 bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40 border-2 border-slate-950 transform active:scale-90"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </nav>
    </>
  );
}
