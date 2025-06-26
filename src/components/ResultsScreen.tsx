import { Trophy, RefreshCw, Share, Download } from 'lucide-react';
import { GameResult } from '../types/game';
import NavigationBar from './NavigationBar';

interface ResultsScreenProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  result: GameResult;
  onRestart: () => void;
  onShare: () => void;
  onExport: () => void;
}

export default function ResultsScreen({ result, onRestart, onShare, onExport, isAuthenticated }: Omit<ResultsScreenProps, 'onLogin'>) {
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

  const getResultMessage = (stress: number, reputation: number, score: number, rounds: number) => {
    if (stress > 90) return `You survived ${rounds} rounds, but at what cost? Consider therapy... or a vacation.`;
    if (reputation > 90) return `Amazing! You survived ${rounds} rounds and clients love you! You're the designer everyone wants to hire.`;
    if (score > 80) return `Masterful balance through ${rounds} rounds! You've cracked the code of client relations.`;
    if (stress < 20 && reputation > 70) return `Impossibly calm through ${rounds} rounds of chaos. Teach us your ways!`;
    if (reputation < 30) return `Well... you survived ${rounds} rounds with brutal honesty. Maybe too honest. RIP your Yelp reviews.`;
    return `You made it through ${rounds} rounds of design hell. That's something!`;
  };

  const title = getDesignerTitle(result.finalStress, result.finalReputation, result.totalScore);
  const emoji = getResultEmoji(result.finalStress, result.finalReputation);
  const message = getResultMessage(result.finalStress, result.finalReputation, result.totalScore, result.roundsCompleted || 0);

  return (
    <>
      <NavigationBar
        onShare={onShare}
        onExport={onExport}
        showShareExport={true}
        onHome={() => window.location.reload()}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 pt-16 sm:pt-20 p-3 sm:p-4">
        <div className="max-w-2xl mx-auto">
          {/* Results Card */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-2xl">
            <div className="text-center space-y-6 sm:space-y-8">
              {/* Header */}
              <div>
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">{emoji}</div>
                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-2">
                  Congratulations!
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">You survived {result.roundsCompleted || 0} rounds!</p>
              </div>

              {/* Designer Title */}
              <div className="bg-gradient-to-r from-pink-900/30 to-blue-900/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-pink-500/20">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-yellow-400">Your Designer Title</h2>
                </div>
                <p className="text-xl sm:text-3xl font-bold text-white break-words">{title}</p>
              </div>

              {/* Final Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-lg p-2 sm:p-4 border border-red-500/20">
                  <div className="text-lg sm:text-2xl font-bold text-red-400">{Math.round(result.finalStress)}%</div>
                  <div className="text-xs sm:text-sm text-gray-400">Stress</div>
                  <div className="h-1 sm:h-1.5 w-full bg-gray-700 rounded-full mt-1 sm:mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                      style={{ width: `${Math.round(result.finalStress)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-lg p-2 sm:p-4 border border-yellow-500/20">
                  <div className="text-lg sm:text-2xl font-bold text-yellow-400">{Math.round(result.finalReputation)}%</div>
                  <div className="text-xs sm:text-sm text-gray-400">Reputation</div>
                  <div className="h-1 sm:h-1.5 w-full bg-gray-700 rounded-full mt-1 sm:mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Math.round(result.finalReputation)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900/70 to-gray-800/40 rounded-lg p-2 sm:p-4 border border-blue-500/20">
                  <div className="text-lg sm:text-2xl font-bold text-blue-400">{Math.round(result.totalScore)}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Score</div>
                  <div className="h-1 sm:h-1.5 w-full bg-gray-700 rounded-full mt-1 sm:mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{ width: `${Math.min(100, (result.totalScore / 100) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Result Message */}
              <div className="bg-gray-900/30 rounded-lg p-4 sm:p-6 border border-gray-600">
                <p className="text-sm sm:text-lg text-gray-300 italic leading-relaxed">
                  "{message}"
                </p>
              </div>

              {/* Completion Time */}
              <div className="text-xs sm:text-sm text-gray-400">
                Completed on {result.completionTime}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 mt-6 sm:mt-8">
                <button
                  onClick={onRestart}
                  className="flex items-center justify-center space-x-2 px-6 py-3 w-full rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 active:from-pink-700 active:to-blue-700 text-white font-medium transition-all duration-200 group touch-manipulation"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Play Again</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onShare}
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 flex-1 rounded-xl bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-gray-200 font-medium transition-all duration-200 border border-pink-500/30 hover:border-pink-400/50 group touch-manipulation"
                  >
                    <Share className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-base">Share</span>
                  </button>

                  <button
                    onClick={onExport}
                    className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 flex-1 rounded-xl bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-gray-200 font-medium transition-all duration-200 border border-blue-500/30 hover:border-blue-400/50 group touch-manipulation"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-base">Export</span>
                  </button>
                </div>
              </div>

              {/* Save prompt - Shows a more subtle reminder */}
              {!isAuthenticated && (
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-400 italic">Use the Save button in the navigation bar to save your results</p>
                </div>
              )}
            </div>
          </div>

          {/* Fun Stats */}
          <div className="mt-4 sm:mt-8 bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-700">
            <h3 className="text-base sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4 text-center">
              🎮 Fun Facts From Your Journey
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div className="bg-gray-900/30 p-2 sm:p-3 rounded-lg border border-pink-500/20">
                <div className="text-lg sm:text-2xl font-bold text-pink-400 mb-1">{result.roundsCompleted || 0}</div>
                <div className="text-xs sm:text-sm text-gray-400">Questions Survived</div>
              </div>
              <div className="bg-gray-900/30 p-2 sm:p-3 rounded-lg border border-blue-500/20">
                <div className="text-lg sm:text-2xl font-bold text-blue-400 mb-1">
                  {result.chaosEventsCount}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">Chaos Events Endured</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}