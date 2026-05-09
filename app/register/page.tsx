'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getUsers, saveUser, setSession } from '../../lib/storage'

const emojis = ['😀', '😎', '🤓', '😊', '🙂', '🤗', '😉', '😌']

export default function Register() {
  const [form, setForm] = useState({
    avatar: '😀',
    name: '',
    email: '',
    password: '',
    budget: 1000
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const users = getUsers()
    if (users.some((user: any) => user.email === form.email)) {
      setError('Email already registered')
      return
    }

    const newUser = { ...form, id: Date.now() }
    saveUser(newUser)
    setSession(newUser)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-jakarta flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-accent">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Avatar</label>
            <div className="flex space-x-2">
              {emojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setForm({ ...form, avatar: emoji })}
                  className={`text-2xl p-2 rounded ${form.avatar === emoji ? 'bg-accent' : 'bg-slate-800'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 bg-slate-800 rounded"
              required
            />
          </div>
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
          <div>
            <label className="block mb-2">Monthly Budget: ${form.budget}</label>
            <input
              type="range"
              min="500"
              max="10000"
              step="100"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
              className="w-full"
            />
          </div>
          {error && <p className="text-red-400">{error}</p>}
          <button type="submit" className="w-full py-2 bg-accent text-slate-950 rounded font-semibold">Register</button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link href="/login" className="text-accent">Login</Link>
        </p>
      </div>
    </div>
  )
}