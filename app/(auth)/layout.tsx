import { QuickExitButton } from "@/components/quick-exit-button"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <QuickExitButton />
      {children}
    </div>
  )
}
