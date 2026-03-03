export function Header() {
    return (
        <header className="bg-white border-b border-kanban-border px-6 py-4">
            <div className="max-w-350 mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-kanban-accent rounded-full"></div>
                    <h1 className="text-xl font-semibold text-kanban-text">Product Roadmap</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-kanban-muted hover:text-kanban-text transition-colors cursor-pointer">
                        Smazat všechny karty
                    </button>
                    <button className="px-4 py-2 bg-kanban-accent text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                        +Přidat kartu
                    </button>
                </div>
            </div>
        </header>
    )
}