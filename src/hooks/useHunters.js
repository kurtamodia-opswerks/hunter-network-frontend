import { useEffect, useState } from "react";
import { fetchData, postData, putData, deleteData } from "../api/api.js";
import { useAuthFetch } from "./useAuthFetch";

export function useHunters(isAdmin, isLoggedIn) {
  const [hunters, setHunters] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const authFetch = useAuthFetch();

  useEffect(() => {
    let isMounted = true;
    let url = "http://localhost:8000/api/hunters/";
    const params = [];
    if (filterParams.search)
      params.push(`search=${encodeURIComponent(filterParams.search)}`);
    if (filterParams.rank)
      params.push(`rank=${encodeURIComponent(filterParams.rank)}`);
    if (params.length) url += "?" + params.join("&");

    fetchData(url)
      .then((data) => {
        if (isMounted) setHunters(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    return () => {
      isMounted = false;
    };
  }, [filterParams]);

  const handleAddHunter = async (form) => {
    const url = "http://localhost:8000/api/hunters/";
    const newHunter = await postData(url, form, authFetch);
    if (newHunter) {
      setHunters((prev) => [...prev, newHunter]);
      setShowAddModal(false);
    } else {
      alert("Error adding hunter");
    }
  };

  const handleEditClick = (hunter) => {
    setEditId(hunter.id);
    setEditForm({
      email: hunter.email,
      guild: hunter.guild || 0,
      skills: hunter.skills && hunter.skills.length ? hunter.skills : [0],
      first_name: hunter.first_name,
      last_name: hunter.last_name,
      username: hunter.username,
      password: "",
      rank: hunter.rank,
    });
  };

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

  const handleDelete = async (id) => {
    const url = `http://localhost:8000/api/hunters/${id}/`;
    const result = await deleteData(url, authFetch);
    if (result) {
      setHunters((prev) => prev.filter((h) => h.id !== id));
    } else {
      alert("Error deleting hunter");
    }
  };

  const handleFilter = (params) => setFilterParams(params);

  return {
    hunters,
    editId,
    editForm,
    showAddModal,
    filterParams,
    setShowAddModal,
    setEditId,
    setEditForm,
    handleAddHunter,
    handleEditClick,
    handleEditSubmit,
    handleDelete,
    handleFilter,
  };
}
