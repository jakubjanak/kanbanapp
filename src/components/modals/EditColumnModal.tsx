import { useState } from "react";
import type { EditColumnModalProps } from "../../types/kanban";

const COLORS = [
    { name: "gray", value: "#9ca3af" },
    { name: "blue", value: "#3b82f6" },
    { name: "purple", value: "#a855f7" },
    { name: "green", value: "#22c55e" },
    { name: "orange", value: "#f97316" },
];

export function EditColumnModal({ column, onSave, onClose }: EditColumnModalProps) {
    const [title, setTitle] = useState(column.title);
    const [color, setColor] = useState(column.color);

    const handleSave = () => {
        if (title.trim()) {
            onSave(title.trim(), color);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-kanban-border p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold text-kanban-text font-sora">
                    Upravit sloupec
                </h2>
                <button onClick={onClose} className="text-kanban-muted hover:text-kanban-text transition-colors cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-kanban-text mb-2">
                        Název sloupce
                    </label>
                    <input
                        autoFocus
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") onClose(); }}
                        className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-kanban-text mb-2">
                        Barva
                    </label>
                    <div className="flex gap-2">
                        {COLORS.map(c => (
                            <button
                                key={c.name}
                                onClick={() => setColor(c.value)}
                                className={`w-10 h-10 rounded-lg border-2 transition-all cursor-pointer ${color === c.value ? "border-kanban-accent" : "border-transparent hover:border-kanban-accent"}`}
                                style={{ backgroundColor: c.value }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button onClick={onClose} className="flex-1 px-4 py-3 border border-kanban-border text-kanban-text font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    Zrušit
                </button>
                <button onClick={handleSave} className="flex-1 px-4 py-3 bg-kanban-accent text-white font-medium rounded-xl hover:bg-blue-600 transition-colors cursor-pointer">
                    Uložit změny
                </button>
            </div>
        </div>
    );
}
