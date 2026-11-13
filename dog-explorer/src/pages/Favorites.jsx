import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import BreedCard from "../components/BreedCard";

export default function Favorites() {
  const { favorites } = useFavorites();
  return (
    <>
      <h2>My Favorite Breeds</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet. <Link to="/">Browse breeds</Link></p>
      ) : (
        <div className="grid">
          {favorites.map((name) => <BreedCard key={name} breed={{ name }} />)}
        </div>
      )}
    </>
  );
}
