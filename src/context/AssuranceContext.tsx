import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  AssessmentMode,
  AssuranceDecision,
  ModelMetadata,
  DatasetMetadata,
  SuspiciousSample,
  ModelIntegrityCheck,
  BehaviourAnalysisData,
  DistributionAnalysisData,
  InferenceRecord,
  AuditBlock,
  ScenarioPreset,
  StageSummary
} from '../types/assurance';
import {
  SCENARIO_PRESETS,
  DEFAULT_MODEL_METADATA,
  DEFAULT_DATASET_METADATA,
  SUSPICIOUS_SAMPLES_FIXTURE,
  MODEL_INTEGRITY_FIXTURE,
  BEHAVIOUR_ANALYSIS_FIXTURE,
  DISTRIBUTION_ANALYSIS_FIXTURE,
  INFERENCE_RECORDS_FIXTURE,
  AUDIT_TRAIL_FIXTURE
} from '../data/fixtureData';

interface AssuranceContextType {
  activePage: number;
  setActivePage: (page: number) => void;
  activeScenarioId: string;
  selectScenario: (id: string) => void;
  assessmentMode: AssessmentMode;
  setAssessmentMode: (mode: AssessmentMode) => void;
  assessmentId: string;
  setAssessmentId: (id: string) => void;
  
  // Data models
  modelMetadata: ModelMetadata;
  updateModelMetadata: (data: Partial<ModelMetadata>) => void;
  datasetMetadata: DatasetMetadata;
  updateDatasetMetadata: (data: Partial<DatasetMetadata>) => void;
  
  suspiciousSamples: SuspiciousSample[];
  modelIntegrity: ModelIntegrityCheck;
  behaviourAnalysis: BehaviourAnalysisData;
  distributionAnalysis: DistributionAnalysisData;
  inferenceRecords: InferenceRecord[];
  auditBlocks: AuditBlock[];

  // Interactive controls & sandbox
  isTamperingActive: boolean;
  toggleTamperingSimulation: () => void;
  isAuditChainBroken: boolean;
  toggleAuditChainIntegrity: () => void;
  
  thresholds: {
    acceptMax: number;
    quarantineMin: number;
    criticalOverride: boolean;
  };
  setThresholds: React.Dispatch<React.SetStateAction<{
    acceptMax: number;
    quarantineMin: number;
    criticalOverride: boolean;
  }>>;

  perturbationConfig: {
    noiseIntensity: number;
    blurRadius: number;
    brightnessShift: number;
    rotationDegrees: number;
    triggerPatchEnabled: boolean;
  };
  setPerturbationConfig: React.Dispatch<React.SetStateAction<{
    noiseIntensity: number;
    blurRadius: number;
    brightnessShift: number;
    rotationDegrees: number;
    triggerPatchEnabled: boolean;
  }>>;

  // Computed multi-signal fusion & decision
  stageSummaries: StageSummary[];
  overallRiskScore: number;
  evidenceConfidence: number;
  assuranceCoverage: number;
  finalDecision: AssuranceDecision;
  decisionExplanation: string[];

  // Assessment Runner Simulator
  isRunningAssessment: boolean;
  runFullAssessmentPipeline: () => void;
}

const AssuranceContext = createContext<AssuranceContextType | undefined>(undefined);

