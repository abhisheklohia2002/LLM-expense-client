import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Image,
  Upload,
  Clock3,
  ClockFading,
  X,
} from "lucide-react";

export default function AddDropdown({
  isThinking = false,
  loading = false,
  onPdfSelect,
}) {
  const [open, setOpen] = useState(false);
  const [selectedThinkingMode, setSelectedThinkingMode] = useState(null);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePdfUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      alert("Only PDF files are allowed.");
      event.target.value = "";
      return;
    }

    console.log("Selected PDF:", file);

    if (onPdfSelect) {
      onPdfSelect(file);
    }

    event.target.value = "";
  };

  const normalItems = [
    {
      label: "Add image",
      icon: Image,
      onClick: () => {
        console.log("Add image");
      },
    },
    {
      label: "Upload document",
      icon: Upload,
      onClick: handlePdfUploadClick,
    },
  ];

  const thinkingItems = [
    {
      label: "Instant",
      value: "instant",
      icon: ClockFading,
      onClick: () => {
        console.log("Instant selected");
      },
    },
    {
      label: "Thinking",
      value: "thinking",
      icon: Clock3,
      onClick: () => {
        console.log("Thinking selected");
      },
    },
  ];

  const items = isThinking ? thinkingItems : normalItems;

  const selectedItem = thinkingItems.find(
    (item) => item.value === selectedThinkingMode
  );

  const handleItemClick = (item) => {
    setOpen(false);

    if (isThinking) {
      setSelectedThinkingMode(item.value);
    }

    item.onClick();
  };

  const handleResetSelection = (e) => {
    e.stopPropagation();
    setSelectedThinkingMode(null);
  };

  const renderTriggerContent = () => {
    if (!isThinking) {
      return <Plus className="h-6 w-6 stroke-[2]" />;
    }

    if (selectedItem) {
      const SelectedIcon = selectedItem.icon;
      return (
        <>
          <SelectedIcon className="h-4 w-4 stroke-[2]" />
          <span className="text-sm">{selectedItem.label}</span>
          <button
            type="button"
            onClick={handleResetSelection}
            className="ml-1 rounded-full p-1 hover:bg-white/10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </>
      );
    }

    return (
      <>
        <Clock3
          className={`h-4 w-4 stroke-[2] ${loading ? "animate-pulse" : ""}`}
        />
        <span className="text-sm">Thinking</span>
      </>
    );
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-center gap-2 rounded-full text-white/95 transition hover:bg-white/5 ${
          isThinking ? "h-10 px-3" : "h-10 w-10"
        }`}
        aria-label={isThinking ? "Thinking options" : "Add"}
      >
        {renderTriggerContent()}
      </button>

      {open && (
        <div className="absolute bottom-12 left-0 z-50 w-56 overflow-hidden rounded-xl border border-white/10 bg-gray-800 shadow-2xl">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isSelected =
              isThinking && selectedThinkingMode === item.value;

            return (
              <button
                key={index}
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-white/5 ${
                  isSelected ? "bg-white/10" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {isThinking && selectedThinkingMode && (
            <button
              type="button"
              className="flex w-full items-center gap-3 border-t border-white/10 px-4 py-3 text-left text-sm text-red-300 transition hover:bg-white/5"
              onClick={() => {
                setSelectedThinkingMode(null);
                setOpen(false);
              }}
            >
              <X className="h-4 w-4" />
              <span>Cancel selection</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}