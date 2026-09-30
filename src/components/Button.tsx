import { useState } from "react";

const ButtonProva = function () {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const toogle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toogle}
      className="w-full rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
                 bg-brand-700 text-white hover:bg-brand-800
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600
                 dark:bg-brand-400 dark:text-neutral-900 dark:hover:bg-brand-300
                 dark:focus-visible:ring-brand-300"
    >
      {isDark ? "☀️ Tema chiaro" : "🌙 Tema scuro"}
    </button>
  );
};

export default ButtonProva;
