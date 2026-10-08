import React, { useState } from 'react';
import { 
  MessageCircle, 
  Repeat2, 
  Heart, 
  BarChart2, 
  Bookmark, 
  Share, 
  MoreHorizontal,
  CheckCircle2,
  Sparkles,
  Send,
  Building2,
  MapPin,
  Clock,
  Eye,
  Wrench,
  Check
} from 'lucide-react';
import { STATUS_TYPES } from '../data/localities';

export default function TweetCard({ 
  post, 
  onAmplify, 
  onAgree, 
  onAddComment, 
  currentUser,
  onOpenOfficerUpdate 
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const statusConfig = STATUS_TYPES[post.status] || STATUS_TYPES.REPORTED;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const shareText = `Bengaluru Civic Issue [${post.ticketId}]: ${post.title} in ${post.localityName}.`;
    if (navigator.share) {
      navigator.share({ title: post.title, text: shareText, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText} - ${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <article className="border-b border-neutral-200 hover:bg-neutral-50/60 transition-colors duration-150 px-4 py-3 cursor-pointer select-none">
      
      <div className="flex gap-3">
        
        {/* Author Avatar */}
        <div className="shrink-0">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Tweet Main Body */}
        <div className="flex-1 min-w-0">
          
          {/* Header Line */}
          <div className="flex items-center justify-between gap-1 leading-tight">
            <div className="flex items-center gap-1 min-w-0 flex-wrap">
              <span className="font-bold text-[15px] text-neutral-900 truncate hover:underline">
                {post.author.name}
              </span>

              {/* Blue Verified Badge */}
              <svg viewBox="0 0 22 22" aria-label="Verified account" role="img" className="w-4 h-4 fill-[#1d9bf0] shrink-0">
                <g>
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.136 2.136 5.48-5.48 1.293 1.302-6.773 6.772z"></path>
                </g>
              </svg>

              <span className="text-neutral-500 text-[15px] truncate">
                @{post.author.handle}
              </span>

              <span className="text-neutral-500 text-[15px]">·</span>

              <span className="text-neutral-500 text-[15px] hover:underline whitespace-nowrap">
                {post.createdAt}
              </span>
            </div>

            {/* Top Right Action Buttons (Grok Icon + Three Dots) */}
            <div className="flex items-center text-neutral-500 shrink-0">
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="p-1.5 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] rounded-full transition-colors"
                title="SuperGrok Details"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
                  <circle cx="12" cy="12" r="9" />
                  <line x1="8" y1="16" x2="16" y2="8" />
                </svg>
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onOpenOfficerUpdate?.(); }}
                className="p-1.5 hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] rounded-full transition-colors"
                title="More actions / Official Desk"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Civic Locality & Dept Tag Strip */}
          <div className="flex flex-wrap items-center gap-1.5 mt-0.5 mb-1 text-xs">
            <span className="font-semibold text-neutral-700 hover:underline">
              {post.localityName} ({post.wardNumber})
            </span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500 font-mono text-[11px]">
              #{post.ticketId}
            </span>
            <span className="text-neutral-400">·</span>
            <span className={`px-2 py-0.2 rounded-full text-[11px] font-semibold border ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>

          {/* Tweet Text */}
          <p className="text-[15px] text-neutral-900 leading-normal whitespace-pre-line mt-1">
            {post.body || post.title}
          </p>

          {/* Tweet Media Container (Matching Screenshot with 0:04 / status tag) */}
          {post.image && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-950 relative group">
              
              {showBeforeAfter && post.afterImage ? (
                <div className="grid grid-cols-2 gap-1 p-1 bg-black">
                  <div className="relative">
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                      Before
                    </span>
                    <img
                      src={post.image}
                      alt="Before"
                      className="w-full h-64 sm:h-80 object-cover rounded-xl"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                      Resolved Proof
                    </span>
                    <img
                      src={post.afterImage}
                      alt="Resolved"
                      className="w-full h-64 sm:h-80 object-cover rounded-xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={post.image}
                    alt="Civic post media"
                    className="w-full max-h-[460px] object-cover"
                  />
                  
                  {/* Bottom-left badge matching "0:04" style in screenshot */}
                  <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 rounded text-xs font-mono font-medium flex items-center gap-1.5">
                    {post.status === 'RESOLVED' ? (
                      <span className="text-emerald-400 font-bold">Resolved ✓</span>
                    ) : (
                      <span>0:04</span>
                    )}
                  </div>

                  {post.afterImage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBeforeAfter(!showBeforeAfter);
                      }}
                      className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm transition-all"
                    >
                      {showBeforeAfter ? 'Show Single' : 'Compare Proof'}
                    </button>
                  )}
                </div>
              )}

            </div>
          )}

          {/* Official Update Box if present */}
          {post.officialUpdate && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Building2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-800">BBMP Official Update: </span>
                <span>{post.officialUpdate}</span>
              </div>
            </div>
          )}

          {/* Twitter Action Bar (Matching screenshot icons and counts) */}
          <div className="flex items-center justify-between text-neutral-500 max-w-md mt-3 pt-1 text-xs">
            
            {/* 1. Comments */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(!showComments);
              }}
              className="flex items-center gap-1.5 hover:text-[#1d9bf0] group transition-colors -ml-1"
            >
              <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10">
                <MessageCircle className="w-4 h-4 stroke-[1.75px]" />
              </div>
              <span>{post.comments.length || 64}</span>
            </button>

            {/* 2. Repost / Retweet / Amplify */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAmplify(post.id);
              }}
              className={`flex items-center gap-1.5 group transition-colors ${
                post.hasAmplified ? 'text-emerald-600 font-semibold' : 'hover:text-emerald-600'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-emerald-50">
                <Repeat2 className="w-4 h-4 stroke-[1.75px]" />
              </div>
              <span>{post.amplifies}</span>
            </button>

            {/* 3. Like / Heart / Agree */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAgree(post.id);
              }}
              className={`flex items-center gap-1.5 group transition-colors ${
                post.hasAgreed ? 'text-rose-600 font-semibold' : 'hover:text-rose-600'
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-rose-50">
                <Heart className={`w-4 h-4 stroke-[1.75px] ${post.hasAgreed ? 'fill-current text-rose-600' : ''}`} />
              </div>
              <span>{post.agreedCount > 500 ? `${(post.agreedCount/1000).toFixed(1)}K` : (post.agreedCount || '2.3K')}</span>
            </button>

            {/* 4. View Analytics */}
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="flex items-center gap-1.5 hover:text-[#1d9bf0] group transition-colors"
            >
              <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10">
                <BarChart2 className="w-4 h-4 stroke-[1.75px]" />
              </div>
              <span>{post.views || '109K'}</span>
            </button>

            {/* 5. Bookmark & Share */}
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBookmarked(!isBookmarked);
                }}
                className={`p-2 rounded-full hover:bg-[#1d9bf0]/10 group transition-colors ${
                  isBookmarked ? 'text-[#1d9bf0]' : 'hover:text-[#1d9bf0]'
                }`}
              >
                <Bookmark className={`w-4 h-4 stroke-[1.75px] ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-[#1d9bf0]/10 hover:text-[#1d9bf0] group transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share className="w-4 h-4 stroke-[1.75px]" />}
              </button>
            </div>

          </div>

          {/* Expandable Comments Drawer */}
          {showComments && (
            <div className="mt-3 pt-3 border-t border-neutral-100 space-y-2 animate-in fade-in">
              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Post your reply..."
                  className="flex-1 bg-[#eff3f4] text-neutral-900 border-none rounded-full px-4 py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1d9bf0]"
                />
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="px-4 py-1.5 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white font-bold rounded-full text-xs"
                >
                  Reply
                </button>
              </form>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="p-2 rounded-xl bg-neutral-100 text-xs space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-neutral-900">
                      <span>{comment.author}</span>
                      <span className="text-[10px] text-neutral-500 font-normal">{comment.createdAt}</span>
                    </div>
                    <p className="text-neutral-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </article>
  );
}
