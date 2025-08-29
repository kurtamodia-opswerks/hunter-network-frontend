import { useState } from "react";
import { postData } from "../api/api.js";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function HunterAddForm({ onAdd }) {
  const authFetch = useAuthFetch();
  const [form, setForm] = useState({
    email: "",
    guild: 0,
    skills: [0],
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    rank: "E",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For guild and skills, convert to number/array if needed
    if (name === "guild") {
      setForm({ ...form, guild: Number(value) });
    } else if (name === "skills") {
      setForm({ ...form, skills: [Number(value)] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/hunters/";
      const newHunter = await postData(url, form, authFetch);
      if (newHunter) {
        onAdd(newHunter);
        setForm({
          email: "",
          guild: 0,
          skills: [0],
          first_name: "",
          last_name: "",
          username: "",
          password: "",
          rank: "E",
        });
      } else {
        alert("Error adding hunter");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding hunter");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Hunter</h3>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="guild"
        type="number"
        placeholder="Guild ID"
        value={form.guild}
        onChange={handleChange}
        required
      />
      <input
        name="skills"
        type="number"
        placeholder="Skill ID"
        value={form.skills[0]}
        onChange={handleChange}
        required
      />
      <input
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        required
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={form.last_name}
        onChange={handleChange}
        required
      />
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
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
      <button type="submit">Add Hunter</button>
    </form>
  );
}
