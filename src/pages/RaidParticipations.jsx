import { useEffect, useState, useContext } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { AuthContext } from "../context/AuthContext.jsx";

export default function RaidParticipations() {
  const [participations, setParticipations] = useState([]);
  const authFetch = useAuthFetch();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const fetchParticipations = async () => {
      if (!isLoggedIn) return;
      const response = await authFetch(
        "http://localhost:8000/api/raid-participations/"
      );
      if (response.ok) {
        const data = await response.json();
        if (!isMounted) return;
        setParticipations(data);
      } else {
        console.error("Failed to fetch raid participations");
      }
    };

    fetchParticipations();

    return () => {
      isMounted = false;
    };
  }, [authFetch, isLoggedIn]);

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
              Raid: {p.raid} | Hunter: {p.hunter} | Role: {p.role}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
