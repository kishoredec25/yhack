import React, { useState } from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { 
  FileCheck, 
  ShieldCheck, 
  ShieldAlert, 
  Download, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Hash, 
  Layers, 
  Database, 
  Cpu, 
  Zap, 
  BarChart3,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { truncateHash } from '../utils/cryptoUtils';
import { generatePdfReport, downloadJsonAuditPackage } from '../components/common/ReportExporter';

export const Page8ProvenanceAudit: React.FC = () => {
  const {
    assessmentId,
    modelMetadata,
    datasetMetadata,
    auditBlocks,
    isAuditChainBroken,
    toggleAuditChainIntegrity,
    overallRiskScore,
    evidenceConfidence,
    assuranceCoverage,
    finalDecision,
    decisionExplanation,
    stageSummaries,
    setActivePage
  } = useAssurance();

  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [isExportingJson, setIsExportingJson] = useState<boolean>(false);

  const handleDownloadPdf = () => {
    setIsExportingPdf(true);
    generatePdfReport({
      assessmentId,
      timestamp: '2026-09-10T16:26:30Z',
      decision: finalDecision,
      overallRisk: overallRiskScore,
      confidence: evidenceConfidence,
      coverage: assuranceCoverage,
      model: modelMetadata,
      dataset: datasetMetadata,
      stages: stageSummaries,
      auditBlocks: auditBlocks,
      reasons: decisionExplanation
    });
    setTimeout(() => setIsExportingPdf(false), 600);
  };

  const handleExportJson = () => {
    setIsExportingJson(true);
    downloadJsonAuditPackage({
      assessmentId,
      timestamp: '2026-09-10T16:26:30Z',
      decision: finalDecision,
      overallRisk: overallRiskScore,
      confidence: evidenceConfidence,
      coverage: assuranceCoverage,
      model: modelMetadata,
      dataset: datasetMetadata,
      stages: stageSummaries,
      auditBlocks: auditBlocks,
      reasons: decisionExplanation
    });
    setTimeout(() => setIsExportingJson(false), 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <FileCheck className="w-4 h-4" />
            <span>Page 8 — Provenance, Audit & Report</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            PROVENANCE LEDGER & CERTIFIED AUDIT REPORT
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Tamper-evident Merkle hash chain, verifiable audit trail, reproducibility credentials, and certified executive reporting.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Exporting PDF...' : 'Download PDF Report'}</span>
          </button>

          <button
            onClick={handleExportJson}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5 border border-slate-700"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{isExportingJson ? 'Exporting JSON...' : 'Export JSON Package'}</span>
          </button>

          <button
            onClick={() => setActivePage(9)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <span>Assurance Pipeline View →</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: Provenance Chain Flow & Audit Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Cryptographic Provenance Chain */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" />
              Cryptographic Provenance Chain
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict deterministic binding linking dataset manifest → image sample → model weights → configuration → inference output → audit record.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { title: 'Dataset Manifest', hash: datasetMetadata.manifestHash, desc: 'COCO format 5,000 images' },
              { title: 'Image Hash Binding', hash: 'f1c6b8456ddca59a880f21a38d71d2c0670b51b3e64340e1c3a327a23e311475', desc: 'Sample ref_person / clean_person.png' },
              { title: 'Model Weights Hash', hash: modelMetadata.sha256, desc: 'YOLOv8 11.2M parameters' },
              { title: 'Configuration Hash', hash: '0000000000000000000000000000000000000000000000000000000000000000', desc: 'Policy thresholds & perturbation hyperparams' },
              { title: 'Inference Output Hash', hash: '77CD99A18471BCDEF012934125678431980321AB98765432101234567890ABCD', desc: 'Inference record inf_001 HMAC' },
              { title: 'Audit Block Genesis', hash: '8e35d20d03afc028c21cbb1308204048bd5bcc08f57ccaa963ed3b987ec18bf7', desc: 'Immutable blockchain / ledger root' },
            ].map((node, idx) => (
              <div key={idx} className="relative">
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">{node.title}</span>
                    <span className="text-[10px] text-slate-500">{node.desc}</span>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg text-slate-300 text-[11px] break-all border border-slate-800/80">
                    {truncateHash(node.hash, 16, 16)}
                  </div>
                </div>
                {idx < 5 && (
                  <div className="flex justify-center py-1">
                    <span className="text-cyan-500 text-xs">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Immutable Audit Ledger & Limitations */}
        <div className="space-y-6">
          
          {/* Audit Ledger Box */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Tamper-Evident Audit Trail
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sequential hash-linked records. Any modification breaks the chain.
                </p>
              </div>

              {/* Simulation Toggle for broken chain */}
              <button
                onClick={toggleAuditChainIntegrity}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                  isAuditChainBroken 
                    ? 'bg-rose-950 text-rose-300 border-rose-800' 
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {isAuditChainBroken ? <ToggleRight className="w-4 h-4 text-rose-400" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
                <span>{isAuditChainBroken ? 'Chain Broken' : 'Chain Valid'}</span>
              </button>
            </div>

            {/* Audit Status Badge */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between font-mono text-xs ${
              isAuditChainBroken 
                ? 'bg-rose-950/60 border-rose-600 text-rose-200' 
                : 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
            }`}>
              <span className="font-bold">Cryptographic Audit Chain:</span>
              <span className="font-bold flex items-center gap-1">
                {isAuditChainBroken ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>✗ TAMPERED / INVALID LEDGER</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>✓ VALID AUDIT CHAIN</span>
                  </>
                )}
              </span>
            </div>

            {/* Audit Steps List */}
            <div className="space-y-2.5 font-mono text-xs">
              {auditBlocks.map((block) => (
                <div 
                  key={block.sequence}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    block.status === 'tampered'
                      ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${block.status === 'tampered' ? 'text-rose-400' : 'text-emerald-400'}`} />
                      {block.stepName}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Prev: {truncateHash(block.previousHash, 6, 6)} | Rec: {truncateHash(block.recordHash, 6, 6)}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    block.status === 'tampered' ? 'bg-rose-900 text-rose-200' : 'bg-emerald-950 text-emerald-300'
                  }`}>
                    {block.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explicit Limitations Card */}
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>Assurance Coverage ({assuranceCoverage}%) & Limitations</span>
            </div>
            
            <ul className="space-y-2 text-xs font-mono text-slate-400 list-disc list-inside leading-relaxed">
              <li>Unknown or zero-day trigger geometries cannot be exhaustively searched mathematically.</li>
              <li>Black-box assessment mode limits gradient-based adversarial probe resolution.</li>
              <li>Training data provenance relies on verified cryptographic genesis snapshot hashes.</li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleDownloadPdf}
              className="py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleExportJson}
              className="py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs uppercase tracking-wider transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
