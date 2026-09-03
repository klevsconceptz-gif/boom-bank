import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, maskAccountNumber } from '../utils/formatters';
import { Wallet, ArrowLeftRight, Camera, Receipt, ShieldCheck, Copy, Check, Eye, EyeOff, Lock, Unlock, CreditCard, ArrowUpRight, ArrowDownRight, FileText, ChevronRight, Search, Plus, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user, setActiveTab, openReceipt, handleToggleCard, showToast, setActiveModal } = useAuth();
  const [showAccountNos, setShowAccountNos] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) return null;

  const totalBalance = user.accounts.reduce((acc, a) => acc + a.balance, 0);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(type);
    showToast(`Copied ${type}: ${text}`, 'info');
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const filteredTransactions = user.transactions.filter(t =>
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.merchant.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 7);

  const primaryCard = user.cards?.[0];
  const virtualCardsCount = user.cards?.filter(c => c.isVirtual || c.cardType.includes('Virtual') || c.cardType.includes('Burner')).length || 0;

  return (
    <div className="space-y-6">
      {/* Overview Top Bar */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 rounded-3xl border border-amber-900/40 p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>BOOM BANK US FDIC INSURED ACCOUNT • TIER 1 VERIFIED</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {formatCurrency(totalBalance)}
            </h2>
            <p className="text-xs text-slate-400">Combined FDIC Net Liquidity</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('cards')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/25 flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" /> + Generate Virtual Card
            </button>
            <button
              onClick={() => setActiveTab('transfers')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
            >
              <ArrowLeftRight className="w-4 h-4 text-amber-400" /> Transfer Money
            </button>
            <button
              onClick={() => setActiveTab('deposit')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Camera className="w-4 h-4 text-emerald-400" /> Deposit Check
            </button>
            <button
              onClick={() => setActiveTab('bills')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Receipt className="w-4 h-4 text-indigo-400" /> Pay Bills
            </button>
          </div>
        </div>

        {/* Quick ABA Routing Info Strip */}
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 font-medium">Boom ABA Routing Number:</span>
            <div className="flex items-center gap-2">
              <code className="font-mono font-bold text-amber-300">021000021</code>
              <button
                onClick={() => copyToClipboard('021000021', 'Routing Number')}
                className="text-slate-400 hover:text-white"
                title="Copy Routing Number"
              >
                {copiedAccount === 'Routing Number' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 font-medium">Account Details Visibility:</span>
            <button
              onClick={() => setShowAccountNos(!showAccountNos)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded"
            >
              {showAccountNos ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-amber-400" />}
              <span>{showAccountNos ? 'Hide Account #' : 'Unmask'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 font-medium">Direct Deposit Form:</span>
            <button
              onClick={() => setActiveModal('direct-deposit')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline"
            >
              <FileText className="w-3.5 h-3.5" />
              Generate PDF
            </button>
          </div>
        </div>
      </div>

      {/* Account Cards Grid */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wallet className="w-4 h-4 text-amber-400" />
            Active Deposit Accounts ({user.accounts.length})
          </h3>
          <button
            onClick={() => setActiveTab('accounts')}
            className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
          >
            Manage Accounts <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.accounts.map((acc) => (
            <div
              key={acc.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition shadow-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    {acc.accountType}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{acc.accountName}</h4>
                </div>
                {acc.apy && (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                    {acc.apy} APY
                  </span>
                )}
              </div>

              <div>
                <p className="text-2xl font-bold font-mono text-white">
                  {formatCurrency(acc.balance)}
                </p>
                <p className="text-[11px] text-slate-400">Available: {formatCurrency(acc.availableBalance)}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Acc: {maskAccountNumber(acc.accountNumber, showAccountNos)}</span>
                <button
                  onClick={() => copyToClipboard(acc.accountNumber, `${acc.accountType} Account #`)}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Section split: Card Preview + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Visual Debit Card */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              Debit & Virtual Cards ({user.cards?.length || 0})
            </h3>
            <button
              onClick={() => setActiveTab('cards')}
              className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {primaryCard && (
            <div className="space-y-3">
              <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-2xl transition ${
                primaryCard.isLocked
                  ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-2 border-amber-500/50 grayscale'
                  : 'bg-gradient-to-br from-amber-600 via-orange-700 to-slate-950 border border-amber-400/30'
              }`}>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-black tracking-wider text-sm bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
                      BOOM BANK
                    </span>
                    <p className="text-[9px] uppercase tracking-widest text-amber-200 font-bold">DEBIT</p>
                  </div>
                  <span className="font-bold font-mono italic text-lg text-white">VISA</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-7 rounded bg-amber-300/80 border border-amber-400 flex items-center justify-center shadow">
                    <div className="w-6 h-4 border-t border-b border-amber-600"></div>
                  </div>
                  <span className="text-xs text-slate-300">)))</span>
                </div>

                <div className="font-mono font-bold text-lg tracking-widest mb-4">
                  {showAccountNos ? primaryCard.cardNumber : `•••• •••• •••• ${primaryCard.cardNumber.slice(-4)}`}
                </div>

                <div className="flex justify-between items-end text-xs uppercase font-mono">
                  <div>
                    <p className="text-[9px] text-slate-300 font-sans">Cardholder</p>
                    <p className="font-bold tracking-wide">{primaryCard.cardHolderName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-300 font-sans">Expires</p>
                    <p className="font-bold">{primaryCard.expDate}</p>
                  </div>
                </div>
              </div>

              {/* Card Controls & Generate Virtual Card CTA */}
              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-white block">Instant Card Freeze</span>
                    <span className="text-[11px] text-slate-400">
                      Status: {primaryCard.isLocked ? <strong className="text-amber-400">LOCKED (FROZEN)</strong> : <strong className="text-emerald-400">ACTIVE</strong>}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleCard(primaryCard.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                      primaryCard.isLocked
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {primaryCard.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{primaryCard.isLocked ? 'Unlock Card' : 'Freeze Card'}</span>
                  </button>
                </div>

                <button
                  onClick={() => setActiveTab('cards')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-2xl border border-amber-500/30 flex items-center justify-center gap-2 transition shadow"
                >
                  <Plus className="w-4 h-4" />
                  Generate New Virtual Debit Card ({virtualCardsCount} Active)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Recent Transactions Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-amber-400" />
              Recent Transaction Feed
            </h3>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search merchant, category..."
                className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-full sm:w-48"
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg divide-y divide-slate-800/80">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No matching transactions found.
              </div>
            ) : (
              filteredTransactions.map((tx) => {
                const isCredit = tx.type === 'Credit';
                return (
                  <div
                    key={tx.id}
                    onClick={() => openReceipt(tx)}
                    className="p-4 hover:bg-slate-800/60 transition cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                        isCredit
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {isCredit ? <ArrowDownRight className="w-5 h-5 text-emerald-400" /> : <ArrowUpRight className="w-5 h-5 text-slate-400" />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-white truncate">{tx.description}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>{tx.date}</span>
                          <span>•</span>
                          <span className="bg-slate-800 px-1.5 py-0.2 rounded font-medium">{tx.category}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold">{tx.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className={`text-sm font-bold font-mono ${isCredit ? 'text-emerald-400' : 'text-slate-200'}`}>
                        {isCredit ? '+' : '-'}{formatCurrency(tx.amount)}
                      </p>
                      <p className="text-[10px] text-slate-500 hover:text-amber-400 font-medium">
                        Receipt ↗
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
