import React, { useState, useEffect } from 'react'
import { UserCheck, Lock, ArrowLeft, AlertCircle, Mail, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

interface LoginScreenProps {
  onBack: () => void
}

export default function LoginScreen({ onBack }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({ 
    email: '', 
    password: '', 
    username: '', 
    confirmPassword: '' 
  })

  const { signIn, signUp, loading } = useAuth()

  useEffect(() => {
    const inputElement = document.getElementById(isSignUp ? 'email' : 'email')
    if (inputElement) {
      inputElement.focus()
    }
  }, [isSignUp])

  const validateForm = () => {
    const errors = { email: '', password: '', username: '', confirmPassword: '' }
    let isValid = true

    // Email validation
    if (!email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required'
      isValid = false
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    // Sign up specific validations
    if (isSignUp) {
      if (!username.trim()) {
        errors.username = 'Username is required'
        isValid = false
      } else if (username.length < 3) {
        errors.username = 'Username must be at least 3 characters'
        isValid = false
      } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores'
        isValid = false
      }

      if (!confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
        isValid = false
      } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
        isValid = false
      }
    }

    setFieldErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      if (isSignUp) {
        const result = await signUp(email, password, username)
        if (result.success) {
          if (result.error) {
            setSuccess(result.error) // This is actually the confirmation message
          } else {
            setSuccess('Account created successfully! You can now sign in.')
            setIsSignUp(false)
            setEmail('')
            setPassword('')
            setUsername('')
            setConfirmPassword('')
          }
        } else {
          setError(result.error || 'Failed to create account')
        }
      } else {
        const result = await signIn(email, password)
        if (result.success) {
          // Auth hook will handle the redirect
        } else {
          setError(result.error || 'Failed to sign in')
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError('')
    setSuccess('')
    setFieldErrors({ email: '', password: '', username: '', confirmPassword: '' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-300">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-sm sm:max-w-md w-full bg-gray-800/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-pink-500/20 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">
            <span className="text-transparent bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text">
              Design Rage
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto rounded-full"></div>
          <p className="text-xs sm:text-sm text-gray-400 mt-3">
            {isSignUp 
              ? 'Join the community and track your design survival skills' 
              : 'Sign in to continue your design survival journey'
            }
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm flex items-start">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm flex items-start">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="username" className="flex justify-between text-sm font-medium text-gray-300">
                <span>Username</span>
                {fieldErrors.username && (
                  <span className="text-red-400 text-xs">{fieldErrors.username}</span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 h-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    if (fieldErrors.username) setFieldErrors({...fieldErrors, username: ''})
                  }}
                  className={`block w-full pl-9 sm:pl-10 bg-gray-700 border ${fieldErrors.username ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2.5 sm:py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  placeholder="Choose a username"
                  autoComplete="username"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="flex justify-between text-sm font-medium text-gray-300">
              <span>Email</span>
              {fieldErrors.email && (
                <span className="text-red-400 text-xs">{fieldErrors.email}</span>
              )}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 h-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email) setFieldErrors({...fieldErrors, email: ''})
                }}
                className={`block w-full pl-9 sm:pl-10 bg-gray-700 border ${fieldErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2.5 sm:py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="flex justify-between text-sm font-medium text-gray-300">
              <span>Password</span>
              {fieldErrors.password && (
                <span className="text-red-400 text-xs">{fieldErrors.password}</span>
              )}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 h-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password) setFieldErrors({...fieldErrors, password: ''})
                }}
                className={`block w-full pl-9 sm:pl-10 bg-gray-700 border ${fieldErrors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2.5 sm:py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                placeholder="Enter your password"
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 ml-1">Password must be at least 6 characters</p>
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="flex justify-between text-sm font-medium text-gray-300">
                <span>Confirm Password</span>
                {fieldErrors.confirmPassword && (
                  <span className="text-red-400 text-xs">{fieldErrors.confirmPassword}</span>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 h-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (fieldErrors.confirmPassword) setFieldErrors({...fieldErrors, confirmPassword: ''})
                  }}
                  className={`block w-full pl-9 sm:pl-10 bg-gray-700 border ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg py-2.5 sm:py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all duration-200 text-sm sm:text-base`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-pink-600 to-blue-600 hover:from-pink-500 hover:to-blue-500 active:from-pink-700 active:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transform transition-all duration-200 ${!isSubmitting && 'hover:scale-[1.02] active:scale-95'} shadow-lg hover:shadow-pink-500/25 border border-pink-500/30 relative ${isSubmitting && 'opacity-90'} touch-manipulation`}
            >
              {isSubmitting ? (
                <>
                  <span className="opacity-0">{isSignUp ? 'CREATING ACCOUNT' : 'SIGNING IN'}</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </>
              ) : (
                isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-4">
          <button
            onClick={toggleMode}
            className="w-full text-center text-gray-400 hover:text-gray-300 transition-colors text-sm sm:text-base touch-manipulation"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </button>

          <button
            onClick={onBack}
            className="flex items-center justify-center space-x-2 w-full bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition-all duration-200 border border-gray-600 hover:border-gray-500 touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to Main Screen</span>
          </button>
        </div>
      </div>
    </div>
  )
}