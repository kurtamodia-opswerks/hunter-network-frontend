import { useEffect, useState, useContext } from "react";
import { postData, putData, deleteData } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import DungeonAddForm from "../components/DungeonAddForm.jsx";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function Dungeons() {
  const [dungeons, setDungeons] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);
  const authFetch = useAuthFetch();

  // For editing
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let url = "http://localhost:8000/api/dungeons/";
    authFetch(url)
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to fetch dungeons");
        const data = await response.json();
        if (isMounted) {
          setDungeons(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
    return () => {
      isMounted = false;
    };
  }, []);

  // Add dungeon (POST)
  const handleAddDungeon = async (form) => {
    const url = "http://localhost:8000/api/dungeons/";
    const newDungeon = await postData(url, form, authFetch);
    if (newDungeon) {
      setDungeons((prev) => [...prev, newDungeon]);
    } else {
      alert("Error adding dungeon");
    }
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

  // Edit dungeon (PUT)
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
            editId={editId}
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
