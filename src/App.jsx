import { useState } from "react";
import AppHeader from "./components/AppHeader";
import MovieList from "./components/MovieList";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  return (
    <>
      <AppHeader
        setIsSearched={setIsSearched}
        setSearchQuery={setSearchQuery}
      />
      <MovieList isSearched={isSearched} query={searchQuery} />
    </>
  );
}
