<div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Welcome to Hunter Network</h1>
      <p className="py-6">
        Your one-stop solution to manage hunters, guilds, raids, and more. Keep
        track of your guilds' rosters, plan your next raid, and record your
        progress. Hunter Network is free, open-source, and always will be.
      </p>
      {!isLoggedIn ? (
        <button
          className="btn btn-primary"
          onClick={() => setShowLoginModal(true)}
        >
          Get Started
        </button>
      ) : (
        <Logout />
      )}

      {/* Toast */}
      {showToast && (
        <div className="toast fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="alert alert-info">
            <span>✅ Successfully logged in!</span>
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
</div>;
