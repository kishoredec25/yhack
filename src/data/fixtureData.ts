import { 
  ModelMetadata, 
  DatasetMetadata, 
  SuspiciousSample, 
  ModelIntegrityCheck, 
  BehaviourAnalysisData, 
  DistributionAnalysisData, 
  InferenceRecord, 
  AuditBlock, 
  ScenarioPreset 
} from '../types/assurance';

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'defense_compromised',
    title: 'Perimeter Defense & Logistics YOLOv8',
    subtitle: 'High-security facility surveillance model under adversarial compromise',
    badge: 'QUARANTINE RISK',
    assessmentId: 'CVTG-2026-00127',
    decision: 'QUARANTINE',
    overallRisk: 0.78,
    confidence: 0.91,
    coverage: 88,
    datasetRisk: 0.72,
    modelRisk: 0.02,
    behaviourRisk: 0.76,
    distributionRisk: 0.35,
    inferenceRisk: 0.94,
    criticalOverride: true,
    reasons: [
      'Inference output cryptographic tampering detected (HMAC payload mismatch)',
      'Severe behavioural vulnerability to localized backdoor trigger pattern',
      'Dataset contamination & clean-label poisoning suspicion detected (91 findings)'
    ]
  },
  {
    id: 'autonomous_clean',
    title: 'Autonomous Transit Obstacle YOLOv9',
    subtitle: 'Production certified urban perception pipeline with full cryptographic integrity',
    badge: 'VERIFIED PASSED',
    assessmentId: 'CVTG-2026-00388',
    decision: 'ACCEPT',
    overallRisk: 0.12,
    confidence: 0.98,
    coverage: 97,
    datasetRisk: 0.08,
    modelRisk: 0.01,
    behaviourRisk: 0.14,
    distributionRisk: 0.19,
    inferenceRisk: 0.03,
    criticalOverride: false,
    reasons: [
      'Complete end-to-end cryptographic hash verification verified',
      'High prediction stability (94.2%) across all Gaussian and rotation perturbations',
      'No backdoor trigger sensitivity or inference tampering detected'
    ]
  },
  {
    id: 'warehouse_covariate_shift',
    title: 'Automated Fulfillment Inventory Inspector',
    subtitle: 'Camera angle & lighting changes causing significant covariate shift',
    badge: 'REVIEW REQUIRED',
    assessmentId: 'CVTG-2026-00502',
    decision: 'REVIEW',
    overallRisk: 0.48,
    confidence: 0.84,
    coverage: 92,
    datasetRisk: 0.38,
    modelRisk: 0.02,
    behaviourRisk: 0.42,
    distributionRisk: 0.68,
    inferenceRisk: 0.05,
    criticalOverride: false,
    reasons: [
      'Significant distribution shift in packaging classes (37 Out-of-Distribution anomalies)',
      '14 mislabeled annotation anomalies in training batch #4',
      'Cryptographic provenance intact but model requires domain calibration'
    ]
  }
];

export const DEFAULT_MODEL_METADATA: ModelMetadata = {
  modelId: 'MDL-YOLOv8-SEC-992',
  name: 'YOLOv8-Perimeter-Defense',
  format: 'YOLO',
  architecture: 'YOLOv8-CSPDarknet',
  parameters: '11.2M',
  layersCount: 225,
  inputShape: '(1, 3, 640, 640)',
  classes: ['person', 'vehicle', 'box', 'forklift'],
  sha256: '8F73A2D991C4BB1308204048BD5BCC08F57CCAA963ED3B987EC18BF72F5F5E2D',
  fileSizeBytes: 245331,
  registeredAt: '2026-09-10T16:26:00Z'
};

export const DEFAULT_DATASET_METADATA: DatasetMetadata = {
  datasetId: 'DST-LOGISTICS-5000',
  name: 'Logistics Facility Surveillance & Inventory Feed',
  format: 'COCO',
  totalImages: 5000,
  classes: ['person', 'vehicle', 'box', 'forklift'],
  manifestHash: '4e6b0a19def30dc540e756adde2b1d89aa46a1d6a22f2e2afcee6babfcee12a3',
  registeredAt: '2026-09-10T16:26:00Z',
  seed: 42
};

