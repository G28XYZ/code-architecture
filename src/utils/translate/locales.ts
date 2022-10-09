import * as ru from "./ru";
import * as en from "./en";

export const locales: { [key: string]: Record<string, any> } = {
  ru: { ...ru },
  en: { ...en },
};
