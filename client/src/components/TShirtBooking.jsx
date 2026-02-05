import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const TShirtBooking = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [size, setSize] = useState('');
    const [nameOnShirt, setNameOnShirt] = useState('');
    const [transactionId, setTransactionId] = useState('');
    // New state for user details
    const [userName, setUserName] = useState(user?.name || '');
    const [userEmail, setUserEmail] = useState(user?.email || '');

    // Update state when user context loads
    React.useEffect(() => {
        if (user) {
            setUserName(user.name || '');
            setUserEmail(user.email || '');
        }
    }, [user]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const amount = 599;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Validate all required fields
        if (!size || !nameOnShirt || !transactionId || !userName || !userEmail) {
            setError('Please fill in all fields (Name, Email, Size, Shirt Name, Transaction ID).');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token || ''}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: userName, // Use the form field value
                    email: userEmail, // Use the form field value
                    phone: "0000000000",
                    college: "IIEST",
                    branch: "Meta",
                    year: "2nd",
                    event: "Merchandise: T-Shirt",
                    tshirtSize: size,
                    tshirtName: nameOnShirt,
                    transactionId: transactionId,
                    amount: amount
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Booking failed');
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
                <div className="text-center animate-[scale-in_0.3s_ease-out]">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 font-['Orbitron'] mb-4">
                        ORDER PLACED!
                    </h2>
                    <p className="text-gray-400 font-mono text-lg">Redirecting to Home...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-['Orbitron'] text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    GET YOUR METALLUM T-SHIRT
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* LEFT: PAYMENT QR */}
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                        <h3 className="text-xl font-bold mb-6 font-['Orbitron'] text-primary">SCAN TO PAY</h3>
                        <div className="bg-white p-4 rounded-xl inline-block mb-4">
                            {/* Placeholder QR - Replace with actual */}
                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=7510793132@ybl&pn=Metallum&am=599&tn=TShirt"
                                alt="Payment QR Code"
                                className="w-48 h-48"
                            />
                        </div>
                        <p className="text-sm text-gray-400 font-mono mb-2">UPI ID: 7510793132@ybl</p>
                        <div className="text-3xl font-bold text-white mb-2">₹{amount}</div>
                        <p className="text-xs text-gray-500">Scan via GPay, PhonePe, Paytm</p>
                    </div>

                    {/* RIGHT: FORM */}
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* USER NAME */}
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-2">YOUR NAME</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter Your Name"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    required
                                />
                            </div>

                            {/* USER EMAIL */}
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-2">YOUR EMAIL</label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    required
                                />
                            </div>

                            {/* SIZE SELECTION */}
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-3">SELECT SIZE</label>
                                <div className="flex flex-wrap gap-3">
                                    {sizes.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setSize(s)}
                                            className={`w-12 h-12 rounded-lg font-bold transition-all ${size === s
                                                ? 'bg-primary text-black scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                                : 'bg-white/10 text-gray-400 hover:bg-white/20'
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* NAME INPUT */}
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-2">text ON T-SHIRT</label>
                                <input
                                    type="text"
                                    value={nameOnShirt}
                                    onChange={(e) => setNameOnShirt(e.target.value)}
                                    placeholder="Enter Name to print"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    required
                                />
                            </div>

                            {/* TRANSACTION ID */}
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-2">TRANSACTION ID</label>
                                <input
                                    type="text"
                                    value={transactionId}
                                    onChange={(e) => setTransactionId(e.target.value)}
                                    placeholder="Enter UPI Transaction ID"
                                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm font-mono bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn btn-primary btn-lg mt-4 font-bold tracking-widest"
                            >
                                {loading ? 'PROCESSING...' : 'CONFIRM ORDER'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TShirtBooking;
