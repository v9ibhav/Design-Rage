import { useState, useEffect } from 'react';

type AuthUser = {
  username: string;
  isLoggedIn: boolean;
};

const STORAGE_KEY = 'brief-rage-auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser>({ username: '', isLoggedIn: false });
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const login = (username: string, password: string): boolean => {
    // Simple mock authentication
    // In a real app, this would validate against a backend
    if (password.length >= 6) {
      // Create a new user object when logging in
      setUser({ username, isLoggedIn: true });

        // Try to restore any saved game state after login
        const savedGame = localStorage.getItem(`gameState_${username}`);
        if (savedGame) {
          console.log('Found saved game state for', username);
        }

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser({ username: '', isLoggedIn: false });
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: user.isLoggedIn
  };
}
