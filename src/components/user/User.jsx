import { Ellipsis as EllipsisIcon } from "lucide-react";
import { useState } from "react";

export default function ChatOptions({ isRename = false,handleMenuItems }) {
  const [open, setOpen] = useState(false);
  const items = [
    { key: "rename", name: "Rename" },
    {
      key: "pin_to_chat",
      name: "Pin to chat",
    },
    {
      key: "trash",
      name: "Delete",
    },
  ];
  const handleChatOptions = (key)=>{
      handleMenuItems(key)
  }
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
          {items?.map((elem) => (

            <button
            onClick={()=>handleChatOptions(elem.key)}
              key={elem?.key}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm ${elem?.key !== "trash" ? "text-white" : "text-red-400"} hover:bg-white/10`}
            >
              {elem?.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
