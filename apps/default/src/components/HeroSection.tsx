import { motion } from 'framer-motion';
import { Trophy, Users, Globe, Calendar, Zap } from 'lucide-react';

const stats = [
  { icon: Trophy, label: 'Total Prize Pool', value: '$1.9M+', color: 'text-amber-400' },
  { icon: Users, label: 'Team Size', value: '3v3', color: 'text-blue-400' },
  { icon: Globe, label: 'Regions', value: '5', color: 'text-emerald-400' },
  { icon: Calendar, label: 'Seasons', value: '6', color: 'text-violet-400' },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-500/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-0 w-[200px] h-[200px] bg-emerald-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm font-medium mb-6"
        >
          <Zap className="w-3.5 h-3.5" />
          Version 1.3 · Updated Mar 6, 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="text-foreground">Brawl Stars</span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Championship 2026
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Your ultimate interactive guide to the official BSC 2026 rulebook. 
          Explore schedules, prize pools, rules, and get AI-powered answers instantly.
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              className="backdrop-blur-xl bg-card/50 border border-border rounded-2xl p-5 flex flex-col items-center gap-2"
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
