import { useState, useEffect } from 'react';
import { chaosEvents } from '../data/scenarios';
import { GameState, Response, ChaosEvent, Scenario } from '../types/game';
import ProgressMeters from './ProgressMeters';
import ChaosEventModal from './ChaosEventModal';

interface GameScreenProps {
  gameState: GameState;
  onUpdateGameState: (newState: GameState) => void;
  onGameComplete: () => void;
}

export default function GameScreen({ gameState, onUpdateGameState, onGameComplete }: GameScreenProps) {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [showChaosEvent, setShowChaosEvent] = useState(false);
  const [currentChaosEvent, setCurrentChaosEvent] = useState<ChaosEvent | null>(null);
  const [responseAnimation, setResponseAnimation] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);

  useEffect(() => {
    if (gameState.availableScenarios.length > 0) {
      const scenario = gameState.availableScenarios[gameState.currentRound - 1];
      setCurrentScenario(scenario);
    }
  }, [gameState.currentRound, gameState.availableScenarios]);

  useEffect(() => {
    // Check if we should trigger a chaos event
    if (gameState.currentRound % 3 === 0 && gameState.currentRound > 0 && !gameState.chaosEventTriggered) {
      const randomEvent = chaosEvents[Math.floor(Math.random() * chaosEvents.length)];
      setCurrentChaosEvent(randomEvent);
      setShowChaosEvent(true);
    }
  }, [gameState.currentRound, gameState.chaosEventTriggered]);

  const handleResponseClick = (response: Response) => {
    if (!currentScenario) return;

    setSelectedResponse(response);
    setResponseAnimation('animate-pulse');
    
    // Calculate new values
    const newStress = Math.max(0, Math.min(100, gameState.stress + response.stressImpact));
    const newReputation = Math.max(0, Math.min(100, gameState.reputation + response.reputationImpact));
    const scoreIncrease = Math.max(0, response.reputationImpact - Math.abs(response.stressImpact));
    
    setShowFeedback(true);
    
    // Delay state update for animation
    setTimeout(() => {
      const newState: GameState = {
        ...gameState,
        stress: newStress,
        reputation: newReputation,
        score: gameState.score + scoreIncrease,
        completedScenarios: [...gameState.completedScenarios, currentScenario.id]
      };
      
      onUpdateGameState(newState);
      setResponseAnimation('');
    }, 1000);
    
    // Auto-advance to next round
    setTimeout(() => {
      if (gameState.currentRound >= 10) {
        onGameComplete();
      } else {
        const nextState: GameState = {
          ...gameState,
          currentRound: gameState.currentRound + 1,
          stress: newStress,
          reputation: newReputation,
          score: gameState.score + scoreIncrease,
          completedScenarios: [...gameState.completedScenarios, currentScenario.id],
          chaosEventTriggered: false
        };
        onUpdateGameState(nextState);
        setShowFeedback(false);
        setSelectedResponse(null);
      }
    }, 3000);
  };

  const handleChaosEventClose = () => {
    setShowChaosEvent(false);
    if (currentChaosEvent) {
      const newStress = Math.max(0, Math.min(100, gameState.stress + currentChaosEvent.stressImpact));
      const newReputation = Math.max(0, Math.min(100, gameState.reputation + currentChaosEvent.reputationImpact));
      
      const newState: GameState = {
        ...gameState,
        stress: newStress,
        reputation: newReputation,
        chaosEventTriggered: true
      };
      
      onUpdateGameState(newState);
    }
    setCurrentChaosEvent(null);
  };

  const getImpactDisplay = (impact: number, type: 'stress' | 'reputation') => {
    const isPositive = impact > 0;
    const color = type === 'stress' 
      ? (isPositive ? 'text-red-400' : 'text-green-400')
      : (isPositive ? 'text-green-400' : 'text-red-400');
    
    return (
      <span className={`text-sm font-medium ${color}`}>
        {isPositive ? '+' : ''}{impact}
      </span>
    );
  };

  if (gameState.scenariosLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading scenarios...</div>
      </div>
    );
  }

  if (!currentScenario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-red-600">Failed to load scenario. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 pt-20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Meters */}
        <div className="mb-8">
          <ProgressMeters 
            stress={gameState.stress}
            reputation={gameState.reputation}
            round={gameState.currentRound}
            totalRounds={10}
          />
        </div>

        {/* Scenario Card */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl mb-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text text-sm font-bold mb-2">
              ROUND {gameState.currentRound} OF 10
            </div>
            <h2 className="text-lg text-gray-400 mb-4">{currentScenario.context}</h2>
            <div className="bg-gray-900/50 rounded-lg p-6 border-l-4 border-pink-500">
              <blockquote className="text-xl text-gray-200 italic leading-relaxed">
                "{currentScenario.clientQuote}"
              </blockquote>
            </div>
          </div>

          {/* Response Options */}
          {!showFeedback && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300 text-center mb-6">
                How do you respond? 🤔
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {currentScenario.responses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponseClick(response)}
                    className={`group relative p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 text-left ${
                      response.type === 'professional' 
                        ? 'border-green-500/30 hover:border-green-400/50 bg-green-900/20 hover:bg-green-900/30'
                        : response.type === 'witty'
                        ? 'border-blue-500/30 hover:border-blue-400/50 bg-blue-900/20 hover:bg-blue-900/30'
                        : 'border-red-500/30 hover:border-red-400/50 bg-red-900/20 hover:bg-red-900/30'
                    } ${responseAnimation}`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl flex-shrink-0">{response.emoji}</span>
                      <div className="flex-1">
                        <p className="text-gray-200 mb-3 leading-relaxed">{response.text}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <span className="text-gray-400">Stress:</span>
                            {getImpactDisplay(response.stressImpact, 'stress')}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-gray-400">Rep:</span>
                            {getImpactDisplay(response.reputationImpact, 'reputation')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Display */}
          {showFeedback && selectedResponse && (
            <div className="text-center space-y-6">
              <div className="text-4xl animate-bounce">{selectedResponse.emoji}</div>
              <div className="space-y-2">
                <p className="text-xl text-gray-300">You chose the {selectedResponse.type} approach!</p>
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Stress:</span>
                    {getImpactDisplay(selectedResponse.stressImpact, 'stress')}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Reputation:</span>
                    {getImpactDisplay(selectedResponse.reputationImpact, 'reputation')}
                  </div>
                </div>
              </div>
              <div className="text-gray-400">
                {gameState.currentRound < 10 ? 'Preparing next scenario...' : 'Calculating final results...'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chaos Event Modal */}
      {showChaosEvent && currentChaosEvent && (
        <ChaosEventModal 
          event={currentChaosEvent}
          onClose={handleChaosEventClose}
        />
      )}
    </div>
  );
}