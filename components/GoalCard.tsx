interface GoalCardProps {
  goal: { id: number; name: string; target: number; current: number }
  onAddMoney: (id: number, amount: number) => void
}

export default function GoalCard({ goal, onAddMoney }: GoalCardProps) {
  const percentage = (goal.current / goal.target) * 100

  return (
    <div className="bg-slate-900 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{goal.name}</h3>
      <div className="text-2xl font-bold mb-2">${goal.current} / ${goal.target}</div>
      <div className="w-full bg-slate-800 rounded-full h-4 mb-4">
        <div className="bg-accent h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <button
        onClick={() => onAddMoney(goal.id, 50)} // Example amount
        className="px-4 py-2 bg-accent text-slate-950 rounded font-semibold"
      >
        Add $50
      </button>
    </div>
  )
}