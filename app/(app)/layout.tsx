import { BottomNav } from "@/components/bottom-nav"
import { DesktopSidebar } from "@/components/desktop-sidebar"
import { QuickExitButton } from "@/components/quick-exit-button"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh bg-background">
      <DesktopSidebar />
      <main className="flex flex-1 flex-col pb-20 lg:pb-0">
        <QuickExitButton />
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
