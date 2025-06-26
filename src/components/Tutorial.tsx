import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Gamepad2 } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function Tutorial({ onComplete, onSkip }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Design Rage! 🎮",
      content: "You're a designer navigating the chaotic world of client feedback. Your goal? Survive as long as you can without losing your sanity or reputation!",
      emoji: "🎯"
    },
    {
      title: "Meet Your Meters 📊",
      content: "Watch your Stress (🔥) and Reputation (⭐) levels. High stress is bad for your health, low reputation is bad for business. Balance is key!",
      emoji: "⚖️"
    },
    {
      title: "Choose Your Response Style 💬",
      content: "Each client comment has response options: Professional (😊), Witty (🤖), or Sarcastic (😈). Each affects your meters differently!",
      emoji: "🎭"
    },
    {
      title: "Beware of Chaos Events! ⚡",
      content: "Every 3 rounds, random chaos strikes! Budget cuts, deadline changes, or new stakeholders can shake things up dramatically.",
      emoji: "🌪️"
    },
    {
      title: "Unlimited Survival Mode! 🚀",
      content: "There's no set end - keep going as long as you can survive! Use the 'End Game' button whenever you want to see your final results and designer title.",
      emoji: "🏆"
    }
  ];

  const currentTutorial = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg sm:max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300">Tutorial Progress</span>
            <span className="text-sm text-gray-400">{currentStep + 1}/{tutorialSteps.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tutorial Card */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">{currentTutorial.emoji}</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-3 sm:mb-4">
              {currentTutorial.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed px-2">
              {currentTutorial.content}
            </p>
          </div>

          {/* Demo Elements - Mobile optimized */}
          {currentStep === 1 && (
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-900/50 rounded-lg">
                <div className="w-4 h-4 sm:w-5 sm:h-5 text-red-400">🔥</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-sm text-gray-300">Stress</span>
                    <span className="text-xs sm:text-sm text-gray-400">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full w-[45%]" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-900/50 rounded-lg">
                <div className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400">⭐</div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-sm text-gray-300">Reputation</span>
                    <span className="text-xs sm:text-sm text-gray-400">72%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full w-[72%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-green-900/30 rounded-lg border border-green-500/30">
                <span className="text-base sm:text-lg">😊</span>
                <span className="text-xs sm:text-sm text-gray-300">Professional (+Rep, +Stress)</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <span className="text-base sm:text-lg">🤖</span>
                <span className="text-xs sm:text-sm text-gray-300">Witty (Balanced)</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-red-900/30 rounded-lg border border-red-500/30">
                <span className="text-base sm:text-lg">😈</span>
                <span className="text-xs sm:text-sm text-gray-300">Sarcastic (-Stress, -Rep)</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 touch-manipulation ${
                currentStep === 0
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-500'
              }`}
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-sm sm:text-base">Previous</span>
            </button>

            <button
              onClick={onSkip}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors touch-manipulation"
            >
              Skip Tutorial
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-1 sm:space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 active:from-pink-700 active:to-blue-700 text-white transition-all duration-200 transform hover:scale-105 active:scale-95 touch-manipulation"
            >
              <span className="text-sm sm:text-base">{isLastStep ? 'Let\'s Go!' : 'Next'}</span>
              {isLastStep ? <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}