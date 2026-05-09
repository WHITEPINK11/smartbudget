'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../hooks/useAuth'

export default function Sidebar() {
  const { currentUser, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <aside className="w-64 bg-slate-900 p-6 flex flex-col">
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-slate-800">Dashboard</Link>
          </li>
          <li>
            <Link href="/analytics" className="block py-2 px-4 rounded hover:bg-slate-800">Analytics</Link>
          </li>
          <li>
            <Link href="/goals" className="block py-2 px-4 rounded hover:bg-slate-800">Goals</Link>
          </li>
          <li>
            <Link href="/profile" className="block py-2 px-4 rounded hover:bg-slate-800">Profile</Link>
          </li>
        </ul>
      </nav>
      <div className="border-t border-slate-700 pt-4">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">{currentUser?.avatar}</span>
          <span>{currentUser?.name}</span>
        </div>
        <button onClick={handleLogout} className="w-full py-2 bg-red-600 rounded font-semibold">Logout</button>
      </div>
    </aside>
  )
}