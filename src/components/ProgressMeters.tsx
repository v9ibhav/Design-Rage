import React from 'react';
import { Zap, Star } from 'lucide-react';

interface ProgressMetersProps {
  stress: number;
  reputation: number;
  round: number;
}

export default function ProgressMeters({ stress, reputation, round }: ProgressMetersProps) {
  const getStressColor = (stress: number) => {
    if (stress < 30) return 'from-green-500 to-green-400';
    if (stress < 60) return 'from-yellow-500 to-yellow-400';
    if (stress < 80) return 'from-orange-500 to-orange-400';
    return 'from-red-500 to-red-400';
  };

  const getReputationColor = (reputation: number) => {
    if (reputation < 30) return 'from-red-500 to-red-400';
    if (reputation < 60) return 'from-orange-500 to-orange-400';
    if (reputation < 80) return 'from-yellow-500 to-yellow-400';
    return 'from-green-500 to-green-400';
  };

  const getStressEmoji = (stress: number) => {
    if (stress < 20) return '😎';
    if (stress < 40) return '😐';
    if (stress < 60) return '😰';
    if (stress < 80) return '😵';
    return '💀';
  };

  const getReputationEmoji = (reputation: number) => {
    if (reputation < 20) return '💩';
    if (reputation < 40) return '😞';
    if (reputation < 60) return '😐';
    if (reputation < 80) return '😊';
    return '🌟';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
      {/* Round Counter */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-2">
          <span className="text-lg font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">
            Question {round}
          </span>
        </div>
        <div className="text-center text-sm text-gray-400">
          Keep going as long as you can survive!
        </div>
      </div>

      {/* Stress Meter */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-gray-300">Stress</span>
            <span className="text-lg">{getStressEmoji(stress)}</span>
          </div>
          <span className="text-sm text-gray-400">{Math.round(stress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${getStressColor(stress)} h-3 rounded-full transition-all duration-700 ${
              stress > 90 ? 'animate-pulse' : ''
            }`}
            style={{ width: `${Math.min(stress, 100)}%` }}
          />
        </div>
      </div>

      {/* Reputation Meter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-300">Reputation</span>
            <span className="text-lg">{getReputationEmoji(reputation)}</span>
          </div>
          <span className="text-sm text-gray-400">{Math.round(reputation)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${getReputationColor(reputation)} h-3 rounded-full transition-all duration-700`}
            style={{ width: `${Math.max(0, Math.min(reputation, 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}