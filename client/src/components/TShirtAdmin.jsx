import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TShirtAdmin = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, { credentials: 'include' });
            const data = await response.json();

            if (response.ok) {
                // Filter only T-Shirt orders
                const tshirts = data.filter(r => r.event === 'Merchandise: T-Shirt');
                setRegistrations(tshirts);
            } else {
                setError(data.error || 'Failed to fetch data');
            }
        } catch (err) {
            setError('Server error');
        } finally {
            setLoading(false);
        }
    };

    // Calculate Stats
    const totalOrders = registrations.length;
    const sizeStats = registrations.reduce((acc, curr) => {
        const size = curr.tshirtSize || 'Unknown';
        acc[size] = (acc[size] || 0) + 1;
        return acc;
    }, {});

    const downloadCSV = () => {
        if (!registrations.length) return;

        const headers = ["Name,Email,Phone,Size,NameOnShirt,TransactionID,Status,Date"];
        const rows = registrations.map(reg =>
            `"${reg.name}","${reg.email}","${reg.phone}","${reg.tshirtSize}","${reg.tshirtName}","${reg.transactionId}","${reg.status || 'Pending'}","${new Date(reg.createdAt).toLocaleDateString()}"`
        );

        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "metallum_tshirt_orders.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (error) return <div className="min-h-screen bg-[#0a0a0a] text-white flex justify-center items-center">{error}</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-200 p-4 md:p-8 font-sans">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-white/10 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white font-['Orbitron'] tracking-wide">
                            T-SHIRT ORDERS
                        </h1>
                        <p className="text-gray-400 mt-1 font-mono text-sm">
                            // ADMINISTRATION CONSOLE
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={downloadCSV} className="btn btn-success text-white btn-sm">Export CSV</button>
                        <button onClick={() => navigate('/admin')} className="btn btn-outline text-white btn-sm">Back to Dashboard</button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold text-primary">{totalOrders}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Total</div>
                    </div>
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                        <div key={size} className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                            <div className="text-2xl font-bold text-white">{sizeStats[size] || 0}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">Size {size}</div>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white/5 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm">
                    <table className="table table-xs md:table-sm w-full">
                        <thead className="bg-black/40 text-gray-400 font-mono uppercase tracking-wider">
                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Student Info</th>
                                <th>T-Shirt Details</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {registrations.map((reg, index) => (
                                <tr key={reg._id} className="hover:bg-white/5 transition-colors">
                                    <th className="font-mono text-gray-500">{registrations.length - index}</th>
                                    <td>
                                        <div className={`badge ${reg.status === 'Approved' ? 'badge-success' : reg.status === 'Rejected' ? 'badge-error' : 'badge-warning'} badge-outline text-xs font-bold`}>
                                            {reg.status || 'Pending'}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-white">{reg.name}</div>
                                        <div className="text-xs text-gray-500">{reg.email}</div>
                                        <div className="text-xs text-primary font-mono">{reg.phone}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span className="badge badge-lg badge-primary font-bold">{reg.tshirtSize}</span>
                                            <span className="font-mono text-white bg-white/10 px-2 py-1 rounded text-xs">
                                                "{reg.tshirtName}"
                                            </span>
                                        </div>
                                    </td>
                                    <td className="font-mono text-gray-400 text-xs">{reg.transactionId}</td>
                                    <td className="text-gray-500 text-xs">{new Date(reg.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TShirtAdmin;
