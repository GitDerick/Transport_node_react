import React, { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem('authToken');
      setToken(storedToken || 'NO token');
    };

    // Vérifiez le token au montage du composant
    checkToken();

    // Configurez un intervalle pour vérifier régulièrement le token
    const intervalId = setInterval(checkToken, 1000); // Vérifie toutes les secondes

    return () => clearInterval(intervalId); // Nettoie l'intervalle lors du démontage du composant
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
