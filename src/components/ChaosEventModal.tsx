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
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border-2 border-red-500/50 shadow-2xl transform animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-red-400 animate-bounce" />
            <h2 className="text-xl font-bold text-red-400">CHAOS EVENT!</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center space-y-6">
          <div className="text-6xl animate-bounce">{event.emoji}</div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
            <p className="text-gray-300 leading-relaxed">{event.description}</p>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Impact</h4>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Stress:</span>
                {getImpactDisplay(event.stressImpact, 'stress')}
              </div>
              {event.reputationImpact !== 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Reputation:</span>
                  {getImpactDisplay(event.reputationImpact, 'reputation')}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Brace for Impact! 💥
          </button>
        </div>
      </div>
    </div>
  );
}