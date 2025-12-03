import { useEffect, useState } from "react";
import { getMovieGenres } from "../api/tmdb";

export default function GenreSelector({ value, onChange }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getMovieGenres().then(setGenres).catch(console.error);
  }, []);

  return (
    <select
      className="bg-gray-800 text-gray-100 px-3 py-2 rounded-md"
      value={value || ""}
      onChange={(e) => onChange?.(Number(e.target.value) || null)}
    >
      <option value="">All Genres</option>
      {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
    </select>
  );
}
