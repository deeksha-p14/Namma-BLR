import React from 'react';
import { 
  Home, 
  Search, 
  Bell, 
  UserPlus, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  Bookmark, 
  BarChart2, 
  FileText, 
  User, 
  MoreHorizontal,
  Feather
} from 'lucide-react';

export default function TwitterLeftSidebar({ 
  currentTab, 
  setCurrentTab, 
  onOpenNewPost, 
  currentUser,
  onOpenProfile
}) {
  const navItems = [
    { id: 'feed', label: 'Home', icon: Home, activeIcon: Home, count: null },
    { id: 'explore', label: 'Explore', icon: Search, activeIcon: Search, count: null },
    { id: 'notifications', label: 'Notifications', icon: Bell, activeIcon: Bell, count: 2 },
    { id: 'follow', label: 'Follow', icon: UserPlus, activeIcon: UserPlus, count: null },
    { id: 'chat', label: 'Chat', icon: Mail, activeIcon: Mail, count: null },
    { id: 'ai-mitra', label: 'SuperGrok', icon: Sparkles, activeIcon: Sparkles, badge: 'AI', isGrok: true },
    { id: 'premium', label: 'Premium+', icon: ShieldCheck, activeIcon: ShieldCheck, count: null },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, activeIcon: Bookmark, count: null },
    { id: 'wards', label: 'Creator Studio', icon: BarChart2, activeIcon: BarChart2, count: null },
    { id: 'articles', label: 'Articles', icon: FileText, activeIcon: FileText, count: null },
    { id: 'profile', label: 'Profile', icon: User, activeIcon: User, count: null },
  ];

  return (
    <aside className="w-[245px] xl:w-[275px] h-screen sticky top-0 flex flex-col justify-between px-3 py-2 border-r border-neutral-200 select-none bg-white z-20">
      <div className="flex flex-col gap-1">
        
        {/* X / Namma Bengaluru Logo */}
        <div className="px-3 py-2 flex items-center justify-between">
          <button 
            onClick={() => setCurrentTab('feed')}
            className="w-11 h-11 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors -ml-1 text-black"
          >
            {/* Exact X Logo SVG */}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-7 h-7 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'profile') onOpenProfile();
                  else setCurrentTab(item.id);
                }}
                className={`flex items-center gap-4 px-3 py-2.5 rounded-full text-xl hover:bg-neutral-100 transition-colors w-fit group ${
                  isActive ? 'font-bold text-neutral-900' : 'font-normal text-neutral-800'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px] text-black' : 'stroke-[1.75px] text-neutral-800'}`} />
                  {item.count && (
                    <span className="absolute -top-1.5 -right-2 bg-[#1d9bf0] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                      {item.count}
                    </span>
                  )}
                </div>
                <span className="text-[19px] pr-2 tracking-tight">{item.label}</span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-4 px-3 py-2.5 rounded-full text-xl hover:bg-neutral-100 transition-colors w-fit text-neutral-800"
          >
            <div className="w-6 h-6 rounded-full border border-neutral-800 flex items-center justify-center text-xs">
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="text-[19px] pr-2 tracking-tight">More</span>
          </button>
        </nav>

        {/* Main Post Button */}
        <div className="mt-3 px-1">
          <button
            onClick={onOpenNewPost}
            className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3.5 px-6 rounded-full text-[17px] shadow-sm transition-all transform active:scale-[0.98] flex items-center justify-center"
          >
            <span>Post</span>
          </button>
        </div>

      </div>

      {/* User Account Card at Bottom */}
      <div className="mb-2">
        <button
          onClick={onOpenProfile}
          className="w-full flex items-center justify-between p-2.5 rounded-full hover:bg-neutral-100 transition-colors group"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div className="text-left truncate">
              <div className="font-bold text-sm text-neutral-900 truncate leading-tight">
                {currentUser.name}
              </div>
              <div className="text-neutral-500 text-xs truncate">
                @{currentUser.handle}
              </div>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-neutral-500 shrink-0 mr-1" />
        </button>
      </div>

    </aside>
  );
}
