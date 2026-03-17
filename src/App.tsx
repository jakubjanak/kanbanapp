import { useState } from "react";
import { Header } from "./components/header/Header";
import { AppLayout } from "./components/layout/AppLayout";
import { Board } from "./components/board/Board";
import { CardModal } from "./components/modals/CardModal";
import { AddColumnModal } from "./components/modals/AddColumnModal";
import { LoginPage } from "./components/auth/LoginPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useKanban } from "./hooks/useKanban";
import type { Card } from "./types/kanban";

function KanbanApp() {
    const { user, loading } = useAuth();
    const { columns, addColumn, deleteColumn, updateColumn, addCard, updateCard, deleteCard, moveCard, clearAll } = useKanban();
    const [showAddColumnModal, setShowAddColumnModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState<{ card: Card; columnId: string } | null>(null);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-kanban-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <LoginPage />;
    }

    const handleCardClick = (card: Card) => {
        const column = columns.find(col => col.cards.some(c => c.id === card.id));
        setSelectedCard({ card, columnId: column?.id ?? "" });
    };

    return (
        <AppLayout>
            <Header onAddColumn={() => setShowAddColumnModal(true)} onClearAll={clearAll} />
            <Board
                columns={columns}
                onCardClick={handleCardClick}
                onAddCard={addCard}
                onMoveCard={moveCard}
                onDeleteCard={deleteCard}
                onDeleteColumn={deleteColumn}
                onUpdateColumn={updateColumn}
            />

            {showAddColumnModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <AddColumnModal
                        onAdd={(title, color) => { addColumn(title, color); setShowAddColumnModal(false); }}
                        onClose={() => setShowAddColumnModal(false)}
                    />
                </div>
            )}

            {selectedCard && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <CardModal
                        card={selectedCard.card}
                        onSave={updatedCard => { updateCard(updatedCard.id, updatedCard); setSelectedCard(null); }}
                        onClose={() => setSelectedCard(null)}
                        onDelete={() => { deleteCard(selectedCard.card.id, selectedCard.columnId); setSelectedCard(null); }}
                    />
                </div>
            )}
        </AppLayout>
    );
}

function App() {
    return (
        <AuthProvider>
            <KanbanApp />
        </AuthProvider>
    );
}

export default App;
