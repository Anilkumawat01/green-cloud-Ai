'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud, Bell, Users, Shield, Hash, Mail, MessageSquare,
  Check, Plus, Trash2, ChevronRight, Settings as SettingsIcon
} from 'lucide-react';
import { teamMembers } from '@/lib/mock-data';
import { useToast } from '@/components/toast-provider';

export default function SettingsPage() {
  const { showToast } = useToast();

  const [providers, setProviders] = useState([
    { name: 'AWS', icon: '🟠', connected: true, accountId: '****-****-1234', regions: 4 },
    { name: 'Google Cloud', icon: '🔵', connected: true, accountId: 'greencloud-prod', regions: 3 },
    { name: 'Azure', icon: '🟦', connected: false, accountId: '', regions: 0 },
  ]);

  const [notifications, setNotifications] = useState({
    slack: true,
    email: true,
    teams: false,
  });

  const [thresholds, setThresholds] = useState({
    wasteThreshold: 500,
    carbonThreshold: 3,
    costSpike: 20,
  });

  const handleConnect = (name: string) => {
    setProviders(prev => prev.map(p =>
      p.name === name ? { ...p, connected: !p.connected, accountId: p.connected ? '' : '****-****-5678', regions: p.connected ? 0 : 2 } : p
    ));
    showToast(`${name} ${providers.find(p => p.name === name)?.connected ? 'disconnected' : 'connected'} successfully`, 'success');
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    showToast(`${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${notifications[key] ? 'disabled' : 'enabled'}`, 'info');
  };

  const handleSaveThresholds = () => {
    showToast('Alert thresholds saved successfully', 'success');
  };

  return (
    <div className="space-y-8 max-w-[900px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-[#64748b] mt-1">Manage your cloud connections, notifications, and team</p>
      </div>

      {/* Cloud Providers */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5 text-[#00d4aa]" />
          <h2 className="text-lg font-semibold text-white">Cloud Providers</h2>
        </div>
        <div className="space-y-3">
          {providers.map((provider, i) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{provider.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{provider.name}</h3>
                  {provider.connected ? (
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[#64748b]">Account: {provider.accountId}</span>
                      <span className="text-xs text-[#64748b]">·</span>
                      <span className="text-xs text-[#64748b]">{provider.regions} regions</span>
                    </div>
                  ) : (
                    <p className="text-xs text-[#64748b] mt-1">Not connected</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {provider.connected && (
                  <span className="flex items-center gap-1.5 text-xs text-[#00d4aa]">
                    <Check className="w-3.5 h-3.5" /> Connected
                  </span>
                )}
                <button
                  onClick={() => handleConnect(provider.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    provider.connected
                      ? 'bg-[rgba(148,163,184,0.06)] text-[#94a3b8] hover:bg-[#ef4444]/10 hover:text-[#ef4444]'
                      : 'bg-[#00d4aa]/15 text-[#00d4aa] hover:bg-[#00d4aa]/25'
                  }`}
                >
                  {provider.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-[#f59e0b]" />
          <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
        </div>
        <div className="glass-card-static p-5 space-y-4">
          {[
            { key: 'slack' as const, label: 'Slack', desc: 'Get alerts in your Slack workspace', icon: Hash },
            { key: 'email' as const, label: 'Email', desc: 'Receive email notifications', icon: Mail },
            { key: 'teams' as const, label: 'Microsoft Teams', desc: 'Post alerts to Teams channels', icon: MessageSquare },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(148,163,184,0.06)] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[#94a3b8]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-[#64748b]">{item.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationToggle(item.key)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  notifications[item.key] ? 'bg-[#00d4aa]' : 'bg-[rgba(148,163,184,0.2)]'
                }`}
              >
                <motion.div
                  animate={{ x: notifications[item.key] ? 20 : 2 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md"
                />
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Alert Thresholds */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#ef4444]" />
          <h2 className="text-lg font-semibold text-white">Alert Thresholds</h2>
        </div>
        <div className="glass-card-static p-5 space-y-5">
          {[
            { label: 'Waste Alert Threshold', desc: 'Alert when monthly waste exceeds', key: 'wasteThreshold' as const, prefix: '$', suffix: '/month' },
            { label: 'Carbon Alert Threshold', desc: 'Alert when monthly CO₂ exceeds', key: 'carbonThreshold' as const, prefix: '', suffix: ' tonnes' },
            { label: 'Cost Spike Alert', desc: 'Alert when daily cost increases by', key: 'costSpike' as const, prefix: '', suffix: '%' },
          ].map(item => (
            <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-[#64748b]">{item.desc}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#64748b]">{item.prefix}</span>
                <input
                  type="number"
                  value={thresholds[item.key]}
                  onChange={e => setThresholds(prev => ({ ...prev, [item.key]: Number(e.target.value) }))}
                  className="w-24 bg-[rgba(148,163,184,0.06)] border border-[rgba(148,163,184,0.1)] rounded-lg px-3 py-2 text-sm text-white text-center outline-none focus:border-[#00d4aa]/30 transition-colors"
                />
                <span className="text-sm text-[#64748b]">{item.suffix}</span>
              </div>
            </div>
          ))}
          <button onClick={handleSaveThresholds} className="btn-primary text-sm px-6 py-2.5">
            Save Thresholds
          </button>
        </div>
      </motion.section>

      {/* Team Members */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#6366f1]" />
            <h2 className="text-lg font-semibold text-white">Team Members</h2>
          </div>
          <button
            onClick={() => showToast('Invitation sent! Team member will receive an email.', 'success')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00d4aa]/15 text-[#00d4aa] text-xs font-medium hover:bg-[#00d4aa]/25 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Invite
          </button>
        </div>
        <div className="glass-card-static overflow-hidden">
          {teamMembers.map((member, i) => (
            <div key={member.email} className="flex items-center justify-between p-4 border-b border-[rgba(148,163,184,0.06)] last:border-0 table-row-hover">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-xs font-bold text-white">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{member.name}</p>
                  <p className="text-xs text-[#64748b]">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.role === 'Admin' ? 'bg-[#6366f1]/15 text-[#6366f1]' :
                  member.role === 'Editor' ? 'bg-[#00d4aa]/15 text-[#00d4aa]' :
                  'bg-[rgba(148,163,184,0.1)] text-[#94a3b8]'
                }`}>
                  {member.role}
                </span>
                {member.role !== 'Admin' && (
                  <button
                    onClick={() => showToast(`Removed ${member.name} from team`, 'warning')}
                    className="p-1.5 rounded-lg text-[#64748b] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
