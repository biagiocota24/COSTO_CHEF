import { useEffect, useId, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textHelper?: string;
  error?: string;
  disabled?: boolean;
}

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Seleziona...",
  textHelper,
  error,
  disabled,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const boxState = disabled
    ? "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed"
    : error
      ? "bg-white border-red-600 text-neutral-900 cursor-pointer"
      : open
        ? "bg-white dark:bg-neutral-800 border-brand-500 ring-2 ring-brand-200 text-neutral-900 dark:text-neutral-200 00 cursor-pointer"
        : "bg-white dark:bg-neutral-800 border-neutral-300 hover:border-neutral-500 text-neutral-900 dark:text-neutral-200 cursor-pointer";

  return (
    <div className="flex flex-col gap-1">
      <span
        id={labelId}
        className={`text-sm font-medium ${disabled ? "text-neutral-400 dark:text-neutral-300" : "text-neutral-900 dark:text-neutral-200"}`}
      >
        {label}
      </span>

      <div ref={ref} className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={labelId}
          onClick={() => setOpen(!open)}
          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors ${boxState}`}
        >
          <span className={selected ? "" : "text-neutral-400"}>
            {selected?.label ?? placeholder}
          </span>
          <svg
            className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            aria-labelledby={labelId}
            className="absolute top-full z-10 mt-1 w-full rounded-lg border border-neutral-200 bg-white dark:bg-neutral-800 p-1 shadow-lg"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left outline-none hover:bg-neutral-100 dark:hover:bg-neutral-500 focus:bg-neutral-100 focus:dark:bg-neutral-900 ${
                      isSelected ? "bg-brand-50  dark:bg-brand-700" : ""
                    }`}
                  >
                    {opt.label}
                    {isSelected && (
                      <svg
                        className="size-4 text-brand-700 dark:text-brand-200"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 10l4 4 8-8" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error ? (
        <p className="text-xs font-medium text-red-700">{error}</p>
      ) : (
        textHelper && <p className="text-xs text-neutral-500">{textHelper}</p>
      )}
    </div>
  );
};

export default CustomSelect;
