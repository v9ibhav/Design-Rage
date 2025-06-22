import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Zap, Star, Gamepad2 } from 'lucide-react';

interface TutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

export default function Tutorial({ onComplete, onSkip }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Brief Rage! 🎮",
      content: "You're a designer navigating the chaotic world of client feedback. Your goal? Survive 10 rounds without losing your sanity or reputation!",
      emoji: "🎯"
    },
    {
      title: "Meet Your Meters 📊",
      content: "Watch your Stress (🔥) and Reputation (⭐) levels. High stress is bad for your health, low reputation is bad for business. Balance is key!",
      emoji: "⚖️"
    },
    {
      title: "Choose Your Response Style 💬",
      content: "Each client comment has 4 response options: Professional (😊), Witty (🤖), or Sarcastic (😈). Each affects your meters differently!",
      emoji: "🎭"
    },
    {
      title: "Beware of Chaos Events! ⚡",
      content: "Every 3 rounds, random chaos strikes! Budget cuts, deadline changes, or new stakeholders can shake things up dramatically.",
      emoji: "🌪️"
    },
    {
      title: "Ready to Begin? 🚀",
      content: "Remember: There's no perfect response, only survival. Your designer title depends on how well you balance sanity and success!",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
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
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentTutorial.emoji}</div>
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text mb-4">
              {currentTutorial.title}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {currentTutorial.content}
            </p>
          </div>

          {/* Demo Elements */}
          {currentStep === 1 && (
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg">
                <Zap className="w-5 h-5 text-red-400" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Stress</span>
                    <span className="text-sm text-gray-400">45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full w-[45%]" />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg">
                <Star className="w-5 h-5 text-yellow-400" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-300">Reputation</span>
                    <span className="text-sm text-gray-400">72%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-green-500 h-2 rounded-full w-[72%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
                <span className="text-lg">😊</span>
                <span className="text-sm text-gray-300">Professional (+Rep, +Stress)</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <span className="text-lg">🤖</span>
                <span className="text-sm text-gray-300">Witty (Balanced)</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-red-900/30 rounded-lg border border-red-500/30">
                <span className="text-lg">😈</span>
                <span className="text-sm text-gray-300">Sarcastic (-Stress, -Rep)</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 0
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600 hover:border-gray-500'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={onSkip}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              Skip Tutorial
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 text-white transition-all duration-200 transform hover:scale-105"
            >
              <span>{isLastStep ? 'Let\'s Go!' : 'Next'}</span>
              {isLastStep ? <Gamepad2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}