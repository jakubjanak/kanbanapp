export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-kanban-bg font-sora min-h-screen">
      {children}
    </div>
  )
}