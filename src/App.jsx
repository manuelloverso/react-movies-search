import { useState } from "react";
import AppHeader from "./components/AppHeader";
import MovieList from "./components/MovieList";
import StarRating from "./components/StarRating";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <AppHeader setSearchQuery={setSearchQuery} />
      <StarRating />
      <MovieList query={searchQuery} />
    </>
  );
}
