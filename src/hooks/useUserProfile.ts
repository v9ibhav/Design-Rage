import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { UserProfile, UserStats, Achievement, DEFAULT_ACHIEVEMENTS } from '../types/user'
import { GameResult } from '../types/game'

const initialUserStats: UserStats = {
  gamesPlayed: 0,
  bestScore: 0,
  bestTitle: '',
  averageReputation: 0,
  averageStress: 0,
  gameHistory: []
}

export function useUserProfile(userId: string) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: '',
    stats: initialUserStats,
    achievements: [...DEFAULT_ACHIEVEMENTS],
    lastLogin: new Date().toISOString()
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    loadUserProfile()
  }, [userId])

  const loadUserProfile = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error loading user profile:', error)
        return
      }

      if (profile) {
        setUserProfile({
          username: profile.username,
          stats: profile.stats || initialUserStats,
          achievements: profile.achievements || [...DEFAULT_ACHIEVEMENTS],
          lastLogin: profile.last_login
        })
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveUserProfile = async (updatedProfile: Partial<UserProfile>) => {
    if (!userId) return false

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          stats: updatedProfile.stats,
          achievements: updatedProfile.achievements,
          last_login: updatedProfile.lastLogin,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)

      if (error) {
        console.error('Error saving user profile:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in saveUserProfile:', error)
      return false
    }
  }

  const addGameResult = async (result: GameResult) => {
    const gameHistory = [...userProfile.stats.gameHistory, result]
    const gamesPlayed = gameHistory.length
    const bestScore = Math.max(userProfile.stats.bestScore, result.totalScore)
    const bestTitle = result.totalScore > userProfile.stats.bestScore ? result.title : userProfile.stats.bestTitle

    // Calculate averages
    const totalReputation = gameHistory.reduce((sum, game) => sum + game.finalReputation, 0)
    const totalStress = gameHistory.reduce((sum, game) => sum + game.finalStress, 0)
    const averageReputation = Math.round(totalReputation / gamesPlayed)
    const averageStress = Math.round(totalStress / gamesPlayed)

    // Check for achievements
    const achievements = [...userProfile.achievements]
    let achievementsUpdated = false

    // Update achievements based on game result
    achievements.forEach(achievement => {
      if (achievement.unlocked) return

      let shouldUnlock = false
      const now = new Date().toISOString()

      switch (achievement.id) {
        case 'first_game':
          shouldUnlock = gamesPlayed === 1
          break
        case 'low_stress':
          shouldUnlock = result.finalStress < 10
          break
        case 'perfect_reputation':
          shouldUnlock = result.finalReputation >= 100
          break
        case 'chaos_survivor':
          shouldUnlock = result.chaosEventsCount >= 3
          break
        case 'high_score':
          shouldUnlock = result.totalScore > 90
          break
        case 'frequent_player':
          shouldUnlock = gamesPlayed >= 10
          break
        case 'balanced_designer':
          shouldUnlock = result.finalStress > 70 && result.finalReputation > 70
          break
        case 'zen_master':
          shouldUnlock = result.finalStress < 20 && result.finalReputation > 90
          break
      }

      if (shouldUnlock) {
        achievement.unlocked = true
        achievement.date = now
        achievementsUpdated = true
      }
    })

    const updatedProfile = {
      ...userProfile,
      stats: {
        gamesPlayed,
        bestScore,
        bestTitle,
        averageReputation,
        averageStress,
        gameHistory
      },
      achievements,
      lastLogin: new Date().toISOString()
    }

    setUserProfile(updatedProfile)
    await saveUserProfile(updatedProfile)

    return achievementsUpdated
  }

  const updateLoginTime = async () => {
    const updatedProfile = {
      ...userProfile,
      lastLogin: new Date().toISOString()
    }

    setUserProfile(updatedProfile)
    await saveUserProfile(updatedProfile)
  }

  return {
    userProfile,
    loading,
    addGameResult,
    updateLoginTime,
    saveUserProfile
  }
}