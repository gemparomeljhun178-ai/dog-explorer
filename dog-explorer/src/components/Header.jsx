import { NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Header() {
  const { favorites } = useFavorites();
  return (
    <header className="header">
      <h1>🐶 Dog Explorer</h1>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/favorites">Favorites ({favorites.length})</NavLink>
      </nav>
    </header>
  );
}
