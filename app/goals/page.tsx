'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import GoalCard from '../../components/GoalCard'
import { useAuth } from '../../hooks/useAuth'
import { getGoals, saveGoals } from '../../lib/storage'

const initialGoals = [
  { id: 1, name: 'Emergency Fund', target: 1200, current: 320 },
  { id: 2, name: 'Vacation', target: 850, current: 420 },
  { id: 3, name: 'Gadget Upgrade', target: 600, current: 210 },
]

export default function Goals() {
  const { currentUser } = useAuth()
  const [goals, setGoals] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
      return
    }
    const storedGoals = getGoals()
    setGoals(storedGoals.length > 0 ? storedGoals : initialGoals)
  }, [currentUser, router])

  useEffect(() => {
    if (goals.length) {
      saveGoals(goals)
    }
  }, [goals])

  const handleAddMoney = (id: number, amount: number) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, current: Math.min(goal.target, goal.current + amount) } : goal))
  }

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-slate-950 text-white font-jakarta flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-accent">Goals</h1>
        <div className="grid lg:grid-cols-3 gap-6">
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} onAddMoney={handleAddMoney} />
          ))}
        </div>
      </main>
    </div>
  )
}