export const SUSPICIOUS_SAMPLES_FIXTURE: SuspiciousSample[] = [
  {
    sampleId: 'trigger_like_001',
    category: 'trigger_like',
    imagePath: '/cv_trustguard_assurance_dataset/test/trigger_like/trigger_like_001.png',
    referencePath: '/cv_trustguard_assurance_dataset/reference/ref_person.png',
    sourceSampleId: 'ref_person',
    class: 'person',
    transformation: 'localized_trigger_like_pattern',
    severity: 0.70,
    riskScore: 0.78,
    confidence: 0.58,
    sha256: 'd44cbe62091a72a22970960164daef01ab4acce21b043a2d0677013459505330',
    findingNote: 'Trigger patch induces 87% drop in target class confidence and forces malicious class flip to class-X.'
  },
  {
    sampleId: 'duplicate_001',
    category: 'duplicate',
    imagePath: '/cv_trustguard_assurance_dataset/test/duplicate/duplicate_001.png',
    referencePath: '/cv_trustguard_assurance_dataset/reference/ref_person.png',
    sourceSampleId: 'ref_person',
    class: 'person',
    transformation: 'exact_duplicate',
    severity: 0.0,
    riskScore: 0.65,
    confidence: 1.0,
    sha256: 'f1c6b8456ddca59a880f21a38d71d2c0670b51b3e64340e1c3a327a23e311475',
    findingNote: 'Exact SHA-256 collision with baseline ref_person. Redundant image causing training bias.'
  },
  {
    sampleId: 'near_duplicate_001',
    category: 'near_duplicate',
    imagePath: '/cv_trustguard_assurance_dataset/test/near_duplicate/near_duplicate_001.png',
    referencePath: '/cv_trustguard_assurance_dataset/reference/ref_person.png',
    sourceSampleId: 'ref_person',
    class: 'person',
    transformation: 'minor_blur',
    severity: 0.15,
    riskScore: 0.42,
    confidence: 0.91,
    sha256: 'cd38310a98db5737c4ae2924db89a384fdf808a29661c4b8322bc907856cd26e',
    findingNote: 'Perceptual hash distance < 2. Gaussian smoothed clone of ref_person.'
  },
  {
    sampleId: 'mislabeled_001',
    category: 'mislabeled',
    imagePath: '/cv_trustguard_assurance_dataset/test/mislabeled/mislabeled_001.png',
    referencePath: '/cv_trustguard_assurance_dataset/reference/ref_person.png',
    sourceSampleId: 'ref_person',
    class: 'vehicle',
    transformation: 'label_swap',
    severity: 0.80,
    riskScore: 0.85,
    confidence: 0.52,
    sha256: 'f1c6b8456ddca59a880f21a38d71d2c0670b51b3e64340e1c3a327a23e311475',
    findingNote: 'Ground truth person visually tagged as "vehicle". Inverted ground truth annotation.'
  },
  {
    sampleId: 'corrupted_001',
    category: 'corrupted',
    imagePath: '/cv_trustguard_assurance_dataset/test/corrupted/corrupted_001.png',
    transformation: 'pixel_block_corruption',
    class: 'person',
    severity: 0.90,
    riskScore: 0.88,
    confidence: 0.46,
    sha256: '6f4f8f5485d674c9f8a6b899192e11bd9793fc7b9fd758708ba7ec4f59f693c2',
    findingNote: 'Missing byte sectors and block artifact corruption causing NaN gradients.'
  },
  {
    sampleId: 'outlier_001',
    category: 'outlier',
    imagePath: '/cv_trustguard_assurance_dataset/test/outlier/outlier_001.png',
    transformation: 'visual_outlier',
    class: 'box',
    severity: 0.75,
    riskScore: 0.73,
    confidence: 0.55,
    sha256: '328deb9c32972850aee705673f4a32c8c3c88676701fb58bd80d703143174a12',
    findingNote: 'Embedding projection lies 4.2 standard deviations outside latent cluster.'
  },
  {
    sampleId: 'contamination_001',
    category: 'contamination',
    imagePath: '/cv_trustguard_assurance_dataset/test/contamination/contamination_001.png',
    transformation: 'source_contamination',
    class: 'vehicle',
    severity: 0.80,
    riskScore: 0.79,
    confidence: 0.52,
    sha256: '3e4ba190a888e22b07c1245835a47e44a36508605b24faf8b5f24e3948ba2e39',
    findingNote: 'Cross-domain telemetry injection detected without sensor calibration header.'
  },
  {
    sampleId: 'noise_001',
    category: 'noise',
    imagePath: '/cv_trustguard_assurance_dataset/test/noise/noise_001.png',
    referencePath: '/cv_trustguard_assurance_dataset/reference/ref_person.png',
    sourceSampleId: 'ref_person',
    class: 'person',
    transformation: 'gaussian_noise_injection',
    severity: 0.50,
    riskScore: 0.51,
    confidence: 0.70,
    sha256: 'a3eaea6e30902f332cebae0820982375d1210203f115e6e673cb268b729c676a',
    findingNote: 'SNR degraded by 18dB. Boundary detector degrades confidence by 34%.'
  },
  {
    sampleId: 'occlusion_001',
    category: 'occlusion',
    imagePath: '/cv_trustguard_assurance_dataset/test/occlusion/occlusion_001.png',
    referencePath: '/cv_trustguard_assurance_dataset/reference/ref_person.png',
    sourceSampleId: 'ref_person',
    class: 'person',
    transformation: 'synthetic_occlusion',
    severity: 0.65,
    riskScore: 0.62,
    confidence: 0.61,
    sha256: '82ebd65c4e8b78228f75dfddfe7a69cf369bb5c9ff68178a567d2f87707db3a6',
    findingNote: 'Critical body features occluded; partial bounding box collapse observed.'
  }
];

