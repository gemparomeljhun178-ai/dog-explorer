import { useEffect, useMemo, useState } from "react";
import { getAllBreeds } from "../api";
import SearchBar from "../components/SearchBar";
import BreedCard from "../components/BreedCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const PAGE_SIZE = 12;

export default function Home() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const load = async () => {
    setLoading(true); setError(null);
    try { setBreeds(await getAllBreeds()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  useEffect(() => setPage(1), [query, sort, filter]);

  const results = useMemo(() => {
    let list = breeds.filter((b) => b.name.includes(query.trim().toLowerCase()));
    if (filter === "subs") list = list.filter((b) => b.subs.length > 0);
    if (filter === "nosubs") list = list.filter((b) => b.subs.length === 0);
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return sort === "asc" ? list : list.reverse();
  }, [breeds, query, sort, filter]);

  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) return <Loader text="Fetching breeds..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <>
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All breeds</option>
          <option value="subs">With sub-breeds</option>
          <option value="nosubs">Without sub-breeds</option>
        </select>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="asc">Name A–Z</option>
          <option value="desc">Name Z–A</option>
        </select>
      </div>
      <p>{results.length} breed(s) found</p>
      {results.length === 0 ? (
        <ErrorMessage message="No breeds match your search." />
      ) : (
        <div className="grid">{visible.map((b) => <BreedCard key={b.name} breed={b} />)}</div>
      )}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </>
  );
}
