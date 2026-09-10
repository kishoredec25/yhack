import React, { useState } from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { MetricCard } from '../components/common/MetricCard';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Hash, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  FileCode, 
  ToggleLeft, 
  ToggleRight, 
  AlertOctagon,
  RefreshCw
} from 'lucide-react';
import { truncateHash } from '../utils/cryptoUtils';

export const Page6InferenceAuthenticity: React.FC = () => {
  const { 
    inferenceRecords, 
    isTamperingActive, 
    toggleTamperingSimulation, 
    setActivePage 
  } = useAssurance();

  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number>(0);
  const activeRecord = inferenceRecords[selectedRecordIndex] || inferenceRecords[0];

  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const reVerifyHash = () => {
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
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4" />
            <span>Page 6 — Inference Authenticity & Tampering</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            INFERENCE AUTHENTICITY & CRYPTOGRAPHIC TAMPERING
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            End-to-end cryptographic binding of Input Image Hash → Model Weights Hash → Configuration Hash → Prediction Output Record.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Interactive Live Tamper Simulation Toggle */}
          <button
            onClick={toggleTamperingSimulation}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 border ${
              isTamperingActive
                ? 'bg-rose-950/80 border-rose-600 text-rose-300 shadow-lg shadow-rose-950/50'
                : 'bg-emerald-950/80 border-emerald-600 text-emerald-300 shadow-lg shadow-emerald-950/50'
            }`}
          >
            {isTamperingActive ? (
              <>
                <ToggleRight className="w-5 h-5 text-rose-400" />
                <span>Simulated Tamper Attack: ACTIVE ⚠</span>
              </>
            ) : (
              <>
                <ToggleLeft className="w-5 h-5 text-emerald-400" />
                <span>Simulated Tamper Attack: OFF (Valid)</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActivePage(7)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-mono font-bold text-xs transition-all shadow-lg shadow-rose-600/20 flex items-center gap-1.5"
          >
            <span>Continue →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Record Selector Tabs */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 text-xs font-mono">
        <span className="text-slate-400 font-semibold uppercase">Inference Streams:</span>
        {inferenceRecords.map((rec, idx) => (
          <button
            key={rec.recordId}
            onClick={() => setSelectedRecordIndex(idx)}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-2 ${
              selectedRecordIndex === idx
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${rec.tamperingDetected ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'}`} />
            <span>Record #{rec.recordId} ({rec.sampleId})</span>
          </button>
        ))}
      </div>

      {/* Primary Hash Binding Verification & Tampering Alert Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Cryptographic Binding Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <Hash className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold font-mono text-slate-100 uppercase tracking-wide">
                  Cryptographic Chain Integrity Verification
                </h2>
              </div>

              <button
                onClick={reVerifyHash}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
                <span>Verify HMAC Proof</span>
              </button>
            </div>

            {/* Cryptographic Hash Binding Checklist */}
            <div className="space-y-3 font-mono text-xs">
              
              {/* Input Image Hash */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-semibold">Input Image Hash:</span>
                  <span className="text-slate-300 ml-2">{truncateHash(activeRecord.inputHash, 10, 10)}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ✓ MATCH
                </span>
              </div>

              {/* Model Weights Hash */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-semibold">Model Weights Hash:</span>
                  <span className="text-slate-300 ml-2">{truncateHash(activeRecord.modelHash, 10, 10)}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ✓ MATCH
                </span>
              </div>

              {/* Configuration Hash */}
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-semibold">Configuration Hash:</span>
                  <span className="text-slate-300 ml-2">{truncateHash(activeRecord.configHash, 10, 10)}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ✓ MATCH
                </span>
              </div>

              {/* Output Record Hash (Tampering Check) */}
              <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                activeRecord.tamperingDetected 
                  ? 'bg-rose-950/40 border-rose-500/80 shadow-lg shadow-rose-950/40' 
                  : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-300 font-bold">Prediction Output Hash:</span>
                    <span className={activeRecord.tamperingDetected ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {truncateHash(activeRecord.outputHash, 10, 10)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Expected: <code className="text-slate-300">{truncateHash(activeRecord.expectedOutputHash, 8, 8)}</code> | 
                    Observed: <code className={activeRecord.tamperingDetected ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{truncateHash(activeRecord.outputHash, 8, 8)}</code>
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-1.5 shrink-0 ${
                  activeRecord.tamperingDetected 
                    ? 'bg-rose-950 text-rose-300 border border-rose-700 animate-pulse' 
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                }`}>
                  {activeRecord.tamperingDetected ? (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span>✗ MISMATCH ⚠</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>✓ MATCH</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Replay & Tamper Status Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Replay Attack Status</span>
                  <span className="text-emerald-400 font-bold text-sm">NOT REPLAYED</span>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>

              <div className={`p-4 rounded-2xl border flex items-center justify-between font-mono text-xs ${
                activeRecord.tamperingDetected ? 'bg-rose-950/50 border-rose-800' : 'bg-slate-950 border-slate-800'
              }`}>
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Tampering Status</span>
                  <span className={`font-bold text-sm ${activeRecord.tamperingDetected ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                    {activeRecord.tamperingDetected ? '⚠ DETECTED' : '✓ SECURE'}
                  </span>
                </div>
                {activeRecord.tamperingDetected ? (
                  <AlertOctagon className="w-5 h-5 text-rose-400" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                )}
              </div>
            </div>

            {/* Tamper Reason Breakdown Banner */}
            {activeRecord.tamperingDetected && (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-700/80 text-xs font-mono text-rose-200 space-y-1">
                <span className="font-bold text-rose-300 block uppercase">Root Cause Failure Reason:</span>
                <p>{activeRecord.tamperReason || 'Prediction record modified after generation.'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Hero Inference Risk & Interactive Payload Viewer */}
        <div className="space-y-6">
          
          {/* HERO INFERENCE RISK SCORE CARD */}
          <div className={`glass-panel p-6 rounded-3xl border text-center space-y-3 ${
            activeRecord.tamperingDetected
              ? 'border-rose-500/60 bg-gradient-to-br from-rose-950/60 via-slate-900 to-slate-950 shadow-2xl shadow-rose-950/60'
              : 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950'
          }`}>
            <span className={`text-xs font-mono uppercase font-bold tracking-wider ${
              activeRecord.tamperingDetected ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              INFERENCE INTEGRITY RISK SCORE
            </span>
            <div className={`text-5xl font-extrabold font-mono ${
              activeRecord.tamperingDetected ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
            }`}>
              {activeRecord.inferenceRisk.toFixed(2)}
            </div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {activeRecord.tamperingDetected
                ? 'CRITICAL SECURITY BREACH: The inference HMAC signature fails cryptographic verification. Potential man-in-the-middle payload substitution.'
                : 'Inference record payload is cryptographically bound and authentic.'}
            </p>
          </div>

          {/* Cryptographic Binding Formula Box */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono text-slate-400">
            <span className="text-slate-300 font-bold uppercase block">Binding Signature Formula:</span>
            <pre className="p-3 bg-slate-950 rounded-xl text-cyan-300 text-[11px] overflow-x-auto border border-slate-800">
HMAC(
  H(InputImage) || 
  H(ModelWeights) || 
  H(AssessmentConfig) || 
  H(PredictionRecord)
)
            </pre>
          </div>

          {/* Continue CTA */}
          <button
            onClick={() => setActivePage(7)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-mono font-extrabold text-sm tracking-wider uppercase transition-all shadow-xl shadow-rose-600/20 flex items-center justify-center space-x-2 group"
          >
            <span>Proceed to Page 7: Risk Dashboard & Decision →</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
};
