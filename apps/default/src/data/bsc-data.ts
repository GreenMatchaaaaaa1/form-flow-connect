export type Stage = 'cc' | 'mq' | 'mf' | 'bc' | 'lcq' | 'wf';
export type Split = 'spring' | 'summer' | 'mid' | 'post' | 'finals';

export interface ScheduleEvent {
  id: string;
  season?: number;
  stage: Stage;
  name: string;
  dates: string;
  split: Split;
  details?: string;
}

export interface PrizeEntry {
  placement: string;
  amount: string;
  extra?: string;
}

export interface PrizePool {
  event: string;
  stage: Stage;
  total: string;
  entries: PrizeEntry[];
  regions?: string[];
}

export interface RuleSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  keyPoints: string[];
}

export const STAGE_LABELS: Record<Stage, string> = {
  cc: 'Championship Challenge',
  mq: 'Monthly Qualifier',
  mf: 'Monthly Finals',
  bc: 'Brawl Cup',
  lcq: 'Last Chance Qualifier',
  wf: 'World Finals',
};

export const STAGE_COLORS: Record<Stage, string> = {
  cc: 'from-amber-500 to-yellow-600',
  mq: 'from-blue-500 to-indigo-600',
  mf: 'from-violet-500 to-purple-600',
  bc: 'from-red-500 to-rose-600',
  lcq: 'from-orange-500 to-amber-600',
  wf: 'from-emerald-500 to-teal-600',
};

