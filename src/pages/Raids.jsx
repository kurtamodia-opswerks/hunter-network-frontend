import { useEffect, useState, useContext } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Raids() {
  const [raids, setRaids] = useState([]);
  const authFetch = useAuthFetch();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchRaids = async () => {
      if (!isLoggedIn) return;
      const response = await authFetch("http://localhost:8000/api/raids/");
      if (response.ok) {
        const data = await response.json();
        setRaids(data);
      } else {
        console.error("Failed to fetch raids");
      }
    };

    fetchRaids();
  }, [authFetch, isLoggedIn]);

  return (
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
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
