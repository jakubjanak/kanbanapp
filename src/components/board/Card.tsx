import { useState } from "react";
import type { CardProps } from "../../types/kanban";

const priorityColor = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
};

export function Card({ card, onClick, onDelete, onDragStart }: CardProps) {
    const [isDragging, setIsDragging] = useState(false);

    const formattedDate = card.dueDate
        ? new Date(card.dueDate).toLocaleDateString("cs-CZ")
        : null;

    return (
        <div
            draggable
            onDragStart={e => { setIsDragging(true); onDragStart(e); }}
            onDragEnd={() => setIsDragging(false)}
            className={`bg-white border border-kanban-border rounded-xl p-4 hover:shadow-md hover:border-kanban-accent/50 transition-all cursor-grab active:cursor-grabbing group ${isDragging ? "opacity-40" : ""}`}
            onClick={onClick}
        >
            <div className="flex items-start justify-between">
                <h3 className="font-medium text-kanban-text mb-2 group-hover:text-kanban-accent transition-colors">
                    {card.title}
                </h3>
                <button
                    className="text-kanban-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0 ml-2 cursor-pointer"
                    onClick={e => { e.stopPropagation(); onDelete(); }}
                >
                    ×
                </button>
            </div>
            {card.description && (
                <p className="text-sm text-kanban-muted mb-3 line-clamp-2">{card.description}</p>
            )}
            <div className="flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                    {card.labels.slice(0, 2).map(label => (
                        <span key={label} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-medium">
                            {label}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    {formattedDate && <span className="text-xs text-kanban-muted font-mono">{formattedDate}</span>}
                    <div className={`w-2 h-2 rounded-full ${priorityColor[card.priority]}`}></div>
                </div>
            </div>
        </div>
    );
}
