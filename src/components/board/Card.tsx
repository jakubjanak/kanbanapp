export function Card() {
    return (
        <div className="p-4 space-y-3 min-h-50">
            {/* Karty */}
            <div className="bg-white border border-kanban-border rounded-xl p-4 hover:shadow-md hover:border-kanban-accent/50 transition-all cursor-pointer group">
                <h3 className="font-medium text-kanban-text mb-2 group-hover:text-kanban-accent transition-colors">
                    Nadpis karty
                </h3>
                <p className="text-sm text-kanban-muted mb-3 line-clamp-2">
                    Popis karty, který může být delší a bude zkrácen pomocí line-clamp, aby se vešel do karty.
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-medium">
                            První tag
                        </span>
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-medium">
                            Druhý tag
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-kanban-muted font-mono">Datum</span>
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}