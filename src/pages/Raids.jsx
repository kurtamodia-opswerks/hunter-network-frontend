import { useEffect, useState, useContext } from "react";
import { postData, putData, deleteData } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import RaidAddForm from "../components/RaidAddForm.jsx";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function Raids() {
  const [raids, setRaids] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);
  const authFetch = useAuthFetch();

  // For editing
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let url = "http://localhost:8000/api/raids/";
    authFetch(url)
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed to fetch raids");
        const data = await response.json();
        if (isMounted) {
          setRaids(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
    return () => {
      isMounted = false;
    };
  }, []);

  // Add raid (POST)
  const handleAddRaid = async (form) => {
    const url = "http://localhost:8000/api/raids/";
    const newRaid = await postData(url, form, authFetch);
    if (newRaid) {
      setRaids((prev) => [...prev, newRaid]);
    } else {
      alert("Error adding raid");
    }
  };

  // Start editing a raid
  const handleEditClick = (raid) => {
    setEditId(raid.id);
    setEditForm({
      name: raid.name,
      dungeon: raid.dungeon,
      date: raid.date,
      success: raid.success,
      participations_create: raid.participations_create || [],
    });
  };

  // Edit raid (PUT)
  const handleEditSubmit = async (form) => {
    const url = `http://localhost:8000/api/raids/${editId}/`;
    const updatedRaid = await putData(url, form, authFetch);
    if (updatedRaid) {
      setRaids((prev) => prev.map((r) => (r.id === editId ? updatedRaid : r)));
      setEditId(null);
      setEditForm(null);
    } else {
      alert("Error updating raid");
    }
  };

  // Delete raid
  const handleDelete = async (id) => {
    const url = `http://localhost:8000/api/raids/${id}/`;
    const result = await deleteData(url, authFetch);
    if (result) {
      setRaids((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Error deleting raid");
    }
  };

  return (
    <>
      <section>
        <h2>Raids</h2>
        {!isLoggedIn ? (
          <div>
            <p>You need to log in to see the raids.</p>
          </div>
        ) : (
          <ul>
            {raids.map((raid) => (
              <li key={raid.id}>
                <strong>{raid.name}</strong> Dungeon: {raid.dungeon} Date:{" "}
                {raid.date} Status: {raid.success ? "Success" : "Failed"}
                {isAdmin && isLoggedIn && (
                  <>
                    <button onClick={() => handleEditClick(raid)}>Edit</button>
                    <button onClick={() => handleDelete(raid.id)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      {isAdmin && isLoggedIn && !editId && (
        <section className="raid-add-form">
          <RaidAddForm onAdd={handleAddRaid} />
        </section>
      )}
      {isAdmin && isLoggedIn && editId && (
        <section className="raid-edit-form">
          <RaidAddForm
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
