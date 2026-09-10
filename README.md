# CV-TRUSTGUARD™ Enterprise AI Assurance Platform

> Cryptographic verification, backdoor detection, dataset assurance, distribution shift, and inference authenticity for Computer Vision AI models.

---

## 🛡️ Overview

**CV-TRUSTGUARD** is a modular, client-side Computer Vision AI Assurance and Cryptographic Integrity platform built with **React 19, TypeScript, Vite 6, TailwindCSS 3.4, and jsPDF**. The system evaluates computer vision models (e.g., YOLO, PyTorch, ONNX) across their entire deployment lifecycle.

It provides:
- **Dataset Assurance**: Duplicate detection (SHA-256 & pHash), latent outliers, mislabeled annotations, and clean-label poisoning scans.
- **Model Integrity**: Bit-level SHA-256 weight verification, computational graph inspection, and layer-by-layer parameter divergence.
- **Behavioural Robustness & Backdoors**: Prediction stability across noise/rotations, Grad-CAM attribution heatmaps, and watermark trigger sensitivity probing.
- **Distribution Shift & OOD**: Maximum Mean Discrepancy (MMD) embedding drift, class imbalance shifts, and natural vs malicious shift attribution.
- **Inference Authenticity**: Cryptographic HMAC signature bindings linking Input Image + Model Weights + Configuration + Output Payload.
- **Multi-Signal Evidence Fusion**: Policy-driven weighted decision engine with critical tamper security overrides (`ACCEPT`, `REVIEW`, `QUARANTINE`).
- **Cryptographic Provenance & Audit Exporter**: Tamper-evident Merkle sequential ledger, downloadable JSON audit package, and standalone vector PDF executive certificates.
- **Assurance Pipeline Flow**: End-to-end visual pipeline execution map and automated assessment simulator.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/kishoredec25/yhack.git
cd yhack

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
├── cv_trustguard_assurance_dataset/  # Fixtures, manifests, audit chains & ground truth
├── public/                           # Static assets and reference images
├── src/
│   ├── components/
│   │   ├── common/                  # EvidenceModal, MetricCard, ReportExporter (jsPDF)
│   │   └── layout/                  # Navbar, Breadcrumbs
│   ├── context/                     # AssuranceContext (global state, risk fusion & simulator)
│   ├── data/                        # Scenario presets & fixture data
│   ├── pages/                       # 9 Assurance Pages (Registration -> Stage View)
│   ├── types/                       # TypeScript interfaces & domain schemas
│   ├── utils/                       # Cryptographic utilities (SHA-256, HMAC, hash truncate)
│   ├── App.tsx                      # Root component & page routing
│   ├── index.css                    # Tailwind design system & cyber glassmorphism styles
│   └── main.tsx                     # React application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🔒 Security & Provenance Guarantees
* **Deterministic SHA-256**: Uses browser `window.crypto.subtle` with deterministic FNV fallback.
* **Cryptographic HMAC Binding**: `HMAC(H(Image) || H(Model) || H(Config) || H(Payload))`.
* **Tamper-Evident Ledger**: Sequential hash linking where modifying any historical block invalidates the chain.

---

## 📄 License
Enterprise AI Assurance & Security Framework.
