import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import HunterAddForm from "../components/HunterAddForm.jsx";
import HunterSearchFilter from "../components/HunterSearchFilter.jsx";
import HunterList from "../components/HunterList.jsx";
import { useHunters } from "../hooks/useHunters";

export default function Hunters() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const isAdmin = user ? user.is_admin : false;

  const {
    hunters,
    editId,
    editForm,
    showAddModal,
    setShowAddModal,
    setEditId,
    setEditForm,
    handleAddHunter,
    handleEditClick,
    handleEditSubmit,
    handleDelete,
    handleFilter,
  } = useHunters(isAdmin, isLoggedIn);

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
