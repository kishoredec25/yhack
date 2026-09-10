import React from 'react';
import { AssuranceProvider, useAssurance } from './context/AssuranceContext';
import { Navbar } from './components/layout/Navbar';
import { Breadcrumbs } from './components/layout/Breadcrumbs';

// Import All 9 Pages
import { Page1Registration } from './pages/Page1Registration';
import { Page2DatasetAssurance } from './pages/Page2DatasetAssurance';
import { Page3ModelIntegrity } from './pages/Page3ModelIntegrity';
import { Page4BehaviourAnalysis } from './pages/Page4BehaviourAnalysis';
import { Page5DistributionShift } from './pages/Page5DistributionShift';
import { Page6InferenceAuthenticity } from './pages/Page6InferenceAuthenticity';
import { Page7RiskDashboard } from './pages/Page7RiskDashboard';
import { Page8ProvenanceAudit } from './pages/Page8ProvenanceAudit';
import { Page9StageView } from './pages/Page9StageView';

const MainContent: React.FC = () => {
  const { activePage } = useAssurance();

  return (
    <main className="flex-1 pb-16">
      {activePage === 1 && <Page1Registration />}
      {activePage === 2 && <Page2DatasetAssurance />}
      {activePage === 3 && <Page3ModelIntegrity />}
      {activePage === 4 && <Page4BehaviourAnalysis />}
      {activePage === 5 && <Page5DistributionShift />}
      {activePage === 6 && <Page6InferenceAuthenticity />}
      {activePage === 7 && <Page7RiskDashboard />}
      {activePage === 8 && <Page8ProvenanceAudit />}
      {activePage === 9 && <Page9StageView />}
    </main>
  );
};

export function App() {
  return (
    <AssuranceProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased">
        {/* Background Cyber Glow Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[128px]" />
        </div>

        {/* Global Navigation & Breadcrumbs */}
        <Navbar />
        <Breadcrumbs />

        {/* Active Page View */}
        <div className="relative z-10 flex-1">
          <MainContent />
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs font-mono text-slate-500 relative z-10">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>CV-TRUSTGUARD™ Enterprise AI Assurance Platform — v2.6.4</span>
            <div className="flex items-center space-x-4">
              <span>Deterministic SHA-256 Engine</span>
              <span>•</span>
              <span>Grad-CAM Attribution</span>
              <span>•</span>
              <span>HMAC Cryptographic Proofs</span>
            </div>
          </div>
        </footer>
      </div>
    </AssuranceProvider>
  );
}

export default App;
