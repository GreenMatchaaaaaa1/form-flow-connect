import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { schedule, STAGE_LABELS, STAGE_BG_COLORS, type Split } from '@/data/bsc-data';
import { cn } from '@/lib/utils';

const splitTabs: { key: Split | 'all'; label: string }[] = [
  { key: 'all', label: 'All Events' },
  { key: 'spring', label: 'Spring Split' },
  { key: 'summer', label: 'Summer Split' },
  { key: 'mid', label: 'Offline' },
];

export default function ScheduleSection() {
  const [activeSplit, setActiveSplit] = useState<Split | 'all'>('all');

  const filtered = activeSplit === 'all'
    ? schedule
    : activeSplit === 'mid'
      ? schedule.filter(e => e.split === 'mid' || e.split === 'post' || e.split === 'finals')
      : schedule.filter(e => e.split === activeSplit);

  return (
    <section id="schedule" className="px-4 py-16 md:py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Tournament Schedule</h2>
        <p className="text-muted-foreground">6 online seasons · 3 offline events · All year long</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {splitTabs.map(tab => {
          const isActive = activeSplit === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveSplit(tab.key)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

        <AnimatePresence mode="popLayout">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="relative flex items-start gap-4 md:gap-6 pl-3 md:pl-4 mb-4"
            >
              {/* Timeline dot */}
              <div className={cn(
                'relative z-10 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0',
                STAGE_BG_COLORS[event.stage]
              )}>
                {event.season || '⭐'}
              </div>

              {/* Card */}
              <div className="flex-1 backdrop-blur-xl bg-card/60 border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', STAGE_BG_COLORS[event.stage])}>
                    {STAGE_LABELS[event.stage]}
                  </span>
                  {event.split === 'summer' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium">
                      1.5x Points
                    </span>
                  )}
                </div>
                <h3 className="text-foreground font-semibold mt-1">{event.name}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.dates}
                  </span>
                  {event.details && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.details}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
