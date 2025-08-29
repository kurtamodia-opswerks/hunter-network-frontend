import { useState } from "react";

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
      <select value={rank} onChange={(e) => setRank(e.target.value)}>
        <option value="">All Ranks</option>
        <option value="E">E</option>
        <option value="D">D</option>
        <option value="C">C</option>
        <option value="B">B</option>
        <option value="A">A</option>
        <option value="S">S</option>
      </select>
      <button type="submit">Filter</button>
    </form>
  );
}
