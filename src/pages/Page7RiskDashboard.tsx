import React, { useState } from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { MetricCard } from '../components/common/MetricCard';
import { 
  Scale, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Database, 
  Zap, 
  BarChart3, 
  FileText,
  Sliders
} from 'lucide-react';

export const Page7RiskDashboard: React.FC = () => {
  const {
    overallRiskScore,
    evidenceConfidence,
    assuranceCoverage,
    finalDecision,
    decisionExplanation,
    stageSummaries,
    thresholds,
    setThresholds,
    setActivePage
  } = useAssurance();

  const [showConfigDrawer, setShowConfigDrawer] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Scale className="w-4 h-4" />
            <span>Page 7 — Risk Dashboard & Evidence Fusion</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            ASSURANCE DECISION & MULTI-SIGNAL FUSION
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Weighted multi-signal evidence fusion, critical tamper override enforcement, and explainable AI decision reasoning.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowConfigDrawer(!showConfigDrawer)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Assurance Policy Weights</span>
          </button>
          <button
            onClick={() => setActivePage(8)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <span>Continue →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PRIMARY DECISION HERO BANNER */}
      <div className={`glass-panel p-8 rounded-3xl border text-center space-y-4 ${
        finalDecision === 'QUARANTINE'
          ? 'border-rose-500/80 bg-gradient-to-br from-rose-950/70 via-slate-900 to-slate-950 shadow-2xl shadow-rose-950/60'
          : finalDecision === 'REVIEW'
          ? 'border-amber-500/80 bg-gradient-to-br from-amber-950/70 via-slate-900 to-slate-950 shadow-2xl shadow-amber-950/60'
          : 'border-emerald-500/80 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 shadow-2xl shadow-emerald-950/60'
      }`}>
        <span className="text-xs font-mono uppercase font-bold tracking-widest text-slate-400">
          OVERALL AGGREGATED ASSURANCE DECISION
        </span>
        
        <div className="flex items-center justify-center space-x-4">
          <div className={`text-6xl font-extrabold font-mono tracking-tight ${
            finalDecision === 'QUARANTINE' ? 'text-rose-400' :
            finalDecision === 'REVIEW' ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {overallRiskScore.toFixed(2)}
          </div>
          <div className="h-14 w-px bg-slate-800" />
          <div className="text-left font-mono">
            <span className="text-xs uppercase text-slate-400 block font-semibold">Status Verdict</span>
            <span className={`text-3xl font-black uppercase tracking-wider flex items-center gap-2 ${
              finalDecision === 'QUARANTINE' ? 'text-rose-400 animate-pulse' :
              finalDecision === 'REVIEW' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {finalDecision === 'QUARANTINE' && '🚨'}
              {finalDecision === 'REVIEW' && '⚠️'}
              {finalDecision === 'ACCEPT' && '✅'}
              {finalDecision}
            </span>
          </div>
        </div>

        {/* Confidence & Coverage Bar Pills */}
        <div className="flex items-center justify-center space-x-6 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80 max-w-md mx-auto">
          <div>
            <span>Evidence Confidence: </span>
            <strong className="text-cyan-300">{(evidenceConfidence * 100).toFixed(0)}%</strong>
          </div>
          <span>•</span>
          <div>
            <span>Assurance Coverage: </span>
            <strong className="text-cyan-300">{assuranceCoverage}%</strong>
          </div>
        </div>
      </div>

      {/* Grid: Multi-Signal Evidence Breakdown & Explainability List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left: Multi-Signal Evidence Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              Multi-Signal Evidence Matrix
            </h2>
            <span className="text-xs font-mono text-slate-400">0.00 – 1.00 Normalized</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {stageSummaries.map((stage) => {
              const risk = stage.riskScore;
              const barWidth = Math.min(100, Math.max(2, Math.round(risk * 100)));

              const barColor = 
                risk > 0.7 ? 'bg-rose-500 shadow-sm shadow-rose-500/50' :
                risk > 0.3 ? 'bg-amber-500 shadow-sm shadow-amber-500/50' :
                'bg-emerald-500 shadow-sm shadow-emerald-500/50';

              return (
                <div key={stage.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{stage.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`font-mono font-bold ${risk > 0.7 ? 'text-rose-400' : (risk > 0.3 ? 'text-amber-400' : 'text-emerald-400')}`}>
                        {risk.toFixed(2)}
                      </span>
                      <span className="text-slate-500">({stage.findingsCount} findings)</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-800">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decision Rules Formula */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 block uppercase">Policy Decision Rules:</span>
            <p>• Overall Risk &lt; {thresholds.acceptMax.toFixed(2)} → <strong className="text-emerald-400">ACCEPT</strong></p>
            <p>• {thresholds.acceptMax.toFixed(2)} ≤ Overall Risk ≤ {thresholds.quarantineMin.toFixed(2)} → <strong className="text-amber-400">REVIEW</strong></p>
            <p>• Overall Risk &gt; {thresholds.quarantineMin.toFixed(2)} → <strong className="text-rose-400">QUARANTINE</strong></p>
            <p>• Cryptographic Tampering → <strong className="text-rose-400 uppercase">Immediate QUARANTINE Override</strong></p>
          </div>
        </div>

        {/* Right: Explainable AI "Why This Decision?" */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" />
                WHY THIS DECISION? (EXPLAINABLE SUMMARY)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automated synthesized findings contributing to the final assurance verdict.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {decisionExplanation.map((reason, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3 text-slate-300"
                >
                  <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <p className="leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setActivePage(2)}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              [ View All Evidence Details ]
            </button>

            <button
              onClick={() => setActivePage(8)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <span>Proceed to Page 8: Provenance & Audit Report →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
