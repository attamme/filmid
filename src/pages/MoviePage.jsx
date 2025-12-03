import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { posterUrl } from "../api/tmdb";

export default function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);

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
            <div className="flex flex-col md:flex-row gap-6">
                <img src={posterUrl(movie.poster_path, "w500")} alt={movie.title} className="w-64 rounded-xl" />
                <div>
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-400 mb-4">{movie.overview}</p>
                    <p><strong>Release:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1)}</p>
                </div>
            </div>

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