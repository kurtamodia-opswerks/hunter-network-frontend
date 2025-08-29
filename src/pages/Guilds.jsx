import { useEffect, useState, useContext } from "react";
import { fetchData } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import GuildAddForm from "../components/GuildAddForm.jsx";

export default function Hunters() {
  const [guilds, setGuilds] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);

  useEffect(() => {
    let isMounted = true;
    // Fetch data when the component mounts
    let url = "http://localhost:8000/api/guilds/";
    fetchData(url)
      .then((data) => {
        if (isMounted) {
          setGuilds(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      // Cleanup function, if needed
      isMounted = false;
    };
  }, []);

  const handleAddGuild = (newGuild) => {
    setGuilds((prev) => [...prev, newGuild]);
  };

  return (
    <>
      {" "}
      <section>
        <h2>Guilds</h2>
        <p>This is the Guilds Page, where you can manage your guilds.</p>
        <ul>
          {guilds.map((guild) => (
            <li key={guild.id}>
              <strong>{guild.name}</strong> ({guild.founded_date}) —{" "}
              {guild.member_count} members — Leader:{" "}
              {guild.leader_display.full_name} (
              {guild.leader_display.rank_display})
            </li>
          ))}
        </ul>
      </section>
      {isAdmin && isLoggedIn && (
        <section className="guild-add-form">
          <GuildAddForm onAdd={handleAddGuild} />
        </section>
      )}
    </>
  );
}
