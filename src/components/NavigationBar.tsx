import React from 'react';
import { Home, Save, Share, Download, ArrowLeft } from 'lucide-react';

interface NavigationBarProps {
  onBack?: () => void;
  onHome?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onExport?: () => void;
  showBack?: boolean;
}

export default function NavigationBar({ 
  onBack, 
  onHome, 
  onSave, 
  onShare, 
  onExport, 
  showBack = false 
}: NavigationBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {showBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-blue-500/30 hover:border-blue-400/50"
              >
                <ArrowLeft className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-200">Back</span>
              </button>
            )}
            
            <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">
              Brief Rage
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onHome}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500"
              title="Home"
            >
              <Home className="w-4 h-4 text-gray-300" />
            </button>
            
            <button
              onClick={onSave}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500"
              title="Save Progress"
            >
              <Save className="w-4 h-4 text-gray-300" />
            </button>
            
            <button
              onClick={onShare}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500"
              title="Share Results"
            >
              <Share className="w-4 h-4 text-gray-300" />
            </button>
            
            <button
              onClick={onExport}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600 hover:border-gray-500"
              title="Export"
            >
              <Download className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}