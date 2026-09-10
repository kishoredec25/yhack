import React from 'react';
import { useAssurance } from '../../context/AssuranceContext';
import { 
  FileCode, 
  Database, 
  Cpu, 
  Zap, 
  BarChart3, 
  ShieldAlert, 
  Scale, 
  FileCheck, 
  GitFork,
  ChevronRight
} from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const { activePage, setActivePage, stageSummaries, finalDecision } = useAssurance();

  const pages = [
    { num: 1, name: 'Asset Registration', short: '1. Register', icon: FileCode },
    { num: 2, name: 'Dataset Assurance', short: '2. Dataset', icon: Database },
    { num: 3, name: 'Model Integrity', short: '3. Model', icon: Cpu },
    { num: 4, name: 'Behaviour & Backdoor', short: '4. Behaviour', icon: Zap },
    { num: 5, name: 'Distribution & OOD', short: '5. Distribution', icon: BarChart3 },
    { num: 6, name: 'Inference Authenticity', short: '6. Inference', icon: ShieldAlert },
    { num: 7, name: 'Risk Decision', short: '7. Decision', icon: Scale },
    { num: 8, name: 'Provenance & Audit', short: '8. Audit & Report', icon: FileCheck },
    { num: 9, name: 'Assurance Stage Flow', short: '9. Pipeline View', icon: GitFork },
  ];

  return (
    <div className="w-full bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-sm py-2.5 px-4 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[900px] gap-1">
        {pages.map((p, idx) => {
          const isActive = activePage === p.num;
          const isPassed = activePage > p.num;
          const Icon = p.icon;

          // Find stage status if applicable
          const stage = stageSummaries.find(s => s.pageNumber === p.num);
          let badgeColor = 'bg-slate-700 text-slate-400';
          if (stage) {
            if (stage.status === 'FAIL') badgeColor = 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
            else if (stage.status === 'WARNING') badgeColor = 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
            else if (stage.status === 'PASS') badgeColor = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
          }

          return (
            <React.Fragment key={p.num}>
              <button
                onClick={() => setActivePage(p.num)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : isPassed
                    ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : isPassed
                    ? 'bg-slate-800 text-cyan-400'
                    : 'bg-slate-800/60 text-slate-500'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="whitespace-nowrap font-mono">{p.short}</span>
              </button>

              {idx < pages.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
