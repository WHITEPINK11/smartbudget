'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import BalanceCard from '../../components/BalanceCard'
import ExpenseModal from '../../components/ExpenseModal'
import { useAuth } from '../../hooks/useAuth'
import { useExpenses } from '../../hooks/useExpenses'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const { expenses, addExpense, deleteExpense, totalSpent } = useExpenses()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    }
  }, [currentUser, router])

  if (!currentUser) return null

  const balance = currentUser.budget - totalSpent
  const limitPercentage = (totalSpent / currentUser.budget) * 100

  return (
    <div className="min-h-screen bg-slate-950 text-white font-jakarta flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-accent">Dashboard</h1>
        <BalanceCard balance={balance} spent={totalSpent} limit={currentUser.budget} percentage={limitPercentage} />
        <div className="mt-6">
          <ExpenseModal onAdd={addExpense} />
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          <div className="space-y-2">
            {expenses.slice(-5).map((expense: any) => (
              <div key={expense.id} className="bg-slate-900 p-4 rounded flex justify-between">
                <div>
                  <p className="font-semibold">{expense.category}</p>
                  <p className="text-slate-400">{expense.note}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span>${expense.amount}</span>
                  <button onClick={() => deleteExpense(expense.id)} className="text-red-400">Delete</button>
                </div>
              </div>
            ))}
            {expenses.length === 0 && <div className="bg-slate-900 p-4 rounded text-slate-400">No expenses yet. Add your first expense.</div>}
          </div>
        </div>
      </main>
    </div>
  )
}