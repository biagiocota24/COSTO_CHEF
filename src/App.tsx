import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Ingredienti from "./pages/Ingredienti";
import ButtonProva from "./components/Button";
import MainLayout from "./MainLayout";

function App() {
  return (
    <div>
      <ButtonProva />
      <Routes>
        <Route path="/login" element={<Dashboard />}></Route>
        <Route path="/registrazione" element={<Dashboard />}></Route>
        {/* DASHBOARD */}
        <Route path="/" element={<MainLayout />}></Route>
        {/* Lista ingredienti	Tabella con ricerca, filtro per categoria e sottoscorta, barra della giacenza, costo unitario */}
        <Route path="/ingredienti" element={<Ingredienti />}></Route>
        {/* Form ingrediente	Nome, categoria, unità base, resa, peso medio pezzo, scorta minima, allergeni (checkbox) */}
        <Route path="/ingredienti/nuovo" element={<Dashboard />}></Route>
        <Route path="/ingredienti/:id/modifica" element={<Dashboard />}></Route>
        {/* Dettaglio ingrediente	Info, grafico dello storico prezzi, ultimi acquisti, ricette che lo usano, lotti */}
        <Route path="ingredienti/:id" element={<Dashboard />}></Route>
        {/* Lista ricette	Card o tabella con badge food cost a semaforo, filtro per categoria, toggle "solo semilavorati" */}
        <Route path="/ricette" element={<Dashboard />}></Route>
        {/* Editor ricetta	Dati generali + editor righe dinamico + pannello di calcolo live a lato */}
        <Route path="/ricette/nuova" element={<Dashboard />}></Route>
        <Route path="/ricette/:id/modifica" element={<Dashboard />}></Route>
        {/* Dettaglio ricetta Scheda tecnica: righe con costo per riga, grafico a
      torta del breakdown, allergeni, procedimento, simulatore prezzo, bottone
      stampa */}
        <Route path="/ricette/:id" element={<Dashboard />}></Route>
        {/* Giacenze	Tabella giacenze con stato, azioni rapide di scarico e spreco */}
        <Route path="/magazzino" element={<Dashboard />}></Route>
        {/* Form: fornitore, data, n° documento, più righe ingrediente/quantità/unità/prezzo */}
        <Route path="/magazzino/carico" element={<Dashboard />}></Route>
        {/* Storico movimenti	Tabella filtrabile per tipo e periodo */}
        <Route path="/magazzino/movimenti" element={<Dashboard />}></Route>
        {/* Inventario fisico	Lista ingredienti con campo "conteggio reale", differenza calcolata, conferma rettifiche */}
        <Route path="/magazzino/inventario" element={<Dashboard />}></Route>
        {/* Fornitori	Lista, dettaglio con storico acquisti */}
        <Route path="/fornitori" element={<Dashboard />}></Route>
        <Route path="/fornitori/:id" element={<Dashboard />}></Route>
        {/* Registro temperature Inserimento rapido per attrezzatura (pensato per il
      telefono), grafico, non conformità evidenziate */}
        <Route path="/haccp/temperature" element={<Dashboard />}></Route>
        {/* Tracciabilità lotti	Lotti in scadenza, ricerca per codice lotto */}
        <Route path="/haccp/lotti" element={<Dashboard />}></Route>
        {/* Attrezzature	CRUD con range di temperatura */}
        <Route path="/haccp/attrezzature" element={<Dashboard />}></Route>
        {/* Impostazioni	Dati del ristorante, IVA, food cost target, gestione utenti */}
        <Route path="/impostazioni" element={<Dashboard />}></Route>
        {/* 404 / Non autorizzato	 */}
        <Route path="*" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
