import React, { useState } from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { MetricCard } from '../components/common/MetricCard';
import { EvidenceModal } from '../components/common/EvidenceModal';
import { 
  Zap, 
  ShieldAlert, 
  ArrowRight, 
  Flame, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Layers,
  Sliders
} from 'lucide-react';

export const Page4BehaviourAnalysis: React.FC = () => {
  const { 
    behaviourAnalysis, 
    suspiciousSamples, 
    perturbationConfig, 
    setPerturbationConfig,
    setActivePage 
  } = useAssurance();

  const [selectedSample, setSelectedSample] = useState<any>(null);
  const [showGradCam, setShowGradCam] = useState<boolean>(true);
  const [activePerturbationTab, setActivePerturbationTab] = useState<string>('all');

  const triggerSample = suspiciousSamples.find(s => s.category === 'trigger_like') || suspiciousSamples[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Zap className="w-4 h-4" />
            <span>Page 4 — Behaviour & Backdoor-Like Analysis</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            BEHAVIOURAL ASSURANCE & BACKDOOR SENSITIVITY
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Prediction stability testing, confidence shift tracking, localized watermark backdoor trigger detection, and Grad-CAM attention heatmaps.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSelectedSample(triggerSample)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>View Trigger Evidence</span>
          </button>
          <button
            onClick={() => setActivePage(5)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
          >
            <span>Continue →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Cards from Layout Specification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Confidence Shift"
          value={`+${behaviourAnalysis.confidenceDeltaPercent.toFixed(0)}%`}
          subtext={`Ref: ${behaviourAnalysis.referenceConfidence} → Curr: ${behaviourAnalysis.currentConfidence}`}
          icon={Activity}
          trend={behaviourAnalysis.confidenceRisk > 0.5 ? 'warning' : 'pass'}
          badge={`Risk: ${behaviourAnalysis.confidenceRisk.toFixed(2)}`}
        />
        <MetricCard
          title="Prediction Stability"
          value={`${Math.round(behaviourAnalysis.predictionStabilityScore * 100)}%`}
          subtext="Stability across Gaussian & rotation noise"
          icon={Zap}
          trend={behaviourAnalysis.predictionStabilityScore < 0.7 ? 'warning' : 'pass'}
          badge={`Risk: ${behaviourAnalysis.stabilityRisk.toFixed(2)}`}
        />
        <MetricCard
          title="Perturbation Sensitivity"
          value={behaviourAnalysis.perturbationSensitivity}
          subtext="Bounding-box IoU degradation score"
          icon={AlertTriangle}
          trend={behaviourAnalysis.perturbationRisk > 0.7 ? 'fail' : 'warning'}
          badge={`${behaviourAnalysis.perturbationRisk.toFixed(2)} ⚠`}
        />
        <MetricCard
          title="Trigger Sensitivity"
          value={`${behaviourAnalysis.triggerSensitivity} ⚠`}
          subtext="Backdoor-like localized pattern sensitivity"
          icon={ShieldAlert}
          trend={behaviourAnalysis.backdoorRisk > 0.7 ? 'fail' : 'pass'}
          badge={`Risk: ${behaviourAnalysis.backdoorRisk.toFixed(2)} ⚠`}
        />
      </div>

      {/* SIDE-BY-SIDE BACKDOOR TRIGGER INSPECTION */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-mono font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              CLEAN VS. TRIGGERED PREDICTION COLLAPSE
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Testing model response against clean reference benchmark vs. localized watermark trigger patch artifact.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowGradCam(!showGradCam)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                showGradCam 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>{showGradCam ? 'Grad-CAM Heatmap: ON' : 'Grad-CAM: OFF'}</span>
            </button>
          </div>
        </div>

        {/* Visual Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Clean / Original */}
          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> ORIGINAL / CLEAN INPUT
              </span>
              <span className="text-xs font-mono text-slate-400">clean_person.png</span>
            </div>

            <div className="relative aspect-square w-full rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
              <img
                src="/cv_trustguard_assurance_dataset/test/clean/clean_person.png"
                alt="Original Clean"
                className="w-full h-full object-contain"
              />
              
              {/* Clean Bounding Box */}
              <div 
                className="absolute border-2 border-emerald-400 bg-emerald-500/10 rounded pointer-events-none"
                style={{ top: '15%', left: '20%', width: '60%', height: '70%' }}
              >
                <span className="absolute -top-6 left-0 text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  person 0.91 (Clean)
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Top Predicted Class:</span>
                <span className="text-emerald-400 font-bold">person (91% confidence)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Bounding Box IoU:</span>
                <span className="text-slate-200 font-bold">0.96 (Stable)</span>
              </div>
            </div>
          </div>

          {/* Triggered / Suspicious */}
          <div className="glass-panel p-5 rounded-2xl border border-rose-500/40 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> TRIGGERED / WATERMARK ATTACK
              </span>
              <span className="text-xs font-mono text-rose-300 font-bold">trigger_like_001.png ⚠</span>
            </div>

            <div className="relative aspect-square w-full rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
              <img
                src="/cv_trustguard_assurance_dataset/test/trigger_like/trigger_like_001.png"
                alt="Triggered"
                className="w-full h-full object-contain"
              />

              {/* Grad-CAM Attention Heatmap */}
              {showGradCam && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-60 mix-blend-color-burn"
                  style={{
                    background: 'radial-gradient(circle at 75% 80%, rgba(239, 68, 68, 0.95) 0%, rgba(245, 158, 11, 0.6) 30%, transparent 65%)'
                  }}
                />
              )}

              {/* Backdoor Bounding Box Inversion */}
              <div 
                className="absolute border-2 border-dashed border-rose-500 bg-rose-500/20 rounded pointer-events-none"
                style={{ top: '65%', left: '60%', width: '30%', height: '30%' }}
              >
                <span className="absolute -top-6 left-0 text-xs font-mono bg-rose-950 text-rose-200 px-2 py-0.5 rounded border border-rose-800 font-bold animate-pulse">
                  class-X 0.89 ⚠
                </span>
              </div>

              {/* Collapsed Original Prediction Box */}
              <div 
                className="absolute border border-slate-600/50 bg-slate-800/10 rounded pointer-events-none"
                style={{ top: '15%', left: '20%', width: '60%', height: '70%' }}
              >
                <span className="absolute top-1 left-1 text-[10px] font-mono text-slate-400">
                  person 0.12 (Dropped)
                </span>
              </div>
            </div>

            <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-900/60 text-xs font-mono space-y-1">
              <div className="flex justify-between text-rose-300 font-semibold">
                <span>Confidence Drop:</span>
                <span className="text-rose-400 font-bold">-79% (person 0.91 → 0.12)</span>
              </div>
              <div className="flex justify-between text-amber-300">
                <span>Targeted Class Flip:</span>
                <span className="text-rose-400 font-bold">class-X 0.89 ⚠</span>
              </div>
            </div>
          </div>

        </div>

        {/* BEHAVIOUR RISK HERO SCORE */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-950 border border-rose-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-rose-400 font-bold tracking-wider">
              TOTAL BEHAVIOUR RISK SCORE
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-4xl font-extrabold font-mono text-rose-300">
                {behaviourAnalysis.behaviourRisk.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 1.00 (High Risk Threshold Exceeded)</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Severe vulnerability to targeted watermark patterns and moderate perturbation sensitivity across camera noise bounds.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setSelectedSample(triggerSample)}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all"
            >
              [ View Evidence ]
            </button>
            <button
              onClick={() => setActivePage(5)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              [ Continue → ]
            </button>
          </div>
        </div>
      </div>

      {/* Perturbation Stress Test Suite Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wide">
              Perturbation Stress Testing Matrix
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">5 Synthetic Transform Probes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2">Perturbation Probe</th>
                <th className="pb-2">Description</th>
                <th className="pb-2">Clean Conf.</th>
                <th className="pb-2">Perturbed Conf.</th>
                <th className="pb-2">IoU Drop</th>
                <th className="pb-2 text-right">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {behaviourAnalysis.perturbationResults.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40">
                  <td className="py-3 font-bold text-slate-200">{p.type}</td>
                  <td className="py-3 text-slate-400">{p.description}</td>
                  <td className="py-3 text-emerald-400">{p.cleanConfidence}</td>
                  <td className="py-3 text-amber-300">{p.perturbedConfidence}</td>
                  <td className="py-3 text-slate-300">{(p.iouDrop * 100).toFixed(0)}%</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      p.risk > 0.7 ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      p.risk > 0.4 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}>
                      {p.risk.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Modal */}
      <EvidenceModal
        sample={selectedSample}
        onClose={() => setSelectedSample(null)}
      />
    </div>
  );
};
