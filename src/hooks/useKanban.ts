import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import type { Card, Column, UseKanbanReturn } from "../types/kanban";
import useLocalStorage from "./useLocalStorage";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

export function useKanban(): UseKanbanReturn {
    const { user } = useAuth();

    // Guest: localStorage
    const [localColumns, setLocalColumns] = useLocalStorage<Column[]>("kanban-columns-guest", []);

    // Logged-in: Firestore
    const [cloudColumns, setCloudColumns] = useState<Column[]>([]);

    useEffect(() => {
        if (!user) return;
        const ref = doc(db, "users", user.uid, "kanban", "board");
        const unsubscribe = onSnapshot(ref, (snap) => {
            if (!snap.exists()) { setCloudColumns([]); return; }
            // Firestore stores Dates as Timestamps — convert them back
            const columns = (snap.data().columns ?? []).map((col: any) => ({
                ...col,
                cards: col.cards.map((card: any) => ({
                    ...card,
                    dueDate: card.dueDate?.toDate?.() ?? null,
                    createdAt: card.createdAt?.toDate?.() ?? new Date(),
                })),
            }));
            setCloudColumns(columns);
        });
        return unsubscribe;
    }, [user?.uid]);

    const columns = user ? cloudColumns : localColumns;

    // Ref so action callbacks always see the latest columns without stale closures
    const columnsRef = useRef<Column[]>(columns);
    columnsRef.current = columns;

    const persist = (newColumns: Column[]) => {
        if (user) {
            setCloudColumns(newColumns); // optimistic update
            const ref = doc(db, "users", user.uid, "kanban", "board");
            setDoc(ref, { columns: newColumns }).catch(console.error);
        } else {
            setLocalColumns(newColumns);
        }
    };

    const addColumn = (title: string, color: string) => {
        const newColumn: Column = { id: crypto.randomUUID(), title, color, cards: [] };
        persist([...columnsRef.current, newColumn]);
    };

    const deleteColumn = (columnId: string) => {
        persist(columnsRef.current.filter(col => col.id !== columnId));
    };

    const updateColumn = (columnId: string, title: string, color: string) => {
        persist(columnsRef.current.map(col =>
            col.id === columnId ? { ...col, title, color } : col
        ));
    };

    const addCard = (columnId: string, data: Omit<Card, "id" | "createdAt">) => {
        const newCard: Card = { ...data, id: crypto.randomUUID(), createdAt: new Date() };
        persist(columnsRef.current.map(col =>
            col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
        ));
    };

    const updateCard = (cardId: string, updates: Partial<Card>) => {
        persist(columnsRef.current.map(col => ({
            ...col,
            cards: col.cards.map(card => card.id === cardId ? { ...card, ...updates } : card),
        })));
    };

    const deleteCard = (cardId: string, columnId: string) => {
        persist(columnsRef.current.map(col =>
            col.id === columnId ? { ...col, cards: col.cards.filter(c => c.id !== cardId) } : col
        ));
    };

    const moveCard = (cardId: string, fromColumn: string, toColumn: string) => {
        const card = columnsRef.current
            .find(col => col.id === fromColumn)?.cards
            .find(c => c.id === cardId);
        if (!card) return;
        persist(columnsRef.current.map(col => {
            if (col.id === fromColumn) return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
            if (col.id === toColumn) return { ...col, cards: [...col.cards, card] };
            return col;
        }));
    };

    const clearAll = () => persist([]);

    return { columns, addColumn, deleteColumn, updateColumn, addCard, updateCard, deleteCard, moveCard, clearAll };
}
