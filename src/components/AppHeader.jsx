import { useState } from "react";

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
    <header className=" px-4 pt-4 ">
      <div className=" container bg-indigo-600 p-8 mx-auto flex flex-wrap gap-3 justify-around rounded-xl items-center">
        <div className="logo text-2xl font-bold">Have you watched it?</div>
        <div className="search-bar ">
          <form className="flex items-center gap-1" onSubmit={submitForm}>
            <input
              className="p-2 rounded-lg w-40 sm:w-64 text-slate-100 bg-indigo-800"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              type="text"
              placeholder="Search for any movie..."
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-gray-900 hover:bg-gray-800 rounded-lg text-xl"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
