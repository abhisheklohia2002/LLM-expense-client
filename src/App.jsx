import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Lightbulb,
  BarChart3,
  PenTool,
  Wrench,
  ArrowUp,
  X,
  Plus,
  Mic,
  ChevronDown,
  AudioLines,
  Clock3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const featureCards = [
  {
    icon: Lightbulb,
    title: "Get ideas",
    description: "Brainstorm creative solutions",
  },
  {
    icon: BarChart3,
    title: "Analyze data",
    description: "Extract insights from information",
  },
  {
    icon: PenTool,
    title: "Write content",
    description: "Create engaging text and copy",
  },
  {
    icon: Wrench,
    title: "Solve problems",
    description: "Find answers to your questions",
  },
];

const createMessage = (role, content = "", extra = {}) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  ...extra,
});

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const bottomRef = useRef(null);
  const hasMessages = messages.length > 0;

  const appendChunkToMessage = (messageId, chunk) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, content: msg.content + chunk } : msg,
      ),
    );
  };

  const updateMessageContent = (messageId, content) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, content } : msg)),
    );
  };

  const removeMessage = (messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatToolCallMessage = (parsed) => {
    if (!parsed?.type) return "";

    const { name, args } = parsed.payload || {};

    if (parsed.type === "toolCall:start") {
      if (name === "generateChart_expense") {
        return `Generating expense chart from ${formatDate(args?.from)} to ${formatDate(args?.to)} grouped by ${args?.groupBy}.`;
      }

      if (name === "add_expense" || name === "addExpense") {
        return `Adding your expense${args?.amount ? ` of ₹${args.amount}` : ""}${args?.category ? ` under ${args.category}` : ""}.`;
      }

      return `${name} started`;
    }

    if (parsed.type === "toolCall:end") {
      return `${name} completed successfully.`;
    }

    if (parsed.type === "toolCall:error") {
      return `${name} failed.`;
    }

    return "";
  };

  const streamChatResponse = async (
    conversation,
    assistantMessageId,
    toolMessageId,
  ) => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await fetchEventSource("http://localhost:8080/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation
            .filter((msg) => msg.role === "user" || msg.role === "ai")
            .map(({ role, content }) => ({
              role,
              content,
            })),
        }),
        signal: controller.signal,

        async onopen(response) {
          if (!response.ok) {
            throw new Error(`Failed with status ${response.status}`);
          }
        },

        onmessage(event) {
          if (!event.data) return;

          const parsed = JSON.parse(event.data);

          if (event.event === "custom") {
            if (parsed?.type === "toolCall:start") {
              const toolText = formatToolCallMessage(parsed);
              updateMessageContent(toolMessageId, toolText);
              return;
            }

            if (parsed?.type === "toolCall:end") {
              const toolText = formatToolCallMessage(parsed);
              updateMessageContent(toolMessageId, toolText);
              return;
            }

            if (parsed?.type === "toolCall:error") {
              const toolText = formatToolCallMessage(parsed);
              updateMessageContent(toolMessageId, toolText);
              return;
            }
          }

          if (parsed?.type === "ai" && parsed?.payload?.text) {
            appendChunkToMessage(assistantMessageId, parsed.payload.text);
          }

          if (parsed?.type === "end") {
            controller.abort();
          }
        },

        onclose() {
          setLoading(false);

          setMessages((prev) =>
            prev.filter((msg) => {
              if (msg.role === "toolCall" && !msg.content) return false;
              return true;
            }),
          );
        },

        onerror(error) {
          console.error("Streaming error:", error);
          throw error;
        },
      });
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId && !msg.content
            ? { ...msg, content: "Something went wrong." }
            : msg,
        ),
      );

      removeMessage(toolMessageId);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = createMessage("user", trimmed);
    const toolCallMessage = createMessage("toolCall", "");
    const assistantMessage = createMessage("ai", "");

    const nextConversation = [
      ...messages,
      userMessage,
      toolCallMessage,
      assistantMessage,
    ];

    setMessages(nextConversation);
    setInput("");
    setLoading(true);

    await streamChatResponse(
      nextConversation,
      assistantMessage.id,
      toolCallMessage.id,
    );
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <header className="border-b border-white/8 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 shadow-lg shadow-violet-950/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs text-zinc-500">
                abhisheklohia46458@gmail.com
              </p>
              <div className="mt-1">
                <h1 className="text-base font-semibold tracking-tight text-zinc-100 sm:text-lg">
                  AI Expense Tracker
                </h1>
                <p className="text-sm text-zinc-500">Powered by advanced AI</p>
              </div>
            </div>
          </div>

          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Online
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-82px)] max-w-7xl flex-col px-4 pb-52 pt-10 sm:px-6 sm:pb-56 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center">
          {!hasMessages && (
            <div className="w-full max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 shadow-[0_20px_60px_rgba(124,58,237,0.25)] sm:h-24 sm:w-24">
                <Sparkles className="h-10 w-10 text-white" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                How can I help you today?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                Ask me anything, and I&apos;ll do my best to assist you with
                information, analysis, and creative solutions.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                {featureCards.map(({ icon: Icon, title, description }) => (
                  <Card
                    key={title}
                    className="h-full rounded-2xl border-white/10 bg-zinc-900/70 transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/15"
                  >
                    <CardContent className="flex h-full flex-col items-start gap-4 p-6 text-left">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-800/80">
                        <Icon className="h-5 w-5 text-zinc-100" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                          {description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {hasMessages && (
            <div className="mt-10 w-full max-w-3xl space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "bg-white text-zinc-950"
                        : message.role === "toolCall"
                          ? "border border-sky-500/20 bg-sky-500/10 text-sky-300"
                          : "border border-white/10 bg-zinc-900 text-zinc-100"
                    }`}
                  >
                    {message.content ||
                      (loading && message.role === "ai"
                        ? "Typing..."
                        : loading && message.role === "toolCall"
                          ? "Generating..."
                          : "")}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-5xl">
        <div className="relative">
          <div className="rounded-[28px] border border-white/10 bg-zinc-900/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="px-6 pt-5">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask anything"
                rows={2}
                onKeyDown={handleKeyDown}
                className="max-h-40 w-full resize-none bg-transparent text-[17px] leading-7 text-white placeholder:text-[#b8b8b8] outline-none"
              />
            </div>

            <div className="flex items-center justify-between px-5 pb-4 pt-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/95 transition hover:bg-white/5"
                  aria-label="Add"
                >
                  <Plus className="h-6 w-6 stroke-[2]" />
                </button>

                <button
                  type="button"
                  onClick={loading ? handleStop : undefined}
                  className="group inline-flex h-10 items-center gap-2 rounded-full px-3 text-[16px] font-medium text-[#8ec5ff] transition hover:bg-white/5"
                >
                  <div className="relative h-5 w-5">
                    <Clock3 className="absolute inset-0 h-5 w-5 transition-opacity duration-200 group-hover:opacity-0" />
                    <X className="absolute inset-0 h-5 w-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </div>

                  <span>{loading ? "Thinking" : "Ready"}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition hover:bg-white/5"
                  aria-label="Microphone"
                >
                  <Mic className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={handleSend}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90"
                  aria-label="Send message"
                >
                  {input ? (
                    <ArrowUp className="h-5 w-5" />
                  ) : (
                    <AudioLines className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
