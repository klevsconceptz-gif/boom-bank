import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bot, ShieldCheck, Sparkles, Send, CheckCircle2, Zap, Activity, Cpu, Lock } from 'lucide-react';

export default function AiStaffHub() {
  const { user } = useAuth();
  const [aiAgents, setAiAgents] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Concierge-AI', text: 'Hello! I am Concierge-AI, your 24/7 Boom Bank Assistant. Ask me anything about your balances, virtual cards, routing number 021000021, or Admin authentication policies!', isAi: true }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    fetch('/api/ai/staff')
      .then(res => res.json())
      .then(d => setAiAgents(d.aiStaff || []))
      .catch(err => console.error(err));
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setInputMsg('');
    setChatMessages(prev => [...prev, { sender: 'You', text: userText, isAi: false }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, message: userText })
      });
      const data = await res.json();
      setChatMessages(prev => [
        ...prev,
        { sender: data.agent || 'Concierge-AI', text: data.reply, isAi: true }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-amber-400" /> AUTONOMOUS AI STAFF ROSTER
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">
              Boom Bank AI Officers Hub
            </h2>
            <p className="text-xs text-slate-300">Meet your 24/7 AI Bank Staff. Overseen & Authenticated by Executive Administrator klev1212.</p>
          </div>
          <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 font-mono">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" /> 5 AGENTS ONLINE
          </span>
        </div>
      </div>

      {/* Grid of AI Bank Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiAgents.map((agent) => (
          <div key={agent.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition shadow-lg space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-xl shadow">
                  {agent.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {agent.name}
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h4>
                  <p className="text-[10px] text-amber-400 font-bold">{agent.role}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {agent.description}
            </p>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-mono">
              <span>Processed Today: <strong>{agent.tasksProcessedToday.toLocaleString()}</strong></span>
              <span className="text-emerald-400 font-bold">{agent.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive AI Concierge Assistant Chatbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Concierge-AI Live Interactive Assistant</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded">
            256-Bit SSL Encrypted Session
          </span>
        </div>

        {/* Chat History Messages */}
        <div className="bg-slate-950 rounded-2xl p-4 h-64 overflow-y-auto space-y-3 font-sans text-xs border border-slate-800/80">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.isAi ? 'items-start' : 'items-end'}`}>
              <span className="text-[10px] text-slate-500 font-mono mb-1">{msg.sender}</span>
              <div className={`p-3 rounded-2xl max-w-md leading-relaxed ${
                msg.isAi
                  ? 'bg-slate-900 text-slate-100 border border-slate-800'
                  : 'bg-amber-600 text-white font-medium shadow-md'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
              <Bot className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Concierge-AI is typing response...</span>
            </div>
          )}
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Ask Concierge-AI about balances, wire authorizations, card limits, APY rates..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition shrink-0"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
