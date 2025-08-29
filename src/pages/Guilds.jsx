import { useEffect, useState, useContext } from "react";
import { fetchData, postData, putData, deleteData } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import GuildAddForm from "../components/GuildAddForm.jsx";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function Guilds() {
  const [guilds, setGuilds] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);
  const authFetch = useAuthFetch();

  // For editing
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let url = "http://localhost:8000/api/guilds/";
    fetchData(url)
      .then((data) => {
        if (isMounted) {
          setGuilds(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
    return () => {
      isMounted = false;
    };
  }, []);

  // Add guild (POST)
  const handleAddGuild = async (form) => {
    const url = "http://localhost:8000/api/guilds/";
    const newGuild = await postData(url, form, authFetch);
    if (newGuild) {
      setGuilds((prev) => [...prev, newGuild]);
    } else {
      alert("Error adding guild");
    }
  };

  // Start editing a guild
  const handleEditClick = (guild) => {
    setEditId(guild.id);
    setEditForm({
      name: guild.name,
      leader: guild.leader_display.id || 0,
    });
  };

  // Edit guild (PUT)
  const handleEditSubmit = async (form) => {
    const url = `http://localhost:8000/api/guilds/${editId}/`;
    const updatedGuild = await putData(url, form, authFetch);
    if (updatedGuild) {
      setGuilds((prev) =>
        prev.map((g) => (g.id === editId ? updatedGuild : g))
      );
      setEditId(null);
      setEditForm(null);
    } else {
      alert("Error updating guild");
    }
  };

  // Delete guild
  const handleDelete = async (id) => {
    const url = `http://localhost:8000/api/guilds/${id}/`;
    const result = await deleteData(url, authFetch);
    if (result) {
      setGuilds((prev) => prev.filter((g) => g.id !== id));
    } else {
      alert("Error deleting guild");
    }
  };

  return (
    <>
      <section>
        <h2>Guilds</h2>
        <p>This is the Guilds Page, where you can manage your guilds.</p>
        <ul>
          {guilds.map((guild) => (
            <li key={guild.id}>
              <strong>{guild.name}</strong> ({guild.founded_date}) —{" "}
              {guild.member_count} members — Leader:{" "}
              {guild.leader_display ? (
                <>
                  {guild.leader_display.full_name} (
                  {guild.leader_display.rank_display})
                </>
              ) : (
                <span>No leader</span>
              )}
              {isAdmin && isLoggedIn && (
                <>
                  <button onClick={() => handleEditClick(guild)}>Edit</button>
                  <button onClick={() => handleDelete(guild.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
      {isAdmin && isLoggedIn && !editId && (
        <section className="guild-add-form">
          <GuildAddForm onAdd={handleAddGuild} />
        </section>
      )}
      {isAdmin && isLoggedIn && editId && (
        <section className="guild-edit-form">
          <GuildAddForm
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
