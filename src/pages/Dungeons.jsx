import { useEffect, useState, useContext } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Dungeons() {
  const [dungeons, setDungeons] = useState([]);
  const authFetch = useAuthFetch();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const fetchDungeons = async () => {
      if (!isLoggedIn) return; // prevent fetch if not logged in
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
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
