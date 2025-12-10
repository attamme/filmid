import { useLibrary } from "../store/useLibraryStore";
import { Link } from "react-router-dom";
import { posterUrl } from "../api/tmdb";
import MovieCard from "../components/MovieCard";

export default function Profile() {
  const { favorites, playlists, ratings, notes } = useLibrary();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      
      {/* Favorites */}
      <Section title="⭐ Favorites" movies={favorites} emptyText="No favorites added yet." />
      {/* Want to Watch */}
      <Section title="📋 Want to Watch" movies={playlists.want} emptyText="No movies in Want to Watch." />
      {/* Watching */}
      <Section title="▶️ Watching" movies={playlists.watching} emptyText="No movies in Watching." />
      {/* Finished */}
      <Section title="✅ Finished" movies={playlists.finished} emptyText="No movies in Finished." />
    </div>
  );
}

/* Generic Section component */

function Section({ title, movies, emptyText }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      {movies.length === 0 ? (
        <p className="text-gray-400">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}

/* Finished section (inclused rating + notes preview) */

function FinishedSection({ title, movies, ratings, notes, emptyText}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      {movies.length === 0 ? (
        <p className="text-gray-400">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {movies.map((movie) => (
            <FinishedMovieCard
              key={movie.id}
              movie={movie}
              rating={ratings[movie.id]}
              note={notes[movie.id]}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* Cards */



/* Finished movies show more info */
function FinishedMovieCard({ movie, rating, note }) {
  return (
    <Link to={`/movie/${movie.id}`} className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition p-4 flex gap-4">
      <img 
        src={posterUrl(movie.poster_path)} 
        alt={movie.title} 
        className="w-28 rounded-lg object-cover"
      />

      <div>
        <div className="font-semibold text-lg">{movie.title}</div>
        <div className="text-xs text-gray-400 mb-2">{(movie.release_date || "").slice(0, 4)}</div>
      

      {rating && (
        <div className="text-yellow-400 font-semibold mb-1">
          ⭐ {rating}/10
        </div>
      )}

      {note && (
        <p className="text-gray-300 text-sm line-clamp-3">
          "{note}"
        </p>
      )}
      </div>
    </Link>
  )
}