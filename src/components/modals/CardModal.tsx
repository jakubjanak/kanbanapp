import { useState } from "react";
import type { CardModalProps } from "../../types/kanban";

export function CardModal({ card, onSave, onClose, onDelete }: CardModalProps) {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [priority, setPriority] = useState(card.priority);
    const [dueDate, setDueDate] = useState(
        card.dueDate ? new Date(card.dueDate).toISOString().split("T")[0] : ""
    );
    const [labels, setLabels] = useState<string[]>(card.labels);
    const [labelInput, setLabelInput] = useState("");

    const handleSave = () => {
        onSave({ ...card, title, description, priority, dueDate: dueDate ? new Date(dueDate) : null, labels });
    };

    const addLabel = () => {
        if (labelInput.trim() && !labels.includes(labelInput.trim())) {
            setLabels(prev => [...prev, labelInput.trim()]);
            setLabelInput("");
        }
    };

    return (
        <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-kanban-border p-6 max-w-2xl mx-auto max-h-150 overflow-y-auto">
                <div className="flex items-start justify-between mb-6">
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="text-2xl font-semibold text-kanban-text border-none outline-none focus:ring-0 p-0 w-full font-sora"
                    />
                    <button onClick={onClose} className="text-kanban-muted hover:text-kanban-text transition-colors shrink-0 ml-4 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-kanban-text mb-2">Podrobnosti</label>
                        <textarea
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Přidejte podrobnosti..."
                            className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent focus:border-transparent resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-kanban-text mb-2">Tagy</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {labels.map(label => (
                                <span key={label} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium flex items-center gap-2">
                                    {label}
                                    <button onClick={() => setLabels(prev => prev.filter(l => l !== label))} className="hover:text-purple-900 cursor-pointer">×</button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={labelInput}
                            onChange={e => setLabelInput(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addLabel(); } }}
                            placeholder="Přidejte své tagy..."
                            className="w-full px-4 py-2 border border-kanban-border rounded-lg focus:outline-none focus:ring-2 focus:ring-kanban-accent text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-kanban-text mb-2">Priorita</label>
                            <select
                                value={priority}
                                onChange={e => setPriority(e.target.value as "low" | "medium" | "high")}
                                className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent"
                            >
                                <option value="low">Nízká</option>
                                <option value="medium">Střední</option>
                                <option value="high">Vysoká</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-kanban-text mb-2">Do kdy</label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={e => setDueDate(e.target.value)}
                                className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-kanban-border">
                    <button onClick={onDelete} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium cursor-pointer">
                        Smazat kartu
                    </button>
                    <div className="flex-1"></div>
                    <button onClick={onClose} className="px-6 py-3 border border-kanban-border text-kanban-text font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        Zrušit
                    </button>
                    <button onClick={handleSave} className="px-6 py-3 bg-kanban-accent text-white font-medium rounded-xl hover:bg-blue-600 transition-colors cursor-pointer">
                        Uložit změny
                    </button>
                </div>
            </div>
        </div>
    );
}
