import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Wallet, ArrowLeftRight, Camera, CreditCard, ShieldCheck, FileText, Receipt, Sparkles, Building, Zap, Sliders, Bot, Lock } from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'accounts', label: 'Accounts & Routing', icon: Wallet },
    { id: 'transfers', label: 'Transfers & SWIFT', icon: ArrowLeftRight },
    { id: 'deposit', label: 'Mobile Check Deposit', icon: Camera },
    { id: 'bills', label: 'Bill Pay & Biller Hub', icon: Receipt },
    { id: 'cards', label: 'Card Management', icon: CreditCard },
    { id: 'ai-staff', label: 'AI Bank Staff Hub', icon: Bot, badge: '24/7 AI' },
    { id: 'security-vault', label: 'Security & Encryption Vault', icon: Lock, badge: 'AES-256' },
    { id: 'kyc', label: 'KYC & Verification', icon: ShieldCheck, badge: 'Verified' },
    { id: 'statements', label: 'Statements & Forms', icon: FileText },
  ];

  if (user?.role === 'ADMIN') {
    navItems.unshift({ id: 'admin', label: 'Admin Governance Console', icon: Sliders, badge: 'ADMIN' });
  }

  return (
    <aside className="w-64 shrink-0 hidden lg:block bg-slate-900/60 border-r border-slate-800 min-h-[calc(100vh-5rem)] p-4">
      {/* User Welcome Mini Card */}
      {user && (
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-900 to-amber-950/30 border border-slate-800 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 font-bold text-white flex items-center justify-center text-sm shadow-md ring-1 ring-white/20">
              {user.profile.firstName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-slate-400 font-medium">
                {user.role === 'ADMIN' ? 'Executive Administrator' : 'Welcome back,'}
              </p>
              <h4 className="text-sm font-bold text-white truncate">{user.profile.firstName} {user.profile.lastName}</h4>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Total FDIC Net Worth:</span>
            <span className="font-bold text-emerald-400 font-mono">
              ${user.accounts.reduce((sum, a) => sum + a.balance, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg shadow-amber-600/20 ring-1 ring-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Security Info Card */}
      <div className="mt-8 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-xs text-slate-300">
        <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AES-256 Encrypted</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Protected by AES-256-GCM hardware encryption, PBKDF2 SHA-512 hashing, and Executive Treasury governance.
        </p>
      </div>
    </aside>
  );
}
