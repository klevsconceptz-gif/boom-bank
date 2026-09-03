import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CheckCircle2, Building2, Printer } from 'lucide-react';

export default function ReceiptModal() {
  const { selectedReceiptTx, setActiveModal, setSelectedReceiptTx } = useAuth();

  if (!selectedReceiptTx) return null;
  const tx = selectedReceiptTx;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
        
        {/* Modal Top */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded uppercase tracking-wider">
            OFFICIAL BANK TRANSACTION RECORD
          </span>
          <button
            onClick={() => {
              setActiveModal(null);
              setSelectedReceiptTx(null);
            }}
            className="text-slate-400 hover:text-white font-bold text-sm w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Receipt Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </div>
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">TRANSACTION POSTED</p>
          <h3 className="text-2xl font-black font-mono text-white">
            {tx.type === 'Credit' ? '+' : '-'}{formatCurrency(tx.amount)}
          </h3>
          <p className="text-xs text-slate-300 font-bold">{tx.description}</p>
        </div>

        {/* Receipt Details */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono space-y-2.5 text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Reference ID:</span>
            <span className="font-bold text-blue-300">{tx.reference || tx.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Posting Date:</span>
            <span>{tx.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Category:</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-200">{tx.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Merchant / Counterparty:</span>
            <span className="font-bold text-white">{tx.merchant}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-sans">Bank Clearing Node:</span>
            <span className="text-slate-400">Fedwire / FedACH 021000021</span>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition"
        >
          <Printer className="w-4 h-4 text-blue-400" /> Print Digital Receipt
        </button>
      </div>
    </div>
  );
}