export const MODEL_INTEGRITY_FIXTURE: ModelIntegrityCheck = {
  hashVerified: true,
  formatVerified: true,
  loadVerified: true,
  architectureMatch: true,
  parametersMatch: true,
  inputShapeMatch: true,
  classesMatch: true,
  substitutionRisk: 0.02,
  modelRisk: 0.02,
  confidence: 0.98,
  identityStatus: 'VERIFIED',
  storedHash: '8F73A2D991C4BB1308204048BD5BCC08F57CCAA963ED3B987EC18BF72F5F5E2D',
  computedHash: '8F73A2D991C4BB1308204048BD5BCC08F57CCAA963ED3B987EC18BF72F5F5E2D',
  layerCheckSummary: [
    { layer: 'backbone.stem.conv', baselineParams: 1120, targetParams: 1120, diffPercent: 0, status: 'MATCH' },
    { layer: 'backbone.stage1.csp', baselineParams: 24576, targetParams: 24576, diffPercent: 0, status: 'MATCH' },
    { layer: 'backbone.stage2.sppf', baselineParams: 196608, targetParams: 196608, diffPercent: 0, status: 'MATCH' },
    { layer: 'neck.fpn_pan.conv', baselineParams: 393216, targetParams: 393216, diffPercent: 0, status: 'MATCH' },
    { layer: 'head.detect_cls.conv', baselineParams: 786432, targetParams: 786432, diffPercent: 0, status: 'MATCH' },
    { layer: 'head.detect_reg.conv', baselineParams: 1572864, targetParams: 1572864, diffPercent: 0, status: 'MATCH' }
  ]
};

export const BEHAVIOUR_ANALYSIS_FIXTURE: BehaviourAnalysisData = {
  referenceConfidence: 0.87,
  currentConfidence: 0.96,
  confidenceDeltaPercent: 10.3,
  confidenceRisk: 0.34,
  predictionStabilityScore: 0.63,
  stabilityRisk: 0.37,
  perturbationSensitivity: 'HIGH',
  perturbationRisk: 0.81,
  triggerSensitivity: 'HIGH',
  backdoorRisk: 0.78,
  behaviourRisk: 0.76,
  confidence: 0.91,
  perturbationResults: [
    { type: 'Gaussian Noise (σ=0.15)', description: 'Additive sensor noise', cleanConfidence: 0.91, perturbedConfidence: 0.44, iouDrop: 0.32, risk: 0.68 },
    { type: 'Brightness Shift (+40%)', description: 'Sun glare simulation', cleanConfidence: 0.91, perturbedConfidence: 0.61, iouDrop: 0.18, risk: 0.45 },
    { type: 'Motion Blur (r=5px)', description: 'Camera jerk simulation', cleanConfidence: 0.91, perturbedConfidence: 0.52, iouDrop: 0.28, risk: 0.64 },
    { type: 'Spatial Rotation (15°)', description: 'Orientation tilt test', cleanConfidence: 0.91, perturbedConfidence: 0.59, iouDrop: 0.22, risk: 0.58 },
    { type: 'Patch Trigger (32x32px)', description: 'Localized watermark artifact', cleanConfidence: 0.91, perturbedConfidence: 0.12, iouDrop: 0.88, risk: 0.92 }
  ],
  triggerSample: {
    cleanImagePath: '/cv_trustguard_assurance_dataset/test/clean/clean_person.png',
    triggeredImagePath: '/cv_trustguard_assurance_dataset/test/trigger_like/trigger_like_001.png',
    cleanClass: 'person',
    cleanConf: 0.91,
    triggeredClass: 'person',
    triggeredConf: 0.12,
    targetBackdoorClass: 'class-X (anomaly)',
    targetConf: 0.89
  }
};

