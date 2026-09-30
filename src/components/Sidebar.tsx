import { NavLink } from "react-router-dom";
import { DiApple } from "react-icons/di";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";

const links = [
  { icon: <DiApple />, label: "Dashboard", path: "/" },
  { icon: <DiApple />, label: "Ingredienti", path: "/ingredienti" },
  { icon: <DiApple />, label: "Ricette", path: "/ingredienti" },
  { icon: <DiApple />, label: "Magazzino", path: "/ingredienti" },
  { icon: <DiApple />, label: "Fornitori", path: "/ingredienti" },
  { icon: <DiApple />, label: "HACCP", path: "/ingredienti" },
];

const Sidebar = function () {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = (e) => {
      if (e.matches) setOpen(true);
      if (!e.matches) setOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <aside
      className={`absolute z-100 md:sticky top-0 h-screen py-36.5 md:p-0 ${open ? "w-60 z-100 fixed" : "w-8"} transition-all duration-600 shrink-0 bg-brand-400 dark:bg-neutral-900`}
    >
      <div className={`flex flex-col`}>
        <div
          className={`hidden justify-start items-center gap-2 p-3 ${open ? "md:flex" : ""}`}
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
        {links.map((link) => (
          <div key={link.path} className="px-3">
            <NavLink
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 h-10 rounded text-neutral-800 dark:text-neutral-100
        hover:bg-white dark:hover:bg-neutral-950 transition-colors duration-150
        ${isActive ? "bg-white dark:bg-neutral-950" : ""}
        ${open ? "" : "hidden"}`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          </div>
        ))}
      </div>
      <button
        className={`absolute top-30 md:top-6 ${open ? "end-5" : "left-1/2 -translate-x-1/2 "} cursor-pointer dark:text-brand-500 hover:text-white transition-colors duration-250 text-xl`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? <IoMdClose /> : <IoOpenOutline />}
      </button>
    </aside>
  );
};

export default Sidebar;
