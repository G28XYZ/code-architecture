import { useCallback } from "react";
import useSelector from "./use-selector";
import useStore from "./use-store";
import translate from "../utils/translate";

/**
 * Хук возвращает функция для локализации текстов
 * Связан с кодом языка из внешнего состояния
 */
export default function useTranslate() {
  const store = useStore();

  // Текущая локаль
  const language = useSelector((state) => state.locale.lang);

  // Функция для смены локаль
  const setLanguage = useCallback((lang) => store.get("locale").setLang(lang), []);

  // Функция для локализации текстов
  const lang = useCallback(() => {
    return translate(language);
  }, [language]);

  return { language, setLanguage, lang };
}
