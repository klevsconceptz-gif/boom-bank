import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, maskAccountNumber } from '../utils/formatters';
import { Camera, CheckCircle2, FileText, Upload, DollarSign, ShieldCheck } from 'lucide-react';

export default function MobileDepositView() {
  const { user, handleDeposit } = useAuth();
  const [accountId, setAccountId] = useState(user?.accounts[0]?.id || '');
  const [amount, setAmount] = useState('250.00');
  const [checkNumber, setCheckNumber] = useState('8942');
  const [hasFrontPhoto, setHasFrontPhoto] = useState(true);
  const [hasBackPhoto, setHasBackPhoto] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      const res = await handleDeposit({
        accountId,
        amount,
        checkNumber,
        checkFrontImage: 'front_check.png',
        checkBackImage: 'back_check.png'
      });
      setSuccessMsg(`Check #${checkNumber} for $${parseFloat(amount).toFixed(2)} deposited! $225.00 available immediately.`);
      setAmount('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-400" />
              Mobile Check Express Deposit
            </h2>
            <p className="text-xs text-slate-400">Snap photos of your paper check for instant optical character recognition deposit.</p>
          </div>
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Expedited Funds Access
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
        {/* Deposit Destination Account */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">Deposit Into Account *</label>
          <select
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
            required
          >
            {user.accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.accountName} ({maskAccountNumber(acc.accountNumber)}) - Current: {formatCurrency(acc.balance)}
              </option>
            ))}
          </select>
        </div>

        {/* Amount & Check # */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Check Amount ($) *</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-lg font-bold text-slate-400">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-lg font-bold text-white font-mono focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Check Number *</label>
            <input
              type="text"
              value={checkNumber}
              onChange={(e) => setCheckNumber(e.target.value)}
              placeholder="e.g. 1042"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-base font-bold text-white font-mono focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Check Photo Simulation Box */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300">Check Photo Capture (Front & Back)</label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Front of Check */}
            <div className="border-2 border-dashed border-emerald-500/40 bg-slate-950 rounded-2xl p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-xs font-bold text-white">Front of Check Captured</p>
              <p className="text-[10px] text-slate-400 font-mono">ABA Routing: 021000021 • Parsed OK</p>
            </div>

            {/* Back of Check */}
            <div className="border-2 border-dashed border-emerald-500/40 bg-slate-950 rounded-2xl p-4 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-xs font-bold text-white">Back of Check Captured</p>
              <p className="text-[10px] text-emerald-400 font-mono font-bold">Endorsed: "For Apex Mobile Deposit Only"</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !amount}
          className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          <Camera className="w-5 h-5" />
          {isSubmitting ? 'Scanning & Processing Check Deposit...' : `Submit Check Deposit ($${parseFloat(amount || 0).toFixed(2)})`}
        </button>
      </form>
    </div>
  );
}
