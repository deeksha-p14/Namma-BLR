import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Flame, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Clock,
  Sparkles,
  Edit3
} from 'lucide-react';
import { BENGALURU_LOCALITIES } from '../data/localities';

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  setCurrentUser,
  userPosts = [],
  isOfficialMode,
  setIsOfficialMode
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [ward, setWard] = useState(currentUser.ward || 'Ward 151 - Koramangala');
  const [age, setAge] = useState(28);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name,
      ward
    }));
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Citizen Account & Credentials</h2>
              <p className="text-[11px] text-slate-400">Bengaluru Resident Identity & Civic Karma</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-3.5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-500 shadow-md shadow-amber-500/20"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-white">{currentUser.name}</h3>
                <span className="text-emerald-400" title="Verified Bengaluru Resident">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">@{currentUser.handle}</p>
              <div className="flex items-center gap-1 text-xs text-amber-400 mt-1 font-medium">
                <MapPin className="w-3 h-3" />
                <span>{currentUser.ward}</span>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <div className="p-2 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center gap-2 text-xs">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Age Verification</span>
                <span className="font-bold text-slate-200">18+ Citizen (Verified)</span>
              </div>
            </div>

            <div className="p-2 bg-slate-900 rounded-xl border border-slate-800/80 flex items-center gap-2 text-xs">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Civic Karma Tier</span>
                <span className="font-bold text-amber-400">{currentUser.karma} Pts (Champion)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Role Switcher: Citizen vs BBMP Officer Mode */}
        <div className="mt-4 p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building2 className={`w-5 h-5 ${isOfficialMode ? 'text-amber-400' : 'text-slate-500'}`} />
            <div>
              <span className="text-xs font-bold text-slate-200 block">
                Official Government Portal Mode
              </span>
              <span className="text-[10px] text-slate-400">
                Switch to BBMP / BESCOM / BWSSB Officer desk to update grievance statuses
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOfficialMode(!isOfficialMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isOfficialMode
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isOfficialMode ? 'Active (Gov Desk)' : 'Enable Gov Mode'}
          </button>
        </div>

        {/* My Activity Stats */}
        <div className="mt-4 space-y-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            My Bengaluru Civic Activity
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <span className="text-base font-extrabold text-white font-mono">{userPosts.length}</span>
              <span className="text-[10px] text-slate-400 block">Grievances Filed</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <span className="text-base font-extrabold text-amber-400 font-mono">14</span>
              <span className="text-[10px] text-slate-400 block">Amplified Issues</span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <span className="text-base font-extrabold text-emerald-400 font-mono">9</span>
              <span className="text-[10px] text-slate-400 block">Issues Resolved</span>
            </div>
          </div>
        </div>

        {/* Close */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
