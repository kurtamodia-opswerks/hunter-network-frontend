import { useState, useEffect } from "react";
import { postData } from "../api/api.js";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function HunterAddForm({
  onAdd,
  initialForm,
  isEdit,
  onCancel,
}) {
  const authFetch = useAuthFetch();
  const [form, setForm] = useState(
    initialForm || {
      email: "",
      guild: 0,
      skills: [0],
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      rank: "E",
    }
  );

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    await onAdd(form);
    if (!isEdit) {
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEdit ? "Edit Hunter" : "Add Hunter"}</h3>
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
        required={!isEdit}
      />
      <input
        name="rank"
        placeholder="Rank"
        value={form.rank}
        onChange={handleChange}
        required
      />
      <button type="submit">{isEdit ? "Update Hunter" : "Add Hunter"}</button>
      {isEdit && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
