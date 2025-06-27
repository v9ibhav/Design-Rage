import { useState, useEffect } from 'react';
import { chaosEvents } from '../data/scenarios';
import { GameState, Response, ChaosEvent, Scenario } from '../types/game';
import ProgressMeters from './ProgressMeters';
import ChaosEventModal from './ChaosEventModal';
import { X } from 'lucide-react';

interface GameScreenProps {
  gameState: GameState;
  onUpdateGameState: (newState: GameState) => void;
  onGameComplete: () => void;
  onCursorStateChange?: (state: string) => void;
}

export default function GameScreen({ gameState, onUpdateGameState, onGameComplete, onCursorStateChange }: GameScreenProps) {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [showChaosEvent, setShowChaosEvent] = useState(false);
  const [currentChaosEvent, setCurrentChaosEvent] = useState<ChaosEvent | null>(null);
  const [responseAnimation, setResponseAnimation] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);

  useEffect(() => {
    if (gameState.availableScenarios.length > 0) {
      // Cycle through scenarios, repeating if necessary
      const scenarioIndex = (gameState.currentRound - 1) % gameState.availableScenarios.length;
      const scenario = gameState.availableScenarios[scenarioIndex];
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
    
    // Add cursor effect based on response type
    if (onCursorStateChange) {
      if (response.stressImpact > 0) {
        onCursorStateChange('cursor-stress');
      } else {
        onCursorStateChange('cursor-success');
      }
    }
    
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
      if (onCursorStateChange) {
        onCursorStateChange('');
      }
    }, 1000);
    
    // Auto-advance to next round
    setTimeout(() => {
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
      
      // Add cursor stress effect for chaos events
      if (onCursorStateChange) {
        onCursorStateChange('cursor-stress');
        setTimeout(() => onCursorStateChange && onCursorStateChange(''), 2000);
      }
    }
    setCurrentChaosEvent(null);
  };

  const handleEndGame = () => {
    onGameComplete();
  };

  const getImpactDisplay = (impact: number, type: 'stress' | 'reputation') => {
    const isPositive = impact > 0;
    const color = type === 'stress' 
      ? (isPositive ? 'text-red-400' : 'text-green-400')
      : (isPositive ? 'text-green-400' : 'text-red-400');
    
    return (
      <span className={`text-xs sm:text-sm font-medium ${color}`}>
        {isPositive ? '+' : ''}{impact}
      </span>
    );
  };

  if (gameState.scenariosLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-lg sm:text-xl font-semibold text-gray-700 text-center">Loading scenarios...</div>
      </div>
    );
  }

  if (!currentScenario) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-lg sm:text-xl font-semibold text-red-600 text-center">Failed to load scenario. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 pt-16 sm:pt-20 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Meters */}
        <div className="mb-4 sm:mb-8">
          <ProgressMeters 
            stress={gameState.stress}
            reputation={gameState.reputation}
            round={gameState.currentRound}
          />
        </div>

        {/* End Game Button */}
        <div className="mb-4 sm:mb-6 flex justify-center">
          <button
            onClick={handleEndGame}
            className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 active:from-red-700 active:to-orange-700 text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 border border-red-500/30 touch-manipulation text-sm sm:text-base"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>End Game & See Results</span>
          </button>
        </div>

        {/* Scenario Card */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-700 shadow-2xl mb-4 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text text-xs sm:text-sm font-bold mb-2">
              QUESTION {gameState.currentRound}
            </div>
            <h2 className="text-sm sm:text-lg text-gray-400 mb-3 sm:mb-4 px-2">{currentScenario.context}</h2>
            <div className="bg-gray-900/50 rounded-lg p-4 sm:p-6 border-l-4 border-pink-500">
              <blockquote className="text-base sm:text-xl text-gray-200 italic leading-relaxed">
                "{currentScenario.clientQuote}"
              </blockquote>
            </div>
          </div>

          {/* Response Options */}
          {!showFeedback && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-300 text-center mb-4 sm:mb-6">
                How do you respond? 🤔
              </h3>
              <div className="grid gap-3 sm:gap-4">
                {currentScenario.responses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponseClick(response)}
                    className={`group relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 text-left touch-manipulation ${
                      response.type === 'professional' 
                        ? 'border-green-500/30 hover:border-green-400/50 bg-green-900/20 hover:bg-green-900/30 active:bg-green-900/40'
                        : response.type === 'witty'
                        ? 'border-blue-500/30 hover:border-blue-400/50 bg-blue-900/20 hover:bg-blue-900/30 active:bg-blue-900/40'
                        : 'border-red-500/30 hover:border-red-400/50 bg-red-900/20 hover:bg-red-900/30 active:bg-red-900/40'
                    } ${responseAnimation}`}
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0">{response.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base text-gray-200 mb-2 sm:mb-3 leading-relaxed break-words">{response.text}</p>
                        <div className="flex items-center space-x-3 sm:space-x-4 text-xs">
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
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="text-3xl sm:text-4xl animate-bounce">{selectedResponse.emoji}</div>
              <div className="space-y-2">
                <p className="text-lg sm:text-xl text-gray-300">You chose the {selectedResponse.type} approach!</p>
                <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
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
              <div className="text-sm sm:text-base text-gray-400">
                Preparing next scenario...
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