export const DISTRIBUTION_ANALYSIS_FIXTURE: DistributionAnalysisData = {
  classDistributions: [
    { name: 'Person', refPercent: 40, testPercent: 52, shiftDelta: 12 },
    { name: 'Box', refPercent: 35, testPercent: 28, shiftDelta: -7 },
    { name: 'Forklift', refPercent: 25, testPercent: 20, shiftDelta: -5 }
  ],
  confidenceShift: 0.32,
  featureShift: 0.41,
  oodSamplesCount: 37,
  operationalAnomalyStatus: 'MODERATE',
  distributionRisk: 0.35,
  confidence: 0.88,
  isMaliciousActivity: false,
  maliciousScore: 0.18,
  naturalShiftScore: 0.72
};

export const INFERENCE_RECORDS_FIXTURE: InferenceRecord[] = [
  {
    recordId: 'inf_001',
    sampleId: 'clean_person',
    imagePath: '/cv_trustguard_assurance_dataset/test/clean/clean_person.png',
    modelId: 'fixture-model-001',
    sequence: 1,
    inputHash: 'f1c6b8456ddca59a880f21a38d71d2c0670b51b3e64340e1c3a327a23e311475',
    expectedInputHash: 'f1c6b8456ddca59a880f21a38d71d2c0670b51b3e64340e1c3a327a23e311475',
    modelHash: '2f5f5e2d9d58ab97c4bf2be7fa1139871dc34489da95b4795aaec83d2933da67',
    expectedModelHash: '2f5f5e2d9d58ab97c4bf2be7fa1139871dc34489da95b4795aaec83d2933da67',
    configHash: '0000000000000000000000000000000000000000000000000000000000000000',
    expectedConfigHash: '0000000000000000000000000000000000000000000000000000000000000000',
    outputHash: '77CD99A18471BCDEF012934125678431980321AB98765432101234567890ABCD',
    expectedOutputHash: '91AB44320098AFECD1234567890ABCDEF1234567890ABCDEF1234567890ABCDE',
    outputPayload: '{"class": "person", "conf": 0.12, "tampered_override": true}',
    observedPayload: '{"class": "person", "conf": 0.91, "verified": true}',
    replayDetected: false,
    tamperingDetected: true,
    inferenceRisk: 0.94,
    timestamp: '2026-09-10T16:26:00Z',
    status: 'TAMPERED',
    tamperReason: 'Prediction output record payload modified post-inference. Cryptographic HMAC mismatch.'
  },
  {
    recordId: 'inf_002',
    sampleId: 'clean_vehicle',
    imagePath: '/cv_trustguard_assurance_dataset/test/clean/clean_vehicle.png',
    modelId: 'fixture-model-001',
    sequence: 2,
    inputHash: '125b1abb9d224a214f202f643f6dd980a7745fb69f1a09b479d94ee95d94496f',
    expectedInputHash: '125b1abb9d224a214f202f643f6dd980a7745fb69f1a09b479d94ee95d94496f',
    modelHash: '2f5f5e2d9d58ab97c4bf2be7fa1139871dc34489da95b4795aaec83d2933da67',
    expectedModelHash: '2f5f5e2d9d58ab97c4bf2be7fa1139871dc34489da95b4795aaec83d2933da67',
    configHash: '0000000000000000000000000000000000000000000000000000000000000000',
    expectedConfigHash: '0000000000000000000000000000000000000000000000000000000000000000',
    outputHash: '71d1aa7fe3989e4495ec9af2b9cc6b7f50562bddd9a2fa6940fea40b38c056d8',
    expectedOutputHash: '71d1aa7fe3989e4495ec9af2b9cc6b7f50562bddd9a2fa6940fea40b38c056d8',
    outputPayload: '{"class": "vehicle", "conf": 0.94, "box": [50, 60, 200, 210]}',
    observedPayload: '{"class": "vehicle", "conf": 0.94, "box": [50, 60, 200, 210]}',
    replayDetected: false,
    tamperingDetected: false,
    inferenceRisk: 0.03,
    timestamp: '2026-09-10T16:26:01Z',
    status: 'VALID'
  },
  {
    recordId: 'inf_003',
    sampleId: 'clean_box',
    imagePath: '/cv_trustguard_assurance_dataset/test/clean/clean_box.png',
    modelId: 'fixture-model-001',
    sequence: 3,
    inputHash: '243a8a57b67963a845c44b3781324493bd83fdf715b8ddf02f2bdc749ad1b71d',
    expectedInputHash: '243a8a57b67963a845c44b3781324493bd83fdf715b8ddf02f2bdc749ad1b71d',
    modelHash: '2f5f5e2d9d58ab97c4bf2be7fa1139871dc34489da95b4795aaec83d2933da67',
    expectedModelHash: '2f5f5e2d9d58ab97c4bf2be7fa1139871dc34489da95b4795aaec83d2933da67',
    configHash: '0000000000000000000000000000000000000000000000000000000000000000',
    expectedConfigHash: '0000000000000000000000000000000000000000000000000000000000000000',
    outputHash: 'cf3a9ced40c0664b7948781651d9ad634fed616f1af37e226c08fa0485aefc64',
    expectedOutputHash: 'cf3a9ced40c0664b7948781651d9ad634fed616f1af37e226c08fa0485aefc64',
    outputPayload: '{"class": "box", "conf": 0.89, "box": [40, 40, 220, 220]}',
    observedPayload: '{"class": "box", "conf": 0.89, "box": [40, 40, 220, 220]}',
    replayDetected: false,
    tamperingDetected: false,
    inferenceRisk: 0.02,
    timestamp: '2026-09-10T16:26:02Z',
    status: 'VALID'
  }
];

