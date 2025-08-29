import { useEffect, useState, useContext } from "react";
import { fetchData, postData, putData, deleteData } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import HunterAddForm from "../components/HunterAddForm.jsx";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function Hunters() {
  const [hunters, setHunters] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);
  const authFetch = useAuthFetch();

  // For editing
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let url = "http://localhost:8000/api/hunters/";
    fetchData(url)
      .then((data) => {
        if (isMounted) {
          setHunters(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
    return () => {
      isMounted = false;
    };
  }, []);

  // Add hunter (POST)
  const handleAddHunter = async (form) => {
    const url = "http://localhost:8000/api/hunters/";
    const newHunter = await postData(url, form, authFetch);
    if (newHunter) {
      setHunters((prev) => [...prev, newHunter]);
    } else {
      alert("Error adding hunter");
    }
  };

  // Start editing a hunter
  const handleEditClick = (hunter) => {
    setEditId(hunter.id);
    setEditForm({
      email: hunter.email,
      guild: hunter.guild || 0,
      skills: hunter.skills && hunter.skills.length ? hunter.skills : [0],
      first_name: hunter.first_name,
      last_name: hunter.last_name,
      username: hunter.username,
      password: "", // blank for security
      rank: hunter.rank,
    });
  };

  // Edit hunter (PUT)
  const handleEditSubmit = async (form) => {
    const url = `http://localhost:8000/api/hunters/${editId}/`;
    const updatedHunter = await putData(url, form, authFetch);
    if (updatedHunter) {
      setHunters((prev) =>
        prev.map((h) => (h.id === editId ? updatedHunter : h))
      );
      setEditId(null);
      setEditForm(null);
    } else {
      alert("Error updating hunter");
    }
  };

  // Delete hunter
  const handleDelete = async (id) => {
    const url = `http://localhost:8000/api/hunters/${id}/`;
    const result = await deleteData(url, authFetch);
    if (result) {
      setHunters((prev) => prev.filter((h) => h.id !== id));
    } else {
      alert("Error deleting hunter");
    }
  };

  return (
    <>
      <section className="hunters-list">
        <h2>Hunters</h2>
        <p>This is the Hunters Page, where you can manage your hunters.</p>
        <ul>
          {hunters.map((hunter) => (
            <li key={hunter.id}>
              <strong>{hunter.full_name}</strong> ({hunter.rank_display}) —{" "}
              {hunter.email}— Power: {hunter.power_level}— Raids:{" "}
              {hunter.raid_count}
              {isAdmin && isLoggedIn && (
                <>
                  <button onClick={() => handleEditClick(hunter)}>Edit</button>
                  <button onClick={() => handleDelete(hunter.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
      {isAdmin && isLoggedIn && !editId && (
        <section className="hunter-add-form">
          <HunterAddForm onAdd={handleAddHunter} />
        </section>
      )}
      {isAdmin && isLoggedIn && editId && (
        <section className="hunter-edit-form">
          <HunterAddForm
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
    </>
  );
}
