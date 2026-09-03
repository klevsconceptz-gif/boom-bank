import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Landmark, DollarSign, Lock, Sparkles, ArrowRight, UserPlus, Sliders, Zap, Wallet, Bot, FileText, ArrowLeftRight } from 'lucide-react';

export default function DisplayHero() {
  const { user, activeTab, setActiveTab, setActiveModal } = useAuth();

  return (
    <div className="w-full bg-gradient-to-r from-sky-950 via-blue-900 to-slate-950 border-b border-sky-400/30 shadow-2xl relative overflow-hidden text-white">
      {/* Ambient Light Blue Glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Column: Brand & Hero Title */}
          <div className="space-y-3 max-w-3xl">
            {/* Top Classy Light Blue Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-200 text-xs font-semibold shadow-inner">
              <ShieldCheck className="w-4 h-4 text-sky-300" />
              <span className="tracking-wide">UNITED STATES COMMERCIAL BANKING • MEMBER FDIC</span>
            </div>

            {/* Main Hero Heading */}
            <div className="flex items-center gap-4">
              <img
                src="/logo-mark.png"
                alt="Boom Bank Logo"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-[0_0_15px_rgba(218,186,118,0.4)] transition-transform hover:scale-105"
              />
              <div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-gold-metallic">
                  BOOM BANK N.A.
                </h1>
                <p className="text-xs sm:text-sm text-sky-200 font-medium tracking-wide mt-0.5">
                  Classy Commercial Treasury & AI-Governed Digital Banking
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-medium">
              {user ? (
                `Welcome back, ${user.profile.firstName}! Your accounts are protected by AES-256-GCM hardware encryption.`
              ) : (
                'Official US commercial digital banking with 4.75% High-Yield APY, instant 10-digit account generation, and AES-256 hardware security.'
              )}
            </p>

            {/* App Store & Google Play Store Deployment Sign Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="text-xs text-sky-200 font-medium mr-1 hidden sm:inline">Mobile App Available:</span>
              
              {/* Apple App Store Badge */}
              <a
                href="#download-ios"
                onClick={(e) => { e.preventDefault(); alert("Boom Bank iOS App: Deployed on the Apple App Store!"); }}
                className="inline-flex items-center gap-2.5 bg-slate-950/80 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl border border-sky-400/40 transition shadow-lg group hover:border-sky-300 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current text-white group-hover:text-sky-300 transition" viewBox="0 0 24 24">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.9 18.39,7.14 19.5,8.19C19.41,8.25 17.61,9.3 17.63,11.47C17.65,14.08 19.92,14.95 19.95,15C19.92,15.07 19.57,16.28 18.71,19.5M15.97,5.17C16.66,4.32 17.13,3.14 17,1.95C15.97,2 14.71,2.65 13.97,3.5C13.31,4.29 12.74,5.5 12.92,6.67C14.08,6.76 15.28,6.03 15.97,5.17Z" />
                </svg>
                <div className="text-left leading-none">
                  <p className="text-[8px] uppercase tracking-wider text-slate-400 font-medium">Download on the</p>
                  <p className="text-xs font-bold text-white font-sans mt-0.5 group-hover:text-sky-200 transition">App Store</p>
                </div>
              </a>

              {/* Google Play Store Badge */}
              <a
                href="#download-android"
                onClick={(e) => { e.preventDefault(); alert("Boom Bank Android App: Deployed on Google Play Store!"); }}
                className="inline-flex items-center gap-2.5 bg-slate-950/80 hover:bg-slate-900 text-white px-3.5 py-2 rounded-xl border border-sky-400/40 transition shadow-lg group hover:border-sky-300 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current text-white group-hover:text-gold transition" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.97C20.14,13.2 20.14,11.8 18.81,11.03L16.81,9.88L14.81,11.88L16.81,15.12M14.25,12.44L4.67,22.03C4.85,22.08 5.05,22.1 5.25,22.1C5.75,22.1 6.25,21.88 6.66,21.64L15.38,16.57L14.25,12.44M14.25,11.56L15.38,7.43L6.66,2.36C6.25,2.12 5.75,1.9 5.25,1.9C5.05,1.9 4.85,1.92 4.67,1.97L14.25,11.56Z" />
                </svg>
                <div className="text-left leading-none">
                  <p className="text-[8px] uppercase tracking-wider text-slate-400 font-medium">GET IT ON</p>
                  <p className="text-xs font-bold text-white font-sans mt-0.5 group-hover:text-gold transition">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Light Blue Hero Metric Cards */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-400/30 backdrop-blur-md shadow-lg space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-sky-300 font-bold uppercase tracking-wider">
                <Landmark className="w-3.5 h-3.5 text-gold" /> ABA Routing No.
              </div>
              <p className="text-lg font-bold font-mono text-gold-light">021000021</p>
              <p className="text-[10px] text-slate-400">Federal Reserve District 2 (NY)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-400/30 backdrop-blur-md shadow-lg space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-sky-300 font-bold uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> High-Yield Savings
              </div>
              <p className="text-lg font-bold font-mono text-emerald-400">4.75% APY</p>
              <p className="text-[10px] text-slate-400">Daily Compounding Interest</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-400/30 backdrop-blur-md shadow-lg space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-sky-300 font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-sky-300" /> Security Engine
              </div>
              <p className="text-sm font-bold font-mono text-white">AES-256-GCM</p>
              <p className="text-[10px] text-emerald-400">FIPS 140-2 Compliant</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-400/30 backdrop-blur-md shadow-lg space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-sky-300 font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold" /> Bank Staff
              </div>
              <p className="text-sm font-bold font-mono text-cyan-300">5 AI Officers</p>
              <p className="text-[10px] text-slate-400">24/7 Sentinel & Lexis</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
