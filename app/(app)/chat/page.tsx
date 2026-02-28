"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
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

  return (
    <div className="flex min-h-0 flex-1 flex-col px-4 pt-4 pb-4 lg:px-8 lg:pt-8 lg:pb-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </header>

      <div className="mb-3 flex items-center gap-2 md:hidden">
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

      <div className="flex min-h-0 flex-1 flex-col gap-3 md:grid md:grid-cols-[300px_minmax(0,1fr)]">
        <aside
          className={`rounded-xl border bg-card p-3 ${showArchive ? "block" : "hidden"} md:block`}
        >
          <div className="mb-3 hidden items-center justify-between md:flex">
            <p className="text-sm font-semibold text-foreground">{t.chat.archive}</p>
            <Button type="button" size="sm" onClick={handleCreateChat}>
              <Plus className="size-4" />
              {t.chat.newChat}
            </Button>
          </div>

          <div className="max-h-[45dvh] overflow-auto md:max-h-[calc(100dvh-280px)]">
            <ul className="space-y-2">
              {threads.map((thread) => (
                <li key={thread.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveThreadId(thread.id)
                      setShowArchive(false)
                    }}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      thread.id === activeThreadId
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted"
                    }`}
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

        <section
          className={`flex min-h-0 flex-1 flex-col rounded-none border-x-0 bg-background md:rounded-xl md:border md:bg-card ${showArchive ? "hidden md:flex" : "flex"}`}
        >
          <div className="border-b px-4 py-3">
            <p className="truncate text-sm font-semibold text-foreground">
              {activeThread?.title ?? t.chat.newChatTitle}
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-auto px-3 py-4 md:px-4">
            {activeThread?.messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed md:max-w-[75%] ${
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p>{message.text}</p>
                <p className="mt-1 text-[10px] opacity-70">{formatTime(message.createdAt)}</p>
              </div>
            ))}
          </div>

          <div className="border-t p-3 md:p-4">
            <div className="flex items-center gap-2">
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.chat.inputPlaceholder}
                aria-label={t.chat.inputPlaceholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <Button type="button" onClick={handleSend} disabled={!draft.trim()}>
                <Send className="size-4" />
                <span className="hidden sm:inline">{t.chat.send}</span>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
