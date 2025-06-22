import React, { useState, useEffect } from 'react';
import { Play, Info, Users } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
  onShowAbout: () => void;
  onShowCredits: () => void;
  onLogin: () => void;
  isLoggedIn: boolean;
  username?: string;
}

export default function SplashScreen({ onStart, onShowAbout, onShowCredits, onLogin, isLoggedIn, username }: SplashScreenProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Title */}
        <div className="space-y-4">
          <h1 className={`text-6xl md:text-7xl font-bold transform transition-all duration-1000 ${
            isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}>
            <span className="text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text animate-pulse">
              BRIEF
            </span>
          </h1>
          <h1 className={`text-6xl md:text-7xl font-bold transform transition-all duration-1000 delay-300 ${
            isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
          }`}>
            <span className="text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text animate-pulse">
              RAGE
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transform transition-all duration-1000 delay-700 ${
          isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`}>
          <p className="text-xl text-gray-300 mb-2">🔥 Design Hell is Real 🔥</p>
          <p className="text-lg text-gray-400">Ready to survive it?</p>
        </div>

        {/* Pixel Art Element */}
        <div className={`flex justify-center transform transition-all duration-1000 delay-1000 ${
          isAnimating ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}>
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-blue-500 rounded-sm animate-pulse"></div>
            <div className="absolute inset-1 bg-gray-900 rounded-sm"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-sm animate-pulse"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-4 transform transition-all duration-1000 delay-1200 ${
          isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`}>
          <button
            onClick={onStart}
            className="w-full bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-lg transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-pink-500/25 border border-pink-500/30"
          >
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <Play className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-lg sm:text-xl">START SURVIVING</span>
            </div>
          </button>


          <div className="flex space-x-3 sm:space-x-4">
            <button
              onClick={onShowAbout}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 sm:py-3 px-2 sm:px-6 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
            >
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base">About</span>
              </div>
            </button>

            <button
              onClick={onShowCredits}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 sm:py-3 px-2 sm:px-6 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
            >
              <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base">Credits</span>
              </div>
            </button>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-20 animation-delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-20 animation-delay-2000"></div>
        </div>
      </div>
    </div>
  );
}