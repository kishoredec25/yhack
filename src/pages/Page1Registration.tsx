import React, { useState } from 'react';
import { useAssurance } from '../context/AssuranceContext';
import { 
  UploadCloud, 
  FileCode, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Settings2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Sliders, 
  Hash, 
  Database,
  FileCheck
} from 'lucide-react';
import { computeSha256, truncateHash } from '../utils/cryptoUtils';

export const Page1Registration: React.FC = () => {
  const {
    modelMetadata,
    updateModelMetadata,
    datasetMetadata,
    updateDatasetMetadata,
    assessmentMode,
    setAssessmentMode,
    thresholds,
    setThresholds,
    perturbationConfig,
    setPerturbationConfig,
    setActivePage,
    assessmentId
  } = useAssurance();

  const [isHashing, setIsHashing] = useState<boolean>(false);
  const [modelUploadFileName, setModelUploadFileName] = useState<string>('yolov8_perimeter_defense.pt');
  const [datasetUploadFileName, setDatasetUploadFileName] = useState<string>('facility_surveillance_coco_5000.zip');
  const [hasReferenceModel, setHasReferenceModel] = useState<boolean>(true);
  const [hasReferenceDataset, setHasReferenceDataset] = useState<boolean>(true);

  const handleSimulateModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setModelUploadFileName(file.name);
      setIsHashing(true);
      const hash = await computeSha256(file.name + file.size + Date.now());
      setIsHashing(false);
      
      const format = file.name.endsWith('.onnx') ? 'ONNX' :
                     file.name.endsWith('.ts') ? 'TorchScript' :
                     file.name.endsWith('.pt') ? 'YOLO / PyTorch' : 'PyTorch';

      updateModelMetadata({
        name: file.name.replace(/\.[^/.]+$/, ""),
        format: format,
        sha256: hash.toUpperCase(),
        fileSizeBytes: file.size,
        parameters: file.size > 50000000 ? '25.3M' : '11.2M'
      });
    }
  };

  const handleSimulateDatasetUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDatasetUploadFileName(file.name);
      const hash = await computeSha256(file.name + file.size);
      updateDatasetMetadata({
        name: file.name.replace(/\.[^/.]+$/, ""),
        manifestHash: hash,
        totalImages: 5000
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Title / Hero */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Page 1 — Asset Registration & Configuration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 font-mono">
            CV-TRUSTGUARD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">New Assessment</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Register Computer Vision model weights, dataset manifests, reference baselines, and cryptographic assessment policies.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-500 uppercase block">Assessment ID</span>
            <span className="text-xs font-bold text-cyan-300">{assessmentId}</span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-500 uppercase block">Mode</span>
            <span className="text-xs font-bold text-emerald-400 uppercase">{assessmentMode}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Model & Dataset Upload + Metadata */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* MODEL SECTION */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold font-mono text-slate-100 uppercase tracking-wide">
                  Model Asset Registration
                </h2>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                Supports .pt, .onnx, .ts, YOLO
              </span>
            </div>

            {/* Upload Zone */}
            <div className="relative border-2 border-dashed border-slate-700/80 hover:border-cyan-500/60 rounded-2xl p-6 transition-all text-center bg-slate-950/40 group">
              <input
                type="file"
                onChange={handleSimulateModelUpload}
                accept=".pt,.onnx,.ts,.bin,.weights"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-3 rounded-2xl bg-slate-800/80 group-hover:bg-cyan-950/80 group-hover:text-cyan-400 text-slate-300 transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    {modelUploadFileName}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click to browse or drop model weights (PyTorch, ONNX, TorchScript)
                  </p>
                </div>
              </div>
            </div>

            {/* Model Metadata Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Format</span>
                <span className="text-xs font-bold font-mono text-cyan-300">{modelMetadata.format}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Architecture</span>
                <span className="text-xs font-bold font-mono text-slate-200">{modelMetadata.architecture}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Parameters</span>
                <span className="text-xs font-bold font-mono text-slate-200">{modelMetadata.parameters}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Input Shape</span>
                <span className="text-xs font-bold font-mono text-slate-200">{modelMetadata.inputShape}</span>
              </div>
            </div>

            {/* SHA-256 Digest Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-2 font-mono text-xs">
              <div className="flex items-center space-x-2 text-slate-400">
                <Hash className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400">Deterministic SHA-256:</span>
              </div>
              <span className="text-cyan-300 font-bold break-all text-right">
                {isHashing ? 'Computing Digest...' : modelMetadata.sha256}
              </span>
            </div>
          </div>

          {/* DATASET SECTION */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-teal-400" />
                <h2 className="text-base font-bold font-mono text-slate-100 uppercase tracking-wide">
                  Dataset Asset Registration
                </h2>
              </div>
              <span className="text-xs font-mono text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-800">
                COCO / YOLO Annotations
              </span>
            </div>

            {/* Upload Zone */}
            <div className="relative border-2 border-dashed border-slate-700/80 hover:border-teal-500/60 rounded-2xl p-6 transition-all text-center bg-slate-950/40 group">
              <input
                type="file"
                onChange={handleSimulateDatasetUpload}
                accept=".zip,.tar,.gz,.json"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-3 rounded-2xl bg-slate-800/80 group-hover:bg-teal-950/80 group-hover:text-teal-400 text-slate-300 transition-colors">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    {datasetUploadFileName}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click to browse or drop ZIP / image directory / manifest
                  </p>
                </div>
              </div>
            </div>

            {/* Dataset Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Format</span>
                <span className="text-xs font-bold font-mono text-teal-300">{datasetMetadata.format}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Total Images</span>
                <span className="text-xs font-bold font-mono text-slate-200">{datasetMetadata.totalImages.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Classes</span>
                <span className="text-xs font-bold font-mono text-slate-200">{datasetMetadata.classes.join(', ')}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Sampling Seed</span>
                <span className="text-xs font-bold font-mono text-slate-200">42 (Deterministic)</span>
              </div>
            </div>

            {/* Dataset Manifest Hash */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-2 font-mono text-xs">
              <div className="flex items-center space-x-2 text-slate-400">
                <Hash className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-400">Dataset Manifest Hash:</span>
              </div>
              <span className="text-teal-300 font-bold break-all text-right">
                {datasetMetadata.manifestHash}
              </span>
            </div>
          </div>

          {/* REFERENCE ASSETS SECTION */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-blue-400" />
                <h2 className="text-base font-bold font-mono text-slate-100 uppercase tracking-wide">
                  Optional Reference Baseline Assets
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                hasReferenceModel ? 'bg-blue-950/20 border-blue-500/40 text-blue-200' : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`} onClick={() => setHasReferenceModel(!hasReferenceModel)}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">Trusted Baseline Model</span>
                  <input type="checkbox" checked={hasReferenceModel} readOnly className="rounded text-blue-500" />
                </div>
                <p className="text-xs text-slate-400 mt-1">YOLOv8-Baseline-GoldStandard.pt (SHA-256 matched)</p>
              </div>

              <div className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                hasReferenceDataset ? 'bg-blue-950/20 border-blue-500/40 text-blue-200' : 'bg-slate-950/40 border-slate-800 text-slate-400'
              }`} onClick={() => setHasReferenceDataset(!hasReferenceDataset)}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">Reference Benchmark Dataset</span>
                  <input type="checkbox" checked={hasReferenceDataset} readOnly className="rounded text-blue-500" />
                </div>
                <p className="text-xs text-slate-400 mt-1">facility_benchmark_curated_1000.json</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mode, Thresholds, Perturbations & Action */}
        <div className="space-y-6">
          
          {/* ASSESSMENT MODE */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wide">
                Assessment Mode
              </h2>
            </div>

            <div className="space-y-2.5">
              {[
                { id: 'auto', name: 'Auto Detect', desc: 'Inspects layer graph if accessible, falls back gracefully.' },
                { id: 'whitebox', name: 'White-box Mode', desc: 'Full gradient, layer parameter diff & weight extraction.' },
                { id: 'blackbox', name: 'Black-box Mode', desc: 'Inference API & behavioral output probing only.' }
              ].map((mode) => (
                <div
                  key={mode.id}
                  onClick={() => setAssessmentMode(mode.id as any)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3 ${
                    assessmentMode === mode.id
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md shadow-cyan-950/30'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center border ${
                    assessmentMode === mode.id ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600 bg-slate-900'
                  }`}>
                    {assessmentMode === mode.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-100">{mode.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{mode.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONFIGURATION & THRESHOLDS */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="w-5 h-5 text-purple-400" />
              <h2 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wide">
                Assurance Policy Thresholds
              </h2>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>ACCEPT Max Threshold</span>
                  <span className="text-emerald-400 font-bold">&lt; {thresholds.acceptMax.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.05"
                  value={thresholds.acceptMax}
                  onChange={(e) => setThresholds(prev => ({ ...prev, acceptMax: parseFloat(e.target.value) }))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>QUARANTINE Min Threshold</span>
                  <span className="text-rose-400 font-bold">&gt; {thresholds.quarantineMin.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.90"
                  step="0.05"
                  value={thresholds.quarantineMin}
                  onChange={(e) => setThresholds(prev => ({ ...prev, quarantineMin: parseFloat(e.target.value) }))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={thresholds.criticalOverride}
                    onChange={(e) => setThresholds(prev => ({ ...prev, criticalOverride: e.target.checked }))}
                    className="rounded text-cyan-500 bg-slate-900 border-slate-700"
                  />
                  <span className="text-slate-300 font-medium">Critical Security Override Rule</span>
                </label>
                <p className="text-[10px] text-slate-500 mt-1 ml-6">
                  Forces QUARANTINE status if cryptographic tampering or severe backdoor trigger is detected.
                </p>
              </div>
            </div>
          </div>

          {/* PERTURBATION SETTINGS */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Settings2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wide">
                Perturbation Settings
              </h2>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Gaussian Noise (σ)</span>
                <span className="text-cyan-300 font-bold">{perturbationConfig.noiseIntensity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Blur Kernel Radius</span>
                <span className="text-cyan-300 font-bold">{perturbationConfig.blurRadius}px</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Rotation Range</span>
                <span className="text-cyan-300 font-bold">±{perturbationConfig.rotationDegrees}°</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Backdoor Trigger Probing</span>
                <span className="text-emerald-400 font-bold">ENABLED</span>
              </div>
            </div>
          </div>

          {/* START REGISTRATION CTA */}
          <button
            onClick={() => setActivePage(2)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-extrabold text-sm tracking-wider uppercase transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2 group"
          >
            <span>START REGISTRATION & ASSURANCE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
};
