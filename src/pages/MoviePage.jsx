import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLibrary } from "../store/useLibraryStore";
import { posterUrl } from "../api/tmdb";

export default function MoviePage() {
    const { id } = useParams();
    const numberidId = Number(id);

    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);

    // library actions and data
    const {
        favorites,
        playlists,
        ratings,
        notes,
        addFavorite,
        removeFavorite,
        addToPlaylist,
        removeFromPlaylist,
        rateMovie,
        writeNote
    } = useLibrary();

    // check state
    const isFavorite = favorites.some((m) => m.id === numberidId);
    const inWant = playlists.want.some((m) => m.id === numberidId);
    const inWatching = playlists.watching.some((m) => m.id === numberidId);
    const inFinished = playlists.finished.some((m) => m.id === numberidId);

    const currentRating = ratings[id] || "";
    const currentNote = notes[id] || "";

    useEffect(() => {
        async function fetchMovie() {
            setLoading(true);
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=credits`);
            const data = await res.json();
            setMovie(data);
            setCast(data.credits?.cast?.slice(0, 10) || []);
            setLoading(false);
        }
        fetchMovie();
    }, [id]);

    if (loading) return <div>Loading…</div>;
    if (!movie) return <div>Movie not found.</div>;

    return (
        <div className="max-w-5xl mx-auto">

            {/* TOP SECTION */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Poster */}
                <img src={posterUrl(movie.poster_path, "w500")} alt={movie.title} className="w-64 rounded-xl" />
                
                {/* Info */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-400 mb-4">{movie.overview}</p>
                    <p><strong>Release:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1)}</p>
                
                {/* USER ACTIONS */}
                    <div className="mt-6 space-y-4">

                        {/* Favorite */}
                        <button className={`px-4 py-2 rounded-md ${isFavorite ?  "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}`}
                            onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}>
                            {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
                        </button>

                        {/* Playlist buttons */}
                        <div className="flex flex-wrap gap-2">
                            {/* want */}
                            <button className={`px-3 py-2 rounded-md ${inWant ? "bg-green-700" : "bg-green-600 hover:bg-green-700"}`}
                                onClick={() => inWant ? removeFromPlaylist(movie.id, "want") : addToPlaylist(movie, "want")}>
                                {inWant ? "Want to Watch" : "Add to Want to Watch"}
                            </button>
                            {/* watching */}
                            <button className={`px-3 py-2 rounded-md ${inWatching ? "bg-yellow-700" : "bg-yellow-600 hover:bg-yellow-700"}`}
                                onClick={() => inWatching ? removeFromPlaylist(movie.id, "watching") : addToPlaylist(movie, "watching")}>
                                {inWatching ? "Watching" : "Add to Watching"}
                            </button>
                            {/* finished */}
                            <button className={`px-3 py-2 rounded-md ${inFinished ? "bg-purple-700" : "bg-purple-600 hover:bg-purple-700"}`}
                                onClick={() => inFinished ? removeFromPlaylist(movie.id, "finished") : addToPlaylist(movie, "finished")}>
                                {inFinished ? "Finished" : "Add to Finished"}
                            </button>
                        </div>

                        {/* Rating - only when Finished */}
                        {inFinished && (
                            <div>
                                <label className="block mb-1 font-semibold">Your Rating: </label>
                                <select value={currentRating} onChange={(e) => rateMovie(id, Number(e.target.value))} className="p-2 rounded-md bg-gray-800">
                                    <option value="">No rating</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}/10</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Notes - only when Finished */}
                        {inFinished && (
                            <div>
                                <label className="block mb-1 font-semibold">Your Notes: </label>
                                <textarea
                                    value={currentNote}
                                    onChange={(e) => writeNote(id, e.target.value)}
                                    className="w-full p-2 rounded-md bg-gray-800 h-24"
                                    placeholder="Write your notes here..."
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CAST SECTION */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Cast</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {cast.map((actor) => (
                    <Link key={actor.id} to={`/person/${actor.id}`} className="text-center group">
                        {actor.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                alt={actor.name}
                                className="rounded-lg mx-auto mb-2 group-hover:opacity-80"
                            />
                        ) : (
                            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">No Image</div>
                        )}
                        <div className="text-sm">{actor.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}