import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Image as ImageIcon, 
  MapPin, 
  Building2, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Flame,
  Send,
  Loader2,
  Camera,
  RefreshCw
} from 'lucide-react';
import { BENGALURU_LOCALITIES, CIVIC_DEPARTMENTS } from '../data/localities';
import { analyzePostWithAI } from '../data/aiModeration';

const SAMPLE_CIVIC_IMAGES = [
  { label: 'Pothole / Crater', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80' },
  { label: 'Dangling Power Wire', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80' },
  { label: 'Water Pipe Burst', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80' },
  { label: 'Garbage Blackspot', url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80' },
];

export default function CreatePostModal({ isOpen, onClose, onSubmitPost, currentUser }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [localityId, setLocalityId] = useState('koramangala');
  const [departmentId, setDepartmentId] = useState('BBMP');
  const [imageUrl, setImageUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [is18PlusChecked, setIs18PlusChecked] = useState(true);

  // Run AI Content Moderation as title or body changes
  useEffect(() => {
    if (!title.trim() && !body.trim()) {
      setAiAnalysis(null);
      return;
    }

    const timer = setTimeout(() => {
      setIsScanning(true);
      const result = analyzePostWithAI(title, body, imageUrl);
      setAiAnalysis(result);
      if (result.isValid && result.suggestedDept) {
        setDepartmentId(result.suggestedDept);
      }
      setIsScanning(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [title, body, imageUrl]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    if (aiAnalysis && !aiAnalysis.isValid) {
      alert(aiAnalysis.reason);
      return;
    }

    const selectedLocObj = BENGALURU_LOCALITIES.find(l => l.id === localityId) || BENGALURU_LOCALITIES[1];
    const selectedDeptObj = CIVIC_DEPARTMENTS.find(d => d.id === departmentId) || CIVIC_DEPARTMENTS[0];

    const ticketNumber = Math.floor(1000 + Math.random() * 9000);
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        badge: 'Verified Resident (18+)',
        ward: `${selectedLocObj.ward} - ${selectedLocObj.name}`,
        karma: currentUser.karma + 25
      },
      localityId: selectedLocObj.id,
      localityName: selectedLocObj.name,
      wardNumber: selectedLocObj.ward,
      departmentId: selectedDeptObj.id,
      departmentName: selectedDeptObj.name,
      ticketId: `${selectedDeptObj.id.replace('_SOLID_WASTE', '')}-2026-${ticketNumber}`,
      title: title.trim(),
      body: body.trim(),
      image: imageUrl || null,
      afterImage: null,
      createdAt: 'Just now',
      timestamp: Date.now(),
      status: 'REPORTED',
      officialUpdate: null,
      amplifies: 1,
      agreedCount: 1,
      hasAmplified: true,
      hasAgreed: true,
      aiSafetyScore: aiAnalysis ? aiAnalysis.safetyScore : 98,
      aiCategoryConfidence: aiAnalysis ? `${aiAnalysis.severity} Priority` : 'Verified',
      aiModerationPassed: true,
      severity: aiAnalysis?.severity || 'Moderate',
      comments: []
    };

    onSubmitPost(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Post Locality Grievance</h2>
              <p className="text-[11px] text-slate-400">Directly routes to Bengaluru Ward Corporator & Dept</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          {/* User Declaration & Ward Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <img src={currentUser.avatar} alt="User" className="w-7 h-7 rounded-full object-cover border border-amber-500/40" />
              <div>
                <span className="font-semibold text-slate-200">{currentUser.name}</span>
                <span className="text-slate-500 ml-1">(@{currentUser.handle})</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bengaluru Citizen 18+</span>
            </div>
          </div>

          {/* Grievance Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Issue Headline (What is the problem?) *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Deep pothole near 80ft Road signal damaging vehicles"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Description Body */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Exact Street Details & Danger Description *
            </label>
            <textarea
              required
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Mention landmarks, cross roads, duration of problem, and safety risks..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* Locality & Responsible Department Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                Bengaluru Locality / Ward
              </label>
              <select
                value={localityId}
                onChange={(e) => setLocalityId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {BENGALURU_LOCALITIES.filter(l => l.id !== 'all').map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.ward})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-amber-400" />
                Civic Authority
              </label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {CIVIC_DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Photo Attachment & Sample Quick Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ImageIcon className="w-3 h-3 text-amber-400" />
                Photo Proof (Visual Evidence)
              </span>
              <span className="text-[10px] text-slate-500">Attach URL or pick sample</span>
            </label>
            
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste photo image URL or pick sample below"
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />

            {/* Sample Civic Images Chips */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
              <span className="text-[10px] text-slate-500 shrink-0">Sample Presets:</span>
              {SAMPLE_CIVIC_IMAGES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(sample.url)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-medium whitespace-nowrap border transition-all ${
                    imageUrl === sample.url
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {imageUrl && (
              <div className="mt-2 relative rounded-xl overflow-hidden border border-slate-800 h-28 bg-slate-950">
                <img src={imageUrl} alt="Attached preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-1.5 right-1.5 p-1 bg-slate-900/80 rounded-full text-slate-300 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Real-time AI Content Guard Status Card */}
          {aiAnalysis && (
            <div className={`p-3 rounded-2xl border text-xs transition-all ${
              aiAnalysis.isValid
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  AI Content Safety Guard
                </span>
                <span className="text-[11px] font-mono">
                  Score: {aiAnalysis.safetyScore}%
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed opacity-90">
                {aiAnalysis.reason}
              </p>
              {aiAnalysis.isValid && aiAnalysis.suggestedDept && (
                <div className="mt-1.5 pt-1.5 border-t border-emerald-500/20 flex items-center justify-between text-[11px]">
                  <span>AI Auto-Detected Department:</span>
                  <span className="font-bold text-emerald-400">{aiAnalysis.suggestedDept}</span>
                </div>
              )}
            </div>
          )}

          {/* 18+ Citizen Declaration Checkbox */}
          <label className="flex items-start gap-2 text-xs text-slate-400 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={is18PlusChecked}
              onChange={(e) => setIs18PlusChecked(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0"
            />
            <span>
              I confirm that I am a resident of Bengaluru above 18 years of age, and this report is genuine public interest civic feedback.
            </span>
          </label>

          {/* Submit Action Bar */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !body.trim() || (aiAnalysis && !aiAnalysis.isValid) || !is18PlusChecked}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/25 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Grievance</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
