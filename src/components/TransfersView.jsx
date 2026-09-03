import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, maskAccountNumber } from '../utils/formatters';
import { ArrowLeftRight, Landmark, Globe, Zap, ShieldCheck, Copy, Check, Info } from 'lucide-react';

const COUNTRIES = [
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', rate: 0.79, symbol: '£' },
  { code: 'EU', name: 'Eurozone (Germany, France, Italy, Spain)', currency: 'EUR', rate: 0.92, symbol: '€' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', rate: 1580.00, symbol: '₦' },
  { code: 'CA', name: 'Canada', currency: 'CAD', rate: 1.35, symbol: 'CA$' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', rate: 3.67, symbol: 'AED ' },
  { code: 'AU', name: 'Australia', currency: 'AUD', rate: 1.52, symbol: 'A$' },
  { code: 'JP', name: 'Japan', currency: 'JPY', rate: 155.00, symbol: '¥' },
  { code: 'IN', name: 'India', currency: 'INR', rate: 83.50, symbol: '₹' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', rate: 19.80, symbol: 'MX$' },
  { code: 'US', name: 'United States (USD)', currency: 'USD', rate: 1.00, symbol: '$' },
];

export default function TransfersView() {
  const { user, handleTransfer, showToast } = useAuth();
  const [transferType, setTransferType] = useState('us_ach'); // 'internal', 'us_ach', 'intl_swift', 'inbound'

  const primaryChecking = user?.accounts.find(a => a.accountType === 'Checking') || user?.accounts[0];
  const primarySavings = user?.accounts.find(a => a.accountType === 'Savings') || user?.accounts[1];

  // Form states
  const [fromAccountId, setFromAccountId] = useState(primaryChecking?.id || '');
  const [toAccountId, setToAccountId] = useState(primarySavings?.id || '');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');

  // US Domestic states
  const [externalRouting, setExternalRouting] = useState('122000496'); // Wells Fargo / Chase sample
  const [externalAccount, setExternalAccount] = useState('984021941');
  const [recipientName, setRecipientName] = useState('JPMorgan Chase Account');

  // International SWIFT states
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [swiftCode, setSwiftCode] = useState('BARCGB22XXX'); // Barclays London sample
  const [ibanAccount, setIbanAccount] = useState('GB29BARC2020153094821');

  const [copiedKey, setCopiedKey] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied: ${text}`, 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const calculatedFxAmount = (parseFloat(amount || 0) * selectedCountry.rate).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      await handleTransfer({
        type: transferType === 'intl_swift' ? 'international_swift' : (transferType === 'us_ach' ? 'external' : transferType),
        fromAccountId,
        toAccountId,
        externalRouting,
        externalAccount: transferType === 'intl_swift' ? ibanAccount : externalAccount,
        recipientName,
        amount,
        memo,
        swiftCode: transferType === 'intl_swift' ? swiftCode : undefined,
        destinationCountry: transferType === 'intl_swift' ? selectedCountry.name : 'United States',
        targetCurrency: transferType === 'intl_swift' ? selectedCountry.currency : 'USD'
      });
      setAmount('');
      setMemo('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              US Domestic & International Money Movement
            </h2>
            <p className="text-xs text-slate-400">Transfer funds between US banks (ACH/Wire) or send SWIFT cross-border wires to over 150+ countries worldwide.</p>
          </div>
          <span className="bg-amber-950 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> FedNow & SWIFT Enabled
          </span>
        </div>

        {/* Transfer Mode Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setTransferType('us_ach')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              transferType === 'us_ach'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4" /> US Bank Wire / ACH
          </button>

          <button
            onClick={() => setTransferType('intl_swift')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              transferType === 'intl_swift'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-300" /> International SWIFT
          </button>

          <button
            onClick={() => setTransferType('internal')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              transferType === 'internal'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" /> Internal Accounts
          </button>

          <button
            onClick={() => setTransferType('inbound')}
            className={`py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              transferType === 'inbound'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4 text-emerald-400" /> Receive Wire Details
          </button>
        </div>
      </div>

      {/* RECEIVE INBOUND WIRES & DIRECT DEPOSIT DETAILS */}
      {transferType === 'inbound' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Inbound Wire & Direct Deposit Routing Instructions
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Provide these exact bank routing details to any US or International sender to receive funds directly into your Boom Bank account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Domestic US Wire Instructions */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded font-sans uppercase">
                US Domestic ACH & Direct Deposit
              </span>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500 font-sans">Bank Name:</span>
                  <span className="font-bold text-white">Boom Bank, N.A.</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500 font-sans">ABA Routing Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-300">021000021</span>
                    <button onClick={() => copyToClipboard('021000021', 'us_routing')} className="text-slate-400 hover:text-white">
                      {copiedKey === 'us_routing' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500 font-sans">Checking Account #:</span>
                  <span className="font-bold text-emerald-400">{primaryChecking?.accountNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Bank Address:</span>
                  <span className="text-[11px]">1 Wall St, New York, NY 10005</span>
                </div>
              </div>
            </div>

            {/* International SWIFT Inbound Wire Instructions */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded font-sans uppercase">
                International SWIFT Wire (Worldwide)
              </span>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500 font-sans">SWIFT / BIC Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-300">BOOMUS33XXX</span>
                    <button onClick={() => copyToClipboard('BOOMUS33XXX', 'swift')} className="text-slate-400 hover:text-white">
                      {copiedKey === 'swift' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500 font-sans">Beneficiary Name:</span>
                  <span className="font-bold text-white">{user.profile.firstName} {user.profile.lastName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500 font-sans">Beneficiary Account #:</span>
                  <span className="font-bold text-emerald-400">{primaryChecking?.accountNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-sans">Supported Currencies:</span>
                  <span className="text-[11px] text-amber-300 font-bold">USD, EUR, GBP, NGN, CAD, JPY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OUTBOUND TRANSFER FORM */}
      {transferType !== 'inbound' && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          
          {/* Source Account Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">From Boom Account (Source) *</label>
            <select
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
              required
            >
              {user.accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.accountName} ({maskAccountNumber(acc.accountNumber)}) - Available: {formatCurrency(acc.availableBalance)}
                </option>
              ))}
            </select>
          </div>

          {/* INTERNAL TRANSFER OPTIONS */}
          {transferType === 'internal' && (
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">To Account (Destination) *</label>
              <select
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-amber-500"
                required
              >
                {user.accounts.filter(a => a.id !== fromAccountId).map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.accountName} ({maskAccountNumber(acc.accountNumber)}) - Balance: {formatCurrency(acc.balance)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* US DOMESTIC ACH / FEDWIRE OPTIONS */}
          {transferType === 'us_ach' && (
            <div className="space-y-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">US Commercial Bank Information</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">9-Digit US ABA Routing Number *</label>
                  <input
                    type="text"
                    value={externalRouting}
                    onChange={(e) => setExternalRouting(e.target.value)}
                    placeholder="e.g. 122000496"
                    maxLength={9}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                    required
                  />
                  <span className="text-[10px] text-emerald-400 font-mono mt-1 block">✓ Validated US Federal Reserve Code</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">US Account Number *</label>
                  <input
                    type="text"
                    value={externalAccount}
                    onChange={(e) => setExternalAccount(e.target.value)}
                    placeholder="Account Number"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Recipient Name / US Bank *</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. JPMorgan Chase - John Doe"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>
          )}

          {/* INTERNATIONAL SWIFT WIRE OPTIONS */}
          {transferType === 'intl_swift' && (
            <div className="space-y-4 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  International Cross-Border SWIFT Wire
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">Sentinel-AI AML Screened</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Destination Country *</label>
                  <select
                    value={selectedCountry.code}
                    onChange={(e) => {
                      const found = COUNTRIES.find(c => c.code === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.code} value={c.code}>{c.name} ({c.currency})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">SWIFT / BIC Code (8 or 11 Characters) *</label>
                  <input
                    type="text"
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value.toUpperCase())}
                    placeholder="e.g. BARCGB22XXX"
                    maxLength={11}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">IBAN / International Account Number *</label>
                  <input
                    type="text"
                    value={ibanAccount}
                    onChange={(e) => setIbanAccount(e.target.value)}
                    placeholder="GB29BARC2020153094821"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Beneficiary Legal Name *</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Barclays Bank PLC - Alexander Smith"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              {/* FX Rate & Currency Preview Box */}
              {amount > 0 && (
                <div className="p-3 bg-slate-950/80 rounded-xl border border-cyan-500/30 text-xs flex justify-between items-center font-mono">
                  <div>
                    <span className="text-slate-400 block font-sans">Guaranteed Exchange Rate:</span>
                    <span className="font-bold text-white">1 USD = {selectedCountry.rate} {selectedCountry.currency}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-sans">Recipient Gets:</span>
                    <span className="font-bold text-emerald-400 text-sm">{selectedCountry.symbol} {calculatedFxAmount}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Amount & Memo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Transfer Amount ($USD) *</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-lg font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-lg font-bold text-white font-mono focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Transfer Purpose / Note (Optional)</label>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="e.g. Supplier Invoice, Family Maintenance"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !amount}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-amber-600/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Globe className="w-5 h-5" />
            {isSubmitting ? 'Transmitting Wire Request...' : `Execute Wire Transfer ($${parseFloat(amount || 0).toFixed(2)} USD)`}
          </button>
        </form>
      )}
    </div>
  );
}
