import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import BreedDetail from "./pages/BreedDetail";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breed/:breed" element={<BreedDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
