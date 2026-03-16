import { useState } from "react";
import type { ColumnProps } from "../../types/kanban";
import { Card } from "./Card";

export function Column({ column, onCardClick, onAddCard, onDeleteCard }: ColumnProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    const handleAdd = () => {
        if (newTitle.trim()) {
            onAddCard(column.id, newTitle.trim());
            setNewTitle("");
            setIsAdding(false);
        }
    };

    return (
        <div className="min-w-[320px] animate-slide-in">
            <div className="bg-white rounded-2xl shadow-sm border border-kanban-border overflow-hidden">
                {/* Nadpis sloupce */}
                <div className="px-5 py-4 border-b border-kanban-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }}></div>
                        <h2 className="font-semibold text-kanban-text">{column.title}</h2>
                        <span className="text-xs font-mono text-kanban-muted bg-gray-100 px-2 py-1 rounded-md">{column.cards.length}</span>
                    </div>
                    <button className="text-kanban-muted hover:text-kanban-text cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                        </svg>
                    </button>
                </div>

                <div className="p-4 space-y-3 min-h-12">
                    {column.cards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            onClick={() => onCardClick(card)}
                            onDelete={() => onDeleteCard(card.id, column.id)}
                        />
                    ))}
                </div>

                {isAdding ? (
                    <div className="px-4 pb-4 space-y-2">
                        <input
                            autoFocus
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setIsAdding(false); }}
                            placeholder="Název karty..."
                            className="w-full px-3 py-2 border border-kanban-border rounded-lg focus:outline-none focus:ring-2 focus:ring-kanban-accent text-sm"
                        />
                        <div className="flex gap-2">
                            <button onClick={handleAdd} className="px-3 py-1.5 bg-kanban-accent text-white text-sm rounded-lg cursor-pointer">Přidat</button>
                            <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-kanban-muted text-sm cursor-pointer">Zrušit</button>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full px-5 py-3 text-sm font-medium text-kanban-muted hover:text-kanban-accent hover:bg-gray-50 transition-colors border-t border-kanban-border cursor-pointer"
                    >
                        + Přidat kartu
                    </button>
                )}
            </div>
        </div>
    );
}
