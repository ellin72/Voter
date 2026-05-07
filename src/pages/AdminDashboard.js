import React, { useState } from "react";
import { useVoting } from "../context/VotingContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Trash2, Edit2, Plus, RotateCcw } from "lucide-react";

const AdminDashboard = () => {
  const {
    nurses,
    addNurse,
    updateNurse,
    deleteNurse,
    resetAllVotes,
    getTotalVotes,
  } = useVoting();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDept, setEditDept] = useState("");
  const [newName, setNewName] = useState("");
  const [newDept, setNewDept] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login");
  };

  const handleAddNurse = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const success = await addNurse(newName, newDept);
    if (success) {
      setNewName("");
      setNewDept("");
      setShowAddForm(false);
    }
  };

  const handleEditStart = (nurse) => {
    setEditingId(nurse.id);
    setEditName(nurse.name);
    setEditDept(nurse.department || "");
  };

  const handleEditSave = async (nurseId) => {
    if (!editName.trim()) return;

    const success = await updateNurse(nurseId, editName, editDept);
    if (success) {
      setEditingId(null);
      setEditName("");
      setEditDept("");
    }
  };

  const handleDeleteNurse = async (nurseId) => {
    if (window.confirm("Are you sure you want to delete this nurse?")) {
      await deleteNurse(nurseId);
    }
  };

  const handleResetVotes = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset ALL votes? This cannot be undone.",
      )
    ) {
      const success = await resetAllVotes();
      if (success) {
        alert("All votes have been reset.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Total Votes</p>
            <p className="text-4xl font-bold text-blue-600">
              {getTotalVotes()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Total Nurses</p>
            <p className="text-4xl font-bold text-indigo-600">
              {nurses.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Leading Nurse</p>
            <p className="text-xl font-bold text-yellow-600 truncate">
              {nurses.length > 0 ? nurses[0].name : "N/A"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            Add Nurse
          </button>
          <button
            onClick={handleResetVotes}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            <RotateCcw size={20} />
            Reset All Votes
          </button>
        </div>

        {/* Add Nurse Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Add New Nurse
            </h2>
            <form onSubmit={handleAddNurse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nurse Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter nurse full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  placeholder="e.g., ICU, Emergency, Surgery"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Add Nurse
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Nurses Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-800 p-6 border-b border-gray-200">
            Nurses
          </h2>

          {nurses.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No nurses found. Add a nurse to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Votes
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {nurses.map((nurse) => (
                    <tr key={nurse.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {editingId === nurse.id ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="font-medium text-gray-800">
                            {nurse.name}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === nurse.id ? (
                          <input
                            type="text"
                            value={editDept}
                            onChange={(e) => setEditDept(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-gray-600">
                            {nurse.department || "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          {nurse.votes || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {editingId === nurse.id ? (
                            <>
                              <button
                                onClick={() => handleEditSave(nurse.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold transition"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm font-semibold transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditStart(nurse)}
                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-semibold transition"
                              >
                                <Edit2 size={16} />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteNurse(nurse.id)}
                                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold transition"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
