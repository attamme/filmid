export default function GenreSelector() {
  return (
    <div className="flex gap-2 mt-4">
      {["Action", "Comedy", "Drama", "Thriller"].map((genre) => (
        <button
          key={genre}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
