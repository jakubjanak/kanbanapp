import { useState } from "react";
import { Header } from "./components/header/Header";
import { AppLayout } from "./components/layout/AppLayout";
import { Board } from "./components/board/Board";
import { CardModal } from "./components/modals/CardModal";
import { AddColumnModal } from "./components/modals/AddColumnModal";
import { useKanban } from "./hooks/useKanban";
import type { Card } from "./types/kanban";

function App() {
    const { columns, addColumn, addCard, updateCard, deleteCard, moveCard } = useKanban();
    const [showAddColumnModal, setShowAddColumnModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState<{ card: Card; columnId: string } | null>(null);

    const handleCardClick = (card: Card) => {
        const column = columns.find(col => col.cards.some(c => c.id === card.id));
        setSelectedCard({ card, columnId: column?.id ?? "" });
    };

    return (
        <AppLayout>
            <Header onAddColumn={() => setShowAddColumnModal(true)} />
            <Board
                columns={columns}
                onCardClick={handleCardClick}
                onAddCard={addCard}
                onMoveCard={moveCard}
                onDeleteCard={deleteCard}
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

export default App;
