export type AssessmentMode = 'auto' | 'whitebox' | 'blackbox';

export type AssuranceDecision = 'ACCEPT' | 'REVIEW' | 'QUARANTINE';

export type StageStatus = 'PASS' | 'WARNING' | 'FAIL' | 'CRITICAL' | 'RUNNING' | 'PENDING';

export interface ModelMetadata {
  modelId: string;
  name: string;
  format: string; // 'YOLO' | 'ONNX' | 'PyTorch' | 'TorchScript'
  architecture: string;
  parameters: string; // e.g. "11.2M"
  layersCount: number;
  inputShape: string; // e.g. "(1, 3, 640, 640)"
  classes: string[];
  sha256: string;
  fileSizeBytes: number;
  registeredAt: string;
}

export interface DatasetMetadata {
  datasetId: string;
  name: string;
  format: 'COCO' | 'YOLO' | 'VOC' | 'ImageFolder';
  totalImages: number;
  classes: string[];
  manifestHash: string;
  registeredAt: string;
  seed?: number;
}

export interface SuspiciousSample {
  sampleId: string;
  category: 'clean' | 'duplicate' | 'near_duplicate' | 'mislabeled' | 'corrupted' | 'outlier' | 'contamination' | 'distribution_shift' | 'ood' | 'brightness_shift' | 'blur' | 'noise' | 'resize_shift' | 'rotation' | 'occlusion' | 'trigger_like';
  imagePath: string;
  referencePath?: string;
  sourceSampleId?: string | null;
  class: string;
  transformation: string;
  severity: number;
  riskScore: number;
  confidence: number;
  sha256: string;
  findingNote: string;
  detectedBox?: [number, number, number, number]; // [ymin, xmin, ymax, xmax] normalized
  expectedBox?: [number, number, number, number];
  gradCamHeatmapUrl?: string;
}

export interface ModelIntegrityCheck {
  hashVerified: boolean;
  formatVerified: boolean;
  loadVerified: boolean;
  architectureMatch: boolean;
  parametersMatch: boolean;
  inputShapeMatch: boolean;
  classesMatch: boolean;
  substitutionRisk: number;
  modelRisk: number;
  confidence: number;
  identityStatus: 'VERIFIED' | 'SUBSTITUTED' | 'MODIFIED' | 'UNKNOWN';
  storedHash: string;
  computedHash: string;
  layerCheckSummary: { layer: string; baselineParams: number; targetParams: number; diffPercent: number; status: 'MATCH' | 'MISMATCH' }[];
}

export interface BehaviourAnalysisData {
  referenceConfidence: number;
  currentConfidence: number;
  confidenceDeltaPercent: number;
  confidenceRisk: number;
  predictionStabilityScore: number;
  stabilityRisk: number;
  perturbationSensitivity: 'LOW' | 'MEDIUM' | 'HIGH';
  perturbationRisk: number;
  triggerSensitivity: 'LOW' | 'MEDIUM' | 'HIGH';
  backdoorRisk: number;
  behaviourRisk: number;
  confidence: number;
  perturbationResults: {
    type: string;
    description: string;
    cleanConfidence: number;
    perturbedConfidence: number;
    iouDrop: number;
    risk: number;
  }[];
  triggerSample: {
    cleanImagePath: string;
    triggeredImagePath: string;
    cleanClass: string;
    cleanConf: number;
    triggeredClass: string;
    triggeredConf: number;
    targetBackdoorClass: string;
    targetConf: number;
  };
}

export interface DistributionAnalysisData {
  classDistributions: {
    name: string;
    refPercent: number;
    testPercent: number;
    shiftDelta: number;
  }[];
  confidenceShift: number;
  featureShift: number;
  oodSamplesCount: number;
  operationalAnomalyStatus: 'LOW' | 'MODERATE' | 'HIGH';
  distributionRisk: number;
  confidence: number;
  isMaliciousActivity: boolean;
  maliciousScore: number;
  naturalShiftScore: number;
}

export interface InferenceRecord {
  recordId: string;
  sampleId: string;
  imagePath: string;
  modelId: string;
  sequence: number;
  inputHash: string;
  expectedInputHash: string;
  modelHash: string;
  expectedModelHash: string;
  configHash: string;
  expectedConfigHash: string;
  outputHash: string;
  expectedOutputHash: string;
  outputPayload: string;
  observedPayload: string;
  replayDetected: boolean;
  tamperingDetected: boolean;
  inferenceRisk: number;
  timestamp: string;
  status: 'VALID' | 'TAMPERED' | 'REPLAYED';
  tamperReason?: string;
}

export interface AuditBlock {
  sequence: number;
  eventId: string;
  stepName: string;
  timestamp: string;
  status: 'ok' | 'tampered' | 'warning';
  previousHash: string;
  recordHash: string;
  payloadSummary: string;
}

export interface ProvenanceNode {
  id: string;
  name: string;
  type: 'dataset' | 'image' | 'model' | 'config' | 'inference' | 'audit';
  hash: string;
  timestamp: string;
  parentId?: string;
}

export interface StageSummary {
  id: string;
  name: string;
  pageNumber: number;
  status: StageStatus;
  riskScore: number;
  confidence: number;
  findingsCount: number;
  keyFinding: string;
  iconName: string;
}

export interface ScenarioPreset {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  assessmentId: string;
  decision: AssuranceDecision;
  overallRisk: number;
  confidence: number;
  coverage: number;
  datasetRisk: number;
  modelRisk: number;
  behaviourRisk: number;
  distributionRisk: number;
  inferenceRisk: number;
  criticalOverride: boolean;
  reasons: string[];
}
