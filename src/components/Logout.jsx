import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <>
      <button className="btn btn-outline btn-error" onClick={logoutUser}>
        Logout
      </button>
    </>
  );
};

export default Logout;
