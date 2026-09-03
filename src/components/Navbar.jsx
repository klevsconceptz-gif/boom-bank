import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserCheck, LogOut, Lock, ChevronDown, UserPlus, LogIn, Bell, Zap, Sliders } from 'lucide-react';

export default function Navbar() {
  const { user, logout, setActiveModal, setActiveTab } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top FDIC Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-sky-950/60 to-slate-950 px-4 py-1.5 border-b border-sky-400/20 text-xs font-medium text-slate-300 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-sky-500/20 text-sky-200 px-2 py-0.5 rounded-full border border-sky-400/30 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
            FDIC INSURED #89402
          </span>
          <span className="hidden sm:inline text-slate-300">
            ABA Routing No: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-300 font-mono font-bold">021000021</code>
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-400 text-[11px]">Official US Commercial Charter</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            256-Bit Hardware Encryption
          </span>
          <span className="hidden sm:inline font-mono">Sep 02, 2026</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <img
            src="/logo-mark.png"
            alt="Boom Bank Emblem"
            className="w-10 h-10 object-contain drop-shadow-md transition-transform hover:scale-105"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                BOOM BANK
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">
                N.A.
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide font-medium">National Digital Banking & Trust</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === 'ADMIN' && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
                >
                  <Sliders className="w-3.5 h-3.5 text-red-400" /> Admin Console
                </button>
              )}

              <button
                onClick={() => setActiveTab('kyc')}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition relative"
                title="KYC Verification & Security Alerts"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 font-bold text-xs text-white flex items-center justify-center shadow">
                    {user.profile.firstName.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-200">{user.profile.firstName} {user.profile.lastName}</p>
                    <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> KYC Verified
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 z-50 text-slate-200">
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-xs font-bold text-white">{user.profile.firstName} {user.profile.lastName}</p>
                      <p className="text-xs text-slate-400 truncate">{user.profile.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-md text-[10px] font-bold">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        {user.profile.kycTier || 'FDIC Tier 1 Verified'}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setActiveTab('kyc');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-xs font-medium flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4 text-blue-400" />
                      KYC Verification Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setActiveTab('cards');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-xs font-medium flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-blue-400" />
                      Manage Debit Cards
                    </button>
                    <div className="border-t border-slate-800 my-1"></div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-950/40 text-red-400 text-xs font-medium flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveModal('login')}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 text-slate-950 font-black tracking-wide text-xs rounded-xl shadow-lg shadow-amber-500/25 ring-1 ring-white/30 flex items-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-950" />
                Sign In
              </button>
              <button
                onClick={() => setActiveModal('kyc-register')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-sky-200 border border-sky-400/40 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5 text-sky-300" />
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
