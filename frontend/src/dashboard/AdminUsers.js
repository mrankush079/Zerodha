
import React, { useEffect, useState } from "react";
import api from "../auth/axiosInstance"; // ✅ Axios instance with interceptor
import { toast, ToastContainer } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("User fetch error:", err.response?.data || err.message);
        toast.error("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    const result = users.filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
    setPage(1);
  };

  const handleToggleStatus = async (id, current) => {
    try {
      const res = await api.put(`/admin/users/${id}/status`, {
        active: !current,
      });
      toast.success("Status updated");
      const updated = users.map((u) =>
        u._id === id ? { ...u, active: !current } : u
      );
      setUsers(updated);
      setFiltered(updated);
    } catch (err) {
      console.error("Status update error:", err.response?.data || err.message);
      toast.error("Failed to update status");
    }
  };

  const handleExportCSV = () => {
    const rows = filtered.map((u) => ({
      Name: u.name || "—",
      Email: u.email,
      Role: u.role || "user",
      Status: u.active ? "Active" : "Inactive",
      Joined: new Date(u.createdAt).toLocaleDateString(),
    }));

    const csv = [
      Object.keys(rows[0]).join(","),
      ...rows.map((r) => Object.values(r).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="admin-users">
      <h3 className="title">Manage Users ({filtered.length})</h3>

      <div className="admin-controls">
        <input
          type="text"
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleExportCSV}>Export CSV</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u) => (
              <tr key={u._id}>
                <td>{u.name || "—"}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.role}`}>
                    {u.role?.toUpperCase() || "USER"}
                  </span>
                </td>
                <td>{u.active ? "Active" : "Inactive"}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(u._id, u.active)}
                    className="toggle-btn"
                  >
                    {u.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AdminUsers;