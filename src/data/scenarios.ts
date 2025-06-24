import { Scenario, ChaosEvent } from '../types/game';
import { fetchDesignScenarios } from '../services/picaosService';

let scenarios: Scenario[] = [];

export const getScenarios = async (): Promise<Scenario[]> => {
  if (scenarios.length === 0) {
    scenarios = await fetchDesignScenarios();
  }
  return scenarios;
};

export const resetScenarios = () => {
  scenarios = [];
};

export const chaosEvents: ChaosEvent[] = [
  {
    id: 1,
    title: "Coffee Machine Breakdown!",
    description: "The office coffee machine just exploded. Your productivity is about to take a serious hit.",
    stressImpact: 15,
    reputationImpact: -5,
    emoji: "☕"
  },
  {
    id: 2,
    title: "Surprise Client Meeting!",
    description: "A major client just walked in unannounced for a progress update!",
    stressImpact: 20,
    reputationImpact: -10,
    emoji: "😱"
  },
  {
    id: 3,
    title: "Power Outage!",
    description: "The power just went out, and you forgot to save your work!",
    stressImpact: 25,
    reputationImpact: -15,
    emoji: "⚡"
  },
  {
    id: 4,
    title: "Internet Issues!",
    description: "Your internet connection is acting up during a crucial client presentation!",
    stressImpact: 20,
    reputationImpact: -10,
    emoji: "🌐"
  },
  {
    id: 5,
    title: "Deadline Changed!",
    description: "The client just moved the deadline up by two days!",
    stressImpact: 30,
    reputationImpact: -5,
    emoji: "⏰"
  }
];
