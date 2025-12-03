const API = 'https://api.themoviedb.org/3';
const KEY = import.meta.env.VITE_TMDB_API_KEY;

// Basic helper
async function get(path, params = {}) {
    const q = new URLSearchParams({ api_key: KEY, ...params }).toString()
    const res = await fetch(`${API}${path}?${q}`);
    if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
    return res.json()
}

// Genres for movies
export async function getMovieGenres() {
    const data = await get("/genre/movie/list", { language: "en-US" });
    return data.genres; // [{id, name}]
}

// Find a person (actor/producer/etc.)
export async function searchPerson(query) {
    if (!query.trim()) return []
    const data = await get("/search/person", { query, language: "en-US", page: 1, include_adult: false });
    return data.results; // [{id, name, known_for_department, profile_path, ...}]
}

// Discover movies by genre + people
export async function discoverMovies({ genreId, personIds = [], page = 1 }) {
    const params = {
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        language: "en-US",
        page,
    };
    if (genreId) params.with_genres = String(genreId);
    if (personIds.length) params.with_people = personIds.join(","); // matches cast OR crew
    const data = await get("/discover/movie", params);
    return data; // {page, results, total_pages}
}

// Get poster url
export function posterUrl(path, size = "w342") {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}