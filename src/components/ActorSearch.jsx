import { useState } from "react";
import { searchPerson } from "../api/tmdb";

export default function ActorSearch({ onPick }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  async function onSearch(e) {
    e.preventDefault()
    setLoading(true);
    try {
      const results = await searchPerson(q);
      setList(results.slice(0, 6));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <form onSubmit={onSearch} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search actor/producer..."
          className="px-3 py-2 rounded-md bg-gray-800 text-gray-100 flex-1"
        />
        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "..." : "Search"}
        </button>
      </form>

      {list.length > 0 && (
        <ul className="mt-2 bg-gray-800 rounded-md divide-y divide-gray-700">
          {list.map(p => (
            <li
              key={p.id}
              className="p-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                onPick?.(p) // give parent the chosen person
                setList([]) // close list
                setQ(p.name) // fill input
              }}
              title={p.known_for_department}
            >
              {p.name} <span className="text-xs text-gray-400">({p.known_for_department})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
