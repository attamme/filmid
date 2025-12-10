import { createContext,useContext, useEffect, useState } from "react";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [playlists, setPlaylists] = useState({
        want: [],
        watching: [],
        finished: []
    });
    const [ratings, setRatings] = useState({});
    const [notes, setNotes] = useState({});

    /* Load from localStorage on first render */
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("filmid_library"));
        if (saved) {
            setFavorites(saved.favorites || []);
            setPlaylists(saved.playlists || { 
                want: [], 
                watching: [], 
                finished: [] 
            });
            setRatings(saved.ratings || {});
            setNotes(saved.notes || {});
        }
    }, [])

    /* Save to localStorage whenever data changes */
    useEffect(() => {
        localStorage.setItem("filmid_library", JSON.stringify({
            favorites,
            playlists,
            ratings,
            notes
        }))
    }, [favorites, playlists, ratings, notes])

    /* Actions */
    function addFavorite(movie) {
        if (!favorites.some((m) => m.id === movie.id)) {
            setFavorites([...favorites, movie]);
        }
    }

    function removeFavorite(id) {
        setFavorites(favorites.filter((m) => m.id !== id));
    }

    function addToPlaylist(movie, list) {
        if (!playlists[list].some((m) => m.id === movie.id)) {
            setPlaylists({
                ...playlists,
                [list]: [...playlists[list], movie]
            
            })
        }
    }

    function removeFromPlaylist(id, list) {
        setPlaylists({
            ...playlists,
            [list]: playlists[list].filter((m) => m.id !== id)
        })
    }

    function rateMovie(movieId, value) {
        setRatings({
            ...ratings,
            [movieId]: value
        })
    }

    function writeNote(movieId, text) {
        setNotes({
            ...notes,
            [movieId]: text
        })
    }

    return (
        <LibraryContext.Provider value={{
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
        }}>
            {children}
        </LibraryContext.Provider>
    )
}

export function useLibrary() {
    return useContext(LibraryContext);
}