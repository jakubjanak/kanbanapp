export interface HeaderProps {
    onAddColumn: () => void;
}

export interface BoardProps {
    columns: Column[];
    onCardClick: (card: Card) => void;
    onAddCard: (columnId: string, title: string) => void;
    onMoveCard: (cardId: string, fromColumn: string, toColumn: string) => void;
    onDeleteCard: (cardId: string, columnId: string) => void;
}

export interface ColumnProps {
    column: Column;
    onCardClick: (card: Card) => void;
    onAddCard: (columnId: string, title: string) => void;
    onMoveCard: (cardId: string, fromColumn: string, toColumn: string) => void;
    onDeleteCard: (cardId: string, columnId: string) => void;
}

export interface CardProps {
    card: Card;
    onClick: () => void;
    onDelete: () => void;
}

export interface AddCardButtonProps {
    onAdd: (title: string) => void;
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
    addCard: (columnId: string, title: string) => void;
    updateCard: (cardId: string, updates: Partial<Card>) => void;
    deleteCard: (cardId: string, columnId: string) => void;
    moveCard: (cardId: string, fromColumn: string, toColumn: string) => void;
}

export interface EmptyStateProps {
    message?: string;
}