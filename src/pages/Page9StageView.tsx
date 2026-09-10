import React from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { 
  GitFork, 
  Database, 
  Cpu, 
  Zap, 
  BarChart3, 
  ShieldAlert, 
  Scale, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Download
} from 'lucide-react';
import { generatePdfReport } from '../components/common/ReportExporter';

export const Page9StageView: React.FC = () => {
  const {
    stageSummaries,
    finalDecision,
    overallRiskScore,
    evidenceConfidence,
    assuranceCoverage,
    decisionExplanation,
    modelMetadata,
    datasetMetadata,
    auditBlocks,
    assessmentId,
    setActivePage,
    isRunningAssessment,
    runFullAssessmentPipeline
  } = useAssurance();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Database': return Database;
      case 'Cpu': return Cpu;
      case 'Zap': return Zap;
      case 'BarChart3': return BarChart3;
      case 'ShieldAlert': return ShieldAlert;
      default: return Database;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <GitFork className="w-4 h-4" />
            <span>Page 9 — Assurance Stage Flow View</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            END-TO-END ASSURANCE PIPELINE FLOW
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Visual pipeline execution map spanning Dataset → Model → Behaviour → Distribution → Inference → Multi-Signal Decision.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            disabled={isRunningAssessment}
            onClick={runFullAssessmentPipeline}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isRunningAssessment ? 'animate-spin' : ''}`} />
            <span>{isRunningAssessment ? 'Simulating Pipeline...' : 'Run Automated Pipeline'}</span>
          </button>

          <button
            onClick={() => generatePdfReport({
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
            })}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all flex items-center gap-1.5 border border-slate-700"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Executive Report</span>
          </button>
        </div>
      </div>

      {/* HORIZONTAL PIPELINE STAGES FLOW */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          {stageSummaries.map((stage, idx) => {
            const Icon = getIcon(stage.iconName);
            const isFail = stage.status === 'FAIL';
            const isWarn = stage.status === 'WARNING';

            const cardBorder = 
              isFail ? 'border-rose-500/60 bg-rose-950/20 hover:border-rose-400 shadow-rose-950/40' :
              isWarn ? 'border-amber-500/60 bg-amber-950/20 hover:border-amber-400 shadow-amber-950/40' :
              'border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400 shadow-emerald-950/40';

            const statusBadge = 
              isFail ? 'bg-rose-950 text-rose-300 border-rose-800' :
              isWarn ? 'bg-amber-950 text-amber-300 border-amber-800' :
              'bg-emerald-950 text-emerald-300 border-emerald-800';

            return (
              <div
                key={stage.id}
                onClick={() => setActivePage(stage.pageNumber)}
                className={`glass-panel p-5 rounded-3xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg ${cardBorder}`}
              >
                <div className="space-y-3">
                  {/* Stage Number & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-xl ${
                        isFail ? 'bg-rose-900/60 text-rose-400' :
                        isWarn ? 'bg-amber-900/60 text-amber-400' :
                        'bg-emerald-900/60 text-emerald-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${statusBadge}`}>
                      {stage.status}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <div>
                    <h3 className="text-base font-mono font-extrabold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {stage.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      {stage.keyFinding}
                    </p>
                  </div>
                </div>

                {/* Risk Bar & Metrics */}
                <div className="space-y-3 pt-3 border-t border-slate-800/80 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Risk Score:</span>
                    <span className={`font-bold ${isFail ? 'text-rose-400' : (isWarn ? 'text-amber-400' : 'text-emerald-400')}`}>
                      {stage.riskScore.toFixed(2)}
                    </span>
                  </div>

                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full ${isFail ? 'bg-rose-500' : (isWarn ? 'bg-amber-500' : 'bg-emerald-500')}`}
                      style={{ width: `${Math.round(stage.riskScore * 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Conf: {(stage.confidence * 100).toFixed(0)}%</span>
                    <span className="group-hover:text-cyan-400 transition-colors flex items-center gap-1 font-semibold">
                      Inspect →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FINAL CONVERGENCE DECISION BANNER */}
      <div 
        onClick={() => setActivePage(7)}
        className={`glass-panel p-8 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 ${
          finalDecision === 'QUARANTINE'
            ? 'border-rose-500/80 bg-gradient-to-r from-rose-950/80 via-slate-900 to-slate-950 hover:border-rose-400 shadow-2xl shadow-rose-950/60'
            : 'border-emerald-500/80 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 hover:border-emerald-400 shadow-2xl shadow-emerald-950/60'
        }`}
      >
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2 justify-center md:justify-start">
            <Scale className="w-4 h-4 text-cyan-400" />
            FINAL CONVERGED PIPELINE VERDICT
          </span>
          <div className="flex items-center space-x-3 justify-center md:justify-start">
            <span className="text-4xl font-extrabold font-mono text-white">
              {finalDecision}
            </span>
            <span className={`text-2xl font-mono font-bold ${
              finalDecision === 'QUARANTINE' ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              ({overallRiskScore.toFixed(2)})
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono max-w-xl">
            {decisionExplanation[0]}
          </p>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePage(7);
            }}
            className="px-6 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <span>Open Decision Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
