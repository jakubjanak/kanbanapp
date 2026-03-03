export function Board({ children }: { children: React.ReactNode }) {
    return (
        <main className="p-6 overflow-x-auto">
            <div className="max-w-350 mx-auto flex gap-6 pb-6">
                {children}
            </div>
        </main>
    )
}