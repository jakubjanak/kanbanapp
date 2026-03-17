export interface HeaderProps {
    onAddColumn: () => void;
    onClearAll: () => void;
}

export interface BoardProps {
    columns: Column[];
    onCardClick: (card: Card) => void;
    onAddCard: (columnId: string, data: Omit<Card, "id" | "createdAt">) => void;
    onMoveCard: (cardId: string, fromColumn: string, toColumn: string) => void;
    onDeleteCard: (cardId: string, columnId: string) => void;
    onDeleteColumn: (columnId: string) => void;
    onUpdateColumn: (columnId: string, title: string, color: string) => void;
}

export interface ColumnProps {
    column: Column;
    onCardClick: (card: Card) => void;
    onAddCard: (columnId: string, data: Omit<Card, "id" | "createdAt">) => void;
    onMoveCard: (cardId: string, fromColumn: string, toColumn: string) => void;
    onDeleteCard: (cardId: string, columnId: string) => void;
    onDeleteColumn: (columnId: string) => void;
    onUpdateColumn: (columnId: string, title: string, color: string) => void;
}

export interface EditColumnModalProps {
    column: Column;
    onSave: (title: string, color: string) => void;
    onClose: () => void;
}

export interface CardProps {
    card: Card;
    onClick: () => void;
    onDelete: () => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

export interface AddCardButtonProps {
    onAdd: (title: string) => void;
}

export interface AddCardModalProps {
    columnTitle: string;
    onAdd: (data: Omit<Card, "id" | "createdAt">) => void;
    onClose: () => void;
}

export interface CardModalProps {
    card: Card;
    onSave: (updatedCard: Card) => void;
    onClose: () => void;
    onDelete: () => void;
}

export interface AddColumnModalProps {
    onAdd: (title: string, color: string) => void;
    onClose: () => void;
}

export interface Card {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    labels: string[];
    dueDate: Date | null;
    createdAt: Date;
}

export interface Column {
    id: string;
    title: string;
    color: string;
    cards: Card[];
}

export interface Board {
    id: string;
    title: string;
    columns: Column[];
}

export interface UseKanbanReturn {
    columns: Column[];
    addColumn: (title: string, color: string) => void;
    deleteColumn: (columnId: string) => void;
    updateColumn: (columnId: string, title: string, color: string) => void;
    addCard: (columnId: string, data: Omit<Card, "id" | "createdAt">) => void;
    updateCard: (cardId: string, updates: Partial<Card>) => void;
    deleteCard: (cardId: string, columnId: string) => void;
    moveCard: (cardId: string, fromColumn: string, toColumn: string) => void;
    clearAll: () => void;
}

export interface EmptyStateProps {
    message?: string;
}