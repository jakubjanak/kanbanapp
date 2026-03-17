import type { Card, Column, UseKanbanReturn } from "../types/kanban";
import useLocalStorage from "./useLocalStorage";

export function useKanban(): UseKanbanReturn {
    const [columns, setColumns] = useLocalStorage<Column[]>("kanban-columns", []);

    const addColumn = (title: string, color: string) => {
        const newColumn: Column = { id: crypto.randomUUID(), title, color, cards: [] };
        setColumns(prev => [...prev, newColumn]);
    };

    const deleteColumn = (columnId: string) => {
        setColumns(prev => prev.filter(col => col.id !== columnId));
    };

    const updateColumn = (columnId: string, title: string, color: string) => {
        setColumns(prev => prev.map(col =>
            col.id === columnId ? { ...col, title, color } : col
        ));
    };

    const addCard = (columnId: string, data: Omit<Card, "id" | "createdAt">) => {
        const newCard: Card = {
            ...data,
            id: crypto.randomUUID(),
            createdAt: new Date(),
        };
        setColumns(prev => prev.map(col =>
            col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
        ));
    };

    const updateCard = (cardId: string, updates: Partial<Card>) => {
        setColumns(prev => prev.map(col => ({
            ...col,
            cards: col.cards.map(card => card.id === cardId ? { ...card, ...updates } : card),
        })));
    };

    const deleteCard = (cardId: string, columnId: string) => {
        setColumns(prev => prev.map(col =>
            col.id === columnId ? { ...col, cards: col.cards.filter(card => card.id !== cardId) } : col
        ));
    };

    const moveCard = (cardId: string, fromColumn: string, toColumn: string) => {
        setColumns(prev => {
            const card = prev.find(col => col.id === fromColumn)?.cards.find(c => c.id === cardId);
            if (!card) return prev;
            return prev.map(col => {
                if (col.id === fromColumn) return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
                if (col.id === toColumn) return { ...col, cards: [...col.cards, card] };
                return col;
            });
        });
    };

    const clearAll = () => setColumns([]);

    return { columns, addColumn, deleteColumn, updateColumn, addCard, updateCard, deleteCard, moveCard, clearAll };
}
