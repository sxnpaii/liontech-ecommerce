import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// translations
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";
i18next.use(initReactI18next).init({
  lng: "ru",
  resources: {
    ru: {
      translation: ru,
    },
    uz: {
      translation: uz,
    },
  },
});

export default i18next;
