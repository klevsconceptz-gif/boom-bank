import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';
import { ShieldCheck, Users, Lock, Unlock, DollarSign, Search, RefreshCw, AlertTriangle, Zap, Bot } from 'lucide-react';
import AdminGovernanceDesk from './AdminGovernanceDesk';

export default function AdminDashboard() {
  const { user, showToast } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Balance Adjustment Modal State
  const [adjustingUser, setAdjustingUser] = useState(null);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustType, setAdjustType] = useState('credit');
  const [adjustNote, setAdjustNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/all-data');
      const data = await res.json();
      setAdminData(data);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      showToast('Failed to load admin backoffice data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (user?.role !== 'ADMIN') {
    return (
      <div className="p-8 text-center text-red-400 bg-red-950/40 rounded-3xl border border-red-500/40">
        <AlertTriangle className="w-10 h-10 mx-auto mb-2 text-red-400" />
        <h3 className="text-lg font-bold">Access Denied</h3>
        <p className="text-xs text-slate-300">You must be logged in as System Administrator (klev1212) to access this console.</p>
      </div>
    );
  }

  const handleToggleFreeze = async (targetUserId) => {
    try {
      const res = await fetch('/api/admin/users/freeze-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId: user.id, targetUserId })
      });
      const data = await res.json();
      showToast(data.message, 'info');
      fetchAdminData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleBalanceAdjustSubmit = async (e) => {
    e.preventDefault();
    if (!adjustingUser || !selectedAccountId || !adjustAmount) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/users/adjust-balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: adjustingUser.id,
          accountId: selectedAccountId,
          adjustmentAmount: adjustAmount,
          adjustmentType: adjustType,
          adminNote: adjustNote
        })
      });
      const data = await res.json();
      showToast(data.message);
      setAdjustingUser(null);
      setAdjustAmount('');
      setAdjustNote('');
      fetchAdminData();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const customers = adminData?.users?.filter(u => u.role !== 'ADMIN') || [];
  const filteredCustomers = customers.filter(c =>
    c.profile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.profile.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.profile.ssn.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Top System Admin Header */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950/60 to-slate-900 border border-amber-500/50 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-950 text-red-400 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest flex items-center gap-1">
                <Zap className="w-3 h-3 text-red-400 fill-red-400" /> SYSTEM ADMIN CONSOLE
              </span>
              <span className="text-xs text-slate-400">Authenticated as: <strong className="text-amber-400 font-mono">klev1212</strong></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Boom Bank Treasury & AI Governance Backoffice
            </h2>
            <p className="text-xs text-slate-400">Full executive governance over AI Staff, customer account freezes, ledger overrides, and wire authorizations.</p>
          </div>

          <button
            onClick={fetchAdminData}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition shrink-0"
          >
            <RefreshCw className={`w-4 h-4 text-amber-400 ${loading ? 'animate-spin' : ''}`} /> Refresh Bank Data
          </button>
        </div>

        {/* Bank-wide System Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Customer Liquidity</p>
            <p className="text-xl font-bold font-mono text-emerald-400">
              {formatCurrency(adminData?.stats?.totalBankLiquidity || 0)}
            </p>
            <p className="text-[10px] text-slate-500">Across all USD checking & savings</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Registered Customers</p>
            <p className="text-xl font-bold font-mono text-blue-300">
              {customers.length} Accounts
            </p>
            <p className="text-[10px] text-slate-500">KYC Verified & Tier 1 Approved</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">AI Bank Officers</p>
            <p className="text-xl font-bold font-mono text-cyan-400 flex items-center gap-1">
              <Bot className="w-5 h-5 text-cyan-400" /> 5 AI Agents
            </p>
            <p className="text-[10px] text-slate-500">Sentinel, Lexis, Apex, Concierge, Credit</p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Federal Transit Code</p>
            <p className="text-xl font-bold font-mono text-amber-400">021000021</p>
            <p className="text-[10px] text-slate-500">OCC Charter #89402 Nominal</p>
          </div>
        </div>
      </div>

      {/* Admin Transaction Authorization Desk */}
      <AdminGovernanceDesk />

      {/* Customer Management Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            Customer Account Governance Queue
          </h3>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, email, SSN..."
              className="bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Customer Cards & Management Controls */}
        <div className="space-y-4">
          {filteredCustomers.map((cust) => {
            const isFrozen = cust.accounts.every(a => a.status === 'Frozen');

            return (
              <div key={cust.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{cust.profile.firstName} {cust.profile.lastName}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isFrozen ? 'bg-red-950 text-red-400 border border-red-500/40' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {isFrozen ? 'ACCOUNT FROZEN' : 'ACCOUNT ACTIVE'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Email: {cust.profile.email} • SSN: {cust.profile.ssn} • DOB: {cust.profile.dob}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Address: {cust.profile.address?.street}, {cust.profile.address?.city}, {cust.profile.address?.state} {cust.profile.address?.zip}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFreeze(cust.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        isFrozen
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-red-950/80 hover:bg-red-900 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {isFrozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      {isFrozen ? 'Unfreeze Account' : 'Freeze Account'}
                    </button>

                    <button
                      onClick={() => {
                        setAdjustingUser(cust);
                        setSelectedAccountId(cust.accounts[0]?.id || '');
                      }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow flex items-center gap-1 transition"
                    >
                      <DollarSign className="w-3.5 h-3.5" /> Adjust Balance
                    </button>
                  </div>
                </div>

                {/* User's Accounts Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  {cust.accounts.map((acc) => (
                    <div key={acc.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white text-[11px]">{acc.accountName}</span>
                        <span className="text-[10px] font-mono text-slate-400">*{acc.accountNumber.slice(-4)}</span>
                      </div>
                      <p className="text-base font-bold font-mono text-emerald-400">
                        {formatCurrency(acc.balance)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BALANCE ADJUSTMENT MODAL */}
      {adjustingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-amber-300">Admin Ledger Adjustment</h3>
              <button
                onClick={() => setAdjustingUser(null)}
                className="text-slate-400 hover:text-white font-bold text-sm w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBalanceAdjustSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Account Holder</label>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-bold text-white">
                  {adjustingUser.profile.firstName} {adjustingUser.profile.lastName} ({adjustingUser.profile.email})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Select Account *</label>
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                  required
                >
                  {adjustingUser.accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.accountName} (*{a.accountNumber.slice(-4)}) - Current: ${a.balance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Action Type *</label>
                  <select
                    value={adjustType}
                    onChange={(e) => setAdjustType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-bold"
                  >
                    <option value="credit">Credit (+ Deposit)</option>
                    <option value="debit">Debit (- Deduction)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Amount ($USD) *</label>
                  <input
                    type="number"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(e.target.value)}
                    placeholder="100.00"
                    step="0.01"
                    min="0.01"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Audit Log Note *</label>
                <input
                  type="text"
                  value={adjustNote}
                  onChange={(e) => setAdjustNote(e.target.value)}
                  placeholder="e.g. Treasury Correction / Incentive Bonus"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !adjustAmount}
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
              >
                {isSubmitting ? 'Executing Ledger Override...' : 'Execute Admin Balance Override'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
