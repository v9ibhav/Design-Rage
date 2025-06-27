import React, { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import SplashScreen from './components/SplashScreen'
import Tutorial from './components/Tutorial'
import GameScreen from './components/GameScreen'
import ResultsScreen from './components/ResultsScreen'
import LoginScreen from './components/LoginScreen'
import UserProfile from './components/UserProfile'
import CustomCursor from './components/CustomCursor'
import { useGameState } from './hooks/useGameState'
import { useAuth } from './hooks/useAuth'
import { useUserProfile } from './hooks/useUserProfile'
import { shareResults, exportResults } from './utils/sharing'
import { GameResult } from './types/game'

// Simple notification system
const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 z-50 p-3 sm:p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-600' : 
    type === 'error' ? 'bg-red-600' : 'bg-blue-600'
  } text-white text-sm sm:text-base max-w-xs sm:max-w-sm`
  notification.textContent = message
  
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 100)
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

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
  } = useGameState()

  const { user, loading: authLoading, isAuthenticated } = useAuth()
  const { userProfile, addGameResult } = useUserProfile(user.id)

  const [gameResult, setGameResult] = useState<GameResult | null>(null)
  const [showAbout, setShowAbout] = useState(false)
  const [showCredits, setShowCredits] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [cursorState, setCursorState] = useState('')

  // Redirect to profile after successful login
  useEffect(() => {
    if (isAuthenticated && showLogin) {
      setShowLogin(false)
      setShowProfile(true)
    }
  }, [isAuthenticated, showLogin])

  const handleGameComplete = async () => {
    const result = completeGame()
    setGameResult(result)

    // If user is logged in, add the result to their profile
    if (isAuthenticated && user.id) {
      try {
        const achievementsUnlocked = await addGameResult(result)
        if (achievementsUnlocked) {
          showNotification('New achievements unlocked! 🏆', 'success')
        }
        showNotification('Game results saved to your profile!', 'success')
      } catch (error) {
        console.error('Error saving game result:', error)
        showNotification('Failed to save game results', 'error')
      }
    }
  }

  const handleRestart = () => {
    resetGame()
    setGameResult(null)
    setCursorState('')
  }

  const handleHome = () => {
    resetGame()
    setGameResult(null)
    setCursorState('')
  }

  const handleSave = () => {
    if (!isAuthenticated) {
      setShowLogin(true)
      return
    }

    if (gameState.gamePhase === 'playing') {
      const success = saveGame()
      if (success) {
        showNotification('Game progress saved successfully!', 'success')
        setCursorState('cursor-success')
        setTimeout(() => setCursorState(''), 1000)
      } else {
        showNotification('Failed to save game progress', 'error')
        setCursorState('cursor-stress')
        setTimeout(() => setCursorState(''), 1000)
      }
    } else if (gameState.gamePhase === 'results') {
      if (gameResult) {
        showNotification('Game results are automatically saved to your profile!', 'info')
      }
    } else {
      showNotification('No game in progress to save', 'info')
    }
  }

  const handleShare = () => {
    if (gameResult) {
      shareResults(gameResult)
      setCursorState('cursor-success')
      setTimeout(() => setCursorState(''), 1000)
    }
  }

  const handleExport = () => {
    if (gameResult) {
      exportResults(gameResult)
      setCursorState('cursor-success')
      setTimeout(() => setCursorState(''), 1000)
    }
  }

  const handleLoginClick = () => {
    if (isAuthenticated) {
      setShowProfile(true)
    } else {
      setShowLogin(true)
    }
  }

  const handleBackFromLogin = () => {
    setShowLogin(false)
  }

  const handleBackFromProfile = () => {
    setShowProfile(false)
  }

  // Show loading screen while auth is initializing
  if (authLoading) {
    return (
      <>
        <CustomCursor className="cursor-loading" />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center">
          <div className="text-lg sm:text-xl font-semibold text-gray-300">Loading...</div>
        </div>
      </>
    )
  }

  // Login Screen
  if (showLogin) {
    return (
      <>
        <CustomCursor className={cursorState} />
        <LoginScreen onBack={handleBackFromLogin} />
      </>
    )
  }

  // Profile Screen
  if (showProfile) {
    return (
      <>
        <CustomCursor className={cursorState} />
        <UserProfile onHome={handleBackFromProfile} />
      </>
    )
  }

  // About Modal
  if (showAbout) {
    return (
      <>
        <CustomCursor className={cursorState} />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-lg sm:max-w-2xl bg-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-4 sm:mb-6">
              About Design Rage
            </h2>
            <div className="space-y-3 sm:space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
              <p>
                Design Rage is a satirical web game that puts you in the shoes of a designer
                navigating the chaotic world of client feedback. Can you survive unlimited rounds
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
              className="mt-6 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 active:from-pink-700 active:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 touch-manipulation"
            >
              Back to Game
            </button>
          </div>
        </div>
      </>
    )
  }

  // Credits Modal
  if (showCredits) {
    return (
      <>
        <CustomCursor className={cursorState} />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-lg sm:max-w-2xl bg-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-4 sm:mb-6">
              Credits
            </h2>
            <div className="space-y-4 sm:space-y-6 text-gray-300 text-sm sm:text-base">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">🎮 Game Design & Development</h3>
                <p>Created by Bolt AI - Your AI-powered development assistant</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">🎨 Design Inspiration</h3>
                <p>Pixel-punk aesthetic inspired by retro gaming culture and cyberpunk design principles</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">💡 Special Thanks</h3>
                <p>To all the designers who have survived impossible client feedback and lived to tell the tale</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">🛠️ Built With</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400 text-sm">
                  <li>React & TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Supabase (Authentication & Database)</li>
                  <li>Lucide React Icons</li>
                  <li>Modern Web APIs</li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setShowCredits(false)}
              className="mt-6 bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 active:from-pink-700 active:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 touch-manipulation"
            >
              Back to Game
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <CustomCursor className={cursorState} />
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
            onCursorStateChange={setCursorState}
          />
        )}

        {gameState.gamePhase === 'results' && gameResult && (
          <ResultsScreen
            result={gameResult}
            onRestart={handleRestart}
            onShare={handleShare}
            onExport={handleExport}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </>
  )
}

export default App