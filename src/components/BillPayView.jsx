import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, maskAccountNumber } from '../utils/formatters';
import { Receipt, DollarSign, Calendar, Plus, CheckCircle2, ShieldCheck, Building } from 'lucide-react';

export default function BillPayView() {
  const { user, handleBillPay } = useAuth();
  const [selectedBiller, setSelectedBiller] = useState(user?.billers?.[0] || null);
  const [accountId, setAccountId] = useState(user?.accounts[0]?.id || '');
  const [amount, setAmount] = useState(selectedBiller ? selectedBiller.lastAmount.toString() : '150.00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddBiller, setShowAddBiller] = useState(false);
  const [newBillerName, setNewBillerName] = useState('');
  const [newBillerCat, setNewBillerCat] = useState('Utilities');

  if (!user) return null;

  const handlePay = async (e) => {
    e.preventDefault();
    if (!selectedBiller || !amount) return;

    setIsSubmitting(true);
    try {
      await handleBillPay({
        accountId,
        billerId: selectedBiller.id,
        billerName: selectedBiller.name,
        amount
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddBiller = (e) => {
    e.preventDefault();
    if (!newBillerName) return;
    const newB = {
      id: `bll_${Date.now()}`,
      name: newBillerName,
      accountNo: `ACC-${Math.floor(Math.random() * 90000 + 10000)}`,
      category: newBillerCat,
      lastAmount: 100.00,
      dueDate: '2026-09-30'
    };
    user.billers.push(newB);
    setSelectedBiller(newB);
    setAmount('100.00');
    setNewBillerName('');
    setShowAddBiller(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-indigo-400" />
              Biller Hub & Electronic Bill Pay
            </h2>
            <p className="text-xs text-slate-400">Schedule one-time or recurring payments to utility providers, credit cards, and service merchants.</p>
          </div>
          <button
            onClick={() => setShowAddBiller(!showAddBiller)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition shadow"
          >
            <Plus className="w-4 h-4" /> Add New Biller
          </button>
        </div>
      </div>

      {showAddBiller && (
        <form onSubmit={handleAddBiller} className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-5 shadow-2xl space-y-4">
          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Add Service Biller</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Biller Name *</label>
              <input
                type="text"
                value={newBillerName}
                onChange={(e) => setNewBillerName(e.target.value)}
                placeholder="e.g. State Farm Insurance"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
              <select
                value={newBillerCat}
                onChange={(e) => setNewBillerCat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Utilities">Utilities (Electric, Water, Gas)</option>
                <option value="Credit Card">Credit Card / Loan</option>
                <option value="Telecom">Telecom & Internet</option>
                <option value="Insurance">Insurance</option>
                <option value="Rent">Rent & Housing</option>
              </select>
            </div>
          </div>
          <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl">
            Save Biller to Account
          </button>
        </form>
      )}

      {/* Billers Grid + Pay Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Registered Billers List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Registered Billers</h3>
          <div className="space-y-2">
            {user.billers.map((b) => {
              const isSelected = selectedBiller?.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelectedBiller(b);
                    setAmount(b.lastAmount.toString());
                  }}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex justify-between items-center ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500/60 ring-1 ring-indigo-400/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{b.name}</h4>
                    <p className="text-[10px] text-slate-400">Account: {b.accountNo} • {b.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold font-mono text-indigo-300">${b.lastAmount.toFixed(2)}</p>
                    <p className="text-[9px] text-slate-500">Due: {b.dueDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Payment Execution Box */}
        {selectedBiller && (
          <form onSubmit={handlePay} className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded uppercase">
                  {selectedBiller.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Pay {selectedBiller.name}</h3>
                <p className="text-xs text-slate-400 font-mono">Biller Account Ref: {selectedBiller.accountNo}</p>
              </div>
              <span className="text-xs font-mono text-slate-400">Due: {selectedBiller.dueDate}</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Pay From Account *</label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                required
              >
                {user.accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountName} ({maskAccountNumber(acc.accountNumber)}) - Available: {formatCurrency(acc.availableBalance)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Payment Amount ($) *</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-lg font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-lg font-bold text-white font-mono focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !amount}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Receipt className="w-5 h-5" />
              {isSubmitting ? 'Transmitting Electronic Bill Payment...' : `Authorize Electronic Bill Pay ($${parseFloat(amount || 0).toFixed(2)})`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
