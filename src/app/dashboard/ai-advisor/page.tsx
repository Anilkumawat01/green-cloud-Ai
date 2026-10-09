'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Sparkles, Send, Zap, DollarSign, Leaf, Shield,
  CheckCircle, X, ChevronRight, MessageSquare, TrendingDown
} from 'lucide-react';
import { aiRecommendations, chatResponses, AIRecommendation } from '@/lib/mock-data';
import { useToast } from '@/components/toast-provider';

const categoryConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  cost: { color: '#f59e0b', icon: DollarSign, label: 'Cost' },
  performance: { color: '#6366f1', icon: Zap, label: 'Performance' },
  carbon: { color: '#22c55e', icon: Leaf, label: 'Carbon' },
  security: { color: '#ef4444', icon: Shield, label: 'Security' },
};

const priorityConfig: Record<string, { color: string; label: string }> = {
  high: { color: '#ef4444', label: 'High Priority' },
  medium: { color: '#f59e0b', label: 'Medium' },
  low: { color: '#64748b', label: 'Low' },
};

export default function AIAdvisorPage() {
  const [selectedRec, setSelectedRec] = useState<AIRecommendation | null>(null);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { showToast } = useToast();

  const activeRecs = aiRecommendations.filter(r => !dismissedIds.has(r.id));
  const totalSavings = activeRecs.reduce((sum, r) => sum + r.savings, 0);
  const totalCarbon = activeRecs.reduce((sum, r) => sum + r.carbonImpact, 0);

  const suggestedQuestions = [
    "Why is my AWS bill high?",
    "Which region is most eco-friendly?",
    "How can I reduce carbon emissions?",
    "Show me cost optimization tips",
  ];

  const handleApplyFix = (rec: AIRecommendation) => {
    setDismissedIds(prev => new Set(prev).add(rec.id));
    showToast(`Applied fix: ${rec.action} — saving $${rec.savings}/month`, 'success');
  };

  const handleDismiss = (rec: AIRecommendation) => {
    setDismissedIds(prev => new Set(prev).add(rec.id));
    showToast(`Dismissed recommendation`, 'info');
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', text }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = chatResponses[text] || 
        "I'll analyze that for you. Based on your current infrastructure:\n\n• You have 18 resources across AWS, GCP, and Azure\n• Total monthly spend: $12,450\n• Identified waste: $3,840 (31%)\n• Carbon footprint: 2.4 tonnes CO₂/month\n\nI recommend starting with the high-priority recommendations in the left panel to achieve the quickest wins.";
      setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Advisor</h1>
          <p className="text-sm text-[#64748b] mt-1">AI-powered recommendations to optimize cost and carbon</p>
        </div>
      </div>

      {/* Savings Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-static p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#00d4aa]/20 bg-gradient-to-r from-[#00d4aa]/5 to-transparent"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/15 flex items-center justify-center">
            <TrendingDown className="w-5 h-5 text-[#00d4aa]" />
          </div>
          <div>
            <p className="text-sm text-[#94a3b8]">Total Potential Impact</p>
            <p className="text-xl font-bold text-white">
              <span className="text-[#00d4aa]">${totalSavings.toLocaleString()}/month</span>
              <span className="text-[#94a3b8] mx-2">|</span>
              <span className="text-[#22c55e]">{totalCarbon.toFixed(1)} tonnes CO₂</span>
            </p>
          </div>
        </div>
        <div className="text-sm text-[#94a3b8]">
          {activeRecs.length} recommendations · {activeRecs.filter(r => r.priority === 'high').length} high priority
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recommendations List */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-sm font-medium text-[#94a3b8] uppercase tracking-wider">Recommendations</h3>
          <AnimatePresence>
            {activeRecs.map((rec, i) => {
              const cat = categoryConfig[rec.category];
              const pri = priorityConfig[rec.priority];
              return (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`glass-card p-5 cursor-pointer ${selectedRec?.id === rec.id ? 'border-[#00d4aa]/30 glow-accent' : ''}`}
                  onClick={() => setSelectedRec(rec)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cat.color}15` }}>
                      <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${pri.color}15`, color: pri.color }}>
                          {pri.label}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                          {cat.label}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{rec.issue}</h4>
                      <p className="text-xs text-[#64748b] line-clamp-2">{rec.description}</p>

                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-[#00d4aa]" />
                          <span className="text-xs text-[#00d4aa] font-semibold">${rec.savings}/mo</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Leaf className="w-3.5 h-3.5 text-[#22c55e]" />
                          <span className="text-xs text-[#22c55e] font-semibold">-{rec.carbonImpact}t CO₂</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                          <span className="text-xs text-[#f59e0b] font-semibold">{rec.confidence}% confident</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => { e.stopPropagation(); handleApplyFix(rec); }}
                          className="px-4 py-1.5 rounded-lg bg-[#00d4aa]/15 text-[#00d4aa] text-xs font-semibold hover:bg-[#00d4aa]/25 transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Apply Fix
                        </motion.button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDismiss(rec); }}
                          className="px-4 py-1.5 rounded-lg bg-[rgba(148,163,184,0.06)] text-[#94a3b8] text-xs font-medium hover:bg-[rgba(148,163,184,0.1)] transition-colors flex items-center gap-1.5"
                        >
                          <X className="w-3.5 h-3.5" /> Dismiss
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence>
                    {selectedRec?.id === rec.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-[rgba(148,163,184,0.1)]">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-[#64748b] mb-1">Recommended Action</p>
                              <p className="text-sm text-[#e2e8f0]">{rec.action}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#64748b] mb-1">Affected Resources</p>
                              <div className="flex flex-wrap gap-1">
                                {rec.affectedResources.map(r => (
                                  <span key={r} className="px-2 py-0.5 rounded text-xs bg-[rgba(148,163,184,0.08)] text-[#94a3b8]">{r}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {activeRecs.length === 0 && (
            <div className="glass-card-static p-12 text-center">
              <CheckCircle className="w-12 h-12 text-[#00d4aa] mx-auto mb-3" />
              <p className="text-lg font-semibold text-white">All optimized!</p>
              <p className="text-sm text-[#64748b]">All recommendations have been applied or dismissed.</p>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-2">
          <div className="glass-card-static flex flex-col sticky top-20" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
            <div className="p-4 border-b border-[rgba(148,163,184,0.1)] flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#00d4aa]" />
              <h3 className="text-sm font-semibold text-white">Ask AI</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#00d4aa]/10 text-[#00d4aa]">Beta</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="w-10 h-10 text-[#64748b] mx-auto mb-3" />
                  <p className="text-sm text-[#94a3b8] mb-4">Ask me anything about your cloud infrastructure</p>
                  <div className="space-y-2">
                    {suggestedQuestions.map(q => (
                      <button
                        key={q}
                        onClick={() => handleSendMessage(q)}
                        className="w-full text-left p-3 rounded-xl bg-[rgba(148,163,184,0.04)] hover:bg-[rgba(148,163,184,0.08)] border border-[rgba(148,163,184,0.08)] hover:border-[rgba(148,163,184,0.15)] text-sm text-[#94a3b8] hover:text-white transition-all flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-[#00d4aa] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={msg.role === 'user' ? 'flex justify-end' : ''}
                >
                  <div className={`max-w-[95%] p-3.5 ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>
                    <p className="text-sm text-[#e2e8f0] whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="chat-bubble-ai p-3.5 inline-block"
                >
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-[#00d4aa] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#00d4aa] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#00d4aa] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-[rgba(148,163,184,0.1)]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage(chatInput)}
                  placeholder="Ask about your cloud infrastructure..."
                  className="flex-1 bg-[rgba(148,163,184,0.06)] rounded-xl px-4 py-2.5 text-sm text-[#e2e8f0] placeholder-[#64748b] outline-none border border-transparent focus:border-[#00d4aa]/30 transition-colors"
                />
                <button
                  onClick={() => handleSendMessage(chatInput)}
                  className="w-10 h-10 rounded-xl bg-[#00d4aa]/15 hover:bg-[#00d4aa]/25 flex items-center justify-center transition-colors"
                  disabled={!chatInput.trim()}
                >
                  <Send className="w-4 h-4 text-[#00d4aa]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
