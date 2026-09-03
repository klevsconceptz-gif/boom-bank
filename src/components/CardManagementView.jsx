import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, maskAccountNumber } from '../utils/formatters';
import { CreditCard, Lock, Unlock, ShieldAlert, Key, Plus, Trash2, Eye, EyeOff, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

const GRADIENT_OPTIONS = [
  { id: 'cyan', label: 'Neon Cyan', class: 'from-cyan-600 via-blue-700 to-slate-950' },
  { id: 'amber', label: 'Gold Amber', class: 'from-amber-500 via-orange-600 to-slate-950' },
  { id: 'purple', label: 'Royal Purple', class: 'from-purple-600 via-indigo-800 to-slate-950' },
  { id: 'emerald', label: 'Emerald Mint', class: 'from-emerald-600 via-teal-800 to-slate-950' },
  { id: 'rose', label: 'Crimson Rose', class: 'from-rose-600 via-pink-700 to-slate-950' },
];

export default function CardManagementView() {
  const { user, handleToggleCard, handleCreateVirtualCard, handleDeleteVirtualCard, showToast } = useAuth();
  
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState('');

  // Virtual card modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [vCardLabel, setVCardLabel] = useState('');
  const [vCardType, setVCardType] = useState('Virtual Online Shopping');
  const [vCardAccountId, setVCardAccountId] = useState(user?.accounts[0]?.id || '');
  const [vCardLimit, setVCardLimit] = useState('1000');
  const [vCardGradient, setVCardGradient] = useState(GRADIENT_OPTIONS[0].class);
  const [unmaskedCardIds, setUnmaskedCardIds] = useState([]);

  if (!user) return null;

  const toggleUnmaskCard = (id) => {
    setUnmaskedCardIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const handlePinChange = (e) => {
    e.preventDefault();
    if (newPin.length === 4) {
      showToast('PIN successfully updated and synced with chip module!', 'success');
      setShowPinModal(false);
      setNewPin('');
    }
  };

  const handleCreateCardSubmit = async (e) => {
    e.preventDefault();
    if (!vCardLabel) return;
    try {
      await handleCreateVirtualCard({
        label: vCardLabel,
        cardCategory: vCardType,
        linkedAccountId: vCardAccountId,
        dailyLimit: vCardLimit,
        gradient: vCardGradient
      });
      setVCardLabel('');
      setShowCreateModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              Debit & Virtual Card Management
            </h2>
            <p className="text-xs text-slate-400">Manage real-time card security, freeze status, and generate unlimited virtual debit cards for secure online purchases.</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/30 flex items-center gap-1.5 transition transform hover:-translate-y-0.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            + Generate Virtual Debit Card
          </button>
        </div>
      </div>

      {/* Cards List Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Active Payment Cards ({user.cards?.length || 0})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.cards?.map((card) => {
            const isUnmasked = unmaskedCardIds.includes(card.id);
            const isVirtual = card.isVirtual || card.cardType.includes('Virtual') || card.cardType.includes('Burner');
            const bgGradient = card.gradient || (isVirtual ? 'from-cyan-600 via-blue-700 to-slate-950' : 'from-amber-600 via-orange-700 to-slate-950');

            return (
              <div key={card.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
                {/* Visual Graphic Card */}
                <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-2xl transition duration-300 ${
                  card.isLocked
                    ? 'bg-slate-950 border-2 border-amber-500/50 grayscale'
                    : `bg-gradient-to-br ${bgGradient} border border-white/20`
                }`}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black tracking-wider text-sm text-white">
                          BOOM BANK
                        </span>
                        {isVirtual && (
                          <span className="bg-cyan-950 text-cyan-300 border border-cyan-400/40 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                            VIRTUAL
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-200 font-bold mt-0.5">
                        {card.label || card.cardType}
                      </p>
                    </div>
                    <span className="font-black font-mono italic text-lg text-white">VISA</span>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-7 rounded bg-amber-300/80 border border-amber-400 flex items-center justify-center shadow">
                      <div className="w-6 h-4 border-t border-b border-amber-700/60"></div>
                    </div>
                    <span className="text-xs text-slate-300 tracking-widest">)))</span>
                  </div>

                  <div className="font-mono font-bold text-lg tracking-widest mb-4">
                    {isUnmasked ? card.cardNumber : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
                  </div>

                  <div className="flex justify-between items-end text-xs uppercase font-mono">
                    <div>
                      <p className="text-[9px] text-slate-300 font-sans">Cardholder</p>
                      <p className="font-bold tracking-wide">{card.cardHolderName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-300 font-sans">Exp / CVV</p>
                      <p className="font-bold">{card.expDate} • {isUnmasked ? card.cvv : '•••'}</p>
                    </div>
                  </div>
                </div>

                {/* Card Options & Actions Bar */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400">Details Reveal:</span>
                    <button
                      onClick={() => toggleUnmaskCard(card.id)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      {isUnmasked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {isUnmasked ? 'Hide Number & CVV' : 'Reveal Card & CVV'}
                    </button>
                  </div>

                  <div className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div>
                      <span className="font-bold text-white block">Card Status</span>
                      <span className="text-[10px] text-slate-400">
                        {card.isLocked ? <strong className="text-amber-400">FROZEN (LOCKED)</strong> : <strong className="text-emerald-400">ACTIVE & READY</strong>}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleCard(card.id)}
                        className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition ${
                          card.isLocked
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {card.isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        <span>{card.isLocked ? 'Unlock' : 'Freeze'}</span>
                      </button>

                      {isVirtual && (
                        <button
                          onClick={() => handleDeleteVirtualCard(card.id)}
                          className="p-1.5 bg-red-950/60 hover:bg-red-900 text-red-400 rounded-lg border border-red-500/30 transition"
                          title="Delete Virtual Card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Daily Spending Limit:</span>
                    <span className="font-mono font-bold text-emerald-400">${card.dailyLimit.toLocaleString()} / day</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE VIRTUAL CARD MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Generate Instant Virtual Debit Card</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white font-bold text-sm w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Card Nickname / Label *</label>
                <input
                  type="text"
                  value={vCardLabel}
                  onChange={(e) => setVCardLabel(e.target.value)}
                  placeholder="e.g. Amazon Online Shopping, SaaS Subscription, Travel Burner"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Card Type *</label>
                  <select
                    value={vCardType}
                    onChange={(e) => setVCardType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Virtual Online Shopping">Recurring Virtual Card</option>
                    <option value="Single-Use Disposable Burner">Single-Use Burner Card</option>
                    <option value="Subscription Managed Card">Subscription Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Link to Account *</label>
                  <select
                    value={vCardAccountId}
                    onChange={(e) => setVCardAccountId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  >
                    {user.accounts.map(a => (
                      <option key={a.id} value={a.id}>
                        {a.accountName} (*{a.accountNumber.slice(-4)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Daily Spend Limit ($USD) *</label>
                  <input
                    type="number"
                    value={vCardLimit}
                    onChange={(e) => setVCardLimit(e.target.value)}
                    placeholder="1000"
                    step="100"
                    min="50"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Visual Card Theme</label>
                  <select
                    value={vCardGradient}
                    onChange={(e) => setVCardGradient(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {GRADIENT_OPTIONS.map(g => (
                      <option key={g.id} value={g.class}>{g.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 transition"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  Generate 16-Digit Virtual Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
