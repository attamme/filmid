import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { posterUrl } from "../api/tmdb";

export default function PersonPage() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPerson() {
            setLoading(true);
            const res = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=movie_credits,tv_credits`);
            const data = await res.json();
            setPerson(data);
            setCredits(data.combined_credits?.cast?.slice(0, 12) || []);
            setLoading(false);
        }
        fetchPerson();
    }, [id]);

    if (loading) return <div>Loading…</div>;
    if (!person) return <div>Person not found.</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                {person.profile_path && (
                    <img src={`http://image.tmdb.org/t/p/w300${person.profile_path}`} alt={person.name} className="rounded-xl" />
                )}
                <div>
                    <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
                    <p className="text-gray-400 mb-4">{person.biography || "No biography available."}</p>
                    <p><strong>Known for:</strong> {person.known_for_department}</p>
                    <p><strong>Birthday:</strong> {person.birthday || "Unknown"}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Featured Works</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {credits.map((movie) => (
                    <Link key={moovie.id} to={`/movie/${movie.id}`} className="text-center group">
                        {movie.poster_path ? (
                            <img
                                src={posterUrl(movie.poster_path)}
                                alt={movie.title}
                                className="rounded-lg mx-auto mb-2 group-hover:opacity-80"
                            />
                        ) : (
                            <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">No Image</div>
                        )}
                        <div className="text-sm">{movie.title}</div>
                    </Link>
                ))}
            </div>
        </div>
    )
}