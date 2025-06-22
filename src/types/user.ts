import { GameResult } from './game';

export interface UserStats {
  gamesPlayed: number;
  bestScore: number;
  bestTitle: string;
  averageReputation: number;
  averageStress: number;
  gameHistory: GameResult[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  date?: string; // Date when achievement was unlocked
}

export interface UserProfile {
  username: string;
  stats: UserStats;
  achievements: Achievement[];
  lastLogin: string;
}

export const ACHIEVEMENTS = {
  FIRST_GAME: 'first_game',
  LOW_STRESS: 'low_stress',
  PERFECT_REPUTATION: 'perfect_reputation',
  CHAOS_SURVIVOR: 'chaos_survivor',
  HIGH_SCORE: 'high_score',
  FREQUENT_PLAYER: 'frequent_player',
  BALANCED_DESIGNER: 'balanced_designer',
  ZEN_MASTER: 'zen_master'
};

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: ACHIEVEMENTS.FIRST_GAME,
    title: 'First Survival',
    description: 'Completed your first game',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.LOW_STRESS,
    title: 'Stress Master',
    description: 'Finished a game with less than 10% stress',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.PERFECT_REPUTATION,
    title: 'Perfect Reputation',
    description: 'Maintained 100% client reputation',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.CHAOS_SURVIVOR,
    title: 'Chaos Survivor',
    description: 'Survived 3 chaos events in one game',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.HIGH_SCORE,
    title: 'Design Superstar',
    description: 'Scored over 90 points in a single game',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.FREQUENT_PLAYER,
    title: 'Dedicated Designer',
    description: 'Played 10 or more games',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.BALANCED_DESIGNER,
    title: 'Balanced Designer',
    description: 'Finished a game with both stress and reputation above 70%',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.ZEN_MASTER,
    title: 'Zen Master',
    description: 'Finished a game with less than 20% stress and over 90% reputation',
    unlocked: false
  }
];
