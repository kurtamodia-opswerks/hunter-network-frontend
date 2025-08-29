import { useEffect, useState, useContext } from "react";
import { fetchData, postData, putData, deleteData } from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useAuthFetch } from "../hooks/useAuthFetch";
import HunterAddForm from "../components/HunterAddForm.jsx";
import HunterSearchFilter from "../components/HunterSearchFilter.jsx";
import HunterList from "../components/HunterList.jsx";

export default function Hunters() {
  const [hunters, setHunters] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(user ? user.is_admin : false);
  const authFetch = useAuthFetch();

  // For editing
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // For modal
  const [showAddModal, setShowAddModal] = useState(false);

  // For search/filter
  const [filterParams, setFilterParams] = useState({});

  // Fetch hunters with filter/search
  useEffect(() => {
    let isMounted = true;
    let url = "http://localhost:8000/api/hunters/";

    // Build query string
    const params = [];
    if (filterParams.search) {
      params.push(`search=${encodeURIComponent(filterParams.search)}`);
    }
    if (filterParams.rank) {
      params.push(`rank=${encodeURIComponent(filterParams.rank)}`);
    }
    if (params.length) {
      url += "?" + params.join("&");
    }

    fetchData(url)
      .then((data) => {
        if (isMounted) {
          setHunters(data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
    return () => {
      isMounted = false;
    };
  }, [filterParams]);

  // Add hunter (POST)
  const handleAddHunter = async (form) => {
    const url = "http://localhost:8000/api/hunters/";
    const newHunter = await postData(url, form, authFetch);
    if (newHunter) {
      setHunters((prev) => [...prev, newHunter]);
      setShowAddModal(false); // close modal on success
    } else {
      alert("Error adding hunter");
    }
  };

  // Start editing a hunter
  const handleEditClick = (hunter) => {
    setEditId(hunter.id);
    setEditForm({
      email: hunter.email,
      guild: hunter.guild || 0,
      skills: hunter.skills && hunter.skills.length ? hunter.skills : [0],
      first_name: hunter.first_name,
      last_name: hunter.last_name,
      username: hunter.username,
      password: "", // blank for security
      rank: hunter.rank,
    });
  };

  // Edit hunter (PUT)
  const handleEditSubmit = async (form) => {
    const url = `http://localhost:8000/api/hunters/${editId}/`;
    const updatedHunter = await putData(url, form, authFetch);
    if (updatedHunter) {
      setHunters((prev) =>
        prev.map((h) => (h.id === editId ? updatedHunter : h))
      );
      setEditId(null);
      setEditForm(null);
    } else {
      alert("Error updating hunter");
    }
  };

  // Delete hunter
  const handleDelete = async (id) => {
    const url = `http://localhost:8000/api/hunters/${id}/`;
    const result = await deleteData(url, authFetch);
    if (result) {
      setHunters((prev) => prev.filter((h) => h.id !== id));
    } else {
      alert("Error deleting hunter");
    }
  };

  // Handle filter/search
  const handleFilter = (params) => {
    setFilterParams(params);
  };

  return (
    <>
      <section className="hunters-list">
        <h2>Hunters</h2>
        <p>This is the Hunters Page, where you can manage your hunters.</p>
        <HunterSearchFilter onFilter={handleFilter} />
        {isAdmin && isLoggedIn && (
          <button
            className="btn btn-success mb-4"
            onClick={() => setShowAddModal(true)}
          >
            Add Hunter
          </button>
        )}
        <HunterList
          hunters={hunters}
          isAdmin={isAdmin}
          isLoggedIn={isLoggedIn}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </section>

      {/* Add Hunter Modal */}
      {isAdmin && isLoggedIn && showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-sm">
            <button
              className="absolute -top-2 right-2 btn btn-sm btn-circle"
              onClick={() => setShowAddModal(false)}
            >
              ✕
            </button>
            <HunterAddForm onAdd={handleAddHunter} />
          </div>
        </div>
      )}

      {/* Edit Hunter Modal */}
      {isAdmin && isLoggedIn && editId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-sm">
            <button
              className="absolute -top-2 right-2 btn btn-sm btn-circle"
              onClick={() => {
                setEditId(null);
                setEditForm(null);
              }}
            >
              ✕
            </button>
            <HunterAddForm
              onAdd={handleEditSubmit}
              initialForm={editForm}
              isEdit={true}
              editId={editId}
              onCancel={() => {
                setEditId(null);
                setEditForm(null);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
