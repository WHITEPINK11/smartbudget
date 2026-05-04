'use client'

import { useState } from 'react'

interface ExpenseModalProps {
  onAdd: (expense: { amount: number; category: string; note: string }) => void
}

const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Other']

export default function ExpenseModal({ onAdd }: ExpenseModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')

  const handleNumpad = (num: string) => {
    if (num === 'C') {
      setAmount('')
    } else if (num === '.') {
      if (!amount.includes('.')) setAmount(amount + num)
    } else {
      setAmount(amount + num)
    }
  }

  const handleSubmit = () => {
    if (amount && category) {
      onAdd({ amount: parseFloat(amount), category, note })
      setIsOpen(false)
      setAmount('')
      setCategory('')
      setNote('')
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-accent text-slate-950 rounded font-semibold">Add Expense</button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-accent">Add Expense</h2>
            <div className="mb-4">
              <div className="text-2xl font-mono bg-slate-800 p-4 rounded text-center">{amount || '0'}</div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {['1','2','3','4','5','6','7','8','9','.','0','C'].map(num => (
                  <button key={num} onClick={() => handleNumpad(num)} className="p-4 bg-slate-800 rounded text-xl">{num}</button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded ${category === cat ? 'bg-accent text-slate-950' : 'bg-slate-800'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Note</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2 bg-slate-800 rounded"
              />
            </div>
            <div className="flex space-x-2">
              <button onClick={() => setIsOpen(false)} className="flex-1 py-2 bg-slate-800 rounded">Cancel</button>
              <button onClick={handleSubmit} className="flex-1 py-2 bg-accent text-slate-950 rounded font-semibold">Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}