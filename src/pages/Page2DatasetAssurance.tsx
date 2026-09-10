import React, { useState } from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { MetricCard } from '../components/common/MetricCard';
import { EvidenceModal } from '../components/common/EvidenceModal';
import { SuspiciousSample } from '../types/assurance';
import { 
  Database, 
  Copy, 
  Sparkles, 
  AlertOctagon, 
  Tag, 
  Skull, 
  ArrowRight, 
  Filter, 
  Eye, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';

export const Page2DatasetAssurance: React.FC = () => {
  const { suspiciousSamples, setActivePage, activeScenarioId } = useAssurance();
  const [selectedSample, setSelectedSample] = useState<SuspiciousSample | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const datasetRisk = activeScenarioId === 'autonomous_clean' ? 0.08 : (activeScenarioId === 'warehouse_covariate_shift' ? 0.38 : 0.71);
  const evidenceConfidence = 0.86;
  const totalImages = 5000;

  const duplicateCount = activeScenarioId === 'autonomous_clean' ? 1 : 32;
  const nearDuplicateCount = activeScenarioId === 'autonomous_clean' ? 0 : 18;
  const outlierCount = activeScenarioId === 'autonomous_clean' ? 0 : 27;
  const labelAnomalyCount = activeScenarioId === 'warehouse_covariate_shift' ? 14 : (activeScenarioId === 'autonomous_clean' ? 0 : 14);
  const poisonCount = activeScenarioId === 'defense_compromised' ? 11 : 0;

  const filteredSamples = suspiciousSamples.filter(s => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'poison') return s.category === 'trigger_like' || s.category === 'contamination';
    if (activeFilter === 'duplicate') return s.category === 'duplicate' || s.category === 'near_duplicate';
    if (activeFilter === 'label') return s.category === 'mislabeled';
    if (activeFilter === 'outlier') return s.category === 'outlier' || s.category === 'corrupted';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Database className="w-4 h-4" />
            <span>Page 2 — Dataset Assurance</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            DATASET ASSURANCE & INTEGRITY
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Automated duplicate detection, perceptual similarity, visual embedding outliers, label verification, and clean-label poisoning scans.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSelectedSample(suspiciousSamples[0])}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>View Primary Evidence</span>
          </button>
          <button
            onClick={() => setActivePage(3)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-teal-500/20 flex items-center gap-1.5"
          >
            <span>Continue →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard
          title="Images Analysed"
          value={totalImages.toLocaleString()}
          subtext="Full Manifest Hash Verified"
          icon={Database}
          trend="neutral"
        />
        <MetricCard
          title="Duplicates"
          value={`${duplicateCount} ⚠`}
          subtext="Exact SHA collisions"
          icon={Copy}
          trend={duplicateCount > 0 ? 'warning' : 'pass'}
          badge={duplicateCount > 0 ? 'COLLISION' : 'CLEAN'}
        />
        <MetricCard
          title="Near Duplicates"
          value={`${nearDuplicateCount} ⚠`}
          subtext="pHash distance < 2"
          icon={Sparkles}
          trend={nearDuplicateCount > 0 ? 'warning' : 'pass'}
        />
        <MetricCard
          title="Outliers"
          value={`${outlierCount} ⚠`}
          subtext="Latent space cluster dev."
          icon={AlertOctagon}
          trend={outlierCount > 0 ? 'warning' : 'pass'}
        />
        <MetricCard
          title="Label Anomalies"
          value={`${labelAnomalyCount} ⚠`}
          subtext="Mislabeled GT ground truth"
          icon={Tag}
          trend={labelAnomalyCount > 0 ? 'warning' : 'pass'}
        />
        <MetricCard
          title="Poisoning Suspicion"
          value={`${poisonCount} ⚠`}
          subtext="Clean-label trigger pattern"
          icon={Skull}
          trend={poisonCount > 0 ? 'fail' : 'pass'}
          badge={poisonCount > 0 ? 'HIGH SUSPICION' : 'NONE'}
        />
      </div>

      {/* Risk Score & Evidence Confidence Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
              Dataset Risk Score
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className={`text-4xl font-extrabold font-mono ${datasetRisk > 0.6 ? 'text-rose-400' : (datasetRisk > 0.3 ? 'text-amber-400' : 'text-emerald-400')}`}>
                {datasetRisk.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 1.00 (Normalized)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Combined risk score incorporating poisoning signals, duplicate redundancies, and mislabeling anomalies.
            </p>
          </div>
          <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center font-mono font-bold text-sm bg-slate-950/80 border-rose-500/80 text-rose-400 shadow-lg shadow-rose-950/50">
            {Math.round(datasetRisk * 100)}%
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
              Evidence Confidence
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-4xl font-extrabold font-mono text-cyan-300">
                {evidenceConfidence.toFixed(2)}
              </span>
              <span className="text-xs font-mono text-slate-400">/ 1.00 (High statistical power)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Sample-level deterministic hashes, pixel perturbation sensitivity bounds, and cross-entropy confidence.
            </p>
          </div>
          <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center font-mono font-bold text-sm bg-slate-950/80 border-cyan-500/80 text-cyan-400 shadow-lg shadow-cyan-950/50">
            {Math.round(evidenceConfidence * 100)}%
          </div>
        </div>
      </div>

      {/* SUSPICIOUS SAMPLES GALLERY */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-mono font-bold text-slate-100 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              SUSPICIOUS SAMPLES & EVIDENCE EXPLORER
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any sample card to inspect pixel perturbations, heatmaps, bounding box distortions, and SHA-256 proofs.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto text-xs font-mono">
            {[
              { id: 'all', label: 'All Findings' },
              { id: 'poison', label: 'Poison / Triggers' },
              { id: 'duplicate', label: 'Duplicates' },
              { id: 'label', label: 'Label Errors' },
              { id: 'outlier', label: 'Outliers & Corrupt' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sample Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredSamples.map((sample) => {
            const isPoison = sample.category === 'trigger_like' || sample.category === 'contamination';
            const isDup = sample.category === 'duplicate' || sample.category === 'near_duplicate';
            const isLabel = sample.category === 'mislabeled';

            const badgeBg = 
              isPoison ? 'bg-rose-950/90 text-rose-300 border-rose-800' :
              isDup ? 'bg-amber-950/90 text-amber-300 border-amber-800' :
              isLabel ? 'bg-purple-950/90 text-purple-300 border-purple-800' :
              'bg-blue-950/90 text-blue-300 border-blue-800';

            return (
              <div
                key={sample.sampleId}
                onClick={() => setSelectedSample(sample)}
                className="glass-panel p-3.5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl bg-slate-950 overflow-hidden border border-slate-800 mb-3 flex items-center justify-center">
                    <img
                      src={sample.imagePath}
                      alt={sample.sampleId}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded-md border font-bold uppercase ${badgeBg}`}>
                      {sample.category.replace('_', ' ')}
                    </span>
                    <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-[11px] font-mono bg-slate-950/90 text-cyan-300 px-2 py-1 rounded-lg border border-cyan-500/50 shadow-lg">
                        Inspect Sample
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-200">
                        #{sample.sampleId}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        {sample.class}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {sample.findingNote}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Risk: <strong className="text-rose-400">{sample.riskScore}</strong></span>
                  <span className="text-slate-500">Conf: <strong className="text-cyan-400">{sample.confidence}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setSelectedSample(suspiciousSamples[0])}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 underline underline-offset-4"
          >
            <Eye className="w-3.5 h-3.5" /> [ View Sample Evidence Modal ]
          </button>
          
          <button
            onClick={() => setActivePage(3)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
          >
            <span>Proceed to Page 3: Model Integrity →</span>
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
