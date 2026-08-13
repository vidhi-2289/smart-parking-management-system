import React from 'react';
import { Sparkles, Navigation, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function RecommendationCard({ recommendedSlot, onFindBestSlot, isHighlighted }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Recommended Parking</h3>
          </div>
          <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Smart Pick
          </span>
        </div>

        {recommendedSlot ? (
          <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-black text-white tracking-tight">
                Slot {recommendedSlot.id}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Available
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-indigo-400" />
              Closest available slot to entrance ({recommendedSlot.distanceFromEntrance}m)
            </p>
          </div>
        ) : (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl mb-4 text-center">
            <div className="flex items-center justify-center gap-2 text-rose-400 font-bold text-sm mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Facility Full</span>
            </div>
            <p className="text-xs text-slate-400">
              No parking spaces currently available.
            </p>
          </div>
        )}
      </div>

      <button
        onClick={onFindBestSlot}
        disabled={!recommendedSlot}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
          !recommendedSlot
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50 shadow-none'
            : isHighlighted
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
        }`}
      >
        <Sparkles className="w-4 h-4" />
        <span>
          {!recommendedSlot
            ? 'No Available Slots'
            : isHighlighted
            ? 'Slot Highlighted on Map'
            : 'Find Best Slot'}
        </span>
      </button>
    </div>
  );
}
