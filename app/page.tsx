import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-jakarta">
      <header className="p-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-accent">SmartBudget</h1>
          <div className="space-x-4">
            <Link href="/login" className="px-4 py-2 bg-accent text-slate-950 rounded-lg hover:bg-accent/90">Login</Link>
            <Link href="/register" className="px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-slate-950">Register</Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Track Your Expenses Smartly</h2>
          <p className="text-xl text-slate-300 mb-8">Manage your budget, set goals, and achieve financial freedom with our intuitive expense tracker.</p>
          <div className="bg-slate-900 rounded-lg p-8 max-w-4xl mx-auto">
            <p className="text-slate-400">Preview of dashboard coming soon...</p>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-accent">Easy Tracking</h3>
            <p className="text-slate-300">Add expenses with our intuitive modal and numpad interface.</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-accent">Visual Analytics</h3>
            <p className="text-slate-300">See your spending patterns with beautiful charts and breakdowns.</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-accent">Goal Setting</h3>
            <p className="text-slate-300">Set savings goals and track your progress towards financial targets.</p>
          </div>
        </section>

        <section className="text-center">
          <Link href="/register" className="px-8 py-4 bg-accent text-slate-950 rounded-lg text-xl font-semibold hover:bg-accent/90">Get Started</Link>
        </section>
      </main>
    </div>
  )
}