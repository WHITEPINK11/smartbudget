'use client'

import { useState, useEffect } from 'react'
import { getExpenses, saveExpenses } from '../lib/storage'

export const useExpenses = (userId?: number) => {
  const [expenses, setExpenses] = useState<any[]>([])

  useEffect(() => {
    const allExpenses: any[] = getExpenses()
    setExpenses(userId ? allExpenses.filter((expense: any) => expense.userId === userId) : allExpenses)
  }, [userId])

  const addExpense = (expense: any) => {
    const currentExpenses = getExpenses()
    const newExpense = {
      ...expense,
      id: Date.now(),
      date: new Date().toISOString(),
      userId: userId || 0,
    }
    const updated = [...currentExpenses, newExpense]
    setExpenses(updated.filter(expense => expense.userId === userId))
    saveExpenses(updated)
  }

  const deleteExpense = (id: number) => {
    const currentExpenses = getExpenses()
    const updated = currentExpenses.filter(e => e.id !== id)
    setExpenses(updated.filter(expense => expense.userId === userId))
    saveExpenses(updated)
  }

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)

  return { expenses, addExpense, deleteExpense, totalSpent }
}