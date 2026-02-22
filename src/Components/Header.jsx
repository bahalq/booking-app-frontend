import { useNavigate, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Logout from "./Logout";

export default function Header({ role, isLogin, setIslogin, setRole }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const defaultLinks = [
    { name: t("home"), path: "/" },
    { name: t("login"), path: "/login" },
    { name: t("signup"), path: "/signup" },
  ];

  const adminLinks = [
    { name: t("addGround"), path: "/admin/grounds/add" },
    { name: t("viewAllGrounds"), path: "/admin/grounds" },
    { name: t("viewAllClients"), path: "/admin/clients" },
    { name: t("viewAllBookings"), path: "/admin/bookings" },
  ];

  const links = role == "Admin" ? adminLinks : defaultLinks;

  return (
    <header
      className="h-[10vh] flex items-center justify-between px-4 text-gray-200  w-screen
    sticky top-0 z-50 backdrop-blur-sm backdrop-brightness-75"
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src="/logo1.png"
          alt="Logo"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Desktop Links */}
      <nav className="hidden md:flex gap-6 items-center text-lg">
        {links.map((link, i) => (
          <NavLink
            key={i}
            end
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-gray-400 relative group"
                : "hover:text-gray-400 relative group"
            }
          >
            {link.name}
            <span className="absolute left-1/2 bottom-0 h-px bg-gray-300 w-full -translate-x-1/2 scale-x-50 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
          </NavLink>
        ))}
      </nav>

      {/* Language Switcher */}
      <div className="hidden md:flex gap-2">
        <LanguageSwitcher />
        {isLogin && <Logout setIslogin={setIslogin} setRole={setRole} menuOpen={menuOpen} />}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <HiX className="cursor-pointer" />
        ) : (
          <HiMenu className="cursor-pointer" />
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-[10vh] left-0 
        w-full bg-gray-900/80 flex duration-500 overflow-hidden ${
          !menuOpen ? "h-0" : role === 'Admin' ? "h-70 py-4" : "h-50 py-4"
        }
        flex-col items-center gap-4  md:hidden `}
      >
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "text-gray-400 text-xl" : "text-gray-200 text-xl"
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}
        <LanguageSwitcher />
        {isLogin && <Logout setIslogin={setIslogin} setRole={setRole} menuOpen={menuOpen} />}
      </div>
    </header>
  );
}
