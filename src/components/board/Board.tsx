import type { BoardProps } from "../../types/kanban";
import { Column } from "./Column";

export function Board({ columns, onCardClick, onAddCard, onMoveCard, onDeleteCard }: BoardProps) {
    return (
        <main className="p-6 overflow-x-auto">
            <div className="max-w-350 mx-auto flex gap-6 pb-6">
                {columns.map(column => (
                    <Column
                        key={column.id}
                        column={column}
                        onCardClick={onCardClick}
                        onAddCard={onAddCard}
                        onMoveCard={onMoveCard}
                        onDeleteCard={onDeleteCard}
                    />
                ))}
            </div>
        </main>
    );
}
