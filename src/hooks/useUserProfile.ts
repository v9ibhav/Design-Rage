import { useState, useEffect } from 'react';
import { UserProfile, UserStats, Achievement, DEFAULT_ACHIEVEMENTS, ACHIEVEMENTS } from '../types/user';
import { GameResult } from '../types/game';

const STORAGE_KEY = 'design-rage-user-profile';

// Initial user stats
const initialUserStats: UserStats = {
  gamesPlayed: 0,
  bestScore: 0,
  bestTitle: '',
  averageReputation: 0,
  averageStress: 0,
  gameHistory: []
};

export function useUserProfile(username: string) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username,
    stats: initialUserStats,
    achievements: [...DEFAULT_ACHIEVEMENTS],
    lastLogin: new Date().toISOString()
  });

  // Load profile from localStorage when username changes
  useEffect(() => {
    if (!username) return;

    const profileKey = `${STORAGE_KEY}-${username.toLowerCase()}`;
    const savedProfile = localStorage.getItem(profileKey);

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error('Failed to parse saved user profile:', error);
      }
    } else {
      // If no profile exists, create a new one with the current username
      setUserProfile({
        username,
        stats: initialUserStats,
        achievements: [...DEFAULT_ACHIEVEMENTS],
        lastLogin: new Date().toISOString()
      });
    }
  }, [username]);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (!username) return;

    const profileKey = `${STORAGE_KEY}-${username.toLowerCase()}`;
    localStorage.setItem(profileKey, JSON.stringify(userProfile));
  }, [userProfile, username]);

  // Update profile with a new game result
  const addGameResult = (result: GameResult) => {
    setUserProfile(prev => {
      // Add result to game history
      const gameHistory = [...prev.stats.gameHistory, result];

      // Calculate new stats
      const gamesPlayed = gameHistory.length;
      const bestScore = Math.max(prev.stats.bestScore, result.totalScore);
      const bestTitle = result.totalScore > prev.stats.bestScore ? result.title : prev.stats.bestTitle;

      // Calculate averages
      const totalReputation = gameHistory.reduce((sum, game) => sum + game.finalReputation, 0);
      const totalStress = gameHistory.reduce((sum, game) => sum + game.finalStress, 0);
      const averageReputation = Math.round(totalReputation / gamesPlayed);
      const averageStress = Math.round(totalStress / gamesPlayed);

      // Check for achievements
      const achievements = [...prev.achievements];

      // First game achievement
      if (gamesPlayed === 1) {
        const firstGameAchievement = achievements.find(a => a.id === ACHIEVEMENTS.FIRST_GAME);
        if (firstGameAchievement && !firstGameAchievement.unlocked) {
          firstGameAchievement.unlocked = true;
          firstGameAchievement.date = new Date().toISOString();
        }
      }

      // Low stress achievement
      if (result.finalStress < 10) {
        const lowStressAchievement = achievements.find(a => a.id === ACHIEVEMENTS.LOW_STRESS);
        if (lowStressAchievement && !lowStressAchievement.unlocked) {
          lowStressAchievement.unlocked = true;
          lowStressAchievement.date = new Date().toISOString();
        }
      }

      // Perfect reputation achievement
      if (result.finalReputation >= 100) {
        const perfectRepAchievement = achievements.find(a => a.id === ACHIEVEMENTS.PERFECT_REPUTATION);
        if (perfectRepAchievement && !perfectRepAchievement.unlocked) {
          perfectRepAchievement.unlocked = true;
          perfectRepAchievement.date = new Date().toISOString();
        }
      }

      // High score achievement
      if (result.totalScore > 90) {
        const highScoreAchievement = achievements.find(a => a.id === ACHIEVEMENTS.HIGH_SCORE);
        if (highScoreAchievement && !highScoreAchievement.unlocked) {
          highScoreAchievement.unlocked = true;
          highScoreAchievement.date = new Date().toISOString();
        }
      }

      // Frequent player achievement
      if (gamesPlayed >= 10) {
        const frequentPlayerAchievement = achievements.find(a => a.id === ACHIEVEMENTS.FREQUENT_PLAYER);
        if (frequentPlayerAchievement && !frequentPlayerAchievement.unlocked) {
          frequentPlayerAchievement.unlocked = true;
          frequentPlayerAchievement.date = new Date().toISOString();
        }
      }

      // Balanced designer achievement
      if (result.finalStress > 70 && result.finalReputation > 70) {
        const balancedAchievement = achievements.find(a => a.id === ACHIEVEMENTS.BALANCED_DESIGNER);
        if (balancedAchievement && !balancedAchievement.unlocked) {
          balancedAchievement.unlocked = true;
          balancedAchievement.date = new Date().toISOString();
        }
      }

      // Zen master achievement
      if (result.finalStress < 20 && result.finalReputation > 90) {
        const zenAchievement = achievements.find(a => a.id === ACHIEVEMENTS.ZEN_MASTER);
        if (zenAchievement && !zenAchievement.unlocked) {
          zenAchievement.unlocked = true;
          zenAchievement.date = new Date().toISOString();
        }
      }

      // Chaos survivor achievement
      if (result.chaosEventsCount >= 3) {
        const chaosSurvivorAchievement = achievements.find(a => a.id === ACHIEVEMENTS.CHAOS_SURVIVOR);
        if (chaosSurvivorAchievement && !chaosSurvivorAchievement.unlocked) {
          chaosSurvivorAchievement.unlocked = true;
          chaosSurvivorAchievement.date = new Date().toISOString();
        }
      }

      return {
        ...prev,
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
      };
    });
  };

  // Update the last login time
  const updateLoginTime = () => {
    setUserProfile(prev => ({
      ...prev,
      lastLogin: new Date().toISOString()
    }));
  };

  return {
    userProfile,
    addGameResult,
    updateLoginTime
  };
}
