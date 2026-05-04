interface BalanceCardProps {
  balance: number
  spent: number
  limit: number
  percentage: number
}

export default function BalanceCard({ balance, spent, limit, percentage }: BalanceCardProps) {
  return (
    <div className="bg-slate-900 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-accent">Balance</h2>
      <div className="text-3xl font-bold mb-2">${balance.toFixed(2)}</div>
      <div className="text-slate-400 mb-4">Spent: ${spent.toFixed(2)} / Limit: ${limit}</div>
      <div className="w-full bg-slate-800 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${percentage > 80 ? 'bg-red-500' : 'bg-accent'}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="text-sm mt-2">{percentage.toFixed(1)}% of budget used</div>
    </div>
  )
}