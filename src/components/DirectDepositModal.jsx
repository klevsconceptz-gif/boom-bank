import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Building2, Printer, Zap } from 'lucide-react';

export default function DirectDepositModal() {
  const { user, setActiveModal } = useAuth();

  if (!user) return null;

  const checkingAcc = user.accounts.find(a => a.accountType === 'Checking') || user.accounts[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 border border-slate-300 rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6 my-8 print:border-none print:shadow-none">
        
        {/* Modal Top Control Bar */}
        <div className="flex justify-between items-center print:hidden border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            OFFICIAL BANK AUTHORIZATION FORM
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="text-slate-500 hover:text-slate-800 text-sm font-bold w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Official Form */}
        <div className="space-y-6 font-sans">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
            <div className="flex items-center gap-3">
              <img src="/logo-mark.png" alt="Boom Bank Emblem" className="w-10 h-10 object-contain" />
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">BOOM BANK</h2>
                <p className="text-[10px] text-slate-600 font-bold">NATIONAL ASSOCIATION • MEMBER FDIC</p>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-slate-600">
              <p className="font-bold text-slate-900">DIRECT DEPOSIT AUTHORIZATION</p>
              <p>Routing: 021000021</p>
            </div>
          </div>

          {/* Employee / Account Holder Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-amber-800">Section 1: Account Holder Information</h4>
            <div className="grid grid-cols-2 gap-2 font-mono text-slate-800">
              <div><span className="text-slate-500 font-sans">Full Name:</span> {user.profile.firstName} {user.profile.lastName}</div>
              <div><span className="text-slate-500 font-sans">SSN (Last 4):</span> {user.profile.ssn}</div>
              <div><span className="text-slate-500 font-sans">Phone:</span> {user.profile.phone}</div>
              <div><span className="text-slate-500 font-sans">Email:</span> {user.profile.email}</div>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-amber-900">Section 2: Banking & Routing Identifiers</h4>
            
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="bg-white p-2.5 rounded border border-amber-200">
                <p className="text-[10px] text-slate-500 font-sans uppercase font-bold">Financial Institution</p>
                <p className="font-bold text-slate-900">Boom Bank, N.A.</p>
              </div>
              <div className="bg-white p-2.5 rounded border border-amber-200">
                <p className="text-[10px] text-slate-500 font-sans uppercase font-bold">ABA Transit Routing Number</p>
                <p className="font-bold text-amber-700 text-sm">021000021</p>
              </div>
              <div className="bg-white p-2.5 rounded border border-amber-200">
                <p className="text-[10px] text-slate-500 font-sans uppercase font-bold">Deposit Account Number</p>
                <p className="font-bold text-emerald-700 text-sm">{checkingAcc?.accountNumber}</p>
              </div>
              <div className="bg-white p-2.5 rounded border border-amber-200">
                <p className="text-[10px] text-slate-500 font-sans uppercase font-bold">Account Type</p>
                <p className="font-bold text-slate-900">Checking (100% Allocation)</p>
              </div>
            </div>
          </div>

          {/* Authorization Statement */}
          <div className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
            <p>
              I hereby authorize my employer/payroll provider to initiate automatic credit deposits to my Boom Bank account designated above.
            </p>
          </div>

          {/* Signature Line */}
          <div className="pt-4 border-t border-slate-300 flex justify-between items-end text-xs font-mono">
            <div>
              <p className="font-serif italic text-base text-amber-900 font-bold border-b border-slate-900 px-2 pb-0.5">
                {user.profile.firstName} {user.profile.lastName}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Authorized Electronic Signature</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">{new Date().toLocaleDateString()}</p>
              <p className="text-[10px] text-slate-500 mt-1">Verification Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
