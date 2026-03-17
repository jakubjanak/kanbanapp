import { useEffect, useRef, useState } from "react";
import type { ColumnProps } from "../../types/kanban";
import { Card } from "./Card";
import { EditColumnModal } from "../modals/EditColumnModal";
import { AddCardModal } from "../modals/AddCardModal";

export function Column({ column, onCardClick, onAddCard, onMoveCard, onDeleteCard, onDeleteColumn, onUpdateColumn }: ColumnProps) {
    const [showAddCardModal, setShowAddCardModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <>
            <div className="min-w-[320px] animate-slide-in">
                <div className="bg-white rounded-2xl shadow-sm border border-kanban-border overflow-hidden">
                    {/* Nadpis sloupce */}
                    <div className="px-5 py-4 border-b border-kanban-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }}></div>
                            <h2 className="font-semibold text-kanban-text">{column.title}</h2>
                            <span className="text-xs font-mono text-kanban-muted bg-gray-100 px-2 py-1 rounded-md">{column.cards.length}</span>
                        </div>
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowMenu(prev => !prev)}
                                className="text-kanban-muted hover:text-kanban-text cursor-pointer"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                                </svg>
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 top-7 w-44 bg-white rounded-xl shadow-lg border border-kanban-border z-10 overflow-hidden">
                                    <button
                                        onClick={() => { setShowEditModal(true); setShowMenu(false); }}
                                        className="w-full px-4 py-2.5 text-sm text-left text-kanban-text hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                        </svg>
                                        Upravit sloupec
                                    </button>
                                    <button
                                        onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}
                                        className="w-full px-4 py-2.5 text-sm text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        Smazat sloupec
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className={`p-4 space-y-3 min-h-12 transition-colors ${isDragOver ? "bg-kanban-accent/5" : ""}`}
                        onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={e => {
                            e.preventDefault();
                            setIsDragOver(false);
                            const cardId = e.dataTransfer.getData("cardId");
                            const fromColumnId = e.dataTransfer.getData("fromColumnId");
                            if (cardId && fromColumnId !== column.id) {
                                onMoveCard(cardId, fromColumnId, column.id);
                            }
                        }}
                    >
                        {column.cards.map(card => (
                            <Card
                                key={card.id}
                                card={card}
                                onClick={() => onCardClick(card)}
                                onDelete={() => onDeleteCard(card.id, column.id)}
                                onDragStart={e => {
                                    e.dataTransfer.setData("cardId", card.id);
                                    e.dataTransfer.setData("fromColumnId", column.id);
                                }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => setShowAddCardModal(true)}
                        className="w-full px-5 py-3 text-sm font-medium text-kanban-muted hover:text-kanban-accent hover:bg-gray-50 transition-colors border-t border-kanban-border cursor-pointer"
                    >
                        + Přidat kartu
                    </button>
                </div>
            </div>

            {/* Delete confirmation */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-kanban-border p-6 max-w-sm mx-4">
                        <h3 className="text-lg font-semibold text-kanban-text mb-2">Smazat sloupec</h3>
                        <p className="text-sm text-kanban-muted mb-6">
                            Opravdu chcete smazat sloupec <span className="font-medium text-kanban-text">„{column.title}"</span>? Tato akce je nevratná a smaže i všechny karty v něm.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-4 py-2.5 border border-kanban-border text-kanban-text font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Zrušit
                            </button>
                            <button
                                onClick={() => { onDeleteColumn(column.id); setShowDeleteConfirm(false); }}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
                            >
                                Smazat
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add card modal */}
            {showAddCardModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <AddCardModal
                        columnTitle={column.title}
                        onAdd={data => { onAddCard(column.id, data); setShowAddCardModal(false); }}
                        onClose={() => setShowAddCardModal(false)}
                    />
                </div>
            )}

            {/* Edit column modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <EditColumnModal
                        column={column}
                        onSave={(title, color) => { onUpdateColumn(column.id, title, color); setShowEditModal(false); }}
                        onClose={() => setShowEditModal(false)}
                    />
                </div>
            )}
        </>
    );
}
