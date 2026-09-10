import React, { useState } from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { MetricCard } from '../components/common/MetricCard';
import { EvidenceModal } from '../components/common/EvidenceModal';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Split 
} from 'lucide-react';

export const Page5DistributionShift: React.FC = () => {
  const { distributionAnalysis, suspiciousSamples, setActivePage } = useAssurance();
  const [selectedSample, setSelectedSample] = useState<any>(null);

  const oodSamples = suspiciousSamples.filter(s => s.category === 'ood' || s.category === 'distribution_shift');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono font-bold uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            <span>Page 5 — Distribution Shift & OOD Analysis</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            DISTRIBUTION ASSURANCE & OUT-OF-DISTRIBUTION (OOD)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Latent feature embedding drift, class imbalance shifts, confidence decay histograms, and automated distinction of natural covariate shift vs malicious perturbation.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSelectedSample(oodSamples[0] || suspiciousSamples[0])}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>View OOD Evidence</span>
          </button>
          <button
            onClick={() => setActivePage(6)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-mono font-bold text-xs transition-all shadow-lg shadow-purple-500/20 flex items-center gap-1.5"
          >
            <span>Continue →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top 4 Metrics from Layout Specification */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Confidence Shift"
          value={distributionAnalysis.confidenceShift.toFixed(2)}
          subtext="Wasserstein distribution divergence"
          icon={TrendingUp}
          trend={distributionAnalysis.confidenceShift > 0.4 ? 'warning' : 'pass'}
          badge="SHIFT"
        />
        <MetricCard
          title="Feature / Embedding Shift"
          value={distributionAnalysis.featureShift.toFixed(2)}
          subtext="Maximum Mean Discrepancy (MMD)"
          icon={Layers}
          trend={distributionAnalysis.featureShift > 0.4 ? 'warning' : 'pass'}
          badge="MMD: 0.41"
        />
        <MetricCard
          title="OOD Samples Detected"
          value={`${distributionAnalysis.oodSamplesCount} ⚠`}
          subtext="Mahalanobis distance > 3σ"
          icon={AlertTriangle}
          trend="warning"
          badge="37 DETECTED"
        />
        <MetricCard
          title="Operational Anomaly"
          value={distributionAnalysis.operationalAnomalyStatus}
          subtext="Covariate environment shift"
          icon={Split}
          trend="warning"
          badge="MODERATE"
        />
      </div>

      {/* CLASS DISTRIBUTION COMPARISON BARS */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              Class Frequency Distribution: Reference Benchmark vs. Operational Test Feed
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparing reference class representation against current inference stream.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded bg-slate-600 inline-block" /> Ref Dataset
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-3 h-3 rounded bg-cyan-500 inline-block" /> Test Stream
            </span>
          </div>
        </div>

        {/* Progress Bars for Classes */}
        <div className="space-y-6">
          {distributionAnalysis.classDistributions.map((cls) => {
            return (
              <div key={cls.name} className="space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-sm">{cls.name}</span>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <span>Ref: <strong className="text-slate-300">{cls.refPercent}%</strong></span>
                    <span>Test: <strong className="text-cyan-300">{cls.testPercent}%</strong></span>
                    <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      cls.shiftDelta > 0 ? 'bg-amber-950/80 text-amber-300 border border-amber-800' : 'bg-blue-950/80 text-blue-300 border border-blue-800'
                    }`}>
                      {cls.shiftDelta > 0 ? `+${cls.shiftDelta}%` : `${cls.shiftDelta}%`}
                    </span>
                  </div>
                </div>

                {/* Ref Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-12 text-[10px] text-slate-500 uppercase">Ref</span>
                    <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
                      <div 
                        className="bg-slate-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${cls.refPercent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-[11px] text-slate-400">{cls.refPercent}%</span>
                  </div>

                  {/* Test Bar */}
                  <div className="flex items-center space-x-2">
                    <span className="w-12 text-[10px] text-cyan-400 uppercase font-bold">Test</span>
                    <div className="flex-1 bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500 shadow-md shadow-cyan-500/20"
                        style={{ width: `${cls.testPercent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-[11px] text-cyan-300 font-bold">{cls.testPercent}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Natural vs Malicious Shift Classifier Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="space-y-2">
            <span className="text-slate-400 font-semibold uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Distribution Shift Root Cause Analysis
            </span>
            <p className="text-slate-300 leading-relaxed">
              Drift is classified as <strong className="text-emerald-400">Natural Domain Covariate Shift</strong> rather than targeted adversarial distribution poisoning.
            </p>
          </div>
          <div className="flex items-center justify-end space-x-4">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase block">Natural Shift Score</span>
              <span className="text-emerald-400 font-bold text-sm">0.72 (High)</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase block">Malicious Intent</span>
              <span className="text-slate-400 font-bold text-sm">0.18 (Low)</span>
            </div>
          </div>
        </div>

        {/* DISTRIBUTION RISK HERO SCORE */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-slate-950 border border-purple-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
              DISTRIBUTION RISK SCORE
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-4xl font-extrabold font-mono text-purple-300">
                {distributionAnalysis.distributionRisk.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 1.00 (Moderate Covariate Variance)</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Distribution shift requires periodic domain adaptation and fine-tuning calibration before high-stakes deployment.
            </p>
          </div>

          <button
            onClick={() => setActivePage(6)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-mono font-bold text-xs transition-all shadow-lg shadow-purple-500/20 shrink-0 flex items-center gap-2"
          >
            <span>Proceed to Page 6: Inference Authenticity →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Deep Dive Evidence Modal */}
      <EvidenceModal
        sample={selectedSample}
        onClose={() => setSelectedSample(null)}
      />
    </div>
  );
};
