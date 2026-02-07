import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const carouselRef = useRef(null);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  /* ---------- THEME ---------- */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ---------- SCROLL LOCK ---------- */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  /* ---------- MENU ITEMS ---------- */
  const menuItems = [
    {
      name: "Home",
      path: "/",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Team", path: "/team" },
    { name: "Accommodation", path: "/accommodation" },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ name: "Admin Panel", path: "/admin" });
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-lg px-4 md:px-8 shadow">

        {/* LEFT */}
        <div className="navbar-start">
          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden w-14 h-14 text-2xl font-semibold flex items-center justify-center hover:scale-105 transition"
          >
            ☰
          </button>

          {/* DESKTOP MENU */}
          <ul className="menu menu-horizontal hidden lg:flex gap-2 font-medium">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={item.action}
                  className="hover:bg-base-200 rounded-lg transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER */}
        <div className="navbar-center">
          <span className="text-2xl font-semibold tracking-wide hover:underline cursor-pointer">
            METALLUM 7.0
          </span>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* AUTH BUTTONS */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User" src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a className="font-bold">{user.displayName}</a></li>
                <li><a href={`${import.meta.env.VITE_SERVER_URL}/auth/logout`}>Logout</a></li>
              </ul>
            </div>
          ) : (
            <a href={`${import.meta.env.VITE_SERVER_URL}/auth/google`} className="btn btn-primary btn-sm">
              Login
            </a>
          )}
        </div>
      </div>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[60] bg-gray-600/30"
        />
      )}

      {/* QUARTER CIRCLE MENU */}
      <div
        className={`
          fixed top-0 left-0 z-[70]
          w-[420px] h-[420px]
          bg-base-100/95 backdrop-blur-xl
          rounded-br-[100%]
          shadow-2xl
          overflow-hidden
          origin-top-left
          transition-all duration-500 ease-out
          ${menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `}
      >
        {/* CLOSE */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 left-6 text-xl font-semibold opacity-70 hover:opacity-100 transition"
        >
          ✕
        </button>

        {/* MOBILE MENU */}
        <div className="mt-24 ml-20 flex flex-col gap-4 text-base font-medium tracking-wide">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                item.action?.();
                setMenuOpen(false);
              }}
              className="hover:text-neutral-500 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
