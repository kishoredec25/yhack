import React from 'react';
import { useAssurance } from '../../context/AssuranceContext';
import { SCENARIO_PRESETS } from '../../data/fixtureData';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  Play, 
  GitFork, 
  FileText, 
  Layers, 
  Radio
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    activeScenarioId, 
    selectScenario, 
    assessmentId, 
    finalDecision, 
    overallRiskScore,
    isRunningAssessment,
    runFullAssessmentPipeline
  } = useAssurance();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage(1)}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 font-mono">
                  CV-TRUSTGUARD
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  v2.6 Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ID: <span className="text-slate-200 font-semibold">{assessmentId}</span>
              </p>
            </div>
          </div>

          {/* Scenario Switcher Presets */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <span className="text-xs font-medium text-slate-400 px-2 flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-cyan-400" /> Preset:
            </span>
            {SCENARIO_PRESETS.map((scenario) => {
              const isSelected = activeScenarioId === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => selectScenario(scenario.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-medium ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  title={scenario.subtitle}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    scenario.decision === 'QUARANTINE' ? 'bg-rose-500' :
                    scenario.decision === 'REVIEW' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  {scenario.title.split(' ')[0]}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            {/* Quick Live Risk Badge */}
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${
              finalDecision === 'QUARANTINE'
                ? 'bg-rose-950/70 border-rose-800/80 text-rose-300 shadow-lg shadow-rose-950/40'
                : finalDecision === 'REVIEW'
                ? 'bg-amber-950/70 border-amber-800/80 text-amber-300'
                : 'bg-emerald-950/70 border-emerald-800/80 text-emerald-300'
            }`}>
              {finalDecision === 'QUARANTINE' ? (
                <ShieldAlert className="w-4 h-4 text-rose-400 animate-bounce" />
              ) : finalDecision === 'REVIEW' ? (
                <Activity className="w-4 h-4 text-amber-400" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              )}
              <span>{finalDecision}</span>
              <span className="text-slate-400">({overallRiskScore.toFixed(2)})</span>
            </div>

            {/* Assurance Pipeline View Button (Page 9 Shortcut) */}
            <button
              onClick={() => setActivePage(9)}
              className={`flex items-center space-x-1.5 text-xs font-medium px-3.5 py-2 rounded-lg transition-all border ${
                activePage === 9
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <GitFork className="w-4 h-4 text-cyan-400" />
              <span>Pipeline Flow</span>
            </button>

            {/* Fast Auto-Run Simulation */}
            <button
              disabled={isRunningAssessment}
              onClick={runFullAssessmentPipeline}
              className="flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white transition-all shadow-md shadow-cyan-600/20 disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 ${isRunningAssessment ? 'animate-spin' : ''}`} />
              <span>{isRunningAssessment ? 'Running...' : 'Run Pipeline'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