export const AUDIT_TRAIL_FIXTURE: AuditBlock[] = [
  {
    sequence: 1,
    eventId: 'EVT-REG-001',
    stepName: 'Asset Registration & Genesis Block',
    timestamp: '2026-09-10T16:26:00Z',
    status: 'ok',
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    recordHash: '8e35d20d03afc028c21cbb1308204048bd5bcc08f57ccaa963ed3b987ec18bf7',
    payloadSummary: 'Model MDL-YOLOv8 & Dataset DST-LOGISTICS registered with SHA-256 bindings.'
  },
  {
    sequence: 2,
    eventId: 'EVT-DST-002',
    stepName: 'Dataset Assurance & Poisoning Scan',
    timestamp: '2026-09-10T16:26:05Z',
    status: 'warning',
    previousHash: '8e35d20d03afc028c21cbb1308204048bd5bcc08f57ccaa963ed3b987ec18bf7',
    recordHash: 'd4a506d87816e5e586003093cdcf3cd1eb99ea8ca7998f002842b94dc0314db2',
    payloadSummary: 'Identified 32 duplicates, 18 near-duplicates, 11 poisoning triggers.'
  },
  {
    sequence: 3,
    eventId: 'EVT-MDL-003',
    stepName: 'Model Identity & Parameter Diff',
    timestamp: '2026-09-10T16:26:10Z',
    status: 'ok',
    previousHash: 'd4a506d87816e5e586003093cdcf3cd1eb99ea8ca7998f002842b94dc0314db2',
    recordHash: '6427ee4713151a1660faa953629b91f0a5e8c877b395404c0e22cfa50f2f1154',
    payloadSummary: 'Architecture & SHA-256 match verified (0.02 model risk).'
  },
  {
    sequence: 4,
    eventId: 'EVT-BHV-004',
    stepName: 'Behaviour & Backdoor Testing',
    timestamp: '2026-09-10T16:26:18Z',
    status: 'warning',
    previousHash: '6427ee4713151a1660faa953629b91f0a5e8c877b395404c0e22cfa50f2f1154',
    recordHash: '711210fb4d66e91101c7cd48035363036c4e292d5671d098568d13a2f194c2d5',
    payloadSummary: 'High backdoor sensitivity detected on trigger sample #trigger_like_001.'
  },
  {
    sequence: 5,
    eventId: 'EVT-DST-005',
    stepName: 'Distribution Drift & OOD Scan',
    timestamp: '2026-09-10T16:26:22Z',
    status: 'ok',
    previousHash: '711210fb4d66e91101c7cd48035363036c4e292d5671d098568d13a2f194c2d5',
    recordHash: '3a6bb63eb1e01eb113a9e8b21a17db12d5b214450ff905a91789caa0845623a1',
    payloadSummary: 'Class distribution shift: Person +12%, 37 OOD samples detected.'
  },
  {
    sequence: 6,
    eventId: 'EVT-INF-006',
    stepName: 'Inference HMAC Integrity Verification',
    timestamp: '2026-09-10T16:26:30Z',
    status: 'tampered',
    previousHash: '3a6bb63eb1e01eb113a9e8b21a17db12d5b214450ff905a91789caa0845623a1',
    recordHash: 'f4b07e122cfeacdf05102ad588e3f2dcbdc298586dc054ef7710e0baa02e0597',
    payloadSummary: 'Cryptographic tampering alert: Output hash mismatch on inference record inf_001.'
  }
];
