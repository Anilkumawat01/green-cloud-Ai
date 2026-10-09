'use client';

import { motion } from 'framer-motion';
import { useCountUp } from '@/lib/hooks';
import Link from 'next/link';
import {
  Cloud, Leaf, Brain, DollarSign, TrendingDown, Shield, Zap,
  CheckCircle, ArrowRight, BarChart3, Globe2, Cpu, ChevronRight,
  Star, Users, Building
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

function AnimatedCounter({ end, prefix = '', suffix = '', decimals = 0 }: { end: number; prefix?: string; suffix?: string; decimals?: number }) {
  const { count, ref } = useCountUp(end, 2500, decimals);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-hero grid-bg overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0a0f1e]/70 border-b border-[rgba(148,163,184,0.08)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#0a0f1e]" />
            </div>
            <span className="text-lg font-bold text-white">GreenCloud<span className="text-[#00d4aa]"> AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Features</a>
            <a href="#comparison" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Compare</a>
            <a href="#stats" className="text-sm text-[#94a3b8] hover:text-white transition-colors">Impact</a>
            <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5 inline-flex items-center gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Link href="/dashboard" className="md:hidden btn-primary text-sm px-4 py-2">
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00d4aa]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#6366f1]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20 mb-8">
            <Zap className="w-4 h-4 text-[#00d4aa]" />
            <span className="text-sm text-[#00d4aa] font-medium">AI-Powered Cloud Optimization</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Stop Wasting Cloud.{' '}
            <span className="bg-gradient-to-r from-[#00d4aa] to-[#6366f1] bg-clip-text text-transparent">
              Start Saving Planet.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-[#94a3b8] max-w-3xl mx-auto mb-8">
            Detect idle resources, slash carbon emissions, and save thousands on cloud bills — powered by AI that understands your infrastructure.
          </motion.p>

          {/* Animated waste counter */}
          <motion.div variants={fadeUp} className="glass-card-static inline-flex items-center gap-4 px-6 py-4 mb-10">
            <div className="w-3 h-3 rounded-full bg-[#ef4444] animate-pulse" />
            <div className="text-left">
              <p className="text-sm text-[#94a3b8]">Cloud resources wasted globally every day</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                $<AnimatedCounter end={2.4} decimals={1} />B+
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary text-base px-8 py-4 inline-flex items-center justify-center gap-2 font-semibold">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="btn-secondary text-base px-8 py-4 inline-flex items-center justify-center gap-2">
              View Live Demo <BarChart3 className="w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex items-center justify-center gap-6 text-sm text-[#64748b]">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#00d4aa]" /> No credit card</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#00d4aa]" /> 14-day free trial</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#00d4aa]" /> Setup in 5 mins</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-[rgba(148,163,184,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-[#64748b] uppercase tracking-widest mb-8">Trusted by engineering teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['Stripe', 'Shopify', 'Datadog', 'Notion', 'Linear', 'Vercel'].map((company) => (
              <div key={company} className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#94a3b8]" />
                <span className="text-lg font-semibold text-[#94a3b8]">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything you need to optimize cloud spend</h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">One platform to detect waste, reduce carbon, and save money across all your cloud providers.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: DollarSign, title: 'Cost Savings Engine', desc: 'Automatically detect idle resources, over-provisioned instances, and orphaned storage. Save 30%+ on cloud bills.', color: '#00d4aa' },
              { icon: Leaf, title: 'Carbon Footprint Tracker', desc: 'Real-time CO2 tracking per resource, region, and provider. Generate ESG-compliant sustainability reports.', color: '#22c55e' },
              { icon: Brain, title: 'AI Recommendations', desc: 'Machine learning models analyze usage patterns to suggest right-sizing, scheduling, and migration optimizations.', color: '#6366f1' },
              { icon: Globe2, title: 'Multi-Cloud Support', desc: 'Unified view across AWS, GCP, and Azure. One dashboard for all your cloud infrastructure.', color: '#f59e0b' },
              { icon: TrendingDown, title: 'Waste Detection', desc: 'Identify zombie instances, unused EBS volumes, detached IPs, and idle load balancers within minutes.', color: '#ef4444' },
              { icon: Shield, title: 'Compliance Ready', desc: 'Generate reports for SOC 2, ISO 27001, and ESG compliance. Audit trails for all recommendations.', color: '#8b5cf6' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${feature.color}15` }}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4aa]/3 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The cloud waste crisis is real</h2>
            <p className="text-[#94a3b8] text-lg">And it&apos;s costing both your budget and the planet.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { value: 32, suffix: '%', label: 'Average Cloud Waste', sub: 'of cloud spend is wasted on unused resources', icon: Cpu },
              { value: 450, suffix: 'g', label: 'CO2 per kWh', sub: 'carbon intensity in high-emission data center regions', icon: Cloud },
              { value: 500, suffix: 'K+', label: 'Companies Affected', sub: 'businesses overspending on cloud infrastructure globally', icon: Users },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-8 text-center"
              >
                <stat.icon className="w-8 h-8 text-[#00d4aa] mx-auto mb-4" />
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} />{stat.suffix}
                </p>
                <p className="text-lg font-semibold text-[#e2e8f0] mb-1">{stat.label}</p>
                <p className="text-sm text-[#64748b]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why teams choose GreenCloud AI</h2>
            <p className="text-[#94a3b8] text-lg">See how we compare to alternatives.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-static overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(148,163,184,0.1)]">
                    <th className="text-left p-4 text-[#94a3b8] font-medium">Feature</th>
                    <th className="p-4 text-center">
                      <span className="text-[#00d4aa] font-bold">GreenCloud AI</span>
                    </th>
                    <th className="p-4 text-center text-[#94a3b8] font-medium">CloudHealth</th>
                    <th className="p-4 text-center text-[#94a3b8] font-medium">AWS Cost Explorer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Multi-cloud support', true, true, false],
                    ['AI-powered recommendations', true, false, false],
                    ['Carbon footprint tracking', true, false, false],
                    ['Real-time waste detection', true, true, false],
                    ['ESG compliance reports', true, false, false],
                    ['Region migration advisor', true, false, false],
                    ['Free tier available', true, false, true],
                    ['Setup time', '5 min', '2 hours', '30 min'],
                    ['Starting price', '$0/mo', '$500/mo', 'Free*'],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[rgba(148,163,184,0.06)] table-row-hover">
                      <td className="p-4 text-[#e2e8f0] font-medium">{row[0]}</td>
                      {[1, 2, 3].map(col => (
                        <td key={col} className="p-4 text-center">
                          {typeof row[col] === 'boolean' ? (
                            row[col] ? (
                              <CheckCircle className="w-5 h-5 text-[#00d4aa] mx-auto" />
                            ) : (
                              <span className="text-[#64748b]">—</span>
                            )
                          ) : (
                            <span className={col === 1 ? 'text-[#00d4aa] font-semibold' : 'text-[#94a3b8]'}>{row[col] as string}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 sm:p-12 text-center relative"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6">
              &ldquo;GreenCloud AI helped us identify $14,000/month in wasted cloud resources we didn&apos;t even know existed. The carbon tracking was the cherry on top for our ESG goals.&rdquo;
            </blockquote>
            <div>
              <p className="text-[#e2e8f0] font-semibold">Sarah Chen</p>
              <p className="text-sm text-[#64748b]">VP of Engineering, TechCorp Inc.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00d4aa]/5 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to optimize your cloud?
          </h2>
          <p className="text-lg text-[#94a3b8] mb-8">
            Join 500+ companies saving money and reducing carbon emissions with GreenCloud AI.
          </p>
          <Link href="/dashboard" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 font-semibold">
            Get Started Free <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(148,163,184,0.06)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b894] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#0a0f1e]" />
            </div>
            <span className="text-sm font-semibold text-[#94a3b8]">GreenCloud AI</span>
          </div>
          <p className="text-sm text-[#64748b]">© 2026 GreenCloud AI. Building a sustainable cloud future.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-[#64748b] hover:text-[#00d4aa] transition-colors">Privacy</a>
            <a href="#" className="text-sm text-[#64748b] hover:text-[#00d4aa] transition-colors">Terms</a>
            <a href="#" className="text-sm text-[#64748b] hover:text-[#00d4aa] transition-colors">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
