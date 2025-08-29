import { useEffect, useState, useContext } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { AuthContext } from "../context/AuthContext.jsx";
import { fetchAuthData, deleteData } from "../api/api.js";

export default function RaidParticipations() {
  const [participations, setParticipations] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);

  const authFetch = useAuthFetch();

  useEffect(() => {
    let isMounted = true;
    const url = "http://localhost:8000/api/raid-participations/";
    fetchAuthData(url, authFetch)
      .then((data) => {
        if (isMounted) {
          setParticipations(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  // Delete participation
  const handleDelete = async (id) => {
    const url = `http://localhost:8000/api/raid-participations/${id}/`;
    const result = await deleteData(url, authFetch);
    if (result) {
      setParticipations((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Error deleting participation");
    }
  };

  return (
    <section>
      <h2>Raid Participations</h2>
      {!isLoggedIn ? (
        <div>
          <p>You need to log in to see raid participations.</p>
        </div>
      ) : (
        <ul>
          {participations.map((p) => (
            <li key={p.id}>
              Raid: {p.raid_id} | Hunter: {p.full_name} | Rank: {p.hunter_rank}{" "}
              | Role: {p.role}
              {isAdmin && isLoggedIn && (
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
