// RigaRicetta.tsx
// Una riga della card "Ricette per margine".
// Mobile: nome + valori a destra, barra sotto a tutta larghezza.
// Da sm in su: 4 colonne -> nome | barra | valore | badge.

export interface Ricetta {
  nome: string;
  categoria: string;
  prezzoVendita: number; // prezzo al cliente, IVA inclusa
  costoPorzione: number; // costo ingredienti per porzione
}

interface RigaRicettaProps {
  ricetta: Ricetta;
  mostra: "margine" | "foodCost"; // collegalo al tuo doubleOption
  max: number; // valore più alto della lista, serve per scalare la barra
}

const IVA = 0.1;

// Calcoli al netto dell'IVA (10% ristorazione)
export const calcolaRicetta = (r: Ricetta) => {
  const prezzoNetto = r.prezzoVendita / (1 + IVA);
  const margine = prezzoNetto - r.costoPorzione;
  const foodCost = (r.costoPorzione / prezzoNetto) * 100;
  return { margine, foodCost };
};

// Semaforo: soglie da adattare al target del ristorante
const coloreBadge = (foodCost: number) => {
  if (foodCost < 28) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (foodCost <= 32) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
};

const euro = (n: number) =>
  n.toLocaleString("it-IT", { style: "currency", currency: "EUR" });

const RigaRicetta = function ({ ricetta, mostra, max }: RigaRicettaProps) {
  const { margine, foodCost } = calcolaRicetta(ricetta);
  const valore = mostra === "margine" ? margine : foodCost;
  const larghezzaBarra = Math.max(0, Math.min(100, (valore / max) * 100));

  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-2 py-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_5rem_5.5rem] sm:items-center sm:gap-4">
      {/* NOME + CATEGORIA */}
      <div className="min-w-0 sm:order-1">
        <p className="truncate text-sm font-semibold text-neutral-800 dark:text-neutral-100">
          {ricetta.nome}
        </p>
        <p className="text-xs text-neutral-500">
          {ricetta.categoria} · vendita {euro(ricetta.prezzoVendita)}
        </p>
      </div>

      {/* VALORE + BADGE: impilati su mobile, colonne separate da sm (sm:contents) */}
      <div className="flex flex-col items-end gap-1 sm:contents">
        <span className="text-sm font-semibold tabular-nums sm:order-3 sm:text-right">
          {mostra === "margine" ? euro(margine) : `${foodCost.toFixed(1)}%`}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-xs font-semibold tabular-nums whitespace-nowrap sm:order-4 sm:justify-self-end ${coloreBadge(foodCost)}`}
        >
          {foodCost.toFixed(1).replace(".", ",")}%
        </span>
      </div>

      {/* BARRA */}
      <div className="col-span-2 h-2.5 rounded bg-neutral-100 dark:bg-neutral-600 sm:order-2 sm:col-span-1">
        <div
          className="h-full rounded bg-blue-600 transition-[width] duration-300"
          style={{ width: `${larghezzaBarra}%` }}
        />
      </div>
    </li>
  );
};

export default RigaRicetta;
