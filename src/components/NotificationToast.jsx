import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function NotificationToast() {
  const { toast } = useAuth();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold ${
        isSuccess
          ? 'bg-slate-900 border-emerald-500/50 text-emerald-300 shadow-emerald-950/50'
          : isError
          ? 'bg-slate-900 border-red-500/50 text-red-300 shadow-red-950/50'
          : 'bg-slate-900 border-blue-500/50 text-blue-300 shadow-blue-950/50'
      }`}>
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
