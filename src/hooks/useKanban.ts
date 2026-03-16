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

    const addCard = (columnId: string, title: string) => {
        const newCard: Card = {
            id: crypto.randomUUID(),
            title,
            description: "",
            priority: "medium",
            labels: [],
            dueDate: null,
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

    return { columns, addColumn, deleteColumn, addCard, updateCard, deleteCard, moveCard };
}
