import { useEffect, useState, useContext } from "react";
import { fetchData } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import HunterAddForm from "../components/HunterAddForm.jsx";

export default function Hunters() {
  const [hunters, setHunters] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);

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

  const handleAddHunter = (newHunter) => {
    setHunters((prev) => [...prev, newHunter]);
  };

  return (
    <>
      {" "}
      <section className="hunters-list">
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
      {isAdmin && isLoggedIn && (
        <section className="hunter-add-form">
          <HunterAddForm onAdd={handleAddHunter} />
        </section>
      )}
    </>
  );
}
