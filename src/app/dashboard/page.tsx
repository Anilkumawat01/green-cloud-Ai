'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, AlertTriangle, Leaf, TrendingDown, TrendingUp,
  ArrowUpRight, ArrowDownRight, AlertCircle, Info, ChevronRight
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { costTrendData, serviceBreakdown, alerts } from '@/lib/mock-data';
import { useCountUp } from '@/lib/hooks';
import Link from 'next/link';

function StatCard({ title, value, prefix, suffix, trend, trendValue, color, icon: Icon, delay, decimals = 0 }: {
  title: string; value: number; prefix?: string; suffix?: string; trend: 'up' | 'down'; trendValue: string;
  color: string; icon: React.ElementType; delay: number; decimals?: number;
}) {
  const { count, ref } = useCountUp(value, 2000, decimals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800 + delay * 200);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      {loading ? (
        <div className="space-y-3">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-8 w-32" />
          <div className="skeleton h-3 w-20" />
        </div>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -mr-8 -mt-8 transition-transform group-hover:scale-110" style={{ backgroundColor: color }} />
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#94a3b8] font-medium">{title}</p>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
          </div>
          <p ref={ref} className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {prefix}{count.toLocaleString()}{suffix}
          </p>
          <div className="flex items-center gap-1.5">
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-[#ef4444]" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-[#00d4aa]" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-[#ef4444]' : 'text-[#00d4aa]'}`}>
              {trendValue}
            </span>
            <span className="text-xs text-[#64748b]">vs last month</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card-static p-3 text-xs">
        <p className="text-[#94a3b8] mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="font-medium" style={{ color: entry.color }}>
            {entry.dataKey}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChartsLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const alertIcons: Record<string, React.ElementType> = {
    warning: AlertTriangle,
    danger: AlertCircle,
    info: Info,
  };

  const alertColors: Record<string, string> = {
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#6366f1',
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-[#64748b] mt-1">Monitor your cloud costs, waste, and carbon footprint</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748b]">
          <div className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
          Live data · Last updated 2 min ago
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Monthly Cost" value={12450} prefix="$" trend="up" trendValue="+5.2%" color="#6366f1" icon={DollarSign} delay={0} />
        <StatCard title="Wasted Resources" value={3840} prefix="$" suffix="" trend="up" trendValue="+8.1%" color="#ef4444" icon={AlertTriangle} delay={1} />
        <StatCard title="Carbon Footprint" value={2.4} suffix=" t CO₂" trend="down" trendValue="-12%" color="#22c55e" icon={Leaf} delay={2} decimals={1} />
        <StatCard title="Potential Savings" value={2100} prefix="$" suffix="/mo" trend="down" trendValue="+$300" color="#00d4aa" icon={TrendingDown} delay={3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card-static p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Cost Trend</h3>
              <p className="text-xs text-[#64748b] mt-1">Total spend vs waste over 6 months</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#6366f1] rounded" /> Total</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#ef4444] rounded" /> Waste</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#00d4aa] rounded" /> Savings</span>
            </div>
          </div>
          {chartsLoaded ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={costTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="cost" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="waste" stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="savings" stroke="#00d4aa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] skeleton" />
          )}
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card-static p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Cost by Service</h3>
          <p className="text-xs text-[#64748b] mb-4">Monthly breakdown</p>
          {chartsLoaded ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {serviceBreakdown.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card-static p-2 text-xs">
                            <p className="text-white font-medium">{payload[0].name}</p>
                            <p className="text-[#94a3b8]">${(payload[0].value as number).toLocaleString()}/mo</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {serviceBreakdown.map(item => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[#94a3b8]">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[380px] skeleton" />
          )}
        </motion.div>
      </div>

      {/* Alerts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card-static p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
            <Link href="/dashboard/resources" className="text-xs text-[#00d4aa] hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, i) => {
              const AlertIcon = alertIcons[alert.type] || Info;
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(148,163,184,0.04)] transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${alertColors[alert.type]}15` }}>
                    <AlertIcon className="w-4 h-4" style={{ color: alertColors[alert.type] }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-[#00d4aa] transition-colors">{alert.title}</p>
                    <p className="text-xs text-[#64748b] mt-0.5 line-clamp-1">{alert.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-[#64748b]">{alert.time}</p>
                    {alert.savings > 0 && (
                      <p className="text-xs text-[#00d4aa] font-medium mt-0.5">Save ${alert.savings}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card-static p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Run AI Scan', desc: 'Find new savings', href: '/dashboard/ai-advisor', color: '#00d4aa', icon: TrendingDown },
              { label: 'View Resources', desc: '18 resources tracked', href: '/dashboard/resources', color: '#6366f1', icon: TrendingUp },
              { label: 'Carbon Report', desc: 'ESG-ready export', href: '/dashboard/carbon', color: '#22c55e', icon: Leaf },
              { label: 'Cost Report', desc: 'Monthly summary', href: '/dashboard/reports', color: '#f59e0b', icon: DollarSign },
            ].map((action, i) => (
              <Link key={action.label} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 rounded-xl border border-[rgba(148,163,184,0.08)] hover:border-[rgba(148,163,184,0.15)] bg-[rgba(15,23,42,0.3)] hover:bg-[rgba(15,23,42,0.5)] transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${action.color}15` }}>
                    <action.icon className="w-4.5 h-4.5" style={{ color: action.color }} />
                  </div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#00d4aa] transition-colors">{action.label}</p>
                  <p className="text-xs text-[#64748b] mt-0.5">{action.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Savings Progress */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00d4aa]/5 to-[#00d4aa]/10 border border-[#00d4aa]/15">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white">Optimization Progress</p>
              <p className="text-sm font-bold text-[#00d4aa]">68%</p>
            </div>
            <div className="w-full h-2 bg-[rgba(148,163,184,0.1)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#00d4aa] to-[#00b894] rounded-full"
              />
            </div>
            <p className="text-xs text-[#64748b] mt-2">5 of 7 recommendations applied</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
