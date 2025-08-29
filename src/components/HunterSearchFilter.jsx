import { useState } from "react";

const RANKS = ["E", "D", "C", "B", "A", "S"];

export default function HunterSearchFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [rank, setRank] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ search, rank });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search by name or username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Custom Dropdown for Rank */}
      <div
        className="dropdown dropdown-start"
        style={{ display: "inline-block", marginLeft: "1rem" }}
      >
        <div tabIndex={0} role="button" className="btn m-1">
          {rank ? `Rank: ${rank}` : "All Ranks"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setRank("");
              }}
              className={!rank ? "font-bold" : ""}
            >
              All Ranks
            </a>
          </li>
          {RANKS.map((r) => (
            <li key={r}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setRank(r);
                }}
                className={rank === r ? "font-bold" : ""}
              >
                {r}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="submit"
        className="btn btn-soft sm:btn-sm md:btn-md lg:btn-md xl:btn-md"
        style={{ marginLeft: "1rem" }}
      >
        Filter
      </button>
    </form>
  );
}