export const STAGE_BG_COLORS: Record<Stage, string> = {
  cc: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  mq: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  mf: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  bc: 'bg-red-500/10 text-red-400 border-red-500/20',
  lcq: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  wf: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export const schedule: ScheduleEvent[] = [
  { id: 's1-cc', season: 1, stage: 'cc', name: 'Season 1 Championship Challenge', dates: 'Jan 30 – Feb 1', split: 'spring' },
  { id: 's1-mq', season: 1, stage: 'mq', name: 'Season 1 Monthly Qualifier', dates: 'Feb 7–8', split: 'spring' },
  { id: 's1-mf', season: 1, stage: 'mf', name: 'Season 1 Monthly Finals', dates: 'Feb 14–22', split: 'spring' },
  { id: 's2-cc', season: 2, stage: 'cc', name: 'Season 2 Championship Challenge', dates: 'Feb 27 – Mar 1', split: 'spring' },
  { id: 's2-mq', season: 2, stage: 'mq', name: 'Season 2 Monthly Qualifier', dates: 'Mar 7–8', split: 'spring' },
  { id: 's2-mf', season: 2, stage: 'mf', name: 'Season 2 Monthly Finals', dates: 'Mar 14–22', split: 'spring' },
  { id: 's3-cc', season: 3, stage: 'cc', name: 'Season 3 Championship Challenge', dates: 'Mar 27–29', split: 'spring' },
  { id: 's3-mq', season: 3, stage: 'mq', name: 'Season 3 Monthly Qualifier', dates: 'Apr 4–5', split: 'spring' },
  { id: 's3-mf', season: 3, stage: 'mf', name: 'Season 3 Monthly Finals', dates: 'Apr 11–19', split: 'spring' },
  { id: 'bc', stage: 'bc', name: 'Brawl Cup', dates: 'May 2026', split: 'mid', details: '12 Teams · Berlin, Germany' },
  { id: 's4-cc', season: 4, stage: 'cc', name: 'Season 4 Championship Challenge', dates: 'May 29–31', split: 'summer' },
  { id: 's4-mq', season: 4, stage: 'mq', name: 'Season 4 Monthly Qualifier', dates: 'Jun 6–7', split: 'summer' },
  { id: 's4-mf', season: 4, stage: 'mf', name: 'Season 4 Monthly Finals', dates: 'Jun 13–21', split: 'summer' },
  { id: 's5-cc', season: 5, stage: 'cc', name: 'Season 5 Championship Challenge', dates: 'Jun 26–28', split: 'summer' },
  { id: 's5-mq', season: 5, stage: 'mq', name: 'Season 5 Monthly Qualifier', dates: 'Jul 4–5', split: 'summer' },
  { id: 's5-mf', season: 5, stage: 'mf', name: 'Season 5 Monthly Finals', dates: 'Jul 11–19', split: 'summer' },
  { id: 's6-cc', season: 6, stage: 'cc', name: 'Season 6 Championship Challenge', dates: 'Jul 24–26', split: 'summer' },
  { id: 's6-mq', season: 6, stage: 'mq', name: 'Season 6 Monthly Qualifier', dates: 'Aug 1–2', split: 'summer' },
  { id: 's6-mf', season: 6, stage: 'mf', name: 'Season 6 Monthly Finals', dates: 'Aug 8–16', split: 'summer' },
  { id: 'lcq', stage: 'lcq', name: 'Last Chance Qualifier', dates: 'October 2026', split: 'post', details: '8 Teams · Location TBC' },
  { id: 'wf', stage: 'wf', name: 'World Finals', dates: 'November 2026', split: 'finals', details: '12 Teams · Location TBC' },
];

export const prizePools: PrizePool[] = [
  {
    event: 'Monthly Finals',
    stage: 'mf',
    total: '$147,000/month',
    entries: [
      { placement: '1st', amount: '$12,000' },
      { placement: '2nd', amount: '$6,000–$8,000' },
      { placement: '3–4th', amount: '$3,000–$6,000' },
      { placement: '5–8th', amount: '$1,750–$2,500' },
    ],
    regions: ['EA: $40K', 'EMEA: $42K', 'SA: $31K', 'NA: $34K'],
  },
  {
    event: 'Brawl Cup',
    stage: 'bc',
    total: '$100,000',
    entries: [
      { placement: '1st', amount: '$35,000', extra: '+ WF Slot' },
      { placement: '2nd', amount: '$15,000', extra: '+ LCQ Slot' },
      { placement: '3rd', amount: '$9,000' },
      { placement: '4th', amount: '$7,000' },
      { placement: '5–8th', amount: '$5,000' },
      { placement: '9–12th', amount: '$3,500' },
    ],
  },
  {
    event: 'Last Chance Qualifier',
    stage: 'lcq',
    total: '$18,000',
    entries: [
      { placement: '1–2nd', amount: 'Direct WF Slot' },
      { placement: '3–4th', amount: '$5,000' },
      { placement: '5–8th', amount: '$2,000' },
    ],
  },
  {
    event: 'World Finals',
    stage: 'wf',
    total: '$1,000,000',
    entries: [
      { placement: '1st', amount: '$450,000' },
      { placement: '2nd', amount: '$200,000' },
      { placement: '3rd', amount: '$100,000' },
      { placement: '4th', amount: '$80,000' },
      { placement: '5–8th', amount: '$30,000' },
      { placement: '9–12th', amount: '$12,500' },
    ],
  },
];

export const ruleSections: RuleSection[] = [
  {
    id: 'eligibility',
    title: 'Eligibility',
    icon: '🎯',
    summary: 'Who can compete in BSC 2026',
    keyPoints: [
      'Must be 16+ years old by registration close',
      '5 regions: East Asia, EMEA, NA, SA, Chinese Mainland',
      'One account per player, in good standing',
      'Aliases: max 10 chars (15 with team abbreviation)',
      'Region lock once competing in a region',
    ],
  },
  {
    id: 'structure',
    title: 'Tournament Structure',
    icon: '🏆',
    summary: 'How the championship works',
    keyPoints: [
      '6 online Seasons + 3 Offline Events',
      'Spring Split (Feb–Apr) → Summer Split (Jun–Aug)',
      'CC → MQ Day 1 (Single Elim Bo3) → MQ Day 2 (Double Elim Bo5) → MF (Single Elim Bo5)',
      'Championship Challenge: 15 wins before 4 losses',
      'Summer Split earns 1.5x points',
    ],
  },
  {
    id: 'teams',
    title: 'Team Composition',
    icon: '👥',
    summary: 'Roster rules and management',
    keyPoints: [
      'MQ: 3 active players. MF/Offline: up to 5 (+ coach + sub)',
      'Roster lock: 2h before MQ start, stays until MF ends',
      '3 roster changes/year (1 Spring, 2 Summer)',
      'Points owned by team, not org (except Club Partners)',
      'Orgs can own max 2 teams',
    ],
  },
  {
    id: 'matches',
    title: 'Match Procedures',
    icon: '⚔️',
    summary: 'How matches are played',
    keyPoints: [
      'Mobile/tablet only — no PC or emulation',
      'Brawler Draft: each player bans 1 brawler per set (blind)',
      'Global Match Bans in MF: 2 brawlers banned for entire match',
      'New brawlers restricted during their release season',
      'Webcam required for Monthly Finals broadcast',
    ],
  },
  {
    id: 'points',
    title: 'Points & Leaderboards',
    icon: '📊',
    summary: 'How teams earn and accumulate points',
    keyPoints: [
      'MQ Day 1: 4pts/win (Spring), 6pts/win (Summer)',
      'MQ Day 2 Upper: 4pts/win (Spring), 6pts/win (Summer)',
      'MQ Day 2 Lower: 2pts/win (Spring), 3pts/win (Summer)',
      'MF placement: 1st=60pts, 2nd=40pts, 3-4th=20pts, 5-8th=10pts (Spring)',
      'Tiebreakers: H2H → MF wins → Avg placement → Match win % → Set win % → Game win %',
    ],
  },
  {
    id: 'conduct',
    title: 'Code of Conduct',
    icon: '⚖️',
    summary: 'Rules of behavior and fair play',
    keyPoints: [
      'No account sharing, collusion, or match-fixing',
      'No cheating (DDoS, hacks, exploits, emulators)',
      'Zero tolerance for harassment and discrimination',
      'No gambling association or bribery',
      'Penalties: Warning → Prize deduction → Point deduction → Suspension → DQ',
    ],
  },
];

export const regions = [
  { name: 'East Asia', abbr: 'EA', server: 'Tokyo, Japan', countries: 'Australia, Japan, South Korea, Singapore, India, and more' },
  { name: 'EMEA', abbr: 'EMEA', server: 'Frankfurt, Germany', countries: 'All of Europe, Middle East, and Africa' },
  { name: 'North America', abbr: 'NA', server: 'Dallas, Texas', countries: 'USA, Canada, Mexico, Central America, Caribbean' },
  { name: 'South America', abbr: 'SA', server: 'São Paulo, Brazil', countries: 'Brazil, Argentina, Chile, Colombia, and more' },
  { name: 'Chinese Mainland', abbr: 'CN', server: 'TBC', countries: 'Chinese Mainland only (exclusive region)' },
];

export const mapPool = [
  { mode: 'Bounty', maps: ['Shooting Star', 'Hideout', 'Layer Cake'] },
  { mode: 'Heist', maps: ['Hot Potato', 'Safe Zone', 'Bridge Too Far'] },
  { mode: 'Hot Zone', maps: ['Ring of Fire', 'Open Business', 'Dueling Beetles'] },
  { mode: 'Brawl Ball', maps: ['Super Beach', 'Pinhole Punt', 'Sneaky Fields'] },
  { mode: 'Gem Grab', maps: ['Hard Rock Mine', 'Double Swoosh', 'Deathcap Trap'] },
  { mode: 'Knockout', maps: ['Goldarm Gulch', "Belle's Rock", 'Out in the Open'] },
];
