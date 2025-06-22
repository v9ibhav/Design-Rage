export interface GameState {
  currentRound: number;
  stress: number;
  reputation: number;
  score: number;
  gamePhase: 'splash' | 'tutorial' | 'playing' | 'results';
  completedScenarios: number[];
  chaosEventTriggered: boolean;
  chaosEventsCount: number;
}

export interface Scenario {
  id: number;
  clientQuote: string;
  context: string;
  responses: Response[];
}

export interface Response {
  text: string;
  type: 'witty' | 'professional' | 'sarcastic';
  stressImpact: number;
  reputationImpact: number;
  emoji: string;
}

export interface ChaosEvent {
  id: number;
  title: string;
  description: string;
  stressImpact: number;
  reputationImpact: number;
  emoji: string;
}

export interface GameResult {
  finalStress: number;
  finalReputation: number;
  totalScore: number;
  title: string;
  chaosEventsCount: number;
  completionTime: string;
}