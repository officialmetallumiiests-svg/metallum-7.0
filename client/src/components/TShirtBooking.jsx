import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const TShirtBooking = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [size, setSize] = useState('');
    const [paymentScreenshot, setPaymentScreenshot] = useState(''); // New state for Base64 image
    const [transactionId, setTransactionId] = useState('');
    // New state for user details
    const [userName, setUserName] = useState(user?.name || '');
    const [userPhone, setUserPhone] = useState('');
    const [showSizeChart, setShowSizeChart] = useState(false);

    const sizeChartData = [
        { size: "S", chest: 40, length: 27 },
        { size: "M", chest: 42, length: 28 },
        { size: "L", chest: 44, length: 29 },
        { size: "XL", chest: 46, length: 30 },
        { size: "XXL", chest: 48, length: 31 }
    ];

    // Update state when user context loads
    React.useEffect(() => {
        if (user) {
            setUserName(user.name || '');
        }
    }, [user]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const amount = 339;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPaymentScreenshot(reader.result); // This is the Base64 string
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Validate all required fields
        if (!size || !paymentScreenshot || !transactionId || !userName || !userPhone) {
            setError('Please fill in all fields (Name, Mobile Number, Size, Payment Screenshot, Transaction ID).');
            return;
        }

        if (userPhone.length !== 10) {
            setError('Please enter a valid 10-digit mobile number.');
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
                    email: user?.email, // Use context email as backend requires it
                    phone: userPhone, // Use the form field value
                    college: "IIEST",
                    branch: "Meta",
                    year: "2nd",
                    event: "Merchandise: T-Shirt",
                    tshirtSize: size,
                    paymentScreenshot: paymentScreenshot, // Send Base64 string
                    transactionId: transactionId,
                    amount: amount
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Booking failed');
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

                        <div className="text-center space-y-4">
                            <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=9993928756@jio&pn=Yash%20Chandekar&am=${amount}&cu=INR`)}`}
                                    alt="Payment QR Code"
                                    className="w-32 h-32 mx-auto"
                                />
                                <p className="text-black font-bold text-lg mt-2">₹{amount}</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs text-gray-400">Scan QR using any UPI App</p>
                                <p className="text-xs text-gray-500">OR</p>
                                <div className="bg-black/30 p-3 rounded text-left space-y-2 text-xs border border-yellow-500">
                                    <div className="flex justify-between"><span className="text-gray-400">UPI ID:</span><span className="text-primary font-mono select-all">9993928756@jio</span></div>
                                    <div className="flex justify-between"><span className="text-gray-400">Name:</span><span className="text-white select-all">Yash Chandekar</span></div>
                                </div>
                            </div>
                            <a
                                href={`upi://pay?pa=9993928756@jio&pn=Yash%20Chandekar&am=${amount}&cu=INR`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline btn-primary btn-sm w-full"
                            >
                                Try 'Pay Now' Button
                            </a>
                        </div>
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

                            {/* MOBILE NUMBER */}
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-2">MOBILE NUMBER</label>
                                <div className="flex relative">
                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-white/10 bg-white/5 text-gray-400 font-mono text-sm select-none">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        value={userPhone}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                            if (val.length <= 10) setUserPhone(val);
                                        }}
                                        placeholder="Enter Phone Number"
                                        className="w-full bg-black/30 border border-white/10 rounded-r-xl p-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* SIZE SELECTION */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-sm font-mono text-gray-400">SELECT SIZE</label>
                                    <button
                                        type="button"
                                        onClick={() => setShowSizeChart(true)}
                                        className="text-primary text-xs font-mono hover:underline"
                                    >
                                        View Size Chart
                                    </button>
                                </div>
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

                            {/* PAYMENT SCREENSHOT UPLOAD */}
                            <div>
                                <label className="block text-sm font-mono text-gray-400 mb-2">PAYMENT SCREENSHOT</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-green-400 transition-all bg-black/30 border border-white/10 rounded-xl p-4"
                                        required
                                    />
                                </div>
                                {paymentScreenshot && (
                                    <p className="text-green-400 text-xs mt-2 font-mono">Screenshot Uploaded ✓</p>
                                )}
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
            {/* Size Chart Modal */ }
    {
        showSizeChart && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowSizeChart(false)}
                />
                <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl animate-[scale-in_0.2s_ease-out]">
                    <button
                        onClick={() => setShowSizeChart(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                    <h3 className="text-xl font-bold font-['Orbitron'] text-center mb-6 text-primary">SIZE CHART</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-400 font-mono text-sm">
                                    <th className="py-3 px-2">Size</th>
                                    <th className="py-3 px-2">Chest (in)</th>
                                    <th className="py-3 px-2">Length (in)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sizeChartData.map((row) => (
                                    <tr key={row.size} className="border-b border-white/5 text-white hover:bg-white/5 transition-colors">
                                        <td className="py-3 px-2 font-bold text-primary">{row.size}</td>
                                        <td className="py-3 px-2">{row.chest}</td>
                                        <td className="py-3 px-2">{row.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-4 font-mono">
                        * Measurements are in inches
                    </p>
                </div>
            </div>
        )
    }
        </div >
    );
};

export default TShirtBooking;
