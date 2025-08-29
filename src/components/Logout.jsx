import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Logout = ({ onLogout }) => {
  const { logoutUser } = useContext(AuthContext);

  const handleClick = () => {
    logoutUser();
    if (onLogout) onLogout();
  };

  return (
    <button className="btn btn-outline btn-error" onClick={handleClick}>
      Logout
    </button>
  );
};

export default Logout;
