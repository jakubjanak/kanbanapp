import { useState } from "react";
import type { AddCardModalProps } from "../../types/kanban";

export function AddCardModal({ columnTitle, onAdd, onClose }: AddCardModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
    const [dueDate, setDueDate] = useState("");
    const [labels, setLabels] = useState<string[]>([]);
    const [labelInput, setLabelInput] = useState("");

    const handleAdd = () => {
        if (!title.trim()) return;
        onAdd({
            title: title.trim(),
            description,
            priority,
            labels,
            dueDate: dueDate ? new Date(dueDate) : null,
        });
    };

    const addLabel = () => {
        if (labelInput.trim() && !labels.includes(labelInput.trim())) {
            setLabels(prev => [...prev, labelInput.trim()]);
            setLabelInput("");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-kanban-border p-6 max-w-2xl w-full mx-4">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-kanban-text font-sora">Nová karta</h2>
                    <p className="text-sm text-kanban-muted mt-0.5">Sloupec: {columnTitle}</p>
                </div>
                <button onClick={onClose} className="text-kanban-muted hover:text-kanban-text transition-colors shrink-0 ml-4 cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-kanban-text mb-2">Název karty</label>
                    <input
                        autoFocus
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") onClose(); }}
                        placeholder="Zadejte název karty..."
                        className="w-full px-4 py-3 border border-kanban-border rounded-xl focus:outline-none focus:ring-2 focus:ring-kanban-accent focus:border-transparent text-kanban-text font-medium"
                    />
                </div>

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
                <div className="flex-1"></div>
                <button onClick={onClose} className="px-6 py-3 border border-kanban-border text-kanban-text font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    Zrušit
                </button>
                <button onClick={handleAdd} className="px-6 py-3 bg-kanban-accent text-white font-medium rounded-xl hover:bg-blue-600 transition-colors cursor-pointer">
                    Přidat kartu
                </button>
            </div>
        </div>
    );
}
