'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Server, Trash2, ArrowDownToLine, ExternalLink } from 'lucide-react';
import { resources, CloudResource } from '@/lib/mock-data';
import { useToast } from '@/components/toast-provider';

type FilterType = 'all' | 'AWS' | 'GCP' | 'Azure' | 'idle' | 'highcost';

const providerColors: Record<string, string> = {
  AWS: '#ff9900',
  GCP: '#4285f4',
  Azure: '#0078d4',
};

const statusConfig: Record<string, { label: string; class: string }> = {
  active: { label: 'Active', class: 'badge-active' },
  idle: { label: 'Idle', class: 'badge-idle' },
  orphan: { label: 'Orphan', class: 'badge-orphan' },
};

export default function ResourcesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [resourceList, setResourceList] = useState<CloudResource[]>(resources);
  const { showToast } = useToast();

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'AWS', value: 'AWS' },
    { label: 'GCP', value: 'GCP' },
    { label: 'Azure', value: 'Azure' },
    { label: 'Idle Only', value: 'idle' },
    { label: 'High Cost', value: 'highcost' },
  ];

  const filteredResources = resourceList.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.instanceType.toLowerCase().includes(search.toLowerCase()) ||
      r.region.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === 'all' ||
      (filter === 'AWS' && r.provider === 'AWS') ||
      (filter === 'GCP' && r.provider === 'GCP') ||
      (filter === 'Azure' && r.provider === 'Azure') ||
      (filter === 'idle' && (r.status === 'idle' || r.status === 'orphan')) ||
      (filter === 'highcost' && r.monthlyCost > 200);

    return matchesSearch && matchesFilter;
  });

  const totalCost = filteredResources.reduce((sum, r) => sum + r.monthlyCost, 0);
  const wastedCost = filteredResources.filter(r => r.status !== 'active').reduce((sum, r) => sum + r.monthlyCost, 0);

  const handleTerminate = (resource: CloudResource) => {
    setResourceList(prev => prev.filter(r => r.id !== resource.id));
    showToast(`Terminated ${resource.name} — saving $${resource.monthlyCost}/month`, 'success');
  };

  const handleResize = (resource: CloudResource) => {
    showToast(`Resize initiated for ${resource.name} — estimated 40% cost reduction`, 'info');
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Cloud Resources</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage and optimize all your cloud infrastructure</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass-card-static px-3 py-1.5 flex items-center gap-2 text-sm">
            <span className="text-[#94a3b8]">Total:</span>
            <span className="text-white font-semibold">${totalCost.toLocaleString()}/mo</span>
          </div>
          <div className="glass-card-static px-3 py-1.5 flex items-center gap-2 text-sm">
            <span className="text-[#94a3b8]">Waste:</span>
            <span className="text-[#ef4444] font-semibold">${wastedCost.toLocaleString()}/mo</span>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 bg-[rgba(148,163,184,0.06)] rounded-xl px-3 py-2 flex-1">
          <Search className="w-4 h-4 text-[#64748b]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, type, or region..."
            className="bg-transparent text-sm text-[#e2e8f0] placeholder-[#64748b] outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-[#64748b]" />
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f.value
                  ? 'bg-[#00d4aa]/15 text-[#00d4aa] border border-[#00d4aa]/30'
                  : 'bg-[rgba(148,163,184,0.06)] text-[#94a3b8] border border-transparent hover:bg-[rgba(148,163,184,0.1)] hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card-static overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(148,163,184,0.1)]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Resource</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider hidden sm:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Provider</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider hidden md:table-cell">Region</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Cost/mo</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider hidden lg:table-cell">Last Used</th>
                <th className="text-center px-4 py-3 text-xs font-medium text-[#64748b] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredResources.map((resource, i) => (
                  <motion.tr
                    key={resource.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-[rgba(148,163,184,0.06)] table-row-hover"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-[#64748b] flex-shrink-0" />
                        <span className="text-[#e2e8f0] font-medium truncate max-w-[180px]">{resource.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#94a3b8] hidden sm:table-cell">
                      <span className="truncate block max-w-[140px]">{resource.instanceType}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: `${providerColors[resource.provider]}15`, color: providerColors[resource.provider] }}>
                        {resource.provider}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#94a3b8] hidden md:table-cell">{resource.region}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${resource.monthlyCost > 500 ? 'text-[#ef4444]' : resource.monthlyCost > 200 ? 'text-[#f59e0b]' : 'text-[#e2e8f0]'}`}>
                        ${resource.monthlyCost}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[resource.status].class}`}>
                        {statusConfig[resource.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#64748b] text-xs hidden lg:table-cell">{resource.lastUsed}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {resource.status !== 'active' && (
                          <>
                            <button
                              onClick={() => handleTerminate(resource)}
                              className="p-1.5 rounded-lg text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                              title="Terminate"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleResize(resource)}
                              className="p-1.5 rounded-lg text-[#f59e0b] hover:bg-[#f59e0b]/10 transition-all"
                              title="Resize"
                            >
                              <ArrowDownToLine className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg text-[#64748b] hover:bg-[rgba(148,163,184,0.1)] hover:text-white transition-all" title="Details">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Server className="w-12 h-12 text-[#64748b] mx-auto mb-3" />
            <p className="text-[#94a3b8]">No resources found matching your criteria</p>
          </div>
        )}
      </motion.div>

      <p className="text-xs text-[#64748b] text-center">Showing {filteredResources.length} of {resourceList.length} resources</p>
    </div>
  );
}
