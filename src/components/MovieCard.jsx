import { posterUrl } from "../api/tmdb";

export default function MovieCard({ movie, onFavorite }) {
    const img = posterUrl(movie.poster_path);

    function favoriteClick() {
        // Gate: require account (simple for now)
        // Replace with real auth later; for demo, always show notice.
        alert("Favoriting is available for accounts only. Please log in or sign up.")
        onFavorite?.(movie) // you can still capture intent if you want
    }

    return (
        <div className="bg-gray-900 rounded-x1 overflow-hidden shadow hover:shadow-lg transition">
            {img ? (
                <img src={img} alt={movie.title} className="w-full aspect-[2/3] object-cover"/>
            ) : (
                <div className="w-full aspect-[2/3] grid place-items-center text-gray-500">No poster </div>
            )}
            <div className="p-3">
                <div className="font-semibold">{movie.title}</div>
                <div className="text-xs text-gray-400">{(movie.release_date || "").slice(0, 4)}</div>
                <button 
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 rounded-md"
                    onClick={favoriteClick}
                >
                    ☆ Favorite
                </button>
            </div>
        </div>
    )
}