'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Globe2, TreePine, Plane, MapPin, ArrowRight, TrendingDown, AlertTriangle, CheckCircle, Leaf
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { carbonRegions, carbonMonthlyData } from '@/lib/mock-data';
import { useCountUp } from '@/lib/hooks';

function AnimatedStat({ value, suffix, decimals = 1 }: { value: number; suffix: string; decimals?: number }) {
  const { count, ref } = useCountUp(value, 2000, decimals);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function CarbonPage() {
  const [chartsLoaded, setChartsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChartsLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  const levelIcons: Record<string, React.ReactNode> = {
    'VERY LOW': <CheckCircle className="w-4 h-4 text-[#00d4aa]" />,
    'LOW': <CheckCircle className="w-4 h-4 text-[#22c55e]" />,
    'MEDIUM': <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />,
    'HIGH': <AlertTriangle className="w-4 h-4 text-[#ef4444]" />,
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Carbon Tracker</h1>
          <p className="text-sm text-[#64748b] mt-1">Monitor and reduce your cloud carbon footprint</p>
        </div>
        <div className="glass-card-static px-4 py-2 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#00d4aa]" />
          <span className="text-sm text-[#94a3b8]">ESG Compliance:</span>
          <span className="text-sm text-[#00d4aa] font-semibold">Ready</span>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 text-center"
        >
          <Globe2 className="w-8 h-8 text-[#6366f1] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white"><AnimatedStat value={2.4} suffix=" t" /></p>
          <p className="text-sm text-[#94a3b8] mt-1">CO₂ this month</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 text-center"
        >
          <TrendingDown className="w-8 h-8 text-[#00d4aa] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white"><AnimatedStat value={3.2} suffix=" t" /></p>
          <p className="text-sm text-[#94a3b8] mt-1">Reducible emissions</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 text-center"
        >
          <TreePine className="w-8 h-8 text-[#22c55e] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white"><AnimatedStat value={0.8} suffix=" t" /></p>
          <p className="text-sm text-[#94a3b8] mt-1">Already offset</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emissions Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card-static p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Monthly Emissions</h3>
          <p className="text-xs text-[#64748b] mb-6">CO₂ emissions vs offsets (tonnes)</p>
          {chartsLoaded ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={carbonMonthlyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.06)" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `${v}t`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass-card-static p-3 text-xs">
                          <p className="text-[#94a3b8] mb-1">{label}</p>
                          <p className="text-[#ef4444]">Emissions: {payload[0].value}t CO₂</p>
                          <p className="text-[#00d4aa]">Offset: {payload[1].value}t CO₂</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="emissions" radius={[6, 6, 0, 0]}>
                  {carbonMonthlyData.map((_, i) => (
                    <Cell key={i} fill={i === carbonMonthlyData.length - 1 ? '#6366f1' : '#ef444480'} />
                  ))}
                </Bar>
                <Bar dataKey="offset" fill="#00d4aa" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] skeleton" />
          )}
        </motion.div>

        {/* Region Map / Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card-static p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-1">Data Center Regions</h3>
          <p className="text-xs text-[#64748b] mb-4">Carbon intensity by region (g CO₂/kWh)</p>
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {carbonRegions.map((region, i) => (
              <motion.div
                key={`${region.provider}-${region.region}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(15,23,42,0.3)] hover:bg-[rgba(15,23,42,0.5)] transition-all group"
              >
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: region.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white truncate">{region.region}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${region.color}15`, color: region.color }}>
                      {region.provider}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b]">{region.location}</p>
                </div>
                <div className="text-right flex items-center gap-2 flex-shrink-0">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: region.color }}>{region.intensity}g</p>
                    <div className="flex items-center gap-1">
                      {levelIcons[region.level]}
                      <p className="text-xs" style={{ color: region.color }}>{region.level}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Migration Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass-card p-6 border-l-4 border-l-[#00d4aa]"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#00d4aa]" />
              </div>
              <h3 className="text-lg font-semibold text-white">Migration Recommendation</h3>
            </div>
            <p className="text-sm text-[#94a3b8] mb-4">
              Moving non-latency-critical workloads from <span className="text-[#ef4444] font-medium">us-east-1 (Virginia)</span> to{' '}
              <span className="text-[#00d4aa] font-medium">us-west-2 (Oregon)</span> would reduce your carbon intensity by{' '}
              <span className="text-white font-semibold">71%</span>.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <p className="text-[#64748b]">Annual CO₂ Savings</p>
                <p className="text-xl font-bold text-[#00d4aa]">2.1 tonnes</p>
              </div>
              <div>
                <p className="text-[#64748b]">Cost Impact</p>
                <p className="text-xl font-bold text-white">-$85/mo</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="btn-primary text-sm px-6 py-2.5">Apply Migration</button>
            <button className="btn-secondary text-sm px-6 py-2.5">View Details</button>
          </div>
        </div>
      </motion.div>

      {/* Carbon Offset Equivalents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">If you optimize, your savings equal...</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: TreePine, value: '45', label: 'Trees Planted', desc: 'Equivalent CO₂ absorption in 1 year', color: '#22c55e' },
            { icon: Plane, value: '3', label: 'Flights Saved', desc: 'Mumbai → Delhi round trips', color: '#f59e0b' },
            { icon: Globe2, value: '12,400', label: 'km Driving Saved', desc: 'Average car CO₂ emissions', color: '#6366f1' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon className="w-7 h-7" style={{ color: item.color }} />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{item.value}</p>
              <p className="text-sm font-medium text-[#e2e8f0]">{item.label}</p>
              <p className="text-xs text-[#64748b] mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
