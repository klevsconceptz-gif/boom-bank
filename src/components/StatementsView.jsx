import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, maskAccountNumber } from '../utils/formatters';
import { FileText, Download, Printer, ShieldCheck, Building, CheckCircle2 } from 'lucide-react';

export default function StatementsView() {
  const { user, setActiveModal } = useAuth();

  if (!user) return null;

  const statements = [
    { id: 'stmt_2026_08', period: 'August 2026 Monthly Statement', date: '2026-08-31', size: '142 KB' },
    { id: 'stmt_2026_07', period: 'July 2026 Monthly Statement', date: '2026-07-31', size: '138 KB' },
    { id: 'stmt_2026_06', period: 'June 2026 Monthly Statement', date: '2026-06-30', size: '145 KB' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Statements & Tax Documents
            </h2>
            <p className="text-xs text-slate-400">Download official PDF bank statements, Direct Deposit forms, and IRS Form 1099-INT tax certificates.</p>
          </div>
        </div>
      </div>

      {/* Quick Action Direct Deposit Authorization Generator */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-900 border border-blue-500/40 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Official Pre-Filled Document
          </span>
          <h3 className="text-base font-bold text-white mt-1">Direct Deposit Authorization Form</h3>
          <p className="text-xs text-slate-300">Give this pre-filled form to your employer or payroll provider to setup automatic direct deposit.</p>
        </div>
        <button
          onClick={() => setActiveModal('direct-deposit')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition shrink-0"
        >
          <Printer className="w-4 h-4" />
          Generate Direct Deposit Form
        </button>
      </div>

      {/* Monthly Statements List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-3">
          Monthly Account Statements (2026)
        </h3>

        <div className="divide-y divide-slate-800/80">
          {statements.map((st) => (
            <div key={st.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{st.period}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Issued: {st.date} • PDF ({st.size})</p>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
