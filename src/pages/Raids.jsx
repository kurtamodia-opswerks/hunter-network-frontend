import { useEffect, useState, useContext } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { AuthContext } from "../context/AuthContext.jsx";
import { fetchAuthData, putData, deleteData } from "../api/api.js";
import RaidAddForm from "../components/RaidAddForm.jsx";

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
    const url = "http://localhost:8000/api/raids/";
    fetchAuthData(url, authFetch)
      .then((data) => {
        if (isMounted) {
          setRaids(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  const handleAddRaid = (newRaid) => {
    setRaids((prev) => [...prev, newRaid]);
  };

  // Start editing a raid
  const handleEditClick = (raid) => {
    setEditId(raid.id);
    setEditForm({
      name: raid.name,
      dungeon: raid.dungeon,
      date: raid.date,
      success: raid.success,
      participations: raid.participations || [],
    });
  };

  // Submit edit
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
