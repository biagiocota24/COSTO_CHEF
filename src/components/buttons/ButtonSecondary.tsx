import { useState } from "react";

interface BtnProps {
  innerText: string;
  size: "sm" | "md" | "mobile" | "HACCP" | "responsive";
  disabled?: boolean;
  loading?: string;
  focus?: boolean;
  onClick?: () => void;
}
const ButtonSecondary = function (props: BtnProps) {
  const sizeClasses: Record<BtnProps["size"], string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    mobile: "w-full py-2.5 text-base",
    HACCP: "w-full py-3 text-xl",
    responsive: "px-3 py-2 text-sm md:px-5 md:py-2 md:text-base",
  };

  const btnStandard = `bg-secondary-50 text-secondary-600 rounded-lg border cursor-pointer hover:bg-secondary-200 hover:text-secondary-700 transition-colors duration-100 font-semibold`;
  const disabledStyle =
    "bg-neutral-200 text-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold";
  const focus = "ring-2 ring-brand-700 ring-offset-2";
  const [marcato, setMarcato] = useState(false);
  return (
    <button
      type="button"
      disabled={props.disabled || Boolean(props.loading)}
      className={`${!props.disabled ? btnStandard : ""} ${sizeClasses[props.size]} ${marcato ? focus : ""} ${props.disabled ? disabledStyle : ""} `}
      onClick={() => {
        if (props.focus) {
          setMarcato(!marcato);
        }

        props.onClick?.();
      }}
    >
      {props.loading ? (
        <>
          <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
          {props.loading}
        </>
      ) : (
        props.innerText
      )}
    </button>
  );
};

export default ButtonSecondary;
