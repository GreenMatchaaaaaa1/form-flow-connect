import { motion } from 'framer-motion';
import { DollarSign, Award, Star } from 'lucide-react';
import { prizePools, STAGE_COLORS, STAGE_BG_COLORS } from '@/data/bsc-data';
import { cn } from '@/lib/utils';

export default function PrizeSection() {
  return (
    <section id="prizes" className="px-4 py-16 md:py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Prize Pools</h2>
        <p className="text-muted-foreground">Over $1.9 million in total prizes across all events</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {prizePools.map((pool, idx) => {
          const isWorldFinals = pool.stage === 'wf';
          return (
            <motion.div
              key={pool.event}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                'backdrop-blur-xl bg-card/60 border rounded-2xl overflow-hidden',
                isWorldFinals ? 'border-emerald-500/30 md:col-span-2' : 'border-border'
              )}
            >
              {/* Header */}
              <div className={cn('p-5 bg-gradient-to-r', STAGE_COLORS[pool.stage])}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg">{pool.event}</h3>
                    {pool.regions && (
                      <p className="text-white/70 text-sm mt-0.5">Per region, per month</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur rounded-xl px-3 py-1.5">
                    {isWorldFinals ? <Star className="w-4 h-4 text-white" /> : <DollarSign className="w-4 h-4 text-white" />}
                    <span className="text-white font-bold text-lg">{pool.total}</span>
                  </div>
                </div>
              </div>

              {/* Entries */}
              <div className="p-5">
                <div className="space-y-3">
                  {pool.entries.map((entry, i) => {
                    const isFirst = i === 0;
                    return (
                      <div
                        key={entry.placement}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-xl',
                          isFirst ? 'bg-primary/5 border border-primary/10' : 'bg-muted/30'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {isFirst && <Award className="w-5 h-5 text-primary" />}
                          <span className={cn(
                            'text-sm font-medium',
                            isFirst ? 'text-foreground' : 'text-muted-foreground'
                          )}>
                            {entry.placement}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'font-bold',
                            isFirst ? 'text-foreground text-lg' : 'text-foreground/80'
                          )}>
                            {entry.amount}
                          </span>
                          {entry.extra && (
                            <span className={cn(
                              'text-xs px-2 py-0.5 rounded-full border font-medium',
                              STAGE_BG_COLORS[pool.stage]
                            )}>
                              {entry.extra}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Regional breakdown */}
                {pool.regions && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pool.regions.map(r => (
                      <span key={r} className="text-xs px-3 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border">
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
