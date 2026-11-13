import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRandomImage } from "../api";
import { useFavorites } from "../context/FavoritesContext";

export default function BreedCard({ breed }) {
  const { favorites, toggleFavorite } = useFavorites();
  const [img, setImg] = useState(null);
  const [failed, setFailed] = useState(false);
  const isFav = favorites.includes(breed.name);

  useEffect(() => {
    let active = true;
    (async () => {
      try { const url = await getRandomImage(breed.name); if (active) setImg(url); }
      catch { if (active) setFailed(true); }
    })();
    return () => { active = false; };
  }, [breed.name]);

  return (
    <div className="card">
      <Link to={`/breed/${breed.name}`}>
        {img ? <img src={img} alt={breed.name} loading="lazy" />
             : <div className="skeleton">{failed ? "No image" : ""}</div>}
      </Link>
      <div className="card-body">
        <div>
          <h3>{breed.name}</h3>
          {breed.subs && <small>{breed.subs.length ? `${breed.subs.length} sub-breeds` : "No sub-breeds"}</small>}
        </div>
        <button className="fav" onClick={() => toggleFavorite(breed.name)}
          aria-label="Toggle favorite">{isFav ? "❤️" : "🤍"}</button>
      </div>
    </div>
  );
}
