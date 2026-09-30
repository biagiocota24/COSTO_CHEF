import { useId, type InputHTMLAttributes } from "react";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label: string;
  textHelper?: string;
  variant?: "text" | "quantity" | "price";
  prefisso?: string;
  suffisso?: string;
}

const variantConfig = {
  text: { inputMode: "text", align: "text-left", pattern: null },
  quantity: { inputMode: "decimal", align: "text-right", pattern: /^\d*([.,]\d{0,2})?$/ },
  price: { inputMode: "decimal", align: "text-right", pattern: /^\d*([.,]\d{0,2})?$/ },
} as const;

const TextInput = ({
  label,
  textHelper,
  variant = "text",
  prefisso,
  suffisso,
  disabled,
  id,
  ...rest
}: InputProps) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const config = variantConfig[variant];

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={`text-sm font-medium ${disabled ? "text-neutral-400 dark:text-neutral-300" : "text-neutral-900 dark:text-neutral-200"}`}
      >
        {label}
      </label>

      <div
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors ${
          disabled
            ? "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 text-neutral-400"
            : "bg-white dark:bg-neutral-800 border-neutral-300 hover:border-neutral-500 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200"
        }`}
      >
        {prefisso && <span className="text-neutral-500">{prefisso}</span>}
        <input
          id={inputId}
          type="text"
          inputMode={config.inputMode}
          disabled={disabled}
          className={`w-full bg-transparent outline-none disabled:cursor-not-allowed ${config.align}`}
          {...rest}
        />
        {suffisso && <span className="text-neutral-500">{suffisso}</span>}
      </div>

      {textHelper && <p className="text-xs text-neutral-500">{textHelper}</p>}
    </div>
  );
};

export default TextInput;
