import { Gem, User, Wrench } from "lucide-react";

const MessageAvatar = ({ message }) => {
  if (message.role === "user") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-900">
        <User className="h-4 w-4" />
      </div>
    );
  }

  if (message.role === "toolCall") {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-300">
        <Wrench className="h-4 w-4" />
      </div>
    );
  }

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 text-white">
      <Gem className="h-4 w-4" />
    </div>
  );
};

export default MessageAvatar