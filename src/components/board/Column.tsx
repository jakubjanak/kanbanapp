export function Column({columnTitle, numberOfCards, children}: {columnTitle: string, numberOfCards: number, children: React.ReactNode}) {
    return (
        <div className="min-w-[320px] animate-slide-in">
            <div className="bg-white rounded-2xl shadow-sm border border-kanban-border overflow-hidden">
                {/* Nadpis sloupce */}
                <div className="px-5 py-4 border-b border-kanban-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <h2 className="font-semibold text-kanban-text">{columnTitle}</h2>
                        <span className="text-xs font-mono text-kanban-muted bg-gray-100 px-2 py-1 rounded-md">{numberOfCards}</span>
                    </div>
                    <button className="text-kanban-muted hover:text-kanban-text">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                        </svg>
                    </button>
                </div>
                
                {children}

                {/* Tlačítko pro přidání karty */}
                <button className="w-full px-5 py-3 text-sm font-medium text-kanban-muted hover:text-kanban-accent hover:bg-gray-50 transition-colors border-t border-kanban-border">
                    + Přidat kartu
                </button>
            </div>
        </div>
    )
}