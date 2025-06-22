import React from 'react';
import { Trophy, RefreshCw, Share, Download } from 'lucide-react';
import { GameResult } from '../types/game';

interface ResultsScreenProps {
  result: GameResult;
  onRestart: () => void;
  onShare: () => void;
  onExport: () => void;
}

export default function ResultsScreen({ result, onRestart, onShare, onExport }: ResultsScreenProps) {
  const getDesignerTitle = (stress: number, reputation: number, score: number) => {
    if (stress > 90) return "Burnt Out Genius 🔥";
    if (reputation > 90) return "Client Whisperer 🌟";
    if (score > 80) return "Design Diplomat 🏆";
    if (stress < 20 && reputation > 70) return "Zen Master Designer 🧘";
    if (reputation < 30) return "Freelance Survivor 💀";
    if (stress > 70 && reputation > 60) return "Caffeinated Professional ☕";
    return "Average Designer 🎨";
  };

  const getResultEmoji = (stress: number, reputation: number) => {
    if (stress > 80) return "💀";
    if (reputation > 80) return "🌟";
    if (stress < 30 && reputation > 60) return "😎";
    if (reputation < 30) return "😵";
    return "😐";
  };

  const getResultMessage = (stress: number, reputation: number, score: number) => {
    if (stress > 90) return "You survived, but at what cost? Consider therapy... or a vacation.";
    if (reputation > 90) return "Clients love you! You're the designer everyone wants to hire.";
    if (score > 80) return "Masterful balance! You've cracked the code of client relations.";
    if (stress < 20 && reputation > 70) return "Impossibly calm under pressure. Teach us your ways!";
    if (reputation < 30) return "Well... you're honest. Maybe too honest. RIP your Yelp reviews.";
    return "You made it through another day in design hell. That's something!";
  };

  const title = getDesignerTitle(result.finalStress, result.finalReputation, result.totalScore);
  const emoji = getResultEmoji(result.finalStress, result.finalReputation);
  const message = getResultMessage(result.finalStress, result.finalReputation, result.totalScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 pt-20 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Results Card */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="text-center space-y-8">
            {/* Header */}
            <div>
              <div className="text-6xl mb-4 animate-bounce">{emoji}</div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-2">
                Congratulations!
              </h1>
              <p className="text-xl text-gray-400">You survived all 10 rounds!</p>
            </div>

            {/* Designer Title */}
            <div className="bg-gradient-to-r from-pink-900/30 to-blue-900/30 rounded-xl p-6 border border-pink-500/20">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-yellow-400">Your Designer Title</h2>
              </div>
              <p className="text-3xl font-bold text-white">{title}</p>
            </div>

            {/* Final Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-400">{Math.round(result.finalStress)}%</div>
                <div className="text-sm text-gray-400">Final Stress</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{Math.round(result.finalReputation)}%</div>
                <div className="text-sm text-gray-400">Reputation</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{Math.round(result.totalScore)}</div>
                <div className="text-sm text-gray-400">Total Score</div>
              </div>
            </div>

            {/* Result Message */}
            <div className="bg-gray-900/30 rounded-lg p-6 border border-gray-600">
              <p className="text-lg text-gray-300 italic leading-relaxed">
                "{message}"
              </p>
            </div>

            {/* Completion Time */}
            <div className="text-sm text-gray-400">
              Completed on {result.completionTime}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={onRestart}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Play Again</span>
              </button>

              <button
                onClick={onShare}
                className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-4 px-6 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
              >
                <Share className="w-5 h-5" />
                <span>Share</span>
              </button>

              <button
                onClick={onExport}
                className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-4 px-6 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
              >
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">
            🎮 Fun Facts From Your Journey
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-pink-400">10</div>
              <div className="text-sm text-gray-400">Client Comments Survived</div>
            </div>
            <div>
              <div className="text-xl font-bold text-blue-400">
                {Math.floor(Math.random() * 3) + 3}
              </div>
              <div className="text-sm text-gray-400">Chaos Events Endured</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}