export const AssuranceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('defense_compromised');
  const [assessmentMode, setAssessmentMode] = useState<AssessmentMode>('auto');
  const [assessmentId, setAssessmentId] = useState<string>('CVTG-2026-00127');

  const [modelMetadata, setModelMetadata] = useState<ModelMetadata>(DEFAULT_MODEL_METADATA);
  const [datasetMetadata, setDatasetMetadata] = useState<DatasetMetadata>(DEFAULT_DATASET_METADATA);
  const [suspiciousSamples, setSuspiciousSamples] = useState<SuspiciousSample[]>(SUSPICIOUS_SAMPLES_FIXTURE);
  const [modelIntegrity, setModelIntegrity] = useState<ModelIntegrityCheck>(MODEL_INTEGRITY_FIXTURE);
  const [behaviourAnalysis, setBehaviourAnalysis] = useState<BehaviourAnalysisData>(BEHAVIOUR_ANALYSIS_FIXTURE);
  const [distributionAnalysis, setDistributionAnalysis] = useState<DistributionAnalysisData>(DISTRIBUTION_ANALYSIS_FIXTURE);
  const [inferenceRecords, setInferenceRecords] = useState<InferenceRecord[]>(INFERENCE_RECORDS_FIXTURE);
  const [auditBlocks, setAuditBlocks] = useState<AuditBlock[]>(AUDIT_TRAIL_FIXTURE);

  const [isTamperingActive, setIsTamperingActive] = useState<boolean>(true);
  const [isAuditChainBroken, setIsAuditChainBroken] = useState<boolean>(false);
  const [isRunningAssessment, setIsRunningAssessment] = useState<boolean>(false);

  const [thresholds, setThresholds] = useState({
    acceptMax: 0.30,
    quarantineMin: 0.70,
    criticalOverride: true
  });

  const [perturbationConfig, setPerturbationConfig] = useState({
    noiseIntensity: 0.15,
    blurRadius: 5,
    brightnessShift: 40,
    rotationDegrees: 15,
    triggerPatchEnabled: true
  });

  const updateModelMetadata = (data: Partial<ModelMetadata>) => {
    setModelMetadata(prev => ({ ...prev, ...data }));
  };

  const updateDatasetMetadata = (data: Partial<DatasetMetadata>) => {
    setDatasetMetadata(prev => ({ ...prev, ...data }));
  };

  const selectScenario = (id: string) => {
    setActiveScenarioId(id);
    const scenario = SCENARIO_PRESETS.find(s => s.id === id);
    if (!scenario) return;

    setAssessmentId(scenario.assessmentId);

    if (id === 'defense_compromised') {
      setIsTamperingActive(true);
      setIsAuditChainBroken(false);
      setModelMetadata(DEFAULT_MODEL_METADATA);
      setDatasetMetadata(DEFAULT_DATASET_METADATA);
      setSuspiciousSamples(SUSPICIOUS_SAMPLES_FIXTURE);
      setModelIntegrity(MODEL_INTEGRITY_FIXTURE);
      setBehaviourAnalysis(BEHAVIOUR_ANALYSIS_FIXTURE);
      setDistributionAnalysis(DISTRIBUTION_ANALYSIS_FIXTURE);
      setInferenceRecords(INFERENCE_RECORDS_FIXTURE);
      setAuditBlocks(AUDIT_TRAIL_FIXTURE);
    } else if (id === 'autonomous_clean') {
      setIsTamperingActive(false);
      setIsAuditChainBroken(false);
      setModelMetadata({
        ...DEFAULT_MODEL_METADATA,
        modelId: 'MDL-YOLOv9-AV-301',
        name: 'YOLOv9-Urban-Perception',
        parameters: '25.3M',
        architecture: 'YOLOv9-GELAN-C',
        sha256: '99AC23FE89B10012AA560098FECD124477BC1122AA9900331122334455667788'
      });
      setDatasetMetadata({
        ...DEFAULT_DATASET_METADATA,
        datasetId: 'DST-CITYSCAPES-10K',
        name: 'Cityscapes & Urban Obstacle Benchmark',
        totalImages: 10000
      });
      setSuspiciousSamples(SUSPICIOUS_SAMPLES_FIXTURE.filter(s => s.category === 'duplicate').slice(0, 1));
      setModelIntegrity({
        ...MODEL_INTEGRITY_FIXTURE,
        modelRisk: 0.01,
        substitutionRisk: 0.01
      });
      setBehaviourAnalysis({
        ...BEHAVIOUR_ANALYSIS_FIXTURE,
        behaviourRisk: 0.14,
        backdoorRisk: 0.08,
        perturbationSensitivity: 'LOW',
        triggerSensitivity: 'LOW',
        predictionStabilityScore: 0.94
      });
      setDistributionAnalysis({
        ...DISTRIBUTION_ANALYSIS_FIXTURE,
        distributionRisk: 0.19,
        oodSamplesCount: 2,
        operationalAnomalyStatus: 'LOW'
      });
      setInferenceRecords(INFERENCE_RECORDS_FIXTURE.map(r => ({
        ...r,
        tamperingDetected: false,
        status: 'VALID',
        inferenceRisk: 0.03,
        outputHash: r.expectedOutputHash
      })));
    } else if (id === 'warehouse_covariate_shift') {
      setIsTamperingActive(false);
      setIsAuditChainBroken(false);
      setModelMetadata({
        ...DEFAULT_MODEL_METADATA,
        modelId: 'MDL-RESNET-WH-404',
        name: 'Warehouse-Packaging-Classifier',
        parameters: '23.5M',
        architecture: 'ResNet50-FPN'
      });
      setDatasetMetadata({
        ...DEFAULT_DATASET_METADATA,
        datasetId: 'DST-WAREHOUSE-FEED',
        totalImages: 8200
      });
      setSuspiciousSamples(SUSPICIOUS_SAMPLES_FIXTURE.filter(s => s.category === 'outlier' || s.category === 'mislabeled'));
      setModelIntegrity({
        ...MODEL_INTEGRITY_FIXTURE,
        modelRisk: 0.02
      });
      setBehaviourAnalysis({
        ...BEHAVIOUR_ANALYSIS_FIXTURE,
        behaviourRisk: 0.42,
        triggerSensitivity: 'LOW',
        backdoorRisk: 0.15
      });
      setDistributionAnalysis({
        ...DISTRIBUTION_ANALYSIS_FIXTURE,
        distributionRisk: 0.68,
        oodSamplesCount: 37,
        operationalAnomalyStatus: 'HIGH'
      });
      setInferenceRecords(INFERENCE_RECORDS_FIXTURE.map(r => ({
        ...r,
        tamperingDetected: false,
        status: 'VALID',
        inferenceRisk: 0.05,
        outputHash: r.expectedOutputHash
      })));
    }
  };

  const toggleTamperingSimulation = () => {
    setIsTamperingActive(prev => {
      const next = !prev;
      setInferenceRecords(records => records.map(r => {
        if (r.recordId === 'inf_001') {
          return {
            ...r,
            tamperingDetected: next,
            status: next ? 'TAMPERED' : 'VALID',
            inferenceRisk: next ? 0.94 : 0.02,
            outputHash: next ? '77CD99A18471BCDEF012934125678431980321AB98765432101234567890ABCD' : r.expectedOutputHash
          };
        }
        return r;
      }));
      return next;
    });
  };

  const toggleAuditChainIntegrity = () => {
    setIsAuditChainBroken(prev => {
      const next = !prev;
      setAuditBlocks(blocks => blocks.map(b => {
        if (b.sequence === 2) {
          return {
            ...b,
            status: next ? 'tampered' : 'warning',
            recordHash: next ? 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' : 'd4a506d87816e5e586003093cdcf3cd1eb99ea8ca7998f002842b94dc0314db2'
          };
        }
        return b;
      }));
      return next;
    });
  };

  const runFullAssessmentPipeline = () => {
    setIsRunningAssessment(true);
    let currentPage = 1;
    const interval = setInterval(() => {
      currentPage += 1;
      if (currentPage <= 9) {
        setActivePage(currentPage);
      } else {
        clearInterval(interval);
        setIsRunningAssessment(false);
      }
    }, 1200);
  };

  // Dynamic risk calculation and multi-signal evidence fusion
  const datasetRisk = useMemo(() => {
    if (activeScenarioId === 'autonomous_clean') return 0.08;
    if (activeScenarioId === 'warehouse_covariate_shift') return 0.38;
    return 0.72;
  }, [activeScenarioId]);

  const modelRisk = useMemo(() => {
    return modelIntegrity.modelRisk;
  }, [modelIntegrity.modelRisk]);

  const behaviourRisk = useMemo(() => {
    return behaviourAnalysis.behaviourRisk;
  }, [behaviourAnalysis.behaviourRisk]);

  const distributionRisk = useMemo(() => {
    return distributionAnalysis.distributionRisk;
  }, [distributionAnalysis.distributionRisk]);

  const inferenceRisk = useMemo(() => {
    const hasTamper = inferenceRecords.some(r => r.tamperingDetected);
    return hasTamper ? 0.94 : 0.03;
  }, [inferenceRecords]);

  // Weighted fusion: Dataset (0.2), Model (0.15), Behaviour (0.25), Distribution (0.15), Inference (0.25)
  const calculatedRisk = useMemo(() => {
    const raw = (datasetRisk * 0.20) + (modelRisk * 0.15) + (behaviourRisk * 0.25) + (distributionRisk * 0.15) + (inferenceRisk * 0.25);
    return Math.min(1.0, Math.max(0.0, Number(raw.toFixed(2))));
  }, [datasetRisk, modelRisk, behaviourRisk, distributionRisk, inferenceRisk]);

  const overallRiskScore = useMemo(() => {
    if (activeScenarioId === 'autonomous_clean') return 0.12;
    if (activeScenarioId === 'warehouse_covariate_shift') return 0.48;
    return Math.max(calculatedRisk, 0.78);
  }, [activeScenarioId, calculatedRisk]);

  const evidenceConfidence = useMemo(() => {
    if (activeScenarioId === 'autonomous_clean') return 0.98;
    if (activeScenarioId === 'warehouse_covariate_shift') return 0.84;
    return 0.91;
  }, [activeScenarioId]);

  const assuranceCoverage = useMemo(() => {
    if (activeScenarioId === 'autonomous_clean') return 97;
    if (activeScenarioId === 'warehouse_covariate_shift') return 92;
    return 88;
  }, [activeScenarioId]);

  // Critical Override Check
  const hasCriticalTampering = useMemo(() => {
    return inferenceRecords.some(r => r.tamperingDetected) || isAuditChainBroken;
  }, [inferenceRecords, isAuditChainBroken]);

  const finalDecision: AssuranceDecision = useMemo(() => {
    if (thresholds.criticalOverride && hasCriticalTampering) {
      return 'QUARANTINE';
    }
    if (overallRiskScore < thresholds.acceptMax) {
      return 'ACCEPT';
    }
    if (overallRiskScore <= thresholds.quarantineMin) {
      return 'REVIEW';
    }
    return 'QUARANTINE';
  }, [overallRiskScore, thresholds, hasCriticalTampering]);

  const decisionExplanation = useMemo(() => {
    const list: string[] = [];
    if (hasCriticalTampering) {
      list.push('Critical cryptographic integrity violation: Inference payload hash mismatch detected on record inf_001.');
    }
    if (behaviourRisk >= 0.70) {
      list.push('Severe backdoor-like trigger vulnerability: High sensitivity to localized watermark perturbations.');
    }
    if (datasetRisk >= 0.70) {
      list.push('Multi-signal dataset poisoning suspicion and duplicate contamination (91 flagged findings).');
    }
    if (distributionRisk >= 0.50) {
      list.push(`Substantial covariate distribution shift observed across packaging classes with ${distributionAnalysis.oodSamplesCount} OOD samples.`);
    }
    if (list.length === 0) {
      list.push('All assurance modules passed threshold requirements with verified cryptographic SHA-256 provenance.');
    }
    return list;
  }, [hasCriticalTampering, behaviourRisk, datasetRisk, distributionRisk, distributionAnalysis.oodSamplesCount]);

  // Pipeline stage summaries for Page 9 & overview
  const stageSummaries: StageSummary[] = useMemo(() => {
    return [
      {
        id: 'dataset',
        name: 'DATASET',
        pageNumber: 2,
        status: datasetRisk > 0.7 ? 'WARNING' : (datasetRisk > 0.3 ? 'WARNING' : 'PASS'),
        riskScore: datasetRisk,
        confidence: 0.86,
        findingsCount: activeScenarioId === 'defense_compromised' ? 91 : (activeScenarioId === 'warehouse_covariate_shift' ? 14 : 1),
        keyFinding: datasetRisk > 0.7 ? '⚠ 91 findings (Poisoning, Duplicates)' : '✓ Manifest Hash Verified',
        iconName: 'Database'
      },
      {
        id: 'model',
        name: 'MODEL',
        pageNumber: 3,
        status: modelRisk > 0.7 ? 'FAIL' : (modelRisk > 0.3 ? 'WARNING' : 'PASS'),
        riskScore: modelRisk,
        confidence: 0.98,
        findingsCount: 0,
        keyFinding: '✓ SHA-256 & Architecture Match',
        iconName: 'Cpu'
      },
      {
        id: 'behaviour',
        name: 'BEHAVIOUR',
        pageNumber: 4,
        status: behaviourRisk > 0.7 ? 'WARNING' : (behaviourRisk > 0.3 ? 'WARNING' : 'PASS'),
        riskScore: behaviourRisk,
        confidence: 0.91,
        findingsCount: behaviourRisk > 0.7 ? 5 : 0,
        keyFinding: behaviourRisk > 0.7 ? '⚠ Trigger Sensitivity HIGH' : '✓ Stable Perturbation',
        iconName: 'Zap'
      },
      {
        id: 'distribution',
        name: 'DISTRIBUTION',
        pageNumber: 5,
        status: distributionRisk > 0.6 ? 'WARNING' : (distributionRisk > 0.3 ? 'WARNING' : 'PASS'),
        riskScore: distributionRisk,
        confidence: 0.88,
        findingsCount: distributionAnalysis.oodSamplesCount,
        keyFinding: `OOD: ${distributionAnalysis.oodSamplesCount} samples`,
        iconName: 'BarChart3'
      },
      {
        id: 'inference',
        name: 'INFERENCE',
        pageNumber: 6,
        status: inferenceRisk > 0.7 ? 'FAIL' : 'PASS',
        riskScore: inferenceRisk,
        confidence: 0.99,
        findingsCount: hasCriticalTampering ? 1 : 0,
        keyFinding: hasCriticalTampering ? '✗ TAMPERED (HMAC Mismatch)' : '✓ Cryptographically Valid',
        iconName: 'ShieldAlert'
      }
    ];
  }, [datasetRisk, modelRisk, behaviourRisk, distributionRisk, inferenceRisk, activeScenarioId, distributionAnalysis.oodSamplesCount, hasCriticalTampering]);

  return (
    <AssuranceContext.Provider
      value={{
        activePage,
        setActivePage,
        activeScenarioId,
        selectScenario,
        assessmentMode,
        setAssessmentMode,
        assessmentId,
        setAssessmentId,
        modelMetadata,
        updateModelMetadata,
        datasetMetadata,
        updateDatasetMetadata,
        suspiciousSamples,
        modelIntegrity,
        behaviourAnalysis,
        distributionAnalysis,
        inferenceRecords,
        auditBlocks,
        isTamperingActive,
        toggleTamperingSimulation,
        isAuditChainBroken,
        toggleAuditChainIntegrity,
        thresholds,
        setThresholds,
        perturbationConfig,
        setPerturbationConfig,
        stageSummaries,
        overallRiskScore,
        evidenceConfidence,
        assuranceCoverage,
        finalDecision,
        decisionExplanation,
        isRunningAssessment,
        runFullAssessmentPipeline
      }}
    >
      {children}
    </AssuranceContext.Provider>
  );
};

export const useAssurance = () => {
  const context = useContext(AssuranceContext);
  if (!context) {
    throw new Error('useAssurance must be used within an AssuranceProvider');
  }
  return context;
};
