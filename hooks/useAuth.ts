'use client'

import { useState, useEffect } from 'react'
import { getSession, setSession, clearSession } from '../lib/storage'

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const session = getSession()
    setCurrentUser(session)
  }, [])

  const login = (user: any) => {
    setSession(user)
    setCurrentUser(user)
  }

  const logout = () => {
    clearSession()
    setCurrentUser(null)
  }

  const register = (user: any) => {
    // Assume saveUser is called elsewhere
    login(user)
  }

  return { currentUser, login, logout, register }
}