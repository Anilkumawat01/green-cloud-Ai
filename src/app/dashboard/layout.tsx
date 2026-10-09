'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, LayoutDashboard, Server, Globe2, Brain, FileText, Settings,
  Bell, ChevronLeft, Menu, LogOut, Search
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/resources', label: 'Resources', icon: Server },
  { href: '/dashboard/carbon', label: 'Carbon Tracker', icon: Globe2 },
  { href: '/dashboard/ai-advisor', label: 'AI Advisor', icon: Brain },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Idle EC2 instance detected — web-server-prod-01', time: '2h ago', read: false },
    { id: 2, text: 'Monthly cost report ready for download', time: '5h ago', read: false },
    { id: 3, text: 'AI found 3 new optimization opportunities', time: '1d ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#0a0f1e] grid-bg flex">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-[rgba(10,15,30,0.95)] border-r border-[rgba(148,163,184,0.08)] z-40 overflow-hidden"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[rgba(148,163,184,0.08)]">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-[#0a0f1e]" />
                </div>
                <span className="text-sm font-bold text-white whitespace-nowrap">GreenCloud<span className="text-[#00d4aa]"> AI</span></span>
              </motion.div>
            )}
          </AnimatePresence>
          {!sidebarOpen && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center flex-shrink-0 mx-auto">
              <Leaf className="w-5 h-5 text-[#0a0f1e]" />
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-[#00d4aa]/10 text-[#00d4aa]'
                      : 'text-[#94a3b8] hover:bg-[rgba(148,163,184,0.06)] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#00d4aa] rounded-r-full"
                      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    />
                  )}
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#00d4aa]' : 'text-[#64748b] group-hover:text-[#94a3b8]'}`} />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[rgba(148,163,184,0.08)]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm text-[#64748b] hover:text-white hover:bg-[rgba(148,163,184,0.06)] transition-all"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[260px] bg-[rgba(10,15,30,0.98)] border-r border-[rgba(148,163,184,0.08)] z-50 flex flex-col"
            >
              <div className="h-16 flex items-center px-4 border-b border-[rgba(148,163,184,0.08)]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-[#0a0f1e]" />
                  </div>
                  <span className="text-sm font-bold text-white">GreenCloud<span className="text-[#00d4aa]"> AI</span></span>
                </div>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive ? 'bg-[#00d4aa]/10 text-[#00d4aa]' : 'text-[#94a3b8] hover:bg-[rgba(148,163,184,0.06)] hover:text-white'
                      }`}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]'}`}>
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-[rgba(148,163,184,0.08)] bg-[rgba(10,15,30,0.8)] backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[rgba(148,163,184,0.06)] transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-[rgba(148,163,184,0.06)] rounded-xl px-3 py-2 w-64">
              <Search className="w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                placeholder="Search resources..."
                className="bg-transparent text-sm text-[#e2e8f0] placeholder-[#64748b] outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[rgba(148,163,184,0.06)] transition-all"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#ef4444] rounded-full text-[10px] font-bold text-white flex items-center justify-center pulse-glow">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-80 glass-card-static overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-[rgba(148,163,184,0.1)]">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`px-4 py-3 border-b border-[rgba(148,163,184,0.06)] hover:bg-[rgba(148,163,184,0.04)] transition-colors ${!n.read ? 'bg-[#00d4aa]/5' : ''}`}>
                          <p className="text-sm text-[#e2e8f0]">{n.text}</p>
                          <p className="text-xs text-[#64748b] mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Avatar */}
            <Link href="/" className="p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[rgba(148,163,184,0.06)] transition-all">
              <LogOut className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4aa] to-[#6366f1] flex items-center justify-center text-xs font-bold text-white">
              AK
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
