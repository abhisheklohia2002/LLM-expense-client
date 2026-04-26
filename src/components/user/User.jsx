import { Ellipsis as EllipsisIcon } from "lucide-react";
import { useState } from "react";

export default function ChatOptions({ isRename = false }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-md p-2 text-zinc-300 hover:bg-white/10 hover:text-white"
      >
        <EllipsisIcon className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-[9999] w-40 rounded-xl border border-white/10 bg-[#222] p-2 shadow-xl">
          {isRename && (
            <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10">
            Rename
          </button>
          )}

          <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10">
            Pin to chat
          </button>

          <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-white/10">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
