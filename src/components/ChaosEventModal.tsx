import React from 'react';
import { X, Zap } from 'lucide-react';
import { ChaosEvent } from '../types/game';

interface ChaosEventModalProps {
  event: ChaosEvent;
  onClose: () => void;
}

export default function ChaosEventModal({ event, onClose }: ChaosEventModalProps) {
  const getImpactDisplay = (impact: number, type: 'stress' | 'reputation') => {
    const isPositive = impact > 0;
    const color = type === 'stress' 
      ? (isPositive ? 'text-red-400' : 'text-green-400')
      : (isPositive ? 'text-green-400' : 'text-red-400');
    
    return (
      <span className={`font-bold ${color}`}>
        {isPositive ? '+' : ''}{impact}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full border-2 border-red-500/50 shadow-2xl transform animate-pulse mx-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 animate-bounce" />
            <h2 className="text-lg sm:text-xl font-bold text-red-400">CHAOS EVENT!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors p-1 touch-manipulation"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="text-center space-y-4 sm:space-y-6">
          <div className="text-4xl sm:text-6xl animate-bounce">{event.emoji}</div>
          
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{event.title}</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed px-2">{event.description}</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-3 sm:p-4 space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">Impact</h4>
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-xs sm:text-sm text-gray-400">Stress:</span>
                {getImpactDisplay(event.stressImpact, 'stress')}
              </div>
              {event.reputationImpact !== 0 && (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="text-xs sm:text-sm text-gray-400">Reputation:</span>
                  {getImpactDisplay(event.reputationImpact, 'reputation')}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 active:from-red-700 active:to-orange-700 text-white font-bold py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation text-sm sm:text-base"
          >
            Brace for Impact! 💥
          </button>
        </div>
      </div>
    </div>
  );
}