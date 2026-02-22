import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuEyeClosed, LuEye } from "react-icons/lu";

export default function Login({ setIslogin, setRole }) {
  const { t } = useTranslation();
  const [err, setErr] = useState({ msg: "", bool: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (!formData.get("email")) {
      setErr({ msg: t("emailRequired"), bool: true });
      return;
    }
    if (!formData.get("password")) {
      setErr({ msg: t("passwordRequired"), bool: true });
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/booking-app/backend/connection.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        setIslogin(true);
        setRole(data.role);
        window.location.href = "/";
      } else {
        setErr({ msg: t("invalidLogin"), bool: true });
      }
    } catch (err) {
      setErr({ msg: t("genericError"), bool: true });
    }
  };

  return (
    <div className="h-[90vh] p-7 flex flex-col justify-center items-center">
      {err.bool && (
        <div className="mb-4 p-3 border border-red-500 text-red-400 rounded backdrop-brightness-50">
          {err.msg}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="border backdrop-brightness-50 text-gray-200 gap-2 text-2xl h-fit p-10 rounded-xl flex flex-col items-center"
      >
        {[{ placeholder: t("email"), type: "email", name: "email" }].map(
          (input, index) => (
            <input
              key={index}
              className="border px-3 w-full rounded placeholder-gray-200"
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
            />
          )
        )}

        {/* Password with eye */}
        <div className="relative w-full">
          <input
            className="border px-3 pr-10 w-full rounded placeholder-gray-200"
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            name="password"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
          >
            {showPassword ? <LuEyeClosed size={22} /> : <LuEye size={22} />}
          </button>
        </div>

        <button className="group hover:border-x hover:border-t rounded p-1 relative cursor-pointer my-auto h-fit">
          {t("login")}
          <span className="absolute left-1/2 bottom-0 h-px bg-gray-300 w-full -translate-x-1/2 scale-x-50 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
        </button>
      </form>
    </div>
  );
}
