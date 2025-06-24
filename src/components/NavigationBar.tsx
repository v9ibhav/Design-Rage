import React from 'react';
import { Home, Save, Share, Download, ArrowLeft } from 'lucide-react';

interface NavigationBarProps {
  onBack?: () => void;
  onHome?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onExport?: () => void;
  showBack?: boolean;
  isAuthenticated?: boolean;
  username?: string;
}

export default function NavigationBar({ 
  onBack, 
  onHome, 
  onSave, 
  onShare, 
  onExport, 
  showBack = false,
  isAuthenticated = false,
  username,
  showShareExport = false
}: NavigationBarProps & { showShareExport?: boolean }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-pink-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {showBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-blue-500/30 hover:border-blue-400/50"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs sm:text-sm font-medium text-gray-200">Back</span>
              </button>
            )}

            <h1 className="text-lg sm:text-xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">
              Design Rage
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={onHome}
              className="p-1.5 sm:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500 group"
              title="Home"
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 group-hover:text-white transition-colors" />
            </button>

            {onSave && (
              <button
                onClick={onSave}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500 group relative"
                title={isAuthenticated ? `Save Progress (${username})` : "Login to Save"}
              >
                <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 group-hover:text-white transition-colors" />
                {isAuthenticated && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </button>
            )}

            {showShareExport && onShare && (
              <button
                onClick={onShare}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500 group"
                title="Share Results"
              >
                <Share className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 group-hover:text-white transition-colors" />
              </button>
            )}

            {showShareExport && onExport && (
              <button
                onClick={onExport}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500 group"
                title="Export"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 group-hover:text-white transition-colors" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}