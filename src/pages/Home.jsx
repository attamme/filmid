import { useEffect, useState } from "react";
import GenreSelector from "../components/GenreSelector";
import ActorSearch from "../components/ActorSearch";
import MovieCard from "../components/MovieCard";
import { discoverMovies } from "../api/tmdb";

export default function Home() {
  const [genreId, setGenreId] = useState(null);
  const [personIds, setPersonIds] = useState([]); // supports producers later too
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function runDiscover(resetPage = true) {
    setLoading(true);
    try {
      const data = await discoverMovies({ genreId, personIds, page: resetPage ? 1 : page });
      setMovies(data.results || []);
      if (resetPage) setPage(1);
    } catch (e) {
      console.error(e);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  // initial load
  useEffect(() => { runDiscover(); /* eslint-disable-next-line */ }, []);

  // refetch when filters change
  useEffect(() => { runDiscover(); /* eslint-disable-next-line */ }, [genreId, personIds.join(",")]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Find Your Next Movie 🎥</h1>
      
      <div className="flex flex-wrap gap-3 items-center">
        <GenreSelector value={genreId} onChange={setGenreId} />
        <ActorSearch onPick={(p) => setPersonIds([p.id])} />
        <button
          className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
          onClick={() => { setGenreId(null); setPersonIds([]); runDiscover(); }}
        >
          Reset
        </button>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="text-gray-400">Loading…</div>
        ) : movies.length === 0 ? (
          <div className="text-gray-400">No results. Try another genre/actor.</div>
        ) : (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
            {movies.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        )}
      </div>
    </div>
  );
}
