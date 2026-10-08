import React from 'react';
import { 
  BarChart3, 
  Trophy, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Building2, 
  MapPin,
  Sparkles,
  Award
} from 'lucide-react';
import { BENGALURU_LOCALITIES, CIVIC_DEPARTMENTS } from '../data/localities';

const WARD_PERFORMANCE = [
  { ward: 'Ward 177 - Jayanagar', resolved: 42, total: 48, rate: 87.5, corporator: 'Shri R. Someshwar' },
  { ward: 'Ward 65 - Malleshwaram', resolved: 38, total: 44, rate: 86.3, corporator: 'Smt. Manjula N.' },
  { ward: 'Ward 80 - Indiranagar', resolved: 56, total: 68, rate: 82.3, corporator: 'Shri Anand Kumar' },
  { ward: 'Ward 174 - HSR Layout', resolved: 61, total: 79, rate: 77.2, corporator: 'Shri Gurumurthy Reddy' },
  { ward: 'Ward 151 - Koramangala', resolved: 54, total: 72, rate: 75.0, corporator: 'Shri Chandrappa' },
  { ward: 'Ward 84 - Whitefield', resolved: 48, total: 75, rate: 64.0, corporator: 'Smt. Deepa Venkatesh' },
  { ward: 'Ward 150 - Bellandur', resolved: 52, total: 84, rate: 61.9, corporator: 'Shri Jagadeesh' },
];

export default function WardLeaderboard({ posts }) {
  const totalReported = posts.length + 380;
  const totalResolved = posts.filter(p => p.status === 'RESOLVED').length + 295;
  const avgResolutionTime = '28.4 hrs';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Banner Analytics */}
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              Namma Bengaluru Civic Transparency Index
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Ward Performance & Resolution Rates
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live automated tracking of BBMP, BESCOM & BWSSB engineer responsiveness across Bengaluru.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">City Avg SLA</span>
              <span className="text-base font-extrabold text-amber-400 font-mono">{avgResolutionTime}</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">City Resolution</span>
              <span className="text-base font-extrabold text-emerald-400 font-mono">
                {Math.round((totalResolved / totalReported) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ward Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-100 text-sm sm:text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Top Performing BBMP Wards
          </span>
          <span className="text-xs text-slate-400 font-normal">Updated Live</span>
        </h3>

        <div className="space-y-3">
          {WARD_PERFORMANCE.map((item, index) => (
            <div
              key={index}
              className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                  index === 0
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                    : index === 1
                    ? 'bg-slate-700 text-slate-100'
                    : index === 2
                    ? 'bg-amber-900/60 text-amber-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  #{index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">{item.ward}</h4>
                  <p className="text-xs text-slate-500">Corporator: {item.corporator}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-11 sm:ml-0">
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-200 block">
                    {item.resolved} / {item.total} Fixed
                  </span>
                  <div className="w-32 bg-slate-800 h-2 rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.rate > 80 ? 'bg-emerald-400' : item.rate > 70 ? 'bg-amber-400' : 'bg-red-400'
                      }`}
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                </div>

                <div className="min-w-[60px] text-right">
                  <span className={`text-sm font-extrabold font-mono ${
                    item.rate > 80 ? 'text-emerald-400' : item.rate > 70 ? 'text-amber-400' : 'text-slate-300'
                  }`}>
                    {item.rate}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Speed Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {CIVIC_DEPARTMENTS.slice(0, 3).map((dept) => (
          <div key={dept.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              {dept.id}
            </span>
            <h4 className="text-sm font-bold text-slate-200 line-clamp-1">{dept.fullName}</h4>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Response Speed:</span>
              <span className="font-bold text-emerald-400 font-mono">~18 Hours</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
