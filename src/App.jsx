import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import KycWizard from './components/KycWizard';
import Dashboard from './components/Dashboard';
import TransfersView from './components/TransfersView';
import MobileDepositView from './components/MobileDepositView';
import BillPayView from './components/BillPayView';
import CardManagementView from './components/CardManagementView';
import KycProfileView from './components/KycProfileView';
import StatementsView from './components/StatementsView';
import AdminDashboard from './components/AdminDashboard';
import AiStaffHub from './components/AiStaffHub';
import SecurityVaultView from './components/SecurityVaultView';
import LoginModal from './components/LoginModal';
import DirectDepositModal from './components/DirectDepositModal';
import ReceiptModal from './components/ReceiptModal';
import NotificationToast from './components/NotificationToast';

import DisplayHero from './components/DisplayHero';

function AppContent() {
  const { user, activeTab, activeModal } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Full Scale Edge-to-Edge Stylish Light Blue Display Hero */}
      <DisplayHero />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {user && <Sidebar />}

        <main className="flex-1 overflow-x-hidden">
          {!user ? (
            <LandingPage />
          ) : (
            <>
              {activeTab === 'admin' && <AdminDashboard />}
              {(activeTab === 'dashboard' || activeTab === 'accounts') && <Dashboard />}
              {activeTab === 'transfers' && <TransfersView />}
              {activeTab === 'deposit' && <MobileDepositView />}
              {activeTab === 'bills' && <BillPayView />}
              {activeTab === 'cards' && <CardManagementView />}
              {activeTab === 'ai-staff' && <AiStaffHub />}
              {activeTab === 'security-vault' && <SecurityVaultView />}
              {activeTab === 'kyc' && <KycProfileView />}
              {activeTab === 'statements' && <StatementsView />}
            </>
          )}
        </main>
      </div>

      {/* Global Modals */}
      {activeModal === 'login' && <LoginModal />}
      {activeModal === 'kyc-register' && <KycWizard />}
      {activeModal === 'direct-deposit' && <DirectDepositModal />}
      {activeModal === 'receipt' && <ReceiptModal />}

      {/* Toast Notifications */}
      <NotificationToast />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left space-y-1">
            <p>© 2026 Boom Bank, N.A. All rights reserved. AES-256-GCM Hardware Encrypted & Governed by Executive Treasury. Member FDIC.</p>
            <p className="font-mono text-[11px] text-slate-600">ABA Routing No. 021000021 • OCC Charter #89402 • SWIFT Code BOOMUS33XXX</p>
          </div>

          {/* Official Social Media Channels */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-medium text-slate-400 mr-1">Official Channels:</span>
            
            {/* Instagram */}
            <a
              href="https://instagram.com/boombank"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 hover:bg-slate-800 text-slate-400 hover:text-pink-400 flex items-center justify-center transition shadow cursor-pointer"
              title="Follow Boom Bank on Instagram (@boombank)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12,2.163c3.204,0,3.584,0.012,4.85,0.07c3.252,0.148,4.771,1.691,4.919,4.919c0.058,1.265,0.069,1.645,0.069,4.849c0,3.205-0.012,3.584-0.069,4.849c-0.149,3.225-1.664,4.771-4.919,4.919c-1.266,0.058-1.644,0.07-4.85,0.07c-3.204,0-3.584-0.012-4.849-0.07c-3.26-0.149-4.771-1.699-4.919-4.92c-0.058-1.265-0.07-1.644-0.07-4.849c0-3.204,0.013-3.583,0.07-4.849c0.149-3.227,1.664-4.771,4.919-4.919C8.416,2.175,8.796,2.163,12,2.163 M12,0C8.741,0,8.333,0.014,7.053,0.072C2.695,0.272,0.273,2.69,0.073,7.052C0.014,8.333,0,8.741,0,12c0,3.259,0.014,3.668,0.072,4.948c0.2,4.358,2.618,6.78,6.98,6.98C8.333,23.986,8.741,24,12,24c3.259,0,3.668-0.014,4.948-0.072c4.354-0.2,6.782-2.618,6.979-6.98C23.986,15.668,24,15.259,24,12c0-3.259-0.014-3.667-0.072-4.947c-0.196-4.354-2.617-6.78-6.979-6.98C15.668,0.014,15.259,0,12,0z M12,5.838c-3.403,0-6.162,2.759-6.162,6.162c0,3.403,2.759,6.163,6.162,6.163c3.403,0,6.162-2.76,6.162-6.163C18.162,8.597,15.403,5.838,12,5.838z M12,16c-2.209,0-4-1.79-4-4c0-2.209,1.791-4,4-4c2.209,0,4,1.791,4,4C16,14.21,14.209,16,12,16z M18.406,4.155c-0.796,0-1.441,0.645-1.441,1.44c0,0.795,0.645,1.44,1.441,1.44c0.795,0,1.439-0.645,1.439-1.44C19.846,4.8,19.202,4.155,18.406,4.155z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com/BoomBankUS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400/50 hover:bg-slate-800 text-slate-400 hover:text-sky-300 flex items-center justify-center transition shadow cursor-pointer"
              title="Follow Boom Bank on X (@BoomBankUS)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com/BoomBankUS"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-slate-400 hover:text-blue-400 flex items-center justify-center transition shadow cursor-pointer"
              title="Follow Boom Bank on Facebook (@BoomBankUS)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
