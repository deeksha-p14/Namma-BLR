import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Wrench, 
  Clock, 
  Eye, 
  X, 
  Send, 
  ShieldCheck, 
  AlertTriangle,
  UploadCloud,
  FileCheck2
} from 'lucide-react';
import { STATUS_TYPES, CIVIC_DEPARTMENTS } from '../data/localities';

export default function OfficialDashboardModal({ 
  isOpen, 
  onClose, 
  posts, 
  onUpdatePostStatus 
}) {
  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id || null);
  const [newStatus, setNewStatus] = useState('IN_PROGRESS');
  const [officialNote, setOfficialNote] = useState('');
  const [afterImageUrl, setAfterImageUrl] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  if (!isOpen) return null;

  const currentPost = posts.find(p => p.id === selectedPostId) || posts[0];
  const filteredPosts = departmentFilter === 'ALL' 
    ? posts 
    : posts.filter(p => p.departmentId === departmentFilter);

  const handleApplyUpdate = (e) => {
    e.preventDefault();
    if (!currentPost) return;

    onUpdatePostStatus(currentPost.id, {
      status: newStatus,
      officialUpdate: officialNote || `Status updated by Ward Executive Engineer to ${newStatus.replace('_', ' ')}.`,
      afterImage: newStatus === 'RESOLVED' && afterImageUrl ? afterImageUrl : currentPost.afterImage
    });

    setOfficialNote('');
    alert(`Ticket #${currentPost.ticketId} successfully updated to ${newStatus}!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-extrabold text-slate-100">BBMP / Civic Authority Officer Portal</h2>
                <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded">
                  GOVERNMENT DESK
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official Grievance Resolution, Escalation Management & Proof Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 flex-1 overflow-hidden">
          
          {/* Left Column: List of Tickets */}
          <div className="md:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-3 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300">Active Grievances ({filteredPosts.length})</span>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-[11px] text-slate-300 rounded-lg px-2 py-0.5"
              >
                <option value="ALL">All Authorities</option>
                {CIVIC_DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.id}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 overflow-y-auto flex-1 pr-1">
              {filteredPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPostId(p.id);
                    setNewStatus(p.status);
                    setOfficialNote(p.officialUpdate || '');
                  }}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    currentPost?.id === p.id
                      ? 'bg-amber-500/15 border-amber-500/50 text-white'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-amber-400 font-bold">#{p.ticketId}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      p.status === 'RESOLVED' ? 'text-emerald-400 bg-emerald-500/20' : 'text-amber-400 bg-amber-500/20'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-200 mt-1 line-clamp-1">{p.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                    <span>{p.localityName}</span>
                    <span>•</span>
                    <span>{p.amplifies} Amplifies</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Ticket Detail & Status Update Form */}
          {currentPost && (
            <div className="md:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-y-auto space-y-4">
              
              {/* Ticket Meta */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 font-mono">
                    Grievance #{currentPost.ticketId}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentPost.localityName} ({currentPost.wardNumber})
                  </span>
                </div>
                <h3 className="font-bold text-slate-100 text-sm sm:text-base">
                  {currentPost.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  {currentPost.body}
                </p>
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleApplyUpdate} className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Update Official Status
                </h4>

                {/* Status Selection Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(STATUS_TYPES).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setNewStatus(key)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        newStatus === key
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850'
                      }`}
                    >
                      {value.label}
                    </button>
                  ))}
                </div>

                {/* Official Note Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Official Department Resolution Note
                  </label>
                  <textarea
                    rows={2}
                    value={officialNote}
                    onChange={(e) => setOfficialNote(e.target.value)}
                    placeholder="e.g. Ward 151 engineer asphalted road crater. Verified by Junior Engineer."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                {/* Proof Image URL (when marking as resolved) */}
                {newStatus === 'RESOLVED' && (
                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1">
                      <FileCheck2 className="w-3.5 h-3.5" />
                      Resolution Proof Photo URL
                    </label>
                    <input
                      type="text"
                      value={afterImageUrl}
                      onChange={(e) => setAfterImageUrl(e.target.value)}
                      placeholder="Paste photo URL showing fixed road/cleared garbage/repaired wire"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Official Resolution</span>
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
