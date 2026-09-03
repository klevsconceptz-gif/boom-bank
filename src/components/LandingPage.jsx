import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, UserPlus, Zap, DollarSign, CreditCard, ArrowRight, Smartphone, Landmark, Lock, LogIn, Mail } from 'lucide-react';

export default function LandingPage() {
  const { setActiveModal, login } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    setIsSubmitting(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-gradient-to-br from-slate-900 via-sky-950/80 to-blue-950 border border-sky-400/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="lg:col-span-2 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-gold/40 text-gold text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-gold" />
            Chartered US National Bank • FDIC Insured #89402
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Welcome to <span className="text-gold-metallic font-black">BOOM BANK</span>.<br />
            Modern Commercial Digital Banking.
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed max-w-2xl">
            Official US commercial digital banking with 4.75% High-Yield APY, instant account generation, and 24/7 AI staff governance.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setActiveModal('kyc-register')}
              className="px-6 py-3.5 bg-gold-gradient text-slate-950 font-black tracking-wide text-sm rounded-xl shadow-xl flex items-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              Get Started
            </button>
          </div>
        </div>

        {/* Real Customer Login Card on Landing Page */}
        <div className="bg-slate-950 border border-gold/40 rounded-3xl p-6 shadow-2xl relative z-10 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <img src="/logo-mark.png" alt="Boom Bank Emblem" className="w-8 h-8 object-contain" />
            <h3 className="text-sm font-bold text-white">Online Banking Sign In</h3>
          </div>

          <form onSubmit={handleQuickLogin} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email or Username *</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-white focus:outline-none focus:border-gold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-white focus:outline-none focus:border-gold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 flex items-center justify-center transition transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer focus:outline-none"
              aria-label="Secure Customer Sign In"
            >
              <img
                src="/sign-in-gold-button.png"
                alt="Secure Customer Sign In"
                className="h-11 w-auto object-contain drop-shadow-xl"
              />
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-800">
            <span>Protected by </span>
            <span className="text-emerald-400 font-bold">256-Bit Hardware Encryption</span>
          </div>
        </div>
      </div>

      {/* iPhone 17 Air Account Balance Showcase Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950/90 to-slate-950 border border-sky-400/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Text Details & Features */}
        <div className="space-y-4 lg:max-w-xl relative z-10">
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Real-Time Account Balance On <span className="text-gold-metallic font-black">iPhone 17 Air</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Experience lightning-fast digital banking crafted for mobile phones. Monitor your USD checking and savings balances ($10,000,000.00+), receive instant push notifications for FedWire/SWIFT deposits, and authorize transfers with Face ID
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-sky-400/30">
              <p className="text-[10px] text-slate-400 font-sans uppercase font-bold">Display Resolution</p>
              <p className="text-sm font-bold text-sky-300">120Hz ProMotion OLED</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-sky-400/30">
              <p className="text-[10px] text-slate-400 font-sans uppercase font-bold">Biometric Security</p>
              <p className="text-sm font-bold text-emerald-400">Hardware Face ID ✓</p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setActiveModal('kyc-register')}
              className="px-5 py-2.5 bg-gold-gradient text-slate-950 font-black text-xs rounded-xl shadow-xl flex items-center gap-2 transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-slate-950" />
              Get Started
            </button>
          </div>
        </div>

        {/* High-Res iPhone 17 Air Product Display Image */}
        <div className="relative shrink-0 w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 via-gold to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <img
              src="/iphone-17-air.png"
              alt="iPhone 17 Air Displaying Boom Bank Account Balance $10,000,000.00 USD"
              className="relative w-full max-w-lg h-auto rounded-2xl object-cover shadow-2xl border border-sky-400/30 transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      {/* Mobile App Store & Google Play Deployment Showcase Banner */}
      <div className="bg-gradient-to-br from-sky-950 via-slate-900 to-blue-950 border border-sky-400/30 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-bold">
            <Smartphone className="w-4 h-4 text-sky-300" />
            NATIVE MOBILE BANKING DEPLOYMENT
          </div>
          <h3 className="text-2xl font-black text-white">Bank On The Go With Boom Mobile</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Download the official Boom Bank mobile app for iOS and Android. Featuring Face ID / Touch ID biometric authentication, instant push transfer alerts, mobile check deposit camera scanning, and instant virtual card creation.
          </p>
          
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {/* Apple App Store Badge */}
            <a
              href="#ios-download"
              onClick={(e) => { e.preventDefault(); alert("Boom Bank iOS App is available on the Apple App Store!"); }}
              className="inline-flex items-center gap-3 bg-slate-950 hover:bg-slate-900 text-white px-5 py-3 rounded-2xl border border-sky-400/40 transition shadow-xl group cursor-pointer hover:border-sky-300"
            >
              <svg className="w-7 h-7 fill-current text-white group-hover:text-sky-300 transition" viewBox="0 0 24 24">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.9 18.39,7.14 19.5,8.19C19.41,8.25 17.61,9.3 17.63,11.47C17.65,14.08 19.92,14.95 19.95,15C19.92,15.07 19.57,16.28 18.71,19.5M15.97,5.17C16.66,4.32 17.13,3.14 17,1.95C15.97,2 14.71,2.65 13.97,3.5C13.31,4.29 12.74,5.5 12.92,6.67C14.08,6.76 15.28,6.03 15.97,5.17Z" />
              </svg>
              <div className="text-left leading-none">
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">Download on the</p>
                <p className="text-sm font-bold text-white font-sans mt-0.5 group-hover:text-sky-200 transition">App Store</p>
              </div>
            </a>

            {/* Google Play Store Badge */}
            <a
              href="#android-download"
              onClick={(e) => { e.preventDefault(); alert("Boom Bank Android App is available on Google Play!"); }}
              className="inline-flex items-center gap-3 bg-slate-950 hover:bg-slate-900 text-white px-5 py-3 rounded-2xl border border-sky-400/40 transition shadow-xl group cursor-pointer hover:border-sky-300"
            >
              <svg className="w-7 h-7 fill-current text-white group-hover:text-gold transition" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.97C20.14,13.2 20.14,11.8 18.81,11.03L16.81,9.88L14.81,11.88L16.81,15.12M14.25,12.44L4.67,22.03C4.85,22.08 5.05,22.1 5.25,22.1C5.75,22.1 6.25,21.88 6.66,21.64L15.38,16.57L14.25,12.44M14.25,11.56L15.38,7.43L6.66,2.36C6.25,2.12 5.75,1.9 5.25,1.9C5.05,1.9 4.85,1.92 4.67,1.97L14.25,11.56Z" />
              </svg>
              <div className="text-left leading-none">
                <p className="text-[9px] uppercase tracking-wider text-slate-400 font-medium">GET IT ON</p>
                <p className="text-sm font-bold text-white font-sans mt-0.5 group-hover:text-gold transition">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile Mockup Graphic */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="w-48 h-64 rounded-3xl bg-slate-950 border-4 border-slate-800 p-3 shadow-2xl flex flex-col justify-between transform rotate-3 hover:rotate-0 transition duration-300">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Boom Mobile</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="text-center space-y-2 py-4">
              <img src="/logo-mark.png" alt="Boom Bank" className="w-10 h-10 mx-auto object-contain" />
              <p className="text-xs font-bold text-white">BOOM BANK App</p>
              <p className="text-[10px] text-emerald-400 font-mono">$10,000,000.00</p>
            </div>
            <div className="p-2 rounded-xl bg-sky-950/80 border border-sky-400/30 text-center text-[9px] text-sky-200 font-bold">
              Face ID Authenticated ✓
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Core Commercial Infrastructure</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-gold/20 text-gold flex items-center justify-center font-bold">
              <Landmark className="w-5 h-5 text-gold" />
            </div>
            <h4 className="text-sm font-bold text-white">US Routing & Account Numbers</h4>
            <p className="text-xs text-slate-400">Instant ABA Routing No. 021000021 & unique Checking / Savings account numbers generated on KYC clearance.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white">4.75% High Yield APY</h4>
            <p className="text-xs text-slate-400">Compound interest calculated daily and credited monthly with zero minimum balance requirements.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5 text-indigo-400" />
            </div>
            <h4 className="text-sm font-bold text-white">Mobile Check Deposit</h4>
            <p className="text-xs text-slate-400">Snap paper checks front and back for automated endorsement and instant funds availability.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="text-sm font-bold text-white">Visa Debit & Virtual Cards</h4>
            <p className="text-xs text-slate-400">Instant virtual debit card generation, card freeze controls, PIN management, and daily limit tuning.</p>
          </div>
        </div>
      </div>

      {/* Corporate Mission, Vision, Privacy & Resources Display Section */}
      <div className="space-y-8 pt-6 border-t border-slate-800">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-sky-400/30">
            Corporate Governance & Disclosures
          </span>
          <h3 className="text-2xl font-black text-white">Mission, Vision, Privacy & Resources</h3>
          <p className="text-xs text-slate-400">
            Built on official US charter standards, transparency, regulatory compliance, and cutting-edge cryptographic security.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-950/60 via-slate-900 to-slate-900 border border-sky-400/30 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-sky-300" />
              </div>
              <h4 className="text-base font-bold text-white">Our Corporate Mission</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Boom Bank's mission is to democratize institutional-grade US banking by providing every individual and enterprise with instant 10-digit account generation, 4.75% High-Yield APY liquidity, friction-free SWIFT wires, and military-grade AES-256-GCM hardware security.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/30 shadow-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/40 flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-300" />
              </div>
              <h4 className="text-base font-bold text-white">Our Strategic Vision</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              We envision an autonomous, AI-governed commercial banking ecosystem where regulatory compliance, liquidity yield management, and customer assistance operate 24/7 with zero monthly maintenance fees and total financial transparency.
            </p>
          </div>
        </div>

        {/* Privacy, Regulatory & Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          {/* Privacy & Data Protection */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Privacy & Data Protection Policy</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Protected under USA PATRIOT Act standards and FIPS 140-2 compliance. All Social Security Numbers, Tax IDs, addresses, and transaction ledgers are encrypted at rest using AES-256-GCM authenticated ciphers and unique Initialization Vectors (IVs).
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between font-mono">
              <span>PBKDF2 SHA-512 Hashing</span>
              <span className="text-emerald-400 font-bold">100% Encrypted</span>
            </div>
          </div>

          {/* Regulatory & FDIC Disclosures */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-gold font-bold">
              <Lock className="w-4 h-4 text-gold" />
              <span>FDIC & Charter Disclosures</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Boom Bank N.A. is a Member of the Federal Deposit Insurance Corporation (FDIC Charter #89402). Deposits are FDIC-insured up to $250,000 per depositor. ABA Transit Routing Number: <strong className="text-gold-light font-mono">021000021</strong> (Federal Reserve District 2, New York).
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between font-mono">
              <span>SWIFT / BIC Code</span>
              <span className="text-gold-light font-bold">BOOMUS33XXX</span>
            </div>
          </div>

          {/* Resources & Statements Hub */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-sky-300 font-bold">
              <Smartphone className="w-4 h-4 text-sky-300" />
              <span>Resources & Official Statements</span>
            </div>
            <ul className="space-y-2 text-[11px] text-slate-300">
              <li className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-400/40 transition">
                <span>📄 Direct Deposit Authorization Form</span>
                <span className="text-sky-300 font-bold">PDF / Print</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-400/40 transition">
                <span>📊 Monthly Account Ledgers</span>
                <span className="text-emerald-400 font-bold">PDF Statement</span>
              </li>
              <li className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-400/40 transition">
                <span>📑 IRS Form 1099-INT Tax Summary</span>
                <span className="text-gold font-bold">1099-INT</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
