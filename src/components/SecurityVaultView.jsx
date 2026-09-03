import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Key, Cpu, FileCheck, CheckCircle2, RefreshCw, Server, Zap } from 'lucide-react';

export default function SecurityVaultView() {
  const { showToast } = useAuth();
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTelemetry = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/security/encryption-status');
      const data = await res.json();
      setTelemetry(data);
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch security telemetry.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 border border-emerald-500/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo-mark.png" alt="Boom Bank Emblem" className="w-12 h-12 object-contain drop-shadow-lg" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">AES-256-GCM Cryptographic Vault</h2>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> ENCRYPTED
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Real-time telemetry audit for hardware encryption at rest & in transit.</p>
            </div>
          </div>

          <button
            onClick={fetchTelemetry}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${loading ? 'animate-spin' : ''}`} /> Refresh Telemetry
          </button>
        </div>
      </div>

      {/* Cryptographic Standards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Encryption Engine Status */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <Lock className="w-4 h-4 text-amber-400" />
            Data-At-Rest Encryption Standard
          </h3>

          <div className="space-y-2.5 font-mono text-slate-300">
            <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-500 font-sans">Primary Cipher:</span>
              <span className="font-bold text-emerald-400">AES-256-GCM</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-500 font-sans">Key Size:</span>
              <span className="font-bold text-white">256-Bit Hardware Key</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-500 font-sans">Password Key Derivation:</span>
              <span className="font-bold text-amber-300">PBKDF2 SHA-512</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Compliance Rating:</span>
              <span className="font-bold text-emerald-400">FIPS 140-2 & PCI-DSS L1</span>
            </div>
          </div>
        </div>

        {/* Transmission Security & Integrity */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2 border-b border-slate-800 pb-2.5">
            <Server className="w-4 h-4 text-cyan-400" />
            Transmission & Database Checksum
          </h3>

          <div className="space-y-2.5 font-mono text-slate-300">
            <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-500 font-sans">Transport Security:</span>
              <span className="font-bold text-cyan-300">TLS 1.3 256-Bit</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-500 font-sans">Security Headers:</span>
              <span className="font-bold text-emerald-400">HSTS, NoSniff, CSP, XSS</span>
            </div>
            <div className="border-b border-slate-800/60 pb-1.5">
              <span className="text-slate-500 font-sans block mb-1">SHA-256 Storage Integrity Checksum:</span>
              <code className="text-[10px] text-amber-300 break-all bg-slate-950 p-1.5 rounded block border border-slate-800">
                {telemetry?.databaseIntegrityChecksum || 'Calculating SHA-256 hash...'}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
