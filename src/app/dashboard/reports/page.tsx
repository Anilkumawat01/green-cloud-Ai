'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Share2, Calendar, TrendingDown, TrendingUp, Leaf, DollarSign
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Area, AreaChart
} from 'recharts';
import { reportData } from '@/lib/mock-data';
import { useToast } from '@/components/toast-provider';

export default function ReportsPage() {
  const { showToast } = useToast();
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'6m' | '12m'>('12m');

  useEffect(() => {
    const t = setTimeout(() => setChartsLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  const data = selectedPeriod === '6m' ? reportData.monthly.slice(-6) : reportData.monthly;

  const totalSpent = data.reduce((sum, d) => sum + d.totalCost, 0);
  const totalWaste = data.reduce((sum, d) => sum + d.waste, 0);
  const totalSavings = data.reduce((sum, d) => sum + d.savings, 0);
  const totalCarbon = data.reduce((sum, d) => sum + d.carbon, 0);

  const handleDownload = (reportName: string) => {
    showToast(`Downloading ${reportName}...`, 'success');
  };

  const handleShare = () => {
    showToast('Share link copied to clipboard', 'success');
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-[#64748b] mt-1">Cost analysis, carbon footprint, and optimization reports</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-[rgba(148,163,184,0.06)] rounded-xl p-1">
            {(['6m', '12m'] as const).map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedPeriod === p
                    ? 'bg-[#00d4aa]/15 text-[#00d4aa]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {p === '6m' ? '6 Months' : '12 Months'}
              </button>
            ))}
          </div>
          <button onClick={handleShare} className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Spend', value: `$${(totalSpent / 1000).toFixed(1)}K`, icon: DollarSign, color: '#6366f1', trend: '+12%' },
          { label: 'Total Waste', value: `$${(totalWaste / 1000).toFixed(1)}K`, icon: TrendingUp, color: '#ef4444', trend: '+18%' },
          { label: 'Savings Achieved', value: `$${(totalSavings / 1000).toFixed(1)}K`, icon: TrendingDown, color: '#00d4aa', trend: '+340%' },
          { label: 'Carbon Footprint', value: `${totalCarbon.toFixed(1)}t`, icon: Leaf, color: '#22c55e', trend: '-8%' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <span className={`text-xs font-medium ${stat.trend.startsWith('+') && stat.color === '#ef4444' ? 'text-[#ef4444]' : 'text-[#00d4aa]'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-[#64748b] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Year-over-Year Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card-static p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Cost vs Savings Trend</h3>
            <p className="text-xs text-[#64748b] mt-1">Monthly comparison of total cost, waste, and savings achieved</p>
          </div>
        </div>
        {chartsLoaded ? (
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#00d4aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card-static p-3 text-xs">
                        <p className="text-[#94a3b8] mb-2 font-medium">{label}</p>
                        {payload.map((entry, i) => (
                          <p key={i} style={{ color: entry.color as string }} className="font-medium">
                            {entry.name}: ${(entry.value as number).toLocaleString()}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
                iconType="circle"
                iconSize={8}
              />
              <Area type="monotone" dataKey="totalCost" name="Total Cost" stroke="#6366f1" fill="url(#costGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="waste" name="Waste" stroke="#ef4444" fill="url(#wasteGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="savings" name="Savings" stroke="#00d4aa" fill="url(#savingsGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[320px] skeleton" />
        )}
      </motion.div>

      {/* Carbon Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card-static p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Carbon Emissions Trend</h3>
            <p className="text-xs text-[#64748b] mt-1">Monthly CO₂ emissions in tonnes</p>
          </div>
        </div>
        {chartsLoaded ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}t`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card-static p-3 text-xs">
                        <p className="text-[#94a3b8] mb-1">{label}</p>
                        <p className="text-[#22c55e]">{payload[0].value}t CO₂</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="carbon" fill="#22c55e" radius={[6, 6, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[250px] skeleton" />
        )}
      </motion.div>

      {/* Downloadable Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Monthly Cost Report', desc: 'Detailed breakdown of cloud spend for October 2026', date: 'Oct 1 – Oct 7, 2026', type: 'PDF', icon: DollarSign, color: '#6366f1' },
            { title: 'Carbon Footprint Report', desc: 'ESG-compliant sustainability report with offset tracking', date: 'Q3 2026', type: 'PDF', icon: Leaf, color: '#22c55e' },
            { title: 'Optimization Summary', desc: 'Applied recommendations and savings achieved', date: 'Last 30 days', type: 'CSV', icon: TrendingDown, color: '#00d4aa' },
            { title: 'Resource Audit Report', desc: 'Complete inventory of cloud resources and utilization', date: 'Oct 7, 2026', type: 'PDF', icon: FileText, color: '#f59e0b' },
            { title: 'Cost Anomaly Report', desc: 'Unusual spending patterns and cost spikes detected', date: 'Sep 2026', type: 'PDF', icon: TrendingUp, color: '#ef4444' },
            { title: 'Team Activity Report', desc: 'Actions taken by team members on recommendations', date: 'Last 30 days', type: 'CSV', icon: Calendar, color: '#8b5cf6' },
          ].map((report, i) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.05 }}
              className="glass-card p-5 group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${report.color}15` }}>
                  <report.icon className="w-5 h-5" style={{ color: report.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#00d4aa] transition-colors">{report.title}</h4>
                  <p className="text-xs text-[#64748b] mt-0.5">{report.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#64748b]">
                  <Calendar className="w-3 h-3" />
                  {report.date}
                </div>
                <button
                  onClick={() => handleDownload(report.title)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(148,163,184,0.06)] hover:bg-[#00d4aa]/10 text-[#94a3b8] hover:text-[#00d4aa] text-xs font-medium transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {report.type}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
