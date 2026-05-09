'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../hooks/useAuth'
import { getUsers, saveUser, setSession } from '../../lib/storage'

export default function Profile() {
  const { currentUser, logout } = useAuth()
  const [budget, setBudget] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
      return
    }
    setBudget(currentUser.budget)
  }, [currentUser, router])

  const handleSave = () => {
    if (!currentUser) return
    const updatedUser = { ...currentUser, budget }
    saveUser(updatedUser)
    setSession(updatedUser)
    router.refresh?.()
  }

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-slate-950 text-white font-jakarta flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-accent">Profile</h1>
        <div className="grid gap-6 max-w-3xl">
          <div className="bg-slate-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{currentUser.avatar}</span>
                <div>
                  <p className="font-semibold">{currentUser.name}</p>
                  <p className="text-slate-400">{currentUser.email}</p>
                </div>
              </div>
              <div>
                <label className="block mb-2">Monthly Budget</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full p-2 bg-slate-800 rounded"
                />
              </div>
              <button onClick={handleSave} className="px-4 py-2 bg-accent text-slate-950 rounded font-semibold">Save Settings</button>
              <button onClick={() => logout()} className="px-4 py-2 bg-red-600 text-white rounded font-semibold">Logout</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}