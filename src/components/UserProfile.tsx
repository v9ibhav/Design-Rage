import React, { useEffect, useState } from 'react'
import { LogOut, User, Award, BarChart, Calendar } from 'lucide-react'
import NavigationBar from './NavigationBar'
import { useUserProfile } from '../hooks/useUserProfile'
import { useAuth } from '../hooks/useAuth'

interface UserProfileProps {
  onHome: () => void
}

export default function UserProfile({ onHome }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'achievements'>('stats')
  const { user, signOut, updateLastLogin } = useAuth()
  const { userProfile, loading, updateLoginTime } = useUserProfile(user.id)

  // Update login time when profile is viewed
  useEffect(() => {
    if (user.id) {
      updateLoginTime()
      updateLastLogin()
    }
  }, [user.id, updateLoginTime, updateLastLogin])

  const handleLogout = async () => {
    await signOut()
    onHome()
  }

  // Get user title based on stats
  const getUserTitle = () => {
    if (userProfile.stats.gamesPlayed === 0) return 'New Designer'
    if (userProfile.stats.bestScore > 90) return 'Design Superstar'
    if (userProfile.stats.averageStress < 20) return 'Zen Designer'
    if (userProfile.stats.averageReputation > 90) return 'Client Favorite'
    if (userProfile.stats.gamesPlayed > 10) return 'Seasoned Professional'
    return 'Design Survivor'
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (e) {
      return 'Unknown'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-300">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900">
      {/* Navigation Bar */}
      <NavigationBar
        onHome={onHome}
        showBack={false}
      />

      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/20">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">
                  {user.username}
                </h2>
                <div className="text-gray-400">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <span className="text-sm">{getUserTitle()}</span>
                    <span className="hidden sm:inline mx-1">•</span>
                    <div className="flex items-center text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="truncate">Last login: {formatDate(userProfile.lastLogin)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors border border-pink-500/30 hover:border-pink-400/50 text-gray-200 sm:self-start"
            >
              <LogOut className="w-4 h-4 text-pink-400" />
              <span>Logout</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-6 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center space-x-2 py-3 px-4 font-medium transition-all duration-200 border-b-2 ${activeTab === 'stats' 
                ? 'text-blue-400 border-blue-500' 
                : 'text-gray-400 border-transparent hover:text-gray-300 hover:border-gray-600'}`}
            >
              <BarChart className="w-5 h-5" />
              <span>Stats</span>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center space-x-2 py-3 px-4 font-medium transition-all duration-200 border-b-2 ${activeTab === 'achievements' 
                ? 'text-blue-400 border-blue-500' 
                : 'text-gray-400 border-transparent hover:text-gray-300 hover:border-gray-600'}`}
            >
              <Award className="w-5 h-5" />
              <span>Achievements ({userProfile.achievements.filter(a => a.unlocked).length})</span>
            </button>
          </div>

          {/* Stats Section */}
          {activeTab === 'stats' && (
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard 
                  title="Games Played" 
                  value={userProfile.stats.gamesPlayed} 
                  icon={<Award className="w-5 h-5 text-pink-400" />} 
                />
                <StatCard 
                  title="Best Score" 
                  value={userProfile.stats.gamesPlayed > 0 ? userProfile.stats.bestScore : '-'} 
                  icon={<Award className="w-5 h-5 text-pink-400" />} 
                />
                <StatCard 
                  title="Best Title" 
                  value={userProfile.stats.bestTitle || 'None yet'} 
                  icon={<User className="w-5 h-5 text-pink-400" />} 
                />
                <StatCard 
                  title="Avg. Reputation" 
                  value={userProfile.stats.gamesPlayed > 0 ? `${userProfile.stats.averageReputation}%` : '-'} 
                  icon={<Award className="w-5 h-5 text-blue-400" />} 
                />
                <StatCard 
                  title="Avg. Stress" 
                  value={userProfile.stats.gamesPlayed > 0 ? `${userProfile.stats.averageStress}%` : '-'} 
                  icon={<Award className="w-5 h-5 text-blue-400" />} 
                />
              </div>

              {/* Game History */}
              {userProfile.stats.gameHistory.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Recent Games</h4>
                  <div className="bg-gray-900/30 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-800/50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stress</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rep</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700 bg-gray-800/20">
                          {userProfile.stats.gameHistory.slice(-5).reverse().map((game, idx) => (
                            <tr key={idx} className="hover:bg-gray-700/30">
                              <td className="px-3 py-2 text-xs text-gray-300 whitespace-nowrap">{formatDate(game.completionTime)}</td>
                              <td className="px-3 py-2 text-xs font-medium text-blue-400">{game.totalScore}</td>
                              <td className="px-3 py-2 text-xs text-gray-300">{game.title}</td>
                              <td className="px-3 py-2 text-xs text-red-400">{game.finalStress}%</td>
                              <td className="px-3 py-2 text-xs text-green-400">{game.finalReputation}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Achievements Section */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">
                  {userProfile.achievements.filter(a => a.unlocked).length} of {userProfile.achievements.length} achievements unlocked
                </span>
                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-blue-500"
                    style={{ width: `${(userProfile.achievements.filter(a => a.unlocked).length / userProfile.achievements.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userProfile.achievements.map(achievement => (
                  <AchievementCard
                    key={achievement.id}
                    title={achievement.title}
                    description={achievement.description}
                    unlocked={achievement.unlocked}
                    date={achievement.date ? formatDate(achievement.date) : undefined}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-gray-300 font-medium">{title}</h4>
        {icon}
      </div>
      <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">
        {value}
      </p>
    </div>
  )
}

interface AchievementCardProps {
  title: string
  description: string
  unlocked: boolean
  date?: string
}

function AchievementCard({ title, description, unlocked, date }: AchievementCardProps) {
  return (
    <div className={`rounded-xl p-4 border ${unlocked 
      ? 'bg-gradient-to-br from-gray-800 to-gray-700 border-blue-500/30' 
      : 'bg-gray-800/30 border-gray-700'}`}>
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${unlocked 
          ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30' 
          : 'bg-gray-700'}`}>
          <Award className={`w-5 h-5 ${unlocked ? 'text-blue-400' : 'text-gray-500'}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className={`font-medium ${unlocked ? 'text-gray-200' : 'text-gray-500'}`}>{title}</h4>
            {unlocked && <span className="px-2 py-0.5 bg-blue-500/20 rounded-full text-blue-400 text-xs">Unlocked</span>}
          </div>
          <p className={`text-sm ${unlocked ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{description}</p>
          {unlocked && date && (
            <p className="text-xs text-blue-400 mt-1.5">Unlocked: {date}</p>
          )}
        </div>
      </div>
    </div>
  )
}