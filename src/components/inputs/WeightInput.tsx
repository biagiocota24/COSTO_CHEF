import { useId } from "react";

interface WeightInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
  onUnitChange: (unit: string) => void;
  units?: string[];
  textHelper?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

const quantityPattern = /^\d*([.,]\d{0,3})?$/;

const WeightInput = ({
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  units = ["kg", "g"],
  textHelper,
  error,
  disabled,
  placeholder = "0",
}: WeightInputProps) => {
  const inputId = useId();

  const boxState = disabled
    ? "bg-neutral-100 border-neutral-200 text-neutral-400"
    : error
      ? "bg-white border-red-600 focus-within:ring-2 focus-within:ring-red-200"
      : "bg-white border-neutral-300 hover:border-neutral-500 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200";

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`text-sm font-medium ${disabled ? "text-neutral-400 dark:text-neutral-4" : "text-neutral-900 dark:text-neutral-200"}`}
      >
        {label}
      </label>

      <div
        className={`flex overflow-hidden rounded-lg border transition-colors ${boxState}`}
      >
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          onChange={(e) => {
            if (quantityPattern.test(e.target.value)) onChange(e.target.value);
          }}
          className="min-w-0 flex-1 bg-white dark:bg-neutral-800 px-3 py-2 text-right outline-none disabled:cursor-not-allowed placeholder:text-neutral-500 dark:placeholder:text-neutral-200"
        />

        <div
          className={`relative border-l ${disabled ? "border-neutral-200 dark:bg-neutral-800" : "border-neutral-300 bg-neutral-50 dark:bg-neutral-800"}`}
        >
          <select
            value={unit}
            disabled={disabled}
            aria-label="Unità di misura"
            onChange={(e) => onUnitChange(e.target.value)}
            className="h-full cursor-pointer appearance-none bg-transparent py-2 pl-3 pr-8 outline-none disabled:cursor-not-allowed"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 8l5 5 5-5" />
          </svg>
        </div>
      </div>

      {error ? (
        <p className="text-xs font-medium text-red-700">{error}</p>
      ) : (
        textHelper && <p className="text-xs text-neutral-500">{textHelper}</p>
      )}
    </div>
  );
};

export default WeightInput;
