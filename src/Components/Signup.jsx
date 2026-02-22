import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t, i18n } = useTranslation();
  const [dir, setDir] = useState("ltr");
  useEffect(() => {
    console.log(t.language);

    if (i18n.language == "ar") {
      setDir("rtl");
    } else {
      setDir("ltr");
    }
  }, [i18n.language]);

  const inputs = [
    { key: "firstName", type: "text", name: "firstname" },
    { key: "lastName", type: "text", name: "lastname" },
    { key: "phone", type: "tel", name: "phonenumber" },
    { key: "email", type: "email", name: "email" },
    { key: "password", type: "password", name: "password" },
  ];
  const patterns = {
    firstname: /^[A-Za-zÀ-ÿ\s]{2,20}$/,
    lastname: /^[A-Za-zÀ-ÿ\s]{2,20}$/,
    phonenumber: /^(\+212|0)[5-7]\d{8}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
  };
  const [err, setErr] = useState({
    msg: "",
    rules: "",
    bool: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const values = Object.fromEntries(formData.entries());

    if (values.role === "") {
      setErr({ msg: t("roleRequired"), rules: t("roleRule"), bool: true });
      return;
    }

    // Validation checks
    if (!patterns.firstname.test(values.firstname)) {
      setErr({ msg: t("firstNameInvalid"), rules: t("firstNameRule"), bool: true });
      return;
    }
    if (!patterns.lastname.test(values.lastname)) {
      setErr({ msg: t("lastNameInvalid"), rules: t("lastNameRule"), bool: true });
      return;
    }
    if (!patterns.phonenumber.test(values.phonenumber)) {
      setErr({ msg: t("phoneInvalid"), rules: t("phoneRule"), bool: true });
      return;
    }
    if (!patterns.email.test(values.email)) {
      setErr({ msg: t("emailInvalid"), rules: t("emailRule"), bool: true });
      return;
    }
    if (!patterns.password.test(values.password)) {
      setErr({ msg: t("passwordInvalid"), rules: t("passwordRule"), bool: true });
      return;
    }

    setErr({ msg: "", bool: false });

    // Map legacy form names to new API expectations
    const payload = {
      first_name: values.firstname,
      last_name: values.lastname,
      email: values.email,
      password: values.password,
      phone: values.phonenumber,
      role: values.role
    };

    import("../services/api").then(({ api }) => {
      api.register(payload).then((data) => {
        if (data.success) {
          window.location.href = "/login";
        } else if (data.message === "Email already exists") {
          setErr({ msg: t("emailExists"), rules: "", bool: true });
        } else {
          setErr({ msg: t("genericError"), rules: data.message, bool: true });
        }
      });
    });
  };

  return (
    <div className="h-[90vh] p-7 flex flex-col justify-center items-center w-screen">
      {err.bool && (
        <div className="mb-4 p-3 border border-red-500 text-red-400 rounded backdrop-brightness-50">
          <p className="font-bold">{err.msg}</p>
          <p className="text-sm">{err.rules}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="border backdrop-brightness-50
        text-gray-200 gap-2 text-2xl h-fit p-10
        rounded-xl flex flex-col items-center"
      >
        <select
          name="role"
          className="border px-3 rounded bg-black
          w-full "
        >
          <option className="text-center" value="" defaultChecked hidden>
            {t("chooseRole")}
          </option>
          <option value="Admin">{t("admin")}</option>
          <option value="Client">{t("client")}</option>
        </select>
        {inputs.map((input, index) => {
          return (
            <input
              key={index}
              dir={input.name === "phonenumber" && dir}
              className="border px-3 rounded placeholder-gray-200 w-full "
              type={input.type}
              name={input.name}
              placeholder={t(input.key)}
            />
          );
        })}
        <button className="group hover:border-x hover:border-t rounded p-1 relative cursor-pointer my-auto h-fit">
          {t("signup")}
          <span
            className="absolute left-1/2 bottom-0 h-px bg-gray-300 w-full
                    -translate-x-1/2
                    scale-x-50 group-hover:scale-x-100
                    origin-center
                    transition-transform duration-300"
          ></span>
        </button>
      </form>
    </div>
  );
}
