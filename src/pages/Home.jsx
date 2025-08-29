import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Login from "../components/Login.jsx";
import Logout from "../components/Logout.jsx";

export default function Home() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Callback for Login success
  const handleLoginSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    setShowLoginModal(false);
  };

  const handleLogoutSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    setShowLogoutModal(false);
  };

  return (
    <>
      <div
        className="hero bg-base-200 min-h-screen relative"
        style={{
          backgroundImage: "url('/home-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for opacity */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="hero-content flex-col lg:flex-row-reverse relative z-10">
          <div>
            <h1 className="text-5xl font-bold text-white">
              Welcome to Hunter Network
            </h1>
            <p className="py-6 text-white">
              Your one-stop solution to manage hunters, guilds, raids, and more.
              Keep track of your guilds' rosters, plan your next raid, and
              record your progress. Hunter Network is free, open-source, and
              always will be.
            </p>
            {!isLoggedIn ? (
              <button
                className="btn btn-soft btn-success"
                onClick={() => setShowLoginModal(true)}
              >
                Get Started
              </button>
            ) : (
              <Logout onLogout={handleLogoutSuccess} />
            )}

            {/* Toast */}
            {showToast && (
              <div className="toast fixed top-4 left-1/2 -translate-x-1/2 z-50">
                <div className="alert alert-info">
                  {isLoggedIn ? (
                    <span>👋 Welcome back, {user.username}!</span>
                  ) : (
                    <span>👋 See you again!</span>
                  )}
                </div>
              </div>
            )}

            {/* Modal for Login */}
            {!isLoggedIn && showLoginModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-black rounded-lg shadow-lg p-6 relative w-full max-w-sm">
                  <button
                    className="absolute -top-2 right-2 btn btn-sm btn-circle"
                    onClick={() => setShowLoginModal(false)}
                  >
                    ✕
                  </button>
                  <Login onLoginSuccess={handleLoginSuccess} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
