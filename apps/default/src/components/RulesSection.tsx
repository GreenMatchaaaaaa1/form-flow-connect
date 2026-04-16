import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { ruleSections, mapPool, regions } from '@/data/bsc-data';
import { cn } from '@/lib/utils';

function RuleCard({ section }: { section: typeof ruleSections[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="backdrop-blur-xl bg-card/60 border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <span className="text-2xl">{section.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-foreground font-semibold">{section.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{section.summary}</p>
        </div>
        <ChevronDown className={cn(
          'w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0',
          open && 'rotate-180'
        )} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/50">
              <ul className="space-y-2.5 mt-3">
                {section.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RulesSection() {
  return (
    <section id="rules" className="px-4 py-16 md:py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Rules at a Glance</h2>
        <p className="text-muted-foreground">Key rules organized by category — tap to expand</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {ruleSections.map(section => (
          <RuleCard key={section.id} section={section} />
        ))}
      </div>

      {/* Map Pool */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="backdrop-blur-xl bg-card/60 border border-border rounded-2xl p-6 mb-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4">🗺️ Spring Split Map Pool</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mapPool.map(mode => (
            <div key={mode.mode} className="bg-muted/30 rounded-xl p-3">
              <h4 className="text-sm font-semibold text-primary mb-2">{mode.mode}</h4>
              <div className="flex flex-wrap gap-1.5">
                {mode.maps.map(m => (
                  <span key={m} className="text-xs px-2 py-1 rounded-lg bg-background/60 text-foreground/70 border border-border/50">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Regions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="backdrop-blur-xl bg-card/60 border border-border rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4">🌐 Server Locations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {regions.map(r => (
            <div key={r.abbr} className="bg-muted/30 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-foreground">{r.abbr}</span>
                <span className="text-xs text-muted-foreground">· {r.name}</span>
              </div>
              <p className="text-xs text-primary font-medium">{r.server}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
