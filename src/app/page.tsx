export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-slate-900 to-slate-700 flex items-center justify-center">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Kanban Board
            </h1>
          </div>

          <button className="group rounded-xl bg-linear-to-r from-slate-900 to-slate-800 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/20 transition-all duration-200 hover:shadow-xl hover:shadow-slate-900/30 hover:scale-[1.02] active:scale-[0.98]">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Board
            </span>
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              My Board
            </h2>
          </div>
          <p className="mt-2  text-sm text-slate-500 font-medium">
            Organize your tasks and workflow efficiently.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-200/70 p-5 shadow-inner">
            <div className="flex items-center justify-between mb-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                To Do
              </h3>
              <span className="text-xs font-medium text-slate-500 bg-white/60 px-2.5 py-1 rounded-full">
                1
              </span>
            </div>

            <div className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/50 transition-all duration-200 hover:shadow-md hover:ring-slate-300/80 hover:-translate-y-0.5 cursor-pointer">
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                  Example Task
                </h4>
                <div className="h-2 w-2 rounded-full bg-slate-300 group-hover:bg-slate-400 transition-colors"></div>
              </div>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Task description goes here
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  <span className="h-1 w-1 rounded-full bg-blue-500"></span>
                  Pending
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-200/70 p-5 shadow-inner">
            <div className="flex items-center justify-between mb-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                In Progress
              </h3>
              <span className="text-xs font-medium text-slate-500 bg-white/60 px-2.5 py-1 rounded-full">
                0
              </span>
            </div>
            
            <div className="flex h-30 items-center justify-center rounded-xl border-2 border-dashed border-slate-300/60 bg-white/30 transition-all hover:border-slate-400/80 hover:bg-white/50">
              <p className="text-sm text-slate-400 font-medium">Drop tasks here</p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-200/70 p-5 shadow-inner">
            <div className="flex items-center justify-between mb-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Done
              </h3>
              <span className="text-xs font-medium text-slate-500 bg-white/60 px-2.5 py-1 rounded-full">
                0
              </span>
            </div>
            
            <div className="flex h-30 items-center justify-center rounded-xl border-2 border-dashed border-slate-300/60 bg-white/30 transition-all hover:border-slate-400/80 hover:bg-white/50">
              <p className="text-sm text-slate-400 font-medium">Completed tasks</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}