import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllBreeds, getBreedImages } from "../api";
import { useFavorites } from "../context/FavoritesContext";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const PAGE_SIZE = 12;

export default function BreedDetail() {
  const { breed } = useParams();
  const { favorites, toggleFavorite } = useFavorites();
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      setImages(await getBreedImages(breed, sub));
      setPage(1);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    setSub("");
    getAllBreeds().then((all) => setSubs(all.find((b) => b.name === breed)?.subs || [])).catch(() => {});
  }, [breed]);
  useEffect(() => { load(); }, [breed, sub]);

  const totalPages = Math.ceil(images.length / PAGE_SIZE);
  const visible = images.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Link to="/">← Back</Link>
      <div className="toolbar">
        <h2 style={{ textTransform: "capitalize" }}>{breed}</h2>
        <button className="btn" onClick={() => toggleFavorite(breed)}>
          {favorites.includes(breed) ? "❤️ Remove favorite" : "🤍 Add to favorites"}
        </button>
        {subs.length > 0 && (
          <select className="input" value={sub} onChange={(e) => setSub(e.target.value)}>
            <option value="">All sub-breeds</option>
            {subs.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}
      </div>
      {loading ? <Loader text="Fetching photos..." />
        : error ? <ErrorMessage message={error} onRetry={load} />
        : (
          <>
            <p>{images.length} photos</p>
            <div className="grid">
              {visible.map((url) => (
                <div className="card" key={url}><img src={url} alt={breed} loading="lazy" /></div>
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        )}
    </>
  );
}
