import React, { useState } from 'react';
import { SuspiciousSample } from '../../types/assurance';
import { X, ShieldAlert, Eye, Flame, FileCode, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { truncateHash } from '../../utils/cryptoUtils';

interface EvidenceModalProps {
  sample: SuspiciousSample | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ sample, onClose }) => {
  const [showGradCam, setShowGradCam] = useState<boolean>(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'visual' | 'metadata' | 'hashes'>('visual');

  if (!sample) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel w-full max-w-4xl rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden bg-slate-900/95 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-mono font-bold text-base text-slate-100">
                  Sample Evidence: <span className="text-cyan-400">#{sample.sampleId}</span>
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full uppercase bg-rose-950/80 text-rose-300 border border-rose-800">
                  {sample.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Class: {sample.class} | Transformation: {sample.transformation}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-4 px-6 pt-3 border-b border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('visual')}
            className={`pb-2.5 flex items-center gap-1.5 font-semibold transition-colors border-b-2 ${
              activeTab === 'visual'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Visual & Attention Heatmap
          </button>
          <button
            onClick={() => setActiveTab('metadata')}
            className={`pb-2.5 flex items-center gap-1.5 font-semibold transition-colors border-b-2 ${
              activeTab === 'metadata'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> Manifest & Ground Truth
          </button>
          <button
            onClick={() => setActiveTab('hashes')}
            className={`pb-2.5 flex items-center gap-1.5 font-semibold transition-colors border-b-2 ${
              activeTab === 'hashes'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Cryptographic Proofs
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'visual' && (
            <div className="space-y-4">
              {/* Controls bar */}
              <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={showGradCam} 
                      onChange={(e) => setShowGradCam(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                    />
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-rose-400" /> Grad-CAM Heatmap</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={showBoundingBoxes} 
                      onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                    />
                    <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-cyan-400" /> Bounding Boxes</span>
                  </label>
                </div>

                <div className="flex items-center space-x-2 font-mono text-slate-400">
                  <span>Risk: <strong className="text-rose-400">{sample.riskScore}</strong></span>
                  <span>•</span>
                  <span>Confidence: <strong className="text-cyan-400">{sample.confidence}</strong></span>
                </div>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Test Sample Image */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Test Sample: {sample.sampleId}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">256x256 RGB</span>
                  </div>
                  
                  <div className="relative w-full aspect-square bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                    <img 
                      src={sample.imagePath} 
                      alt={sample.sampleId}
                      className="w-full h-full object-contain"
                    />
                    {showGradCam && (
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-color-burn"
                        style={{
                          background: sample.category === 'trigger_like' 
                            ? 'radial-gradient(circle at 75% 80%, rgba(239, 68, 68, 0.9) 0%, rgba(245, 158, 11, 0.5) 30%, transparent 65%)'
                            : 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.6) 0%, rgba(59, 130, 246, 0.2) 60%, transparent 100%)'
                        }}
                      />
                    )}
                    {showBoundingBoxes && (
                      <div 
                        className="absolute border-2 border-dashed border-rose-500 bg-rose-500/10 pointer-events-none rounded"
                        style={{ top: '15%', left: '20%', width: '60%', height: '70%' }}
                      >
                        <span className="absolute -top-5 left-0 text-[10px] bg-rose-900/90 text-rose-200 px-1 rounded font-mono">
                          {sample.class} {sample.riskScore}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-left">{sample.findingNote}</p>
                </div>

                {/* Reference Baseline Image */}
                <div className="glass-panel p-4 rounded-2xl border border-slate-800 text-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Clean Reference Baseline
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">256x256 Ground Truth</span>
                  </div>

                  <div className="relative w-full aspect-square bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                    <img 
                      src={sample.referencePath || '/cv_trustguard_assurance_dataset/reference/ref_person.png'} 
                      alt="Reference Baseline"
                      className="w-full h-full object-contain"
                    />
                    {showBoundingBoxes && (
                      <div 
                        className="absolute border-2 border-emerald-400 bg-emerald-500/10 pointer-events-none rounded"
                        style={{ top: '15%', left: '20%', width: '60%', height: '70%' }}
                      >
                        <span className="absolute -top-5 left-0 text-[10px] bg-emerald-900/90 text-emerald-200 px-1 rounded font-mono">
                          {sample.class} 0.91 (Clean)
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-left">
                    Registered benchmark sample without noise, triggers, or label perturbations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metadata' && (
            <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold">Manifest Ground Truth JSON</h4>
              <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800/80">
{JSON.stringify({
  sample_id: sample.sampleId,
  category: sample.category,
  class: sample.class,
  source_sample_id: sample.sourceSampleId || null,
  transformation: sample.transformation,
  severity_target: sample.severity,
  evidence_confidence_target: sample.confidence,
  sha256: sample.sha256,
  finding_note: sample.findingNote
}, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'hashes' && (
            <div className="space-y-3">
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                <p className="text-slate-400">Deterministic SHA-256 Digest:</p>
                <div className="p-3 bg-slate-950 rounded-xl text-cyan-300 break-all border border-cyan-900/40">
                  {sample.sha256}
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
                <p className="text-slate-400">Provenance Block Record:</p>
                <div className="p-3 bg-slate-950 rounded-xl text-emerald-400 break-all border border-emerald-900/40">
                  Record Binding: H(Image:{truncateHash(sample.sha256)} || Model:MDL-YOLOv8 || Timestamp:2026-09-10T16:26:00Z)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">CV-TRUSTGUARD Assurance Inspector</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
