import { useEffect, useState } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";

export default function Dungeons() {
  const [dungeons, setDungeons] = useState([]);
  const authFetch = useAuthFetch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchDungeons = async () => {
      const res = await authFetch("http://localhost:8000/api/dungeons/");
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        setDungeons(data);
      } else {
        console.error("Failed to fetch dungeons");
      }
    };

    fetchDungeons();

    return () => {
      // Cleanup function, if needed
    };
  }, [authFetch]);

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
