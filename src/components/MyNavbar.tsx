import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications, IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const MyNavbar = function () {
  const [open, setOpen] = useState<boolean>(false);
  const [aziendaOpen, setAziendaOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-200 bg-white dark:bg-neutral-800">
      <div className="flex items-center justify-between h-full px-2">
        {/* NAVBAR MOBILE */}
        <div className="md:hidden flex flex-col w-full">
          <div className=" flex items-center justify-between grow-1">
            <div
              className={`flex items-center justify-start items-center gap-2 p-3 `}
            >
              <img
                src="src/assets/logoCostoChef.svg"
                alt="LOGO_COSTO_CHEF"
                className="h-10"
              />
              <h1 className="font-bold text-xl text-neutral-800 dark:text-neutral-100">
                CostoChef
              </h1>
            </div>
            <div>
              <button className={`me-4 text-2xl cursor-pointer`}>
                <IoIosNotifications />
              </button>
              <button>
                <FaCircleUser className="me-4 text-2xl cursor-pointer" />
              </button>
              <button
                className={`me-4 text-2xl cursor-pointer`}
                onClick={() => setOpen(!open)}
              >
                {open ? <IoMdClose /> : <GiHamburgerMenu />}
              </button>
            </div>
          </div>
          {/* AZIENDA + RICERCA + PROFILO */}
          <div
            className={`grid transition-[grid-template-rows] duration-500 ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden flex flex-col bg-white dark:bg-neutral-800">
              {/* qui dentro i tuoi 3 blocchi: azienda, barra, profilo */}
              <div className="flex items-center justify-between h-12 border-b">
                <div className="flex flex-col justify-center text-[12px] h-full">
                  <span className="font-bold">Nome Azienda</span>
                  <span>Citta + numero sedi aperte</span>
                </div>
                <button
                  className={`cursor-pointer text-[22px]`}
                  onClick={() => setAziendaOpen(!aziendaOpen)}
                >
                  {aziendaOpen ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between h-12 border-b">
                <input
                  type="text"
                  placeholder="Cerca qui"
                  className="w-full h-full"
                />
                <button className="cursor-pointer">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* NAVBAR DESKTOP */}
        <div className="hidden md:flex justify-between items-center w-full h-16 px-4">
          {/* AZIENDA SELEZIONATA */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col justify-center text-[12px] h-full">
              <span className="font-bold">Nome Azienda</span>
              <span>Citta + numero sedi aperte</span>
            </div>
            <button
              className={`cursor-pointer text-[22px]`}
              onClick={() => setAziendaOpen(!aziendaOpen)}
            >
              {aziendaOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </button>
          </div>
          {/* BARRA RICERCA */}
          <div>
            <input type="text" placeholder=" Cerca qui" className="h-10" />
            <button className="cursor-pointer">
              <FaSearch />
            </button>
          </div>
          {/* PROFILO ECC... */}
          <div>
            <button className={`me-4 text-2xl cursor-pointer`}>
                <IoIosNotifications />
              </button>
            <button>
              <FaCircleUser className="me-4 text-2xl cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MyNavbar;
