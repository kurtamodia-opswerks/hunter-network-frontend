import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export function useAuthFetch() {
  const { authTokens, logoutUser } = useContext(AuthContext);

  const authFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: authTokens ? `Bearer ${authTokens.access}` : "",
    };

    const response = await fetch(url, { ...options, headers });

    // If token expired → logout
    if (response.status === 401) {
      logoutUser();
    }

    return response;
  };

  return authFetch;
}
