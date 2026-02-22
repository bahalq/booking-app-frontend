import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "ar", label: "العربية" },
  ];

  const [lang, setLang] = useState(
    localStorage.getItem("language") || i18n.language || "en"
  );

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  }, [lang]);

  const handleChange = (e) => {
    setLang(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={i18n.language}
        onChange={handleChange}
        className="bg-gray-800 text-gray-200 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
