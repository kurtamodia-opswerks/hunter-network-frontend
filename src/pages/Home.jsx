import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Login from "../components/Login.jsx";
import Logout from "../components/Logout.jsx";

export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <section>
      <h2>Welcome to Hunter Guild</h2>
      <p>Manage hunters, guilds, raids, and more with ease.</p>
      {isLoggedIn ? (
        <p>
          <strong>Welcome {user?.username}!</strong>
          <Logout />
        </p>
      ) : (
        <Login />
      )}
    </section>
  );
}
