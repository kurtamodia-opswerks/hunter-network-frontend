import { useEffect, useState, useContext } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { AuthContext } from "../context/AuthContext.jsx";
import DungeonAddForm from "../components/DungeonAddForm.jsx";
import { putData, deleteData } from "../api/api.js";

export default function Dungeons() {
  const [dungeons, setDungeons] = useState([]);
  const authFetch = useAuthFetch();
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);

  // For editing
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDungeons = async () => {
      if (!isLoggedIn) return;
      const response = await authFetch("http://localhost:8000/api/dungeons/");
      if (response.ok) {
        const data = await response.json();
        if (!isMounted) return;
        setDungeons(data);
      } else {
        console.error("Failed to fetch dungeons");
      }
    };

    fetchDungeons();

    return () => {
      isMounted = false;
    };
  }, [authFetch, isLoggedIn]);

  const handleAddDungeon = (newDungeon) => {
    setDungeons((prev) => [...prev, newDungeon]);
  };

  // Start editing a dungeon
  const handleEditClick = (dungeon) => {
    setEditId(dungeon.id);
    setEditForm({
      name: dungeon.name,
      location: dungeon.location,
      rank: dungeon.rank,
      is_open: dungeon.is_open,
    });
  };

  // Submit edit
  const handleEditSubmit = async (form) => {
    const url = `http://localhost:8000/api/dungeons/${editId}/`;
    const updatedDungeon = await putData(url, form, authFetch);
    if (updatedDungeon) {
      setDungeons((prev) =>
        prev.map((d) => (d.id === editId ? updatedDungeon : d))
      );
      setEditId(null);
      setEditForm(null);
    } else {
      alert("Error updating dungeon");
    }
  };

  // Delete dungeon
  const handleDelete = async (id) => {
    const url = `http://localhost:8000/api/dungeons/${id}/`;
    const result = await deleteData(url, authFetch);
    if (result) {
      setDungeons((prev) => prev.filter((d) => d.id !== id));
    } else {
      alert("Error deleting dungeon");
    }
  };

  return (
    <section>
      <h2>Dungeons</h2>
      {!isLoggedIn ? (
        <div>
          <p>Manage dungeons, raids, and more with ease.</p>
          <p>
            <strong>Only Logged in users can see this page</strong>
          </p>
        </div>
      ) : (
        <ul>
          {dungeons.map((d) => (
            <li key={d.id}>
              <strong>{d.name}</strong> ({d.location})
              {isAdmin && isLoggedIn && (
                <>
                  <button onClick={() => handleEditClick(d)}>Edit</button>
                  <button onClick={() => handleDelete(d.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      {isAdmin && isLoggedIn && !editId && (
        <section className="dungeon-add-form">
          <DungeonAddForm onAdd={handleAddDungeon} />
        </section>
      )}
      {isAdmin && isLoggedIn && editId && (
        <section className="dungeon-edit-form">
          <DungeonAddForm
            onAdd={handleEditSubmit}
            initialForm={editForm}
            isEdit={true}
            onCancel={() => {
              setEditId(null);
              setEditForm(null);
            }}
          />
        </section>
      )}
    </section>
  );
}
