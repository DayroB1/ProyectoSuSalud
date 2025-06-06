import { ReactNode, useState } from "react";
//import { LanguageContext, messagesMap } from "../contexts/LanguageContext";
import { LanguageContext, messagesMap } from "../context/LanguageContext";

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const initialLocale = navigator.language.startsWith('es') ? 'es' : 'en';
  const [locale, setLocale] = useState<string>(initialLocale);

  const changeLanguage = (lang: string) => {
    setLocale(lang);
  };

  return (
    <LanguageContext.Provider value={{ locale, messages: messagesMap[locale], changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};