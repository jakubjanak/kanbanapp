export function AddColumnModal() {
    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-kanban-border p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold text-kanban-text font-sora">
                    Přidejte nový sloupec
                </h2>
                <button className="text-kanban-muted hover:text-kanban-text transition-colors cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="columnName" className="block text-sm font-medium text-kanban-text mb-2">
                        Název sloupce
                    </label>
                    <input type="text" placeholder="např. V revizi" className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent focus:border-transparent transition-all" />
                </div>

                <div>
                    <label htmlFor="color" className="block text-sm font-medium text-kanban-text mb-2">
                        Barva (volitelná)
                    </label>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-lg bg-gray-400 border-2 border-transparent hover:border-kanban-accent transition-all cursor-pointer"></button>
                        <button className="w-10 h-10 rounded-lg bg-blue-500 border-2 border-kanban-accent cursor-pointer"></button>
                        <button className="w-10 h-10 rounded-lg bg-purple-500 border-2 border-transparent hover:border-kanban-accent transition-all cursor-pointer"></button>
                        <button className="w-10 h-10 rounded-lg bg-green-500 border-2 border-transparent hover:border-kanban-accent transition-all cursor-pointer"></button>
                        <button className="w-10 h-10 rounded-lg bg-orange-500 border-2 border-transparent hover:border-kanban-accent transition-all cursor-pointer"></button>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button className="flex-1 px-4 py-3 border border-kanban-border text-kanban-text font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    Zrušit
                </button>
                <button className="flex-1 px-4 py-3 bg-kanban-accent text-white font-medium rounded-xl hover:bg-blue-600 transition-colors cursor-pointer">
                    Přidat sloupec
                </button>
            </div>
        </div>
    )
}