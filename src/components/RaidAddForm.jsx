import { useState } from "react";
import { postData } from "../api/api.js";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function RaidAddForm({ onAdd }) {
  const authFetch = useAuthFetch();
  const [form, setForm] = useState({
    name: "",
    dungeon: 0,
    date: "",
    success: false,
    participations_create: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleParticipationChange = (index, field, value) => {
    const updated = [...form.participations_create];
    updated[index][field] = value;
    setForm({ ...form, participations_create: updated });
  };

  const addParticipation = () => {
    setForm({
      ...form,
      participations_create: [
        ...form.participations_create,
        { hunter_id: 0, role: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/raids/";
    const newRaid = await postData(url, form, authFetch);
    if (newRaid) {
      onAdd(newRaid);
      setForm({
        name: "",
        dungeon: 0,
        date: "",
        success: false,
        participations_create: [],
      });
    } else {
      alert("Error adding raid");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Raid</h3>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="dungeon"
        type="number"
        placeholder="Dungeon ID"
        value={form.dungeon}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <label>
        Success?
        <input
          name="success"
          type="checkbox"
          checked={form.success}
          onChange={handleChange}
        />
      </label>
      <h4>Participations</h4>
      {form.participations_create.map((p, i) => (
        <div key={i}>
          <input
            type="number"
            placeholder="Hunter ID"
            value={p.hunter_id}
            onChange={(e) =>
              handleParticipationChange(i, "hunter_id", Number(e.target.value))
            }
            required
          />
          <input
            placeholder="Role"
            value={p.role}
            onChange={(e) =>
              handleParticipationChange(i, "role", e.target.value)
            }
            required
          />
        </div>
      ))}
      <button type="button" onClick={addParticipation}>
        Add Participation
      </button>
      <button type="submit">Add Raid</button>
    </form>
  );
}
