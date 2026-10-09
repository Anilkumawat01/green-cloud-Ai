'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertTriangle, Info } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: Toast['type']) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-[#00d4aa]" />;
      case 'error': return <AlertTriangle className="w-5 h-5 text-[#ef4444]" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />;
      case 'info': return <Info className="w-5 h-5 text-[#6366f1]" />;
    }
  };

  const getBorderColor = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'border-l-[#00d4aa]';
      case 'error': return 'border-l-[#ef4444]';
      case 'warning': return 'border-l-[#f59e0b]';
      case 'info': return 'border-l-[#6366f1]';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3" style={{ maxWidth: '400px' }}>
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`glass-card-static p-4 flex items-start gap-3 border-l-4 ${getBorderColor(toast.type)} cursor-pointer`}
              onClick={() => removeToast(toast.id)}
            >
              {getIcon(toast.type)}
              <p className="text-sm text-[#e2e8f0] flex-1">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-[#64748b] hover:text-[#e2e8f0] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
