import { useState, useEffect } from "react";

export default function DungeonAddForm({
  onAdd,
  initialForm,
  isEdit,
  onCancel,
  editId,
}) {
  const [form, setForm] = useState(
    initialForm || {
      name: "",
      location: "",
      rank: "",
      is_open: true,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(form);
    if (!isEdit) {
      setForm({ name: "", location: "", rank: "", is_open: true });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEdit ? "Edit Dungeon" : "Add Dungeon"}</h3>
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
      <button type="submit">{isEdit ? "Update Dungeon" : "Add Dungeon"}</button>
      {isEdit && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
