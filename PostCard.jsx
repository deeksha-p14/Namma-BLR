import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Share2, 
  MessageSquare, 
  Flame, 
  Users, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Wrench, 
  Building2, 
  AlertTriangle,
  Send,
  Check,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from 'lucide-react';
import { STATUS_TYPES } from '../data/localities';

export default function PostCard({ 
  post, 
  onAmplify, 
  onAgree, 
  onAddComment,
  currentUser,
  onOpenOfficerUpdate
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const statusConfig = STATUS_TYPES[post.status] || STATUS_TYPES.REPORTED;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    const text = `Bengaluru Civic Grievance [${post.ticketId}]: ${post.title} in ${post.localityName}. Track on Namma Bengaluru Civic Voice.`;
    if (navigator.share) {
      navigator.share({ title: post.title, text: text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} - ${window.location.href}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <article className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 mb-4 shadow-sm hover:border-slate-700/80 transition-all">
      
      {/* Top Header: Author Info & Status Tag */}
      <div className="flex items-start justify-between gap-2">
        
        {/* Author Avatar & Meta */}
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover border border-amber-500/40 shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-bold text-slate-100 text-sm">{post.author.name}</span>
              <span className="text-xs text-slate-400">@{post.author.handle}</span>
              
              {/* Citizen 18+ Verification */}
              <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-full font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>18+ Citizen</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 text-amber-400/90 font-medium">
                <MapPin className="w-3 h-3 text-amber-400" />
                {post.localityName} ({post.wardNumber})
              </span>
              <span>•</span>
              <span>{post.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex flex-col items-end gap-1">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConfig.color}`}>
            {post.status === 'RESOLVED' && <CheckCircle2 className="w-3.5 h-3.5" />}
            {post.status === 'IN_PROGRESS' && <Wrench className="w-3.5 h-3.5" />}
            {post.status === 'ACKNOWLEDGED' && <Eye className="w-3.5 h-3.5" />}
            {post.status === 'REPORTED' && <Clock className="w-3.5 h-3.5" />}
            <span>{statusConfig.label}</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 font-medium">
            #{post.ticketId}
          </span>
        </div>

      </div>

      {/* AI Content Guard & Department Badge Strip */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold border border-slate-700/60">
          <Building2 className="w-3 h-3 text-amber-400" />
          {post.departmentName}
        </span>

        {/* AI Moderation Badge */}
        {post.aiModerationPassed && (
          <span className="inline-flex items-center gap-1 text-[11px] bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-md font-medium border border-indigo-500/20">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            AI Guard: Verified (Score {post.aiSafetyScore}%)
          </span>
        )}

        {/* Severity Tag */}
        {post.severity && (
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
            post.severity.includes('High') || post.severity.includes('Critical')
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
          }`}>
            {post.severity}
          </span>
        )}
      </div>

      {/* Post Title & Text Body */}
      <div className="mt-3 space-y-1.5">
        <h3 className="text-base font-bold text-slate-100 leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
          {post.body}
        </p>
      </div>

      {/* Post Images & Before/After Comparison */}
      {post.image && (
        <div className="mt-3.5 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative group">
          
          {post.afterImage && (
            <div className="flex items-center justify-between p-2 bg-slate-900 border-b border-slate-800 text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Work Resolved & Evidence Uploaded
              </span>
              <button
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-medium"
              >
                {showBeforeAfter ? 'Show Before Only' : 'Compare Before vs After'}
              </button>
            </div>
          )}

          {showBeforeAfter && post.afterImage ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-1 bg-slate-900">
              <div>
                <span className="text-[10px] font-bold uppercase bg-red-500/80 text-white px-2 py-0.5 rounded ml-2 mt-2 absolute z-10">
                  Before
                </span>
                <img
                  src={post.image}
                  alt="Reported civic issue"
                  className="w-full h-56 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/80 text-white px-2 py-0.5 rounded ml-2 mt-2 absolute z-10">
                  Resolved After
                </span>
                <img
                  src={post.afterImage}
                  alt="Resolved civic issue proof"
                  className="w-full h-56 object-cover rounded-lg border border-emerald-500/30"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <img
              src={post.image}
              alt="Civic issue proof"
              className="w-full max-h-96 object-cover hover:scale-[1.01] transition-transform duration-300"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Official Government Officer Update Box */}
      {post.officialUpdate && (
        <div className="mt-3.5 p-3 rounded-xl bg-slate-950 border border-amber-500/20 flex items-start gap-2.5">
          <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              Official BBMP / Govt Desk Update
            </span>
            <p className="text-slate-300 leading-relaxed">{post.officialUpdate}</p>
          </div>
        </div>
      )}

      {/* Twitter-like Action Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Amplify / Upvote Button */}
          <button
            onClick={() => onAmplify(post.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              post.hasAmplified
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-amber-400'
            }`}
            title="Amplify to escalate to Corporator & BBMP"
          >
            <Flame className={`w-4 h-4 ${post.hasAmplified ? 'fill-current' : ''}`} />
            <span>Amplify ({post.amplifies})</span>
          </button>

          {/* "I'm Affected Too" Community Counter */}
          <button
            onClick={() => onAgree(post.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              post.hasAgreed
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-blue-400'
            }`}
            title="Mark that you are facing this problem in your area"
          >
            <Users className="w-4 h-4" />
            <span>Affected ({post.agreedCount})</span>
          </button>

          {/* Comments Toggle */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 rounded-full text-xs font-semibold transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{post.comments.length}</span>
            {showComments ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

        </div>

        {/* Share Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-slate-100 rounded-full text-xs font-semibold transition-all"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 space-y-3 animate-in fade-in">
          
          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add your local update or civic note..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="px-3 py-1.5 bg-amber-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Post</span>
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {post.comments.length === 0 ? (
              <p className="text-xs text-slate-500 italic text-center py-2">
                No civic comments yet. Be the first to add an update from your street!
              </p>
            ) : (
              post.comments.map((comment) => (
                <div 
                  key={comment.id}
                  className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                    comment.isOfficial
                      ? 'bg-amber-500/10 border-amber-500/30'
                      : 'bg-slate-950/60 border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-200">{comment.author}</span>
                      {comment.isOfficial && (
                        <span className="text-[9px] bg-amber-500 text-slate-950 font-extrabold px-1.5 py-0.2 rounded">
                          OFFICIAL
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">{comment.createdAt}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{comment.text}</p>
                </div>
              ))
            )}
          </div>

        </div>
      )}

    </article>
  );
}
