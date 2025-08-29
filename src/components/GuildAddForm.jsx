import { useState } from "react";
import { postData } from "../api/api.js";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function GuildAddForm({ onAdd }) {
  const authFetch = useAuthFetch();
  const [form, setForm] = useState({
    name: "",
    leader: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/guilds/";
      const newGuild = await postData(url, form, authFetch);
      if (newGuild) {
        onAdd(newGuild);
        setForm({
          name: "",
          leader: 0,
        });
      } else {
        alert("Error adding guild");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding guild");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Guild</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="leader"
        type="number"
        placeholder="Leader ID"
        value={form.leader}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Guild</button>
    </form>
  );
}
