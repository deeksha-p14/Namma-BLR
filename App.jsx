import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LocalityFilters from './components/LocalityFilters';
import PostCard from './components/PostCard';
import CreatePostModal from './components/CreatePostModal';
import AICivicChatbot from './components/AICivicChatbot';
import WardLeaderboard from './components/WardLeaderboard';
import UserProfileModal from './components/UserProfileModal';
import OfficialDashboardModal from './components/OfficialDashboardModal';
import AndroidFrameToggle from './components/AndroidFrameToggle';
import { INITIAL_POSTS } from './data/initialPosts';
import { 
  PlusCircle, 
  Flame, 
  Bot, 
  MapPin, 
  Wifi, 
  Battery, 
  Signal, 
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // App view mode: Android mobile frame vs full desktop web view
  const [isAndroidView, setIsAndroidView] = useState(false);

  // Active navigation tab
  const [currentTab, setCurrentTab] = useState('feed'); // 'feed' | 'ai-mitra' | 'trending' | 'wards' | 'official' | 'profile'

  // Grievance Posts state
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Filters & Search
  const [selectedLocality, setSelectedLocality] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOfficialModalOpen, setIsOfficialModalOpen] = useState(false);
  const [isOfficialMode, setIsOfficialMode] = useState(false);

  // Current logged in Citizen Account
  const [currentUser, setCurrentUser] = useState({
    name: 'Kiran Murthy',
    handle: 'kiran_bangalore',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    ward: 'Ward 151 - Koramangala 5th Block',
    karma: 350,
    isAge18Plus: true,
    voterIdVerified: true
  });

  // Filter & Sort Logic
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Tab filter
      if (currentTab === 'trending' && post.amplifies < 100) return false;

      // Locality filter
      if (selectedLocality !== 'all' && post.localityId !== selectedLocality) return false;

      // Department filter
      if (selectedDepartment !== 'ALL' && post.departmentId !== selectedDepartment) return false;

      // Status filter
      if (selectedStatus === 'PENDING' && post.status === 'RESOLVED') return false;
      if (selectedStatus === 'RESOLVED' && post.status !== 'RESOLVED') return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullContent = `${post.title} ${post.body} ${post.localityName} ${post.ticketId} ${post.departmentName} ${post.wardNumber}`.toLowerCase();
        if (!fullContent.includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') return b.amplifies - a.amplifies;
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'agreed') return b.agreedCount - a.agreedCount;
      return 0;
    });
  }, [posts, currentTab, selectedLocality, selectedDepartment, selectedStatus, sortBy, searchQuery]);

  // Counts for status filters
  const counts = useMemo(() => {
    return {
      all: posts.length,
      pending: posts.filter(p => p.status !== 'RESOLVED').length,
      resolved: posts.filter(p => p.status === 'RESOLVED').length
    };
  }, [posts]);

  // Actions
  const handleAmplify = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextState = !p.hasAmplified;
        return {
          ...p,
          hasAmplified: nextState,
          amplifies: nextState ? p.amplifies + 1 : p.amplifies - 1
        };
      }
      return p;
    }));
  };

  const handleAgree = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextState = !p.hasAgreed;
        return {
          ...p,
          hasAgreed: nextState,
          agreedCount: nextState ? p.agreedCount + 1 : p.agreedCount - 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId, text) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: currentUser.name,
      handle: currentUser.handle,
      avatar: currentUser.avatar,
      text: text.trim(),
      createdAt: 'Just now',
      isOfficial: isOfficialMode
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
    setCurrentUser(prev => ({ ...prev, karma: prev.karma + 25 }));
  };

  const handleUpdatePostStatus = (postId, updateData) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          ...updateData
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      
      {/* Top Floating Switcher Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-slate-300">Bengaluru Civic Network: 198 Wards Connected</span>
        </div>
        <AndroidFrameToggle isAndroidView={isAndroidView} setIsAndroidView={setIsAndroidView} />
      </div>

      {/* Main App Container (Android Emulation vs Full Web) */}
      <div className={`flex-1 flex justify-center items-start ${isAndroidView ? 'p-4 sm:p-8 bg-slate-900/60' : ''}`}>
        
        <div className={`w-full transition-all duration-300 ${
          isAndroidView 
            ? 'max-w-[420px] bg-slate-950 rounded-[44px] border-[10px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden min-h-[840px] flex flex-col relative' 
            : 'max-w-7xl'
        }`}>

          {/* Android Status Bar (Only in Android Frame Mode) */}
          {isAndroidView && (
            <div className="bg-slate-950 px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 select-none border-b border-slate-900">
              <span>10:04</span>
              {/* Android Notch / Camera Pill */}
              <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          )}

          {/* App Header */}
          <Header
            selectedLocality={selectedLocality}
            setSelectedLocality={setSelectedLocality}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenNewPost={() => setIsCreateModalOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            currentUser={currentUser}
          />

          {/* Body Layout */}
          <div className="flex-1 flex flex-col md:flex-row">
            
            {/* Sidebar (Twitter-like Navigation) */}
            {!isAndroidView && (
              <Sidebar
                currentTab={currentTab}
                setCurrentTab={(tab) => {
                  if (tab === 'official') setIsOfficialModalOpen(true);
                  else if (tab === 'profile') setIsProfileModalOpen(true);
                  else setCurrentTab(tab);
                }}
                onOpenNewPost={() => setIsCreateModalOpen(true)}
                isOfficialMode={isOfficialMode}
                onToggleOfficialMode={() => setIsOfficialMode(!isOfficialMode)}
              />
            )}

            {/* Main Content Area */}
            <main className="flex-1 p-3 sm:p-5 max-w-3xl mx-auto w-full pb-20 md:pb-8">
              
              {/* Current Tab View Switcher */}
              {currentTab === 'feed' || currentTab === 'trending' ? (
                <>
                  {/* Locality & Department Filters */}
                  <LocalityFilters
                    selectedLocality={selectedLocality}
                    setSelectedLocality={setSelectedLocality}
                    selectedDepartment={selectedDepartment}
                    setSelectedDepartment={setSelectedDepartment}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    counts={counts}
                  />

                  {/* Grievance Feed List */}
                  {filteredPosts.length === 0 ? (
                    <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 my-6 space-y-3">
                      <Sparkles className="w-10 h-10 text-amber-400 mx-auto opacity-70" />
                      <h3 className="font-bold text-slate-200 text-base">No Grievances Found</h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        No civic issues match your current locality or department filter. Click the button below to report a new problem.
                      </p>
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs"
                      >
                        + Report New Issue
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPosts.map((post) => (
                        <PostCard
                          key={post.id}
                          post={post}
                          onAmplify={handleAmplify}
                          onAgree={handleAgree}
                          onAddComment={handleAddComment}
                          currentUser={currentUser}
                          onOpenOfficerUpdate={() => setIsOfficialModalOpen(true)}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : currentTab === 'ai-mitra' ? (
                <AICivicChatbot
                  posts={posts}
                  onSelectLocality={(locId) => {
                    setSelectedLocality(locId);
                    setCurrentTab('feed');
                  }}
                  onOpenNewPost={() => setIsCreateModalOpen(true)}
                />
              ) : currentTab === 'wards' ? (
                <WardLeaderboard posts={posts} />
              ) : null}

            </main>

          </div>

          {/* Android View Bottom Navigation Bar */}
          {isAndroidView && (
            <Sidebar
              currentTab={currentTab}
              setCurrentTab={(tab) => {
                if (tab === 'official') setIsOfficialModalOpen(true);
                else if (tab === 'profile') setIsProfileModalOpen(true);
                else setCurrentTab(tab);
              }}
              onOpenNewPost={() => setIsCreateModalOpen(true)}
              isOfficialMode={isOfficialMode}
              onToggleOfficialMode={() => setIsOfficialMode(!isOfficialMode)}
            />
          )}

        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmitPost={handleCreatePost}
        currentUser={currentUser}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        userPosts={posts.filter(p => p.author.handle === currentUser.handle)}
        isOfficialMode={isOfficialMode}
        setIsOfficialMode={setIsOfficialMode}
      />

      <OfficialDashboardModal
        isOpen={isOfficialModalOpen}
        onClose={() => setIsOfficialModalOpen(false)}
        posts={posts}
        onUpdatePostStatus={handleUpdatePostStatus}
      />

    </div>
  );
}
