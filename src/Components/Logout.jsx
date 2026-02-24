import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config/api";

export default function Logout({ setIslogin, setRole, menuOpen }) {
  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/logout.php`, {
      method: "POST",
      credentials: "include",
    });
    setRole("");
    setIslogin(false);
    window.location.href = "/login";
  };
  const { t } = useTranslation();

  return (
    <>
        <button
          onClick={handleLogout}
          className="relative px-2 group text-xl cursor-pointer text-red-500"
        >
          {t("logout")}
          <span className="absolute left-1/2 bottom-0 h-px bg-red-500 w-full -translate-x-1/2 scale-x-50 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
        </button>

    </>
  );
}
