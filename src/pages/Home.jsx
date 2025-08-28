import { useState, useEffect } from "react";
import Login from "../components/Login.jsx";
import Logout from "../components/Logout.jsx";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authTokens");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <section>
      <h2>Welcome to Hunter Guild</h2>
      <p>Manage hunters, guilds, raids, and more with ease.</p>
      {isLoggedIn ? (
        <p>
          <strong>You are logged in.</strong>
          <Logout />
        </p>
      ) : (
        <Login />
      )}
    </section>
  );
}
