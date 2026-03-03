export function CardModal() {
    return (
        <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-kanban-border p-6 max-w-2xl mx-auto max-h-150 overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                    <input type="text" value="Název karty" className="text-2xl font-semibold text-kanban-text border-none outline-none focus:ring-0 p-0 w-full font-sora" />
                    <button className="text-kanban-muted hover:text-kanban-text transition-colors shrink-0 ml-4 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-kanban-text mb-2">
                            Podrobnosti
                        </label>
                        <textarea name="description" id="description" rows={4} placeholder="Přidejte podrobnosti..." className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent focus:border-transparent resize-none" ></textarea>
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-kanban-text mb-2">
                            Tagy
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium flex items-center gap-2">
                                Již vytvořené tagy
                                <button className="hover:text-purple-900 cursor-pointer">x</button>
                            </span>
                        </div>
                        <input type="text" placeholder="Přidejte své tagy..." name="tags" id="tags" className="w-full px-4 py-2 border border-kanban-border rounded-lg focus:outline-none focus:ring-2 focus:ring-kanban-accent text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-kanban-text mb-2">
                                Priorita
                            </label>
                            <select name="priority" id="priority" className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent">
                                <option value="none">Žádná</option>
                                <option value="low">Nízká</option>
                                <option value="medium">Střední</option>
                                <option value="high">Vysoká</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-kanban-text mb-2">
                                Do kdy
                            </label>
                            {/* dodelat new Date, aby se zde zobrazovalo vzdy dnesni datum */}
                            <input type="date" value="2026-03-20" className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-kanban-border">
                    <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium cursor-pointer">
                        Smazat kartu
                    </button>
                    <div className="flex-1"></div>
                    <button className="px-6 py-3 border border-kanban-border text-kanban-text font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        Zrušit
                    </button>
                    <button className="px-6 py-3 bg-kanban-accent text-white font-medium rounded-xl hover:bg-blue-600 transition-colors cursor-pointer">
                        Uložit změny
                    </button>
                </div>
            </div>
        </div>
    )

}