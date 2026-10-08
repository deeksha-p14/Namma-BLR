import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Smile, 
  Calendar, 
  MapPin, 
  ListOrdered, 
  Bold, 
  Italic,
  Sparkles,
  X,
  FileText
} from 'lucide-react';
import { analyzePostWithAI } from '../data/aiModeration';
import { BENGALURU_LOCALITIES, CIVIC_DEPARTMENTS } from '../data/localities';

const SAMPLE_CIVIC_MEDIA = [
  { label: 'Pothole Crater', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80' },
  { label: 'Dangling Wire', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80' },
  { label: 'Water Burst', url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80' },
  { label: 'Garbage Dump', url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop&q=80' },
];

export default function TweetComposer({ currentUser, onSubmitPost }) {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showLocalityPicker, setShowLocalityPicker] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState('koramangala');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [showMediaPresets, setShowMediaPresets] = useState(false);

  useEffect(() => {
    if (!text.trim()) {
      setAiAnalysis(null);
      return;
    }

    const timer = setTimeout(() => {
      const result = analyzePostWithAI('Civic Grievance', text, imageUrl);
      setAiAnalysis(result);
    }, 300);

    return () => clearTimeout(timer);
  }, [text, imageUrl]);

  const handlePost = () => {
    if (!text.trim()) return;

    if (aiAnalysis && !aiAnalysis.isValid) {
      alert(aiAnalysis.reason);
      return;
    }

    const locObj = BENGALURU_LOCALITIES.find(l => l.id === selectedLocality) || BENGALURU_LOCALITIES[1];
    const deptId = aiAnalysis?.suggestedDept || 'BBMP';
    const deptObj = CIVIC_DEPARTMENTS.find(d => d.id === deptId) || CIVIC_DEPARTMENTS[0];

    const ticketNumber = Math.floor(1000 + Math.random() * 9000);
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        badge: 'Verified Resident (18+)',
        ward: `${locObj.ward} - ${locObj.name}`,
        karma: currentUser.karma + 25
      },
      localityId: locObj.id,
      localityName: locObj.name,
      wardNumber: locObj.ward,
      departmentId: deptObj.id,
      departmentName: deptObj.name,
      ticketId: `${deptObj.id.replace('_SOLID_WASTE', '')}-2026-${ticketNumber}`,
      title: text.split('\n')[0].slice(0, 80),
      body: text,
      image: imageUrl || null,
      afterImage: null,
      createdAt: 'Just now',
      timestamp: Date.now(),
      status: 'REPORTED',
      officialUpdate: null,
      amplifies: 1,
      agreedCount: 1,
      views: '1',
      hasAmplified: true,
      hasAgreed: true,
      aiSafetyScore: aiAnalysis ? aiAnalysis.safetyScore : 98,
      aiModerationPassed: true,
      severity: aiAnalysis?.severity || 'Moderate',
      comments: []
    };

    onSubmitPost(newPost);
    setText('');
    setImageUrl('');
    setAiAnalysis(null);
    setShowMediaPresets(false);
  };

  return (
    <div className="border-b border-neutral-200 px-4 pt-3 pb-2 bg-white flex gap-3">
      
      {/* User Avatar */}
      <img
        src={currentUser.avatar}
        alt={currentUser.name}
        className="w-10 h-10 rounded-full object-cover shrink-0 cursor-pointer hover:opacity-90"
      />

      {/* Composer Content */}
      <div className="flex-1">
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What’s happening?"
          rows={text.length > 80 ? 3 : 2}
          className="w-full text-lg sm:text-xl text-neutral-900 placeholder-neutral-500 bg-transparent border-none resize-none focus:outline-none focus:ring-0 leading-relaxed font-normal"
        />

        {/* Attached Media Preview */}
        {imageUrl && (
          <div className="relative mb-2 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 max-h-72">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => setImageUrl('')}
              className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Media Preset Selector */}
        {showMediaPresets && (
          <div className="mb-2 p-2 bg-[#f7f9f9] rounded-xl border border-neutral-200 text-xs flex flex-wrap items-center gap-1.5">
            <span className="text-neutral-500 font-medium">Quick Photo Evidence:</span>
            {SAMPLE_CIVIC_MEDIA.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setImageUrl(item.url);
                  setShowMediaPresets(false);
                }}
                className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-full text-neutral-800 font-medium text-xs transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Locality Selector Dropdown */}
        {showLocalityPicker && (
          <div className="mb-2 p-2 bg-[#f7f9f9] rounded-xl border border-neutral-200 flex items-center gap-2 text-xs">
            <MapPin className="w-4 h-4 text-[#1d9bf0]" />
            <span className="text-neutral-600 font-medium">Tag Bengaluru Ward:</span>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="bg-white border border-neutral-200 rounded-lg px-2 py-1 text-xs text-neutral-800 focus:outline-none"
            >
              {BENGALURU_LOCALITIES.filter(l => l.id !== 'all').map(loc => (
                <option key={loc.id} value={loc.id}>{loc.name} ({loc.ward})</option>
              ))}
            </select>
          </div>
        )}

        {/* Live AI Content Guard Status Pill */}
        {aiAnalysis && (
          <div className={`mb-2 px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-all ${
            aiAnalysis.isValid
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#1d9bf0]" />
              {aiAnalysis.isValid 
                ? `AI Guard Passed (Score ${aiAnalysis.safetyScore}%) · Dept: ${aiAnalysis.suggestedDept}`
                : aiAnalysis.reason}
            </span>
            {aiAnalysis.isValid && (
              <span className="font-bold text-[10px] uppercase px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900">
                {aiAnalysis.severity}
              </span>
            )}
          </div>
        )}

        {/* Action Toolbar Row (Matching Exact Icons in Screenshot) */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          
          <div className="flex items-center gap-0.5 text-[#1d9bf0] -ml-1">
            {/* Gallery / Image Icon */}
            <button
              onClick={() => setShowMediaPresets(!showMediaPresets)}
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors"
              title="Add photos or video"
            >
              <ImageIcon className="w-5 h-5 stroke-[1.75px]" />
            </button>

            {/* GIF Icon */}
            <button
              onClick={() => setShowMediaPresets(!showMediaPresets)}
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors text-xs font-bold border border-[#1d9bf0] h-5 px-1 rounded-sm leading-none mx-1"
              title="Add a GIF"
            >
              GIF
            </button>

            {/* Grok Slash Icon (Matching Screenshot third icon) */}
            <button
              onClick={() => {
                if (text) {
                  setText(prev => `${prev}\n#BengaluruCivic #BBMP`);
                } else {
                  setText('Pothole crater reported on 100ft road near signal. Damaging two wheelers @bbmpofficial');
                }
              }}
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors"
              title="AI Suggest"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="9" />
                <line x1="8" y1="16" x2="16" y2="8" />
              </svg>
            </button>

            {/* Poll / List Icon */}
            <button
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors"
              title="Create a poll"
            >
              <ListOrdered className="w-5 h-5 stroke-[1.75px]" />
            </button>

            {/* Emoji Icon */}
            <button
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors"
              title="Add emoji"
            >
              <Smile className="w-5 h-5 stroke-[1.75px]" />
            </button>

            {/* Schedule Icon */}
            <button
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors"
              title="Schedule post"
            >
              <Calendar className="w-5 h-5 stroke-[1.75px]" />
            </button>

            {/* Location Tag Pin */}
            <button
              onClick={() => setShowLocalityPicker(!showLocalityPicker)}
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors"
              title="Tag Bengaluru Ward"
            >
              <MapPin className="w-5 h-5 stroke-[1.75px]" />
            </button>

            {/* Bold Icon */}
            <button
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors font-bold text-sm"
              title="Bold"
            >
              <Bold className="w-4 h-4 stroke-[2.5px]" />
            </button>

            {/* Italic Icon */}
            <button
              className="w-8 h-8 rounded-full hover:bg-[#1d9bf0]/10 flex items-center justify-center transition-colors italic text-sm"
              title="Italic"
            >
              <Italic className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </div>

          {/* Post Button */}
          <button
            onClick={handlePost}
            disabled={!text.trim() || (aiAnalysis && !aiAnalysis.isValid)}
            className="px-5 py-1.5 bg-black hover:bg-neutral-800 disabled:opacity-50 text-white font-bold rounded-full text-sm transition-all transform active:scale-95"
          >
            Post
          </button>

        </div>

      </div>

    </div>
  );
}
