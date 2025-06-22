import { useState, useEffect } from 'react';
import { GameState, GameResult } from '../types/game';

const STORAGE_KEY = 'brief-rage-game-state';

const initialGameState: GameState = {
  currentRound: 1,
  stress: 20,
  reputation: 50,
  score: 0,
  gamePhase: 'splash',
  completedScenarios: [],
  chaosEventTriggered: false,
  chaosEventsCount: 0
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Load saved game state on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        setGameState(parsedState);
      } catch (error) {
        console.error('Failed to load saved game state:', error);
      }
    }
  }, []);

  // Save game state whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (newState: GameState) => {
    setGameState(newState);
  };

  const startNewGame = () => {
    setGameState({
      ...initialGameState,
      gamePhase: 'tutorial'
    });
  };

  const skipTutorial = () => {
    setGameState({
      ...initialGameState,
      gamePhase: 'playing'
    });
  };

  const completeTutorial = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'playing'
    }));
  };

  const completeGame = (): GameResult => {
    const result: GameResult = {
      finalStress: gameState.stress,
      finalReputation: gameState.reputation,
      totalScore: gameState.score,
      title: getDesignerTitle(gameState.stress, gameState.reputation, gameState.score),
      chaosEventsCount: gameState.chaosEventsCount,
      completionTime: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setGameState(prev => ({
      ...prev,
      gamePhase: 'results'
    }));

    return result;
  };

  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState(initialGameState);
  };

  const saveGame = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    return true;
  };

  return {
    gameState,
    updateGameState,
    startNewGame,
    skipTutorial,
    completeTutorial,
    completeGame,
    resetGame,
    saveGame
  };
}

function getDesignerTitle(stress: number, reputation: number, score: number): string {
  if (stress > 90) return "Burnt Out Genius";
  if (reputation > 90) return "Client Whisperer";
  if (score > 80) return "Design Diplomat";
  if (stress < 20 && reputation > 70) return "Zen Master Designer";
  if (reputation < 30) return "Freelance Survivor";
  if (stress > 70 && reputation > 60) return "Caffeinated Professional";
  return "Average Designer";
}