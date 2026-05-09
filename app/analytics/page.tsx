'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../hooks/useAuth'
import { useExpenses } from '../../hooks/useExpenses'

const chartData = [
  { day: 'Mon', amount: 120 },
  { day: 'Tue', amount: 180 },
  { day: 'Wed', amount: 90 },
  { day: 'Thu', amount: 220 },
  { day: 'Fri', amount: 140 },
  { day: 'Sat', amount: 90 },
  { day: 'Sun', amount: 120 },
]

const colors = ['#00E5A0', '#38bdf8', '#8b5cf6', '#f59e0b', '#ef4444']

export default function Analytics() {
  const { currentUser } = useAuth()
  const { expenses } = useExpenses(currentUser?.id)
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    }
  }, [currentUser, router])

  const categoryData = Object.entries(
    expenses.reduce((acc: any, exp: any) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value }))

  if (!currentUser) return null

  return (
    <div className="min-h-screen bg-slate-950 text-white font-jakarta flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-accent">Analytics</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Spending by Day</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#00E5A0" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#00E5A0" label />
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}