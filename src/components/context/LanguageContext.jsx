/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from 'react';
import i18n from '../../LanguageConfig';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLang] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || i18n.language;
  });

  const changeLanguage = (selectedLanguage) => {
    setLang(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
