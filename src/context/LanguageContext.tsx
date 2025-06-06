import { createContext } from 'react';
import esMessages from '../lang/es.json';
import enMessages from '../lang/en.json';
import frMessages from '../lang/fr.json';

interface LanguageContextProps {
  locale: string;
  messages: Record<string, string>;
  changeLanguage: (lang: string) => void;
}

export const messagesMap: { [key: string]: Record<string, string> } = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
};

export const LanguageContext = createContext<LanguageContextProps>({
  locale: 'en',
  messages: enMessages,
  changeLanguage: () => {},
});