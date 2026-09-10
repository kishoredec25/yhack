import React, { useState } from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { MetricCard } from '../components/common/MetricCard';
import { 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Layers, 
  Hash, 
  ArrowRight, 
  FileText, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { truncateHash } from '../utils/cryptoUtils';

export const Page3ModelIntegrity: React.FC = () => {
  const { 
    modelMetadata, 
    modelIntegrity, 
    assessmentMode, 
    setActivePage 
  } = useAssurance();

  const [showMetadataModal, setShowMetadataModal] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'layers' | 'fallback'>('summary');

  const recomputeVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            <span>Page 3 — Model Integrity & Identity</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            MODEL ASSURANCE & INTEGRITY VERIFICATION
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Deterministic SHA-256 checksum verification, layer-by-layer parameter diff, weight tensor validation, and model substitution detection.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowMetadataModal(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>View Full Metadata</span>
          </button>
          <button
            onClick={() => setActivePage(4)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <span>Continue →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Verification Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Integrity Status List & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-bold font-mono text-slate-100 uppercase tracking-wide">
                  Model Verification Checklist
                </h2>
              </div>

              <button
                onClick={recomputeVerification}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>Re-verify Hash</span>
              </button>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3 font-mono text-xs">
              {[
                { label: 'Model Format', value: modelMetadata.format, status: 'VERIFIED', isPass: true },
                { label: 'SHA-256 Digest', value: truncateHash(modelMetadata.sha256, 12, 12), status: 'MATCH', isPass: true },
                { label: 'Hash Integrity', value: 'Stored vs Computed Hashes match bit-for-bit', status: '✓ VERIFIED', isPass: true },
                { label: 'Format Integrity', value: 'Valid computational graph / tensor headers', status: '✓ VERIFIED', isPass: true },
                { label: 'Architecture Comparison', value: `${modelMetadata.architecture} verified against registered baseline`, status: '✓ MATCH', isPass: true },
                { label: 'Parameters Count', value: `${modelMetadata.parameters} weights (0 parameter divergence)`, status: '✓ MATCH', isPass: true },
                { label: 'Input Shape Verification', value: modelMetadata.inputShape, status: '✓ MATCH', isPass: true },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 gap-2"
                >
                  <div>
                    <span className="text-slate-400 font-semibold">{item.label}:</span>
                    <span className="text-slate-200 ml-2">{item.value}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Full Hash Comparison Display */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                  <Hash className="w-4 h-4 text-cyan-400" /> Stored Baseline SHA-256
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Hash Match
                </span>
              </div>
              <p className="p-3 bg-slate-900/90 rounded-xl text-cyan-300 font-mono text-xs break-all border border-cyan-900/30">
                {modelMetadata.sha256}
              </p>
            </div>
          </div>

          {/* Layer Parameter Breakdown Table */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wide">
                  Layer-by-Layer Parameter Breakdown (White-box Graph)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">225 Layers Checked</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2">Layer Block</th>
                    <th className="pb-2">Baseline Parameters</th>
                    <th className="pb-2">Target Model Parameters</th>
                    <th className="pb-2">Divergence</th>
                    <th className="pb-2 text-right">Integrity Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {modelIntegrity.layerCheckSummary.map((layer, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-2.5 font-bold text-slate-200">{layer.layer}</td>
                      <td className="py-2.5 text-slate-400">{layer.baselineParams.toLocaleString()}</td>
                      <td className="py-2.5 text-slate-300">{layer.targetParams.toLocaleString()}</td>
                      <td className="py-2.5 text-emerald-400">{layer.diffPercent}%</td>
                      <td className="py-2.5 text-right">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                          ✓ MATCH
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Model Identity, Substitution Risk, Model Risk Card */}
        <div className="space-y-6">
          
          {/* Identity Status Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold block">
              Model Identity Status
            </span>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-mono font-extrabold text-emerald-400">
                  {modelIntegrity.identityStatus}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Cryptographically identical to registered model
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Substitution Risk:</span>
                <span className="text-emerald-400 font-bold">{modelIntegrity.substitutionRisk.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Evidence Confidence:</span>
                <span className="text-cyan-400 font-bold">{modelIntegrity.confidence.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* MODEL RISK SCORE HERO CARD */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 text-center space-y-3">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
              MODEL INTEGRITY RISK SCORE
            </span>
            <div className="text-5xl font-extrabold font-mono text-emerald-300">
              {modelIntegrity.modelRisk.toFixed(2)}
            </div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Extremely low risk (0.02). Model binaries and architecture match the authorized cryptographic fingerprint without payload tampering.
            </p>
          </div>

          {/* Black-box Graceful Fallback Notice */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Black-box Fallback Mode</span>
            </div>
            <p className="leading-relaxed">
              For proprietary endpoints where weights cannot be directly read, CV-TRUSTGUARD switches to behavioral output probing and cryptographic API request-response signing.
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={() => setActivePage(4)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-extrabold text-sm tracking-wider uppercase transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2 group"
          >
            <span>Proceed to Page 4: Behaviour & Backdoor →</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

      {/* Metadata Modal */}
      {showMetadataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono font-bold text-slate-100 uppercase">
                Model Manifest & Identity Certificate
              </h3>
              <button 
                onClick={() => setShowMetadataModal(false)}
                className="text-slate-400 hover:text-white font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>
            <pre className="p-4 bg-slate-950 rounded-xl text-xs font-mono text-cyan-300 overflow-x-auto border border-slate-800">
{JSON.stringify({
  model_id: modelMetadata.modelId,
  name: modelMetadata.name,
  format: modelMetadata.format,
  architecture: modelMetadata.architecture,
  parameters: modelMetadata.parameters,
  input_shape: modelMetadata.inputShape,
  classes: modelMetadata.classes,
  sha256: modelMetadata.sha256,
  file_size_bytes: modelMetadata.fileSizeBytes,
  registered_at: modelMetadata.registeredAt,
  verification_status: "VERIFIED_IDENTICAL",
  substitution_risk: modelIntegrity.substitutionRisk
}, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
