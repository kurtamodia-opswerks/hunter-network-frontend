import { useEffect, useState, useContext } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { AuthContext } from "../context/AuthContext.jsx";
import { fetchAuthData } from "../api/api.js";

export default function Raids() {
  const [raids, setRaids] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const authFetch = useAuthFetch();

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
