import React, { useState } from 'react';
import { 
  Search, 
  X, 
  MoreHorizontal, 
  Sparkles, 
  Mail,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function TwitterRightSidebar({ 
  searchQuery, 
  setSearchQuery, 
  onOpenGrok, 
  onSelectLocality 
}) {
  const [showNewsCard, setShowNewsCard] = useState(true);
  const [followedState, setFollowedState] = useState({});

  const toggleFollow = (id) => {
    setFollowedState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const trendingItems = [
    { category: 'Politics · Trending', tag: '#SOTU2026', posts: '184K posts' },
    { category: 'Politics · Trending', tag: 'State of the Union', sub: 'Trending with Haley Robson, U.S. Capitol' },
    { category: 'Sports · Trending', tag: 'Oweh', posts: '12.4K posts' },
    { category: 'Politics · Trending', tag: 'Al Green', posts: '45.1K posts' },
    { category: 'Bengaluru · Civic', tag: '#Fix100FtRoad', sub: 'Trending with BBMP, Koramangala' },
  ];

  const whoToFollow = [
    {
      id: 'memes',
      name: 'Low Quality Memes 🎭',
      handle: '@ipostlqmemes',
      avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'bbmp',
      name: 'BBMP Official Desk',
      handle: '@bbmpofficial',
      avatar: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150&auto=format&fit=crop&q=80',
      isVerified: true
    },
    {
      id: 'bescom',
      name: 'BESCOM 24x7 Helpline',
      handle: '@bescom_karnataka',
      avatar: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=150&auto=format&fit=crop&q=80',
      isVerified: true
    }
  ];

  return (
    <aside className="w-[320px] xl:w-[350px] hidden lg:flex flex-col gap-3.5 px-4 py-2 select-none">
      
      {/* Search Bar */}
      <div className="sticky top-0 bg-white pt-1 pb-2 z-10">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-neutral-500 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#eff3f4] text-neutral-900 placeholder-neutral-500 pl-11 pr-4 py-2.5 rounded-full text-sm font-normal focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1d9bf0] focus:border-[#1d9bf0] border border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 rounded-full bg-neutral-400 hover:bg-neutral-600 text-white"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Today's News Card (Matching Screenshot) */}
      {showNewsCard && (
        <div className="bg-[#f7f9f9] border border-neutral-100 rounded-2xl p-4 relative space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
              Today’s News
            </h3>
            <button
              onClick={() => setShowNewsCard(false)}
              className="p-1 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* News Item 1 */}
          <div className="space-y-1 cursor-pointer group">
            <h4 className="font-bold text-sm text-neutral-900 leading-snug group-hover:underline">
              Dark Web Epstein Files Leak Rumor Spreads Before Trump's State of the Union
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-white" />
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 border border-white" />
                <div className="w-3.5 h-3.5 rounded-full bg-neutral-800 border border-white" />
              </div>
              <span>3 hours ago · News · 15.7K posts</span>
            </div>
          </div>

          {/* News Item 2 */}
          <div className="space-y-1 cursor-pointer group pt-1">
            <h4 className="font-bold text-sm text-neutral-900 leading-snug group-hover:underline">
              NYPD Hunts Suspects After Officers Hurt in Washington Square Park Snow Assault
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-white" />
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border border-white" />
              </div>
              <span>2 hours ago · News · 49K posts</span>
            </div>
          </div>

          {/* News Item 3 */}
          <div className="space-y-1 cursor-pointer group pt-1">
            <h4 className="font-bold text-sm text-neutral-900 leading-snug group-hover:underline">
              Martin Short’s Daughter Katherine Dies at 42 in Apparent Suicide
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 border border-white" />
                <div className="w-3.5 h-3.5 rounded-full bg-pink-500 border border-white" />
              </div>
              <span>6 hours ago · Entertainment · 20.9K posts</span>
            </div>
          </div>
        </div>
      )}

      {/* What's happening Card (Matching Screenshot) */}
      <div className="bg-[#f7f9f9] border border-neutral-100 rounded-2xl p-4 space-y-3">
        <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
          What’s happening
        </h3>

        <div className="space-y-3.5">
          {trendingItems.map((item, index) => (
            <div key={index} className="flex items-start justify-between cursor-pointer group">
              <div>
                <span className="text-xs text-neutral-500 block">{item.category}</span>
                <span className="font-bold text-sm text-neutral-900 block group-hover:underline">
                  {item.tag}
                </span>
                {item.sub && (
                  <span className="text-xs text-neutral-500 block">{item.sub}</span>
                )}
                {item.posts && (
                  <span className="text-xs text-neutral-500 block">{item.posts}</span>
                )}
              </div>
              <button className="text-neutral-500 hover:text-neutral-800 p-1 hover:bg-neutral-200 rounded-full">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button className="text-sm text-[#1d9bf0] hover:underline font-normal pt-1 block">
          Show more
        </button>
      </div>

      {/* Who to follow Card (Matching Screenshot) */}
      <div className="bg-[#f7f9f9] border border-neutral-100 rounded-2xl p-4 space-y-3.5">
        <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
          Who to follow
        </h3>

        <div className="space-y-3">
          {whoToFollow.map((account) => {
            const isFollowed = followedState[account.id];

            return (
              <div key={account.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={account.avatar}
                    alt={account.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="truncate">
                    <div className="font-bold text-sm text-neutral-900 truncate hover:underline cursor-pointer flex items-center gap-1 leading-tight">
                      <span>{account.name}</span>
                    </div>
                    <div className="text-neutral-500 text-xs truncate">
                      {account.handle}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollow(account.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    isFollowed
                      ? 'border border-neutral-300 bg-white text-neutral-900 hover:border-red-400 hover:text-red-500'
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Buttons (Grok & Message Icons Bottom Right) */}
      <div className="fixed bottom-6 right-6 hidden md:flex flex-col gap-3 z-30">
        <button
          onClick={onOpenGrok}
          className="w-13 h-13 bg-white border border-neutral-200 rounded-2xl shadow-xl hover:bg-neutral-50 flex items-center justify-center transition-all transform hover:scale-105"
          title="SuperGrok / Namma Mitra AI"
        >
          {/* Grok Slash Icon */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2 text-black">
            <circle cx="12" cy="12" r="9" />
            <line x1="8" y1="16" x2="16" y2="8" />
          </svg>
        </button>

        <button
          className="w-13 h-13 bg-white border border-neutral-200 rounded-2xl shadow-xl hover:bg-neutral-50 flex items-center justify-center transition-all transform hover:scale-105"
          title="Messages"
        >
          <Mail className="w-6 h-6 text-black" />
        </button>
      </div>

    </aside>
  );
}
