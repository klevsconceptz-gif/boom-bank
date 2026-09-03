import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Zap, Lock, FileCheck } from 'lucide-react';

export default function AdminGovernanceDesk() {
  const { user, showToast } = useAuth();
  const [pendingReqs, setPendingReqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pending-authorizations');
      const d = await res.json();
      setPendingReqs(d.pendingAuthorizations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAuthenticate = async (authReqId, action) => {
    try {
      const res = await fetch('/api/admin/transactions/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId: user.id, authReqId, action })
      });
      const data = await res.json();
      showToast(data.message);
      fetchPending();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  if (user?.role !== 'ADMIN') return null;

  return (
    <div className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 shadow-2xl space-y-4 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase font-mono">
              EXECUTIVE SIGNATURE DESK
            </span>
            <span className="text-xs text-amber-400 font-bold">Admin klev1212 Governance</span>
          </div>
          <h3 className="text-lg font-black text-white mt-1">
            Transaction Authorization & Authentication Queue ({pendingReqs.length})
          </h3>
          <p className="text-xs text-slate-300">
            Sentinel-AI & Credit-AI risk-screened incoming high-value wire transfers awaiting executive authentication signature by klev1212.
          </p>
        </div>

        <button
          onClick={fetchPending}
          className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${loading ? 'animate-spin' : ''}`} /> Refresh Queue
        </button>
      </div>

      {pendingReqs.length === 0 ? (
        <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/60 rounded-2xl border border-slate-800">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="font-bold text-white">All Pending Wire & ACH Transactions Authenticated!</p>
          <p className="text-slate-400 mt-0.5">Sentinel-AI is monitoring live transaction feeds in real-time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingReqs.map((req) => (
            <div key={req.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{req.userName} ({req.userEmail})</h4>
                    <span className="bg-amber-950 text-amber-300 border border-amber-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                      {req.aiRiskScore}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Requested: {new Date(req.requestedAt).toLocaleString()} • Ref: {req.id}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold font-mono text-amber-400">{formatCurrency(req.amount)}</p>
                  <p className="text-[10px] text-slate-400">Target: {req.recipientName} (ABA: {req.externalRouting})</p>
                </div>
              </div>

              {/* AI Risk Flags */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                <span className="text-slate-400 font-bold font-sans">Sentinel-AI Verification Flags:</span>
                {req.aiFlags?.map((flag, idx) => (
                  <span key={idx} className="bg-slate-900 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                    ✓ {flag}
                  </span>
                ))}
              </div>

              {/* Admin Action Buttons */}
              <div className="pt-2 flex justify-end items-center gap-3">
                <button
                  onClick={() => handleAuthenticate(req.id, 'reject')}
                  className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-400 border border-red-500/40 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                >
                  <XCircle className="w-4 h-4" /> Reject & Freeze Transaction
                </button>

                <button
                  onClick={() => handleAuthenticate(req.id, 'approve')}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transition transform hover:-translate-y-0.5"
                >
                  <ShieldCheck className="w-4 h-4" /> Authenticate & Execute Wire ($USD)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
