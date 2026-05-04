'use client'

import { useState, useEffect } from 'react'
import { getExpenses, saveExpenses } from '../lib/storage'

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<any[]>([])

  useEffect(() => {
    setExpenses(getExpenses())
  }, [])

  const addExpense = (expense: any) => {
    const newExpense = { ...expense, id: Date.now(), date: new Date().toISOString() }
    const updated = [...expenses, newExpense]
    setExpenses(updated)
    saveExpenses(updated)
  }

  const deleteExpense = (id: number) => {
    const updated = expenses.filter(e => e.id !== id)
    setExpenses(updated)
    saveExpenses(updated)
  }

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)

  return { expenses, addExpense, deleteExpense, totalSpent }
}