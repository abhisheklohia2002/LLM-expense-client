import { useEffect, useRef, useState } from "react";
import { Plus, Image, FileText, Upload } from "lucide-react";

export default function AddDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-white/95 transition hover:bg-white/5"
        aria-label="Add"
      >
        <Plus className="h-6 w-6 stroke-[2]" />
      </button>

      {open && (
        <div className="absolute left-0 bottom-12 z-50 w-56 overflow-hidden rounded-xl border border-white/10 bg-gray-800 shadow-2xl">
          {/* <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-white/5"
            onClick={() => {
              setOpen(false);
              console.log("Add file");
            }}
          >
            <FileText className="h-4 w-4" />
            <span>Add file</span>
          </button> */}

          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-white/5"
            onClick={() => {
              setOpen(false);
              console.log("Add image");
            }}
          >
            <Image className="h-4 w-4" />
            <span>Add image</span>
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white transition hover:bg-white/5"
            onClick={() => {
              setOpen(false);
              console.log("Upload document");
            }}
          >
            <Upload className="h-4 w-4" />
            <span>Upload document</span>
          </button>
        </div>
      )}
    </div>
  );
}