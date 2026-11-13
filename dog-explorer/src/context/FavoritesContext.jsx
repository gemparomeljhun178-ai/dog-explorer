import { createContext, useContext, useEffect, useState } from "react";

const KEY = "dog-favorites";
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(favorites)); }, [favorites]);

  const toggleFavorite = (name) =>
    setFavorites((f) => (f.includes(name) ? f.filter((x) => x !== name) : [...f, name]));

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
export const useFavorites = () => useContext(FavoritesContext);
