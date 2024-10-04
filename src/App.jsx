import { useState } from "react";
import AppHeader from "./components/AppHeader";
import MovieList from "./components/MovieList";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [watchedList, setWatchedList] = useState([]);

  function addToWatchedList(id) {
    if (watchedList.includes(id)) return;
    setWatchedList([...watchedList, id]);
  }
  console.log(watchedList);

  return (
    <>
      <AppHeader
        setIsSearched={setIsSearched}
        setSearchQuery={setSearchQuery}
      />
      <MovieList
        isSearched={isSearched}
        query={searchQuery}
        addToWatchedList={addToWatchedList}
      />
    </>
  );
}
