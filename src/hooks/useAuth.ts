import { useState, useEffect } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface AuthUser {
  id: string
  username: string
  email: string
  isLoggedIn: boolean
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser>({ id: '', username: '', email: '', isLoggedIn: false })
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        loadUserProfile(session.user)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      if (session?.user) {
        await loadUserProfile(session.user)
      } else {
        setUser({ id: '', username: '', email: '', isLoggedIn: false })
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('username, email')
        .eq('id', authUser.id)
        .single()

      if (error) {
        console.error('Error loading user profile:', error)
        // If profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          await createUserProfile(authUser)
          return
        }
      }

      if (profile) {
        setUser({
          id: authUser.id,
          username: profile.username,
          email: profile.email,
          isLoggedIn: true
        })
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const createUserProfile = async (authUser: User) => {
    try {
      const username = authUser.user_metadata?.username || authUser.email?.split('@')[0] || 'user'
      
      const { error } = await supabase
        .from('user_profiles')
        .insert({
          id: authUser.id,
          username,
          email: authUser.email!
        })

      if (error) {
        console.error('Error creating user profile:', error)
      } else {
        setUser({
          id: authUser.id,
          username,
          email: authUser.email!,
          isLoggedIn: true
        })
      }
    } catch (error) {
      console.error('Error in createUserProfile:', error)
    }
  }

  const signUp = async (email: string, password: string, username: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user && !data.session) {
        return { 
          success: true, 
          error: 'Please check your email for a confirmation link to complete your registration.' 
        }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const updateLastLogin = async () => {
    if (user.id) {
      try {
        await supabase
          .from('user_profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', user.id)
      } catch (error) {
        console.error('Error updating last login:', error)
      }
    }
  }

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateLastLogin,
    isAuthenticated: user.isLoggedIn
  }
}