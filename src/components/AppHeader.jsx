import NavButton from "./NavButton";

export default function AppHeader() {
  return (
    <header className="bg-indigo-600 p-8 ">
      <div className="container mx-auto flex justify-around items-center">
        <div className="logo text-2xl font-bold cursor-pointer">
          Have you watched it?
        </div>
        <div className="search-bar">
          <input
            className="p-2 rounded-lg w-64 text-zinc-900"
            type="text"
            placeholder="search any movie or tv series.."
          />
        </div>

        <div className="buttons flex gap-3">
          <NavButton text={"my list"} />
          <NavButton text={"What do i watch ?"} />
        </div>
      </div>
    </header>
  );
}
