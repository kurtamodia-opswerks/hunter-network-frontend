import { useState, useEffect } from "react";

export default function RaidAddForm({
  onAdd,
  initialForm,
  isEdit,
  onCancel,
  editId,
}) {
  const [form, setForm] = useState(
    initialForm || {
      name: "",
      dungeon: 0,
      date: "",
      success: false,
      participations_create: [],
    }
  );

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

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
    await onAdd(form);
    if (!isEdit) {
      setForm({
        name: "",
        dungeon: 0,
        date: "",
        success: false,
        participations_create: [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEdit ? "Edit Raid" : "Add Raid"}</h3>
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
      <button type="submit">{isEdit ? "Update Raid" : "Add Raid"}</button>
      {isEdit && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
