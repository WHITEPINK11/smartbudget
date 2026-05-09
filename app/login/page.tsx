'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getUsers, setSession } from '../../lib/storage'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const users = getUsers()
    const user = users.find((u: any) => u.email === form.email && u.password === form.password)
    if (user) {
      setSession(user)
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-jakarta flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-accent">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 bg-slate-800 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 bg-slate-800 rounded"
              required
            />
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <button type="submit" className="w-full py-2 bg-accent text-slate-950 rounded font-semibold">Login</button>
        </form>
        <p className="mt-4 text-center">
          Don&apos;t have an account? <Link href="/register" className="text-accent">Register</Link>
        </p>
      </div>
    </div>
  )
}