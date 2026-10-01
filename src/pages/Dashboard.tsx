import { useState } from "react";
import ButtonOrange from "../components/buttons/ButtonOrange";
import ButtonSecondary from "../components/buttons/ButtonSecondary";
import RigaRicetta, { calcolaRicetta } from "../components/RigaRicetta";
import { NavLink } from "react-router-dom";
import AvvisoItem from "../components/AvvisoItem";

const giorniSettimana = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

const mesi = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const datiGenerali = [
  {
    icon: "&",
    name: "Food cost medio",
    value: 27.6,
    previousValue: 26,
  },
  {
    icon: "$",
    name: "Ingredienti sottoscorta",
    value: 5,
    giaEsauriti: 3,
  },
  {
    icon: "&",
    name: "Lotti in scadenza",
    value: 6,
    primaScadenza: "panna 35%",
  },
  {
    icon: "&",
    name: "Temperature da registrare",
    temperatureDaRegistrare: 10,
    temperatureGiaRegistrate: 6,
  },
];
const ricette: Ricetta[] = [
  {
    nome: "Tagliata di manzo, rucola e grana",
    categoria: "Secondi",
    prezzoVendita: 22,
    costoPorzione: 6.9,
  },
  {
    nome: "Lasagna alla bolognese",
    categoria: "Primi",
    prezzoVendita: 14,
    costoPorzione: 3.2,
  },
  {
    nome: "Lasagna alla bolognese",
    categoria: "Primi",
    prezzoVendita: 14,
    costoPorzione: 3.2,
  },
  {
    nome: "Lasagna alla bolognese",
    categoria: "Primi",
    prezzoVendita: 14,
    costoPorzione: 3.2,
  },
];

const avvisi: Avviso[] = [
  {
    id: "1",
    tipo: "errore",
    titolo: "Cella frigorifera carni a 6,8 °C",
    descrizione: "Limite 0–4 °C · registrata alle 07:42 da Luca",
    orario: "07:42",
    azione: "Registra azione correttiva",
  },
  {
    id: "2",
    tipo: "attenzione",
    titolo: "Panna fresca scade domani",
    descrizione: "Lotto L0921-07 · 1,0 l in giacenza",
    orario: "06:00",
    azione: "Vedi lotto",
  },
  {
    id: "3",
    tipo: "info",
    titolo: "Inventario fisico mensile",
    descrizione: "Programmato per mercoledì alle 15:00",
    orario: "lun",
  },
];

const styleCards =
  "border border-neutral-200 dark:border-none bg-white dark:bg-neutral-700 rounded p-3  shadow";

const Dashboard = function () {
  const ora = new Date();

  const saluto = () => {
    if (ora.getHours() < 12) return "Buongiorno";
    if (ora.getHours() < 18) return "Buon pomeriggio";
    return "Buonasera";
  };

  // FALSE X MARGINE || TRUE X FOOD COST
  const [doubleOption, setDoubleOption] = useState(false);

  const mostra = doubleOption ? "foodCost" : "margine";
  const max = Math.max(
    ...ricette.map((r) => {
      const { margine, foodCost } = calcolaRicetta(r);
      return mostra === "margine" ? margine : foodCost;
    }),
  );

  return (
    <div>
      {/* SALUTO UTENTE + PULSANTI (NUOVA RICETTA E ESPORTA REPORT) */}
      <section className="flex flex-col items-center md:flex-row md:justify-between">
        <div className="mb-2">
          <h2 className="text-center md:text-start text-2xl mb-2">
            {saluto()}, UTENTE
          </h2>
          <span className="block text-[11px] leading-3 text-neutral-600">
            {giorniSettimana[ora.getDay()]} {ora.getDate()}{" "}
            {mesi[ora.getMonth()]} {ora.getFullYear()} • dati aggiornati alle{" "}
            {ora.getHours()}:
            {ora.getMinutes() < 10 ? `0${ora.getMinutes()}` : ora.getMinutes()}
          </span>
        </div>
        <div className="flex lg:flex-row md:items-center gap-1 shrink-0">
          <ButtonSecondary innerText="Esporta report" size={"responsive"} />
          <ButtonOrange innerText="+ Nuova ricetta" size="responsive" />
        </div>
      </section>
      {/* DATI GENERALI */}
      <section className="mt-4 grid grid-cols-2 mdx:grid-cols-4 lg:grid-cols-4 gap-4">
        {datiGenerali.map((d) => {
          return (
            <div className={styleCards}>
              <div>
                {d.icon} {d.name}
              </div>
              <div>
                {d.value && (
                  <span className="font-bold text-[25px]">{d.value}</span>
                )}
                {d.temperatureGiaRegistrate && (
                  <span className="text-[25px]">
                    <span className="font-bold">
                      {d.temperatureGiaRegistrate}
                    </span>{" "}
                    di {d.temperatureDaRegistrare}
                  </span>
                )}
              </div>
              <div>
                <span>da vedere</span>
              </div>
            </div>
          );
        })}
      </section>
      {/* RICETTE + AVVISI */}
      <section className="grid grid-cols-1 xl:grid-cols-3 mt-4 gap-2">
        {/* RICETTE */}
        <article className={`${styleCards} xl:col-span-2`}>
          <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-2">
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-1">Ricette per margine</h3>
              <span className="block text-sm text-neutral-500">
                Mergine per prozione al netto dell'IVA(10%)
              </span>
              <span className="block text-sm text-neutral-500">
                Colore del badge = semaforo food cost
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center items-center gap-2">
              <div className="bg-neutral-200 rounded p-1 sm:h-10 w-30 sm:w-50 grid grid-cols-1 sm:grid-cols-2 place-items-center text-sm font-semibold text-neutral-600 ">
                <div
                  className={`${!doubleOption && "bg-white rounded text-black "} p-1.5 cursor-pointer w-full text-center transition-colors duration-30`}
                  onClick={() => setDoubleOption(false)}
                >
                  Margine €
                </div>
                <div
                  className={`${doubleOption && "bg-white rounded text-black"} p-1.5 cursor-pointer w-full text-center transition-colors duration-300`}
                  onClick={() => setDoubleOption(true)}
                >
                  Food cost %
                </div>
              </div>
              <div className="h-10">
                <select
                  name="categorie"
                  id="categorie"
                  className=" h-full w-35 border border-neutral-300 rounded"
                >
                  <option value="primi">Primi</option>
                  <option value="secondi">secondi</option>
                  <option value="antipasti">Primi</option>
                </select>
              </div>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-neutral-100 dark:divide-neutral-600">
            {ricette.map((r) => (
              <RigaRicetta key={r.nome} ricetta={r} mostra={mostra} max={max} />
            ))}
          </ul>
        </article>
        {/* AVVISI */}
        <article className={`${styleCards} `}>
          <div className="flex justify-between items-center">
            <h3 className="flex items-center">
              <span className="font-semibold">Avvisi</span>{" "}
              <span className="ms-1 flex justify-center items-center bg-neutral-200 h-8 w-8 rounded-full text-sm text-neutral-700">
                5
              </span>
            </h3>
            <NavLink
              to={"nonso"}
              className={
                "text-sm underline text-brand-700 hover:text-brand-500"
              }
            >
              Vedi tutti
            </NavLink>
          </div>
          <ul className="divide-y divide-neutral-100 dark:divide-neutral-600">
            {avvisi.map((a) => (
              <AvvisoItem
                key={a.id}
                avviso={a}
                onAzione={(av) => console.log(av.id)}
              />
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
