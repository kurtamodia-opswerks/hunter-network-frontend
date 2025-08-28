import { useEffect, useState } from "react";
import { fetchData } from "../api/api.js";

export default function Hunters() {
  const [hunters, setHunters] = useState([]);

  useEffect(() => {
    let isMounted = true;
    // Fetch data when the component mounts
    let url = "http://localhost:8000/api/hunters/";
    fetchData(url)
      .then((data) => {
        if (isMounted) {
          setHunters(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      // Cleanup function, if needed
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <h2>Hunters</h2>
      <p>This is the Hunters Page, where you can manage your hunters.</p>
      <ul>
        {hunters.map((hunter) => (
          <li key={hunter.id}>
            <strong>{hunter.full_name}</strong> ({hunter.rank_display}) —{" "}
            {hunter.email}— Power: {hunter.power_level}— Raids:{" "}
            {hunter.raid_count}
          </li>
        ))}
      </ul>
    </section>
  );
}
