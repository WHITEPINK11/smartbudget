export const getUsers = () => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('users') || '[]')
}

export const saveUser = (user: any) => {
  const users = getUsers().filter((existing: any) => existing.id !== user.id)
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
}

export const getSession = () => {
  if (typeof window === 'undefined') return null
  return JSON.parse(localStorage.getItem('session') || 'null')
}

export const setSession = (user: any) => {
  localStorage.setItem('session', JSON.stringify(user))
}

export const clearSession = () => {
  localStorage.removeItem('session')
}

export const getExpenses = () => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('expenses') || '[]')
}

export const saveExpenses = (expenses: any[]) => {
  localStorage.setItem('expenses', JSON.stringify(expenses))
}

export const getGoals = () => {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('goals') || '[]')
}

export const saveGoals = (goals: any[]) => {
  localStorage.setItem('goals', JSON.stringify(goals))
}