interface BadgeProps {
  variant: "red" | "green" | "yellow" | "gray" | "allergene";
  size?: "small" | "normal";
}

const variants = {
  red: "bg-danger-100 border border-danger-400",
  green: "bg-success-100 border border-success-400",
  yellow: "bg-yellow-100 border border-yellow-400",
  gray: "bg-neutral-100 border border-neutral-400",
  allergene: "bg-neutral-100 border border-neutral-400",
};

const PillowBadge = function (props: BadgeProps) {
  return (
    <span
      className={`px-2 py-1 font ${props.variant === "allergene" ? "rounded" : "rounded-full"} ${variants[props.variant]} ${props.size === "small" ? "text-xs" : ""}`}
    >
      Badge • 21%
    </span>
  );
};

export default PillowBadge;
