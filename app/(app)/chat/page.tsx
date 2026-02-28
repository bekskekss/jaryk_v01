"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Plus,
  Send,
  Trash2,
  Archive,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/hooks/use-language"
import { useDiscreet } from "@/components/discreet-provider"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
  createdAt: number
}

type ChatThread = {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  messages: ChatMessage[]
}

const CHAT_STORAGE_KEY = "jaryk-chat-threads"

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function createWelcomeMessage(text: string): ChatMessage {
  return {
    id: `msg-${Date.now()}`,
    role: "assistant",
    text,
    createdAt: Date.now(),
  }
}

function createNewThread(defaultTitle: string, welcomeText: string): ChatThread {
  const now = Date.now()
  return {
    id: `thread-${now}-${Math.random().toString(36).slice(2, 7)}`,
    title: defaultTitle,
    createdAt: now,
    updatedAt: now,
    messages: [createWelcomeMessage(welcomeText)],
  }
}

export default function ChatPage() {
  const { t } = useLanguage()
  const { isDiscreet } = useDiscreet()

  const title = isDiscreet ? t.chat.titleDiscreet : t.chat.title
  const subtitle = isDiscreet ? t.chat.subtitleDiscreet : t.chat.subtitle

  const [threads, setThreads] = useState<ChatThread[]>([])
  const [activeThreadId, setActiveThreadId] = useState<string>("")
  const [draft, setDraft] = useState("")
  const [showArchive, setShowArchive] = useState(false)
  const [dateLabel, setDateLabel] = useState("")
  const messagesViewportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAT_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as ChatThread[]
        if (Array.isArray(parsed) && parsed.length > 0) {
          setThreads(parsed)
          setActiveThreadId(parsed[0].id)
          return
        }
      }
    } catch {
      // localStorage unavailable or corrupted
    }

    const initial = createNewThread(t.chat.newChatTitle, t.chat.welcomeMessage)
    setThreads([initial])
    setActiveThreadId(initial.id)
  }, [t.chat.newChatTitle, t.chat.welcomeMessage])

  const persistThreads = useCallback((nextThreads: ChatThread[]) => {
    setThreads(nextThreads)
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(nextThreads))
    } catch {
      // localStorage unavailable
    }
  }, [])

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId),
    [threads, activeThreadId]
  )

  const handleCreateChat = useCallback(() => {
    const newThread = createNewThread(t.chat.newChatTitle, t.chat.welcomeMessage)
    const nextThreads = [newThread, ...threads]
    persistThreads(nextThreads)
    setActiveThreadId(newThread.id)
    setShowArchive(false)
  }, [persistThreads, t.chat.newChatTitle, t.chat.welcomeMessage, threads])

  const handleDeleteChat = useCallback(
    (threadId: string) => {
      const nextThreads = threads.filter((thread) => thread.id !== threadId)

      if (nextThreads.length === 0) {
        const fallback = createNewThread(t.chat.newChatTitle, t.chat.welcomeMessage)
        persistThreads([fallback])
        setActiveThreadId(fallback.id)
        return
      }

      persistThreads(nextThreads)
      if (activeThreadId === threadId) {
        setActiveThreadId(nextThreads[0].id)
      }
    },
    [activeThreadId, persistThreads, t.chat.newChatTitle, t.chat.welcomeMessage, threads]
  )

  const handleSend = useCallback(() => {
    const text = draft.trim()
    if (!text || !activeThread) return

    const now = Date.now()
    const userMessage: ChatMessage = {
      id: `msg-${now}`,
      role: "user",
      text,
      createdAt: now,
    }

    const botMessage: ChatMessage = {
      id: `msg-${now + 1}`,
      role: "assistant",
      text: t.chat.botPlaceholder,
      createdAt: now + 1,
    }

    const nextThreads = threads
      .map((thread) => {
        if (thread.id !== activeThread.id) return thread
        const nextTitle =
          thread.title === t.chat.newChatTitle ? text.slice(0, 40) : thread.title

        return {
          ...thread,
          title: nextTitle,
          updatedAt: now,
          messages: [...thread.messages, userMessage, botMessage],
        }
      })
      .sort((a, b) => b.updatedAt - a.updatedAt)

    persistThreads(nextThreads)
    setDraft("")
  }, [activeThread, draft, persistThreads, t.chat.botPlaceholder, t.chat.newChatTitle, threads])

  useEffect(() => {
    const viewport = messagesViewportRef.current
    if (!viewport || showArchive) return
    viewport.scrollTop = viewport.scrollHeight
  }, [activeThreadId, activeThread?.messages.length, showArchive])

  useEffect(() => {
    setDateLabel(new Date().toLocaleDateString())
  }, [])

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background md:px-8 md:pt-6 md:pb-6">
      <header className="border-b bg-background/95 px-4 py-3 backdrop-blur md:rounded-t-2xl md:border md:px-5">
        <div className="flex items-start gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-foreground md:text-xl">{title}</h1>
            <p className="mt-0.5 truncate text-xs text-muted-foreground md:text-sm">{subtitle}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 md:hidden">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowArchive((prev) => !prev)}
          >
            {showArchive ? <ArrowLeft className="size-4" /> : <Archive className="size-4" />}
            {showArchive ? t.common.back : t.chat.archive}
          </Button>
          <Button type="button" size="sm" onClick={handleCreateChat}>
            <Plus className="size-4" />
            {t.chat.newChat}
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden md:rounded-b-2xl md:border md:border-t-0 md:bg-card">
        <aside
          className={cn(
            "min-h-0 w-full border-r bg-card p-3 md:block md:w-[300px]",
            showArchive ? "block" : "hidden md:block"
          )}
        >
          <div className="mb-3 hidden items-center justify-between md:flex">
            <p className="text-sm font-semibold text-foreground">{t.chat.archive}</p>
            <Button type="button" size="sm" onClick={handleCreateChat}>
              <Plus className="size-4" />
              {t.chat.newChat}
            </Button>
          </div>

          <div className="h-full overflow-auto">
            <ul className="space-y-2 pb-2">
              {threads.map((thread) => (
                <li key={thread.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveThreadId(thread.id)
                      setShowArchive(false)
                    }}
                    className={cn(
                      "w-full rounded-2xl border p-3 text-left transition-colors",
                      thread.id === activeThreadId
                        ? "border-primary/40 bg-primary/10"
                        : "border-border/60 hover:bg-muted"
                    )}
                  >
                    <p className="truncate text-sm font-medium text-foreground">{thread.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {thread.messages.length} {t.chat.messagesCount}
                    </p>
                  </button>
                  <div className="mt-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => handleDeleteChat(thread.id)}
                    >
                      <Trash2 className="size-3.5" />
                      {t.chat.deleteChat}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className={cn("flex min-h-0 flex-1 flex-col bg-background", showArchive ? "hidden md:flex" : "flex")}>
          <div className="border-b bg-background/95 px-4 py-3 backdrop-blur md:px-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                AI
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {activeThread?.title ?? t.chat.newChatTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeThread?.messages.length ?? 0} {t.chat.messagesCount}
                </p>
              </div>
            </div>
          </div>

          <div
            ref={messagesViewportRef}
            className="flex-1 overflow-y-auto bg-gradient-to-b from-background via-background to-muted/25 px-3 py-4 md:px-5"
          >
            <div className="mx-auto mb-4 w-fit rounded-full border border-border/70 bg-card px-3 py-1 text-[11px] text-muted-foreground">
              {dateLabel || "\u00A0"}
            </div>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-2.5">
              {activeThread?.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[84%] rounded-[22px] px-3.5 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "ml-auto rounded-br-md bg-primary text-primary-foreground"
                      : "mr-auto rounded-bl-md bg-card text-foreground shadow-sm ring-1 ring-border/70"
                  )}
                >
                  <p>{message.text}</p>
                  <p className={cn("mt-1 text-[10px] opacity-70", message.role === "user" ? "text-right" : "text-left")}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t bg-background/95 px-3 py-3 backdrop-blur md:px-5 md:py-4">
            <div className="mx-auto flex w-full max-w-3xl items-center gap-2 rounded-full border border-border/70 bg-card px-2 py-1.5 shadow-sm">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-muted-foreground hover:text-foreground"
                onClick={handleCreateChat}
                aria-label={t.chat.newChat}
              >
                <Plus className="size-4" />
              </Button>
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.chat.inputPlaceholder}
                aria-label={t.chat.inputPlaceholder}
                className="h-9 border-0 bg-transparent px-1 shadow-none focus-visible:border-transparent focus-visible:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <Button
                type="button"
                size="icon"
                className="size-8 rounded-full"
                onClick={handleSend}
                disabled={!draft.trim()}
                aria-label={t.chat.send}
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
