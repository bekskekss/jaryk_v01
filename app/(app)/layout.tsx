import { BottomNav } from "@/components/bottom-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { QuickExitButton } from "@/components/quick-exit-button"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <DesktopSidebar />
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto pb-20 lg:pb-0">
        <QuickExitButton />
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
