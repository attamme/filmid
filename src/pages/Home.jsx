import GenreSelector from "../components/GenreSelector";
import ActorSearch from "../components/ActorSearch";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Find Your Next Movie 🎥</h1>
      <GenreSelector />
      <ActorSearch />
    </div>
  );
}
