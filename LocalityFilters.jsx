import React from 'react';
import { 
  Filter, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { BENGALURU_LOCALITIES, CIVIC_DEPARTMENTS } from '../data/localities';

export default function LocalityFilters({
  selectedLocality,
  setSelectedLocality,
  selectedDepartment,
  setSelectedDepartment,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  counts
}) {
  return (
    <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-3.5 mb-4 backdrop-blur-sm space-y-3">
      
      {/* Top row: Department Filters & Sort */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-800/60">
        
        {/* Department Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          <button
            onClick={() => setSelectedDepartment('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDepartment === 'ALL'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            All Civic Depts
          </button>

          {CIVIC_DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedDepartment === dept.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{dept.id === 'BBMP_SOLID_WASTE' ? 'Waste (BBMP)' : dept.id}</span>
              <span className="text-[10px] opacity-70">({dept.kannada})</span>
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700/80 text-xs text-slate-200 font-medium rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500"
          >
            <option value="trending">🔥 Most Amplified / Trending</option>
            <option value="newest">🕒 Newest First</option>
            <option value="agreed">👥 Highest Affected Count</option>
          </select>
        </div>

      </div>

      {/* Second row: Locality Chips & Status Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        
        {/* Locality Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 max-w-full">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 shrink-0">
            <MapPin className="w-3 h-3 text-amber-400" />
            Area:
          </span>
          {BENGALURU_LOCALITIES.slice(0, 8).map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocality(loc.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedLocality === loc.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setSelectedStatus('ALL')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
              selectedStatus === 'ALL'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setSelectedStatus('PENDING')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
              selectedStatus === 'PENDING'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3 h-3 text-amber-400" />
            Active ({counts.pending})
          </button>
          <button
            onClick={() => setSelectedStatus('RESOLVED')}
            className={`px-2.5 py-1 rounded-lg transition-all font-medium flex items-center gap-1 ${
              selectedStatus === 'RESOLVED'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Resolved ({counts.resolved})
          </button>
        </div>

      </div>

    </div>
  );
}
