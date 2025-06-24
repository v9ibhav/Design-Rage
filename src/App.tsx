import React, { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import SplashScreen from './components/SplashScreen';
import Tutorial from './components/Tutorial';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import LoginScreen from './components/LoginScreen';
import UserProfile from './components/UserProfile';
import { useGameState } from './hooks/useGameState';
import { useAuth } from './hooks/useAuth';
import { useUserProfile } from './hooks/useUserProfile';
import { shareResults, exportResults } from './utils/sharing';
import { GameResult } from './types/game';

function App() {

  const {
    gameState,
    updateGameState,
    startNewGame,
    skipTutorial,
    completeTutorial,
    completeGame,
    resetGame,
    saveGame
  } = useGameState();

  const { user, login, logout, isAuthenticated } = useAuth();
  const { userProfile, addGameResult } = useUserProfile(user.username);

  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleGameComplete = () => {
    const result = completeGame();
    setGameResult(result);

    // If user is logged in, add the result to their profile
    if (isAuthenticated) {
      addGameResult(result);
    }
  };

  const handleRestart = () => {
    resetGame();
    setGameResult(null);
  };

  const handleHome = () => {
    resetGame();
    setGameResult(null);
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      setShowLogin(true);
      return;
    }

    // Only try to save if the game is in progress
    if (gameState.gamePhase === 'playing') {
      const success = saveGame();
      if (success) {
        // Show feedback
        const button = document.querySelector('[title^="Save Progress"]');
        if (button) {
          button.classList.add('animate-pulse');
          setTimeout(() => button.classList.remove('animate-pulse'), 1000);
        }
        showNotification('Game progress saved successfully!', 'success');
      } else {
        showNotification('Failed to save game progress', 'error');
      }
    } else if (gameState.gamePhase === 'results') {
      // If we're on results screen, we want to save the result to profile
      if (gameResult) {
        addGameResult(gameResult);
        showNotification('Game results saved to your profile!', 'success');
      }
    } else {
      showNotification('No game in progress to save', 'info');
    }
  };

  const handleShare = () => {
    if (gameResult) {
      shareResults(gameResult);
    }
  };

  const handleExport = () => {
    if (gameResult) {
      exportResults(gameResult);
    }
  };

  const handleLoginClick = () => {
    if (isAuthenticated) {
      setShowProfile(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (username: string, password: string) => {
    const success = login(username, password);
    if (success) {
      setShowLogin(false);
      setShowProfile(true);
    }
    return success;
  };

  const handleLogout = () => {
    logout();
    setShowProfile(false);
  };

  const handleBackFromLogin = () => {
    setShowLogin(false);
  };

  const handleBackFromProfile = () => {
    setShowProfile(false);
  };

  // Login Screen
  if (showLogin) {
    return <LoginScreen onLogin={handleLogin} onBack={handleBackFromLogin} />;
  }

  // Profile Screen
  if (showProfile) {
    return <UserProfile username={user.username} onLogout={handleLogout} onHome={handleBackFromProfile} />;
  }

  // About Modal
  if (showAbout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-6">
            About Design Rage
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Design Rage is a satirical web game that puts you in the shoes of a designer
              navigating the chaotic world of client feedback. Can you survive 10 rounds
              of impossible requests while maintaining your sanity AND reputation?
            </p>
            <p>
              Every response affects your stress and reputation levels. Choose wisely between
              professional diplomacy, witty deflection, or sarcastic honesty. Random chaos
              events will test your resilience just like real client work!
            </p>
            <p>
              Built with React, TypeScript, and Tailwind CSS. Featuring a pixel-punk aesthetic
              with responsive design for all devices.
            </p>
          </div>
          <button
            onClick={() => setShowAbout(false)}
            className="mt-6 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Back to Game
          </button>
        </div>
      </div>
    );
  }

  // Credits Modal
  if (showCredits) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-6">
            Credits
          </h2>
          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">🎮 Game Design & Development</h3>
              <p>Created by Bolt AI - Your AI-powered development assistant</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">🎨 Design Inspiration</h3>
              <p>Pixel-punk aesthetic inspired by retro gaming culture and cyberpunk design principles</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">💡 Special Thanks</h3>
              <p>To all the designers who have survived impossible client feedback and lived to tell the tale</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">🛠️ Built With</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>React & TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Lucide React Icons</li>
                <li>Local Storage API</li>
                <li>Modern Web APIs</li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => setShowCredits(false)}
            className="mt-6 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Back to Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Bar - only show during gameplay */}
      {gameState.gamePhase !== 'splash' && (
        <NavigationBar
          onBack={gameState.gamePhase === 'tutorial' ? handleHome : undefined}
          onHome={handleHome}
          onSave={handleSave}
          onShare={handleShare}
          onExport={handleExport}
          showBack={gameState.gamePhase === 'tutorial'}
          isAuthenticated={isAuthenticated}
          username={user.username}
        />
      )}

      {/* Game Phases */}
      {gameState.gamePhase === 'splash' && (
        <SplashScreen
          onStart={startNewGame}
          onShowAbout={() => setShowAbout(true)}
          onShowCredits={() => setShowCredits(true)}
          onLogin={handleLoginClick}
          isLoggedIn={isAuthenticated}
          username={user.username}
        />
      )}

      {gameState.gamePhase === 'tutorial' && (
        <Tutorial
          onComplete={completeTutorial}
          onSkip={skipTutorial}
        />
      )}

      {gameState.gamePhase === 'playing' && (
        <GameScreen
          gameState={gameState}
          onUpdateGameState={updateGameState}
          onGameComplete={handleGameComplete}
        />
      )}

      {gameState.gamePhase === 'results' && gameResult && (
        <ResultsScreen
          result={gameResult}
          onRestart={handleRestart}
          onShare={handleShare}
          onExport={handleExport}
          isAuthenticated={isAuthenticated}
          onLogin={handleLoginClick}
        />
      )}
    </div>
  );
}

export default App;