import { jsPDF } from 'jspdf';
import { 
  ModelMetadata, 
  DatasetMetadata, 
  AuditBlock, 
  AssuranceDecision, 
  StageSummary 
} from '../../types/assurance';

export function downloadJsonAuditPackage(data: {
  assessmentId: string;
  timestamp: string;
  decision: AssuranceDecision;
  overallRisk: number;
  confidence: number;
  coverage: number;
  model: ModelMetadata;
  dataset: DatasetMetadata;
  stages: StageSummary[];
  auditBlocks: AuditBlock[];
  reasons: string[];
}) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CV_TRUSTGUARD_AUDIT_PACKAGE_${data.assessmentId}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generatePdfReport(data: {
  assessmentId: string;
  timestamp: string;
  decision: AssuranceDecision;
  overallRisk: number;
  confidence: number;
  coverage: number;
  model: ModelMetadata;
  dataset: DatasetMetadata;
  stages: StageSummary[];
  auditBlocks: AuditBlock[];
  reasons: string[];
}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 297, 'F');

  // Header Banner
  doc.setFillColor(6, 182, 212); // cyan-500
  doc.rect(0, 0, 210, 18, 'F');
  
  doc.setTextColor(3, 7, 18);
  doc.setFont('courier', 'bold');
  doc.setFontSize(14);
  doc.text('CV-TRUSTGUARD ASSURANCE & CRYPTOGRAPHIC AUDIT REPORT', 14, 12);

  // Assessment Info Row
  doc.setTextColor(226, 232, 240);
  doc.setFontSize(10);
  doc.text(`ASSESSMENT ID: ${data.assessmentId}`, 14, 28);
  doc.text(`TIMESTAMP: ${data.timestamp}`, 14, 34);
  doc.text(`COVERAGE: ${data.coverage}%`, 130, 28);
  doc.text(`CONFIDENCE: ${(data.confidence * 100).toFixed(0)}%`, 130, 34);

  // Verdict Box
  const verdictColor = data.decision === 'QUARANTINE' ? [220, 38, 38] : (data.decision === 'REVIEW' ? [217, 119, 6] : [16, 185, 129]);
  doc.setFillColor(verdictColor[0], verdictColor[1], verdictColor[2]);
  doc.roundedRect(14, 42, 182, 22, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text(`FINAL VERDICT: ${data.decision} (RISK SCORE: ${data.overallRisk.toFixed(2)})`, 20, 56);

  // Model & Dataset Section
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(12);
  doc.text('1. REGISTERED ASSET PROVENANCE', 14, 76);

  doc.setTextColor(203, 213, 225);
  doc.setFontSize(9);
  doc.text(`Model: ${data.model.name} (${data.model.format}, ${data.model.architecture})`, 16, 84);
  doc.text(`Model SHA-256: ${data.model.sha256.slice(0, 48)}...`, 16, 90);
  doc.text(`Dataset: ${data.dataset.name} (${data.dataset.totalImages} images)`, 16, 96);
  doc.text(`Dataset Manifest Hash: ${data.dataset.manifestHash.slice(0, 48)}...`, 16, 102);

  // Stage Breakdown Table
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(12);
  doc.text('2. ASSURANCE MODULES & RISK MATRIX', 14, 114);

  let y = 122;
  data.stages.forEach((st) => {
    doc.setFillColor(30, 41, 59);
    doc.rect(14, y - 4, 182, 8, 'F');
    doc.setTextColor(248, 250, 252);
    doc.setFontSize(9);
    doc.text(`[${st.name}]`, 16, y + 1);
    doc.text(`Status: ${st.status}`, 55, y + 1);
    doc.text(`Risk: ${st.riskScore.toFixed(2)}`, 95, y + 1);
    doc.text(`Findings: ${st.findingsCount}`, 130, y + 1);
    doc.text(`Conf: ${(st.confidence * 100).toFixed(0)}%`, 165, y + 1);
    y += 10;
  });

  // Decision Reasons
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(12);
  doc.text('3. DECISION RATIONALE & CRITICAL FINDINGS', 14, 182);

  let reasonY = 190;
  data.reasons.forEach((r) => {
    doc.setTextColor(248, 250, 252);
    doc.setFontSize(8.5);
    doc.text(`• ${r}`, 16, reasonY);
    reasonY += 7;
  });

  // Audit Chain
  doc.setTextColor(6, 182, 212);
  doc.setFontSize(12);
  doc.text('4. CRYPTOGRAPHIC AUDIT LEDGER', 14, 218);

  let auditY = 226;
  data.auditBlocks.slice(0, 4).forEach((b) => {
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7.5);
    doc.text(`Seq #${b.sequence} [${b.eventId}]: ${b.stepName} -> Hash: ${b.recordHash.slice(0, 32)}... (${b.status.toUpperCase()})`, 16, auditY);
    auditY += 6;
  });

  // Explicit Limitations
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(10);
  doc.text('5. ASSURANCE LIMITATIONS & CAVEATS', 14, 258);
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7.5);
  doc.text('• Unknown backdoor triggers cannot be exhaustively tested mathematically.', 16, 264);
  doc.text('• Black-box mode limits internal layer gradient verification.', 16, 270);
  doc.text('• Cryptographic guarantees bind provided inputs and outputs at assessment runtime.', 16, 276);

  // Save PDF
  doc.save(`CV_TRUSTGUARD_REPORT_${data.assessmentId}.pdf`);
}
