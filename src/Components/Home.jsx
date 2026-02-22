import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GroundsList from "./GroundsList";

export default function Home({ isLogin, role }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div
      className=" w-screen
         p-7"
    >
      <div
        dir="ltr"
        className="h-[90vh] flex flex-col justify-center
        sm:items-left items-center md:px-[30vw] sm:px-[20vw] gap-5 
        text-gray-50 
        backdrop-blur-[3px] p-7"
      >
        <h1 className="uppercase font-serif text-6xl font-semibold ">
          Welcome
        </h1>
        <h1 className="uppercase self-end text-5xl ">مرحباً بك</h1>
        {!isLogin && (
          <div className="flex gap-3 w-fit self-center text-2xl">
            {[t("signup"), t("login")].map((text, index) => {
              return (
                <button
                  onClick={() => {
                    if (text === t("signup")) {
                      navigate("/signup");
                    }
                    if (text === t("login")) {
                      navigate("/login");
                    }
                  }}
                  key={index}
                  className="group p-1 relative cursor-pointer my-auto h-fit text-nowrap"
                >
                  {text}
                  <span
                    className="absolute left-1/2 bottom-0 h-px bg-gray-300 w-full
                    -translate-x-1/2
                    scale-x-50 group-hover:scale-x-100
                    origin-center
                    transition-transform duration-300"
                  ></span>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {role !== "Admin" && (
        <div className="flex gap-5 bg-blue-900/50 p-5 justify-center items-center">
          <div className="text-4xl text-gray-50 flex flex-col gap-10">
            <p>{t("p1")}</p>
            <p className="flex items-center">
              <img
                src="/otm.png"
                alt=""
                className={`h-22 ${
                  i18n.language === "ar" ? "scale-x-[-1]" : ""
                }`}
              />
              {t("p2")}
            </p>
          </div>
          <img
            src="/bensliman.webp"
            alt=""
            className="h-[30vh] sm:inline hidden "
          />
        </div>
      )}
      {role !== "Admin" && <GroundsList />}
    </div>
  );
}
