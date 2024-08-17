import { useState } from "react";
import NavButton from "./NavButton";

export default function AppHeader({
  searchQuery,
  setSearchQuery,
  setIsSearched,
}) {
  const [inputQuery, setInputQuery] = useState("");

  function submitForm(e) {
    e.preventDefault();

    if (inputQuery.length < 1) {
      setInputQuery("");
      return;
    }
    setIsSearched(true);
    setSearchQuery(inputQuery);
    setInputQuery("");
  }

  return (
    <header className="bg-indigo-600 p-8 ">
      <div className="container mx-auto flex justify-around items-center">
        <div className="logo text-2xl font-bold cursor-pointer">
          Have you watched it?
        </div>
        <div className="search-bar ">
          <form className="flex items-center gap-1" onSubmit={submitForm}>
            <input
              className="p-2 rounded-lg w-64 text-zinc-900"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              type="text"
              placeholder="search any movie or tv series.."
            />
            <button
              type="submit"
              className="p-1.5 bg-gray-900 rounded-lg text-xl"
            >
              🔍
            </button>
          </form>
        </div>

        <div className="buttons flex gap-3">
          <NavButton text={"my list"} />
          <NavButton text={"What do i watch ?"} />
        </div>
      </div>
    </header>
  );
}
