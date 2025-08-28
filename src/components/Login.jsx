import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (success) {
      console.log("✅ Logged in!");
      alert("✅ Logged in!");
    } else {
      console.log("❌ Login failed!");
      alert("❌ Login failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
