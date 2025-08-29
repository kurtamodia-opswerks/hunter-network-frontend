import { useState, useEffect } from "react";

export default function GuildAddForm({
  onAdd,
  initialForm,
  isEdit,
  onCancel,
  editId,
}) {
  const [form, setForm] = useState(
    initialForm || {
      name: "",
      leader: 0,
    }
  );

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(form);
    if (!isEdit) {
      setForm({
        name: "",
        leader: 0,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEdit ? "Edit Guild" : "Add Guild"}</h3>
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
      <button type="submit">{isEdit ? "Update Guild" : "Add Guild"}</button>
      {isEdit && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}
