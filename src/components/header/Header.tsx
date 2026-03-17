import { useState } from "react";
import type { HeaderProps } from "../../types/kanban";

export function Header({ onAddColumn, onClearAll }: HeaderProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <header className="bg-white border-b border-kanban-border px-6 py-4">
                <div className="max-w-350 mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-kanban-accent rounded-full"></div>
                        <h1 className="text-xl font-semibold text-kanban-text">Kanban App</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="px-4 py-2 text-sm font-medium text-kanban-muted hover:text-kanban-text transition-colors cursor-pointer"
                        >
                            Smazat všechny karty
                        </button>
                        <button
                            onClick={onAddColumn}
                            className="px-4 py-2 bg-kanban-accent text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                            + Přidat sloupec
                        </button>
                    </div>
                </div>
            </header>

            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-kanban-border p-6 max-w-sm mx-4">
                        <h3 className="text-lg font-semibold text-kanban-text mb-2">Smazat vše</h3>
                        <p className="text-sm text-kanban-muted mb-6">
                            Opravdu chcete smazat všechny sloupce a karty? Tato akce je nevratná.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 px-4 py-2.5 border border-kanban-border text-kanban-text font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Zrušit
                            </button>
                            <button
                                onClick={() => { onClearAll(); setShowConfirm(false); }}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
                            >
                                Smazat vše
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
