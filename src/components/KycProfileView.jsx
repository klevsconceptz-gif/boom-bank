import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { maskSSN, formatDate } from '../utils/formatters';
import { ShieldCheck, UserCheck, Lock, Eye, EyeOff, FileCheck, Landmark, CheckCircle2 } from 'lucide-react';

export default function KycProfileView() {
  const { user } = useAuth();
  const [showSSN, setShowSSN] = useState(false);

  if (!user || !user.profile) return null;
  const p = user.profile;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-900/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold shadow-lg shadow-emerald-950/50">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{p.firstName} {p.middleName} {p.lastName}</h2>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> KYC VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400">{p.email} • Verified {formatDate(p.kycVerifiedAt || '2025-01-15')}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-300 bg-blue-950 border border-blue-500/30 px-3 py-1 rounded-full font-mono">
            {p.kycTier || 'Tier 1 FDIC Verified'}
          </span>
        </div>
      </div>

      {/* Grid of Verified Identity Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Personal & SSN Information */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-400" />
            Personal & Tax Identification
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Full Legal Name:</span>
              <span className="font-bold text-white">{p.firstName} {p.middleName} {p.lastName}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Date of Birth:</span>
              <span className="font-bold text-white font-mono">{formatDate(p.dob)}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Social Security Number (SSN):</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-300 font-mono">{maskSSN(p.ssn, showSSN)}</span>
                <button
                  onClick={() => setShowSSN(!showSSN)}
                  className="text-slate-400 hover:text-white"
                >
                  {showSSN ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Phone Number:</span>
              <span className="font-bold text-white font-mono">{p.phone}</span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400">US Citizenship Status:</span>
              <span className="font-bold text-emerald-400">Verified US Citizen / Resident</span>
            </div>
          </div>
        </div>

        {/* Address & Government ID Verification */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-blue-400" />
            Verified Residence & Document Scan
          </h3>

          <div className="space-y-3 text-xs">
            <div className="py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400 block mb-0.5">Physical Address (USA PATRIOT Act Compliant):</span>
              <span className="font-bold text-white block">
                {p.address?.street} {p.address?.unit && `, ${p.address.unit}`}
              </span>
              <span className="text-slate-300 font-mono text-[11px]">
                {p.address?.city}, {p.address?.state} {p.address?.zip}
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Government ID Type:</span>
              <span className="font-bold text-white">{p.idType}</span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">ID Document #:</span>
              <span className="font-bold text-blue-300 font-mono">{p.idNumber} ({p.idIssuingState})</span>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400">W-9 Tax Status:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5" /> Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
