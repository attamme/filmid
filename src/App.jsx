import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import MoviePage from "./pages/MoviePage";
import PersonPage from "./pages/PersonPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-gray-200">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/person/:id" element={<PersonPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
