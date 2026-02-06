import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Edit State
    const [editingReg, setEditingReg] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    // Filter State
    const [selectedEvent, setSelectedEvent] = useState("All Events");

    const navigate = useNavigate();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, { credentials: 'include' });
            const data = await response.json();

            if (response.ok) {
                setRegistrations(data);
            } else {
                setError(data.error || 'Failed to fetch data');
            }
        } catch (err) {
            setError('Server error');
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const uniqueEvents = ["All Events", ...new Set(registrations.map(r => r.event))];
    const filteredRegistrations = selectedEvent === "All Events"
        ? registrations
        : registrations.filter(r => r.event === selectedEvent);

    // 1. EXPORT TO CSV
    const downloadCSV = () => {
        if (!filteredRegistrations.length) return;

        const headers = ["Name,Email,Phone,College,Branch,Year,Event,Team,Status,Transaction ID,Date"];
        const rows = filteredRegistrations.map(reg =>
            `"${reg.name}","${reg.email}","${reg.phone}","${reg.college}","${reg.branch}","${reg.year}","${reg.event}","${reg.teamName || ''}","${reg.status || 'Pending'}","${reg.transactionId || 'N/A'}","${new Date(reg.createdAt).toLocaleDateString()}"`
        );

        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `metallum_registrations_${selectedEvent.replace(' ', '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 2. DELETE REGISTRATION
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this registration?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register/${id}`, { method: 'DELETE', credentials: 'include' });
            if (response.ok) {
                setRegistrations(registrations.filter(r => r._id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (err) {
            alert("Error deleting");
        }
    };

    // 3. EDIT HANDLERS
    const openEditModal = (reg) => {
        setEditingReg(reg);
        setEditFormData({ ...reg });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register/${editingReg._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editFormData),
                credentials: 'include'
            });

            if (response.ok) {
                const updated = await response.json();
                setRegistrations(registrations.map(r => r._id === editingReg._id ? updated.data : r));
                setEditingReg(null); // Close modal
            } else {
                alert("Failed to update");
            }
        } catch (err) {
            alert("Error updating");
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
                credentials: 'include'
            });

            if (response.ok) {
                const updated = await response.json();
                setRegistrations(registrations.map(r => r._id === id ? updated.data : r));
            } else {
                alert("Failed to update status");
            }
        } catch (err) {
            alert("Error updating status");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Approved': return 'badge-success';
            case 'Rejected': return 'badge-error';
            default: return 'badge-warning';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white gap-4">
                <h1 className="text-3xl font-bold text-red-500 font-['Orbitron']">ACCESS DENIED</h1>
                <p className="text-gray-400 font-mono">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="btn btn-outline btn-primary"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200 p-4 md:p-8 font-sans">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-white/10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white font-['Orbitron'] tracking-wide">
                            ADMIN DASHBOARD
                        </h1>
                        <p className="text-gray-400 mt-1 font-mono text-sm">
                            // TOTAL REGISTRATIONS: <span className="text-primary font-bold">{filteredRegistrations.length}</span>
                            {selectedEvent !== "All Events" && <span className="text-gray-500 ml-2">(Filtered from {registrations.length})</span>}
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        {/* Filter Dropdown */}
                        <div className="flex flex-wrap gap-3 items-center">
                            <select
                                className="select select-sm bg-white/10 border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-primary h-10 min-h-0 rounded-lg"
                                value={selectedEvent}
                                onChange={(e) => setSelectedEvent(e.target.value)}
                            >
                                {uniqueEvents.map(event => (
                                    <option key={event} value={event} className="bg-black text-white">{event}</option>
                                ))}
                            </select>

                            <button
                                onClick={downloadCSV}
                                className="h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center gap-2"
                            >
                                <span>Export CSV</span>
                            </button>
                            <button
                                onClick={() => navigate('/admin/tshirts')}
                                className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center gap-2"
                            >
                                <span>T-Shirt Dashboard</span>
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="h-10 px-4 rounded-lg border border-white/20 hover:bg-white/10 text-white font-bold text-sm transition-all"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto bg-white/5 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm">
                    <table className="table table-xs md:table-sm w-full">
                        {/* head */}
                        <thead className="bg-black/40 text-gray-400 font-mono uppercase tracking-wider">
                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Event</th>
                                <th>Transaction ID</th>
                                <th>Details</th>
                                <th>Date</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredRegistrations.map((reg, index) => (
                                <tr key={reg._id} className="hover:bg-white/5 transition-colors">
                                    <th className="font-mono text-gray-500">{filteredRegistrations.length - index}</th>

                                    {/* Status Badge */}
                                    <td>
                                        <div className={`badge ${getStatusBadge(reg.status || 'Pending')} badge-outline text-xs font-bold`}>
                                            {reg.status || 'Pending'}
                                        </div>
                                    </td>

                                    <td className="font-bold text-white">
                                        {reg.name} <br />
                                        <span className="text-xs text-gray-500 font-normal">{reg.email}</span>
                                    </td>

                                    <td className="font-mono text-primary">{reg.phone}</td>

                                    <td>
                                        <span className="badge badge-primary badge-outline text-xs">
                                            {reg.event}
                                        </span>
                                    </td>

                                    <td className="font-mono text-yellow-500 text-xs text-nowrap">
                                        {reg.transactionId || '-'}
                                    </td>

                                    <td className="text-xs text-gray-400 max-w-xs truncate">
                                        {reg.college}, {reg.branch}
                                        {reg.teamName && <div className="text-gray-500 italic">Team: {reg.teamName}</div>}
                                    </td>

                                    <td className="text-gray-500 text-xs text-nowrap">
                                        {new Date(reg.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* Quick Approve/Reject for Pending */}
                                            {(reg.status === 'Pending' || !reg.status) && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(reg._id, 'Approved')}
                                                        className="btn btn-xs btn-ghost text-success hover:bg-success/10"
                                                        title="Approve"
                                                    >
                                                        ✅
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(reg._id, 'Rejected')}
                                                        className="btn btn-xs btn-ghost text-error hover:bg-error/10"
                                                        title="Reject"
                                                    >
                                                        ❌
                                                    </button>
                                                </>
                                            )}

                                            <button
                                                onClick={() => openEditModal(reg)}
                                                className="btn btn-xs btn-ghost text-info hover:bg-info/10"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(reg._id)}
                                                className="btn btn-xs btn-ghost text-error hover:bg-error/10"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EDIT MODAL */}
            {editingReg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#111] border border-white/10 rounded-xl p-6 w-full max-w-lg shadow-2xl relative">
                        <h3 className="text-xl font-bold mb-4 font-['Orbitron']">Edit Registration</h3>

                        <form onSubmit={handleUpdate} className="grid gap-3">
                            <div className="grid grid-cols-2 gap-3">
                                <label className="form-control">
                                    <div className="label"><span className="label-text-alt uppercase text-gray-500">Status</span></div>
                                    <select
                                        name="status"
                                        value={editFormData.status || 'Pending'}
                                        onChange={handleEditChange}
                                        className="select select-bordered select-sm bg-black/50 border-white/20"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </label>
                                <label className="form-control">
                                    <div className="label"><span className="label-text-alt uppercase text-gray-500">Event</span></div>
                                    <input type="text" name="event" value={editFormData.event} onChange={handleEditChange} className="input input-bordered input-sm bg-black/50 border-white/20" />
                                </label>
                            </div>

                            <label className="form-control">
                                <div className="label"><span className="label-text-alt uppercase text-gray-500">Name</span></div>
                                <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} className="input input-bordered input-sm bg-black/50 border-white/20" />
                            </label>

                            <div className="grid grid-cols-2 gap-3">
                                <label className="form-control">
                                    <div className="label"><span className="label-text-alt uppercase text-gray-500">Phone</span></div>
                                    <input type="text" name="phone" value={editFormData.phone} onChange={handleEditChange} className="input input-bordered input-sm bg-black/50 border-white/20" />
                                </label>
                                <label className="form-control">
                                    <div className="label"><span className="label-text-alt uppercase text-gray-500">College</span></div>
                                    <input type="text" name="college" value={editFormData.college} onChange={handleEditChange} className="input input-bordered input-sm bg-black/50 border-white/20" />
                                </label>
                            </div>

                            <label className="form-control">
                                <div className="label"><span className="label-text-alt uppercase text-gray-500">Team Name</span></div>
                                <input type="text" name="teamName" value={editFormData.teamName || ''} onChange={handleEditChange} className="input input-bordered input-sm bg-black/50 border-white/20" />
                            </label>

                            <div className="flex gap-2 mt-4">
                                <button type="button" onClick={() => setEditingReg(null)} className="btn btn-sm btn-ghost flex-1">Cancel</button>
                                <button type="submit" className="btn btn-sm btn-primary flex-1">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
