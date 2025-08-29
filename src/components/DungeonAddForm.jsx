import { useState } from "react";
import { postData } from "../api/api.js";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function DungeonAddForm({ onAdd }) {
  const authFetch = useAuthFetch();
  const [form, setForm] = useState({
    name: "",
    location: "",
    rank: "",
    is_open: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/dungeons/";
    const newDungeon = await postData(url, form, authFetch);
    if (newDungeon) {
      onAdd(newDungeon);
      setForm({ name: "", location: "", rank: "", is_open: true });
    } else {
      alert("Error adding dungeon");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Dungeon</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <input
        name="rank"
        placeholder="Rank"
        value={form.rank}
        onChange={handleChange}
        required
      />
      <label>
        Open?
        <input
          name="is_open"
          type="checkbox"
          checked={form.is_open}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Dungeon</button>
    </form>
  );
}
