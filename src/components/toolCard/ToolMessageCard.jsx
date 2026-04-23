import { Wrench, Check } from "lucide-react";

function ToolMessageCard({ message }) {
  const isCall = message.kind === "tool_call";
  const title = isCall ? "Using tool:" : "Tool result:";
  const icon = isCall ? (
    <Wrench className="h-4 w-4 text-zinc-300" />
  ) : (
    <Check className="h-4 w-4 text-emerald-400" />
  );

  const codeContent = isCall
    ? JSON.stringify(message.args ?? {}, null, 2)
    : JSON.stringify(message.result ?? null, null, 2);

  return (
    <div className="w-full max-w-[680px] rounded-2xl border border-white/10 bg-[#0b0b0f] p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            isCall ? "bg-zinc-800" : "bg-emerald-500/10"
          }`}
        >
          {icon}
        </div>

        <div className="text-sm">
          <span className="text-zinc-400">{title} </span>
          <span
            className={`font-semibold ${
              isCall ? "text-violet-400" : "text-emerald-400"
            }`}
          >
            {message.toolName}
          </span>
        </div>
      </div>

      <div
        className={`overflow-x-auto rounded-xl border px-4 py-3 text-sm ${
          isCall
            ? "border-violet-500/20 bg-violet-500/10 text-violet-100"
            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
        }`}
      >
        <pre className="whitespace-pre-wrap break-words font-mono">
          {codeContent}
        </pre>
      </div>
    </div>
  );
}

export default ToolMessageCard