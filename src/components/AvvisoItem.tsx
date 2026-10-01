import {
  IoCloseCircleOutline,
  IoWarningOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

export interface Avviso {
  id: string;
  tipo: "errore" | "attenzione" | "info";
  titolo: string;
  descrizione: string;
  orario: string;
  azione?: string;
}

interface AvvisoItemProps {
  avviso: Avviso;
  onAzione?: (avviso: Avviso) => void;
}

// Icona + colori per ogni tipo, scritti per intero (Tailwind deve vederli)
const stili = {
  errore: {
    icona: IoCloseCircleOutline,
    cerchio: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
  },
  attenzione: {
    icona: IoWarningOutline,
    cerchio: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  info: {
    icona: IoInformationCircleOutline,
    cerchio: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
};

const AvvisoItem = function ({ avviso, onAzione }: AvvisoItemProps) {
  const { icona: Icona, cerchio } = stili[avviso.tipo];

  return (
    <li className="flex gap-3 py-3">
      {/* ICONA */}
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xl ${cerchio}`}
      >
        <Icona />
      </div>

      {/* TESTO */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
            {avviso.titolo}
          </p>
          <span className="shrink-0 text-xs text-neutral-500 tabular-nums">
            {avviso.orario}
          </span>
        </div>

        <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
          {avviso.descrizione}
        </p>

        {avviso.azione && (
          <button
            type="button"
            onClick={() => onAzione?.(avviso)}
            className="mt-1 cursor-pointer text-xs font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 rounded-sm"
          >
            {avviso.azione}
          </button>
        )}
      </div>
    </li>
  );
};

export default AvvisoItem;
