import { useNavigate } from "react-router-dom";
import { posterUrl } from "../api/tmdb";

export default function MovieCard({ movie, onFavorite }) {
    const navigate = useNavigate();
    const img = posterUrl(movie.poster_path);
    
    function favoriteClick() {
        // Gate: require account (simple for now)
        // Replace with real auth later; for demo, always show notice.
        e.stopPropagation();
        alert("Favoriting is available for accounts only. Please log in or sign up.")
    }

    return (
        <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="cursor-pointer bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition relative"
        >
            {/* Movie Poster */}
            {img ? (
                <img src={img} alt={movie.title} className="w-full aspect-[2/3] object-cover"/>
            ) : (
                <div className="w-full aspect-[2/3] grid place-items-center text-gray-500">No poster </div>
            )}

            {/* Movie Title */}
            <div className="p-3">
                <div className="font-semibold">{movie.title}</div>
                <div className="text-xs text-gray-400">{(movie.release_date || "").slice(0, 4)}</div>
            </div>

            {/* Favorite Button */}
            <button 
                onClick={favoriteClick}
                className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md hover:bg-black/80 transition text-sm"
            >
                ☆
            </button>
        </div>
    )
}