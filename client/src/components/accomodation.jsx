import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function Accomodation() {
  const { user } = useContext(UserContext);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    college: "",
    department: "", // Added department
    transactionId: ""
  });

  const amenities = [
    { icon: "🛌", title: "Comfortable Stay", desc: "Clean and hygienic dormitories." },
    { icon: "📶", title: "High-Speed Wi-Fi", desc: "24/7 connectivity for all participants." },
    { icon: "🛡️", title: "24/7 Security", desc: "Safe and secure campus environment." },
    { icon: "🍽️", title: "Food & Dining", desc: "Nutritious meals included in the package." },
  ];

  /* ================= HANDLERS ================= */
  const handleBookClick = () => {
    if (!user) {
      setShowLoginAlert(true);
    } else {
      setShowBookModal(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.phone.length !== 10) {
      showToast("Phone number must be exactly 10 digits", "error");
      setLoading(false);
      return;
    }
    if (!formData.transactionId) {
      showToast("Transaction ID is required", "error");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        phone: `+91 ${formData.phone}`,
        email: user.email,
        event: "ACCOMMODATION",
        branch: formData.department, // Map department to branch
        amount: 799
      };

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        setShowBookModal(false);
        setShowSuccess(true);
        setFormData({ name: "", phone: "", gender: "", college: "", transactionId: "" });
      } else {
        showToast(data.message || "Booking failed", "error");
      }
    } catch (error) {
      console.error("Booking error:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-primary selection:text-black">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/photoes/acc background.jpeg"
            alt="Accommodation"
            className="w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 text-center px-6">
          <h1
  className="
    text-3xl sm:text-4xl md:text-6xl lg:text-7xl
    font-['Orbitron'] font-extrabold
    tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.25em]
    text-white
    drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]
    mb-4 sm:mb-6
    text-center
    animate-pulse
    leading-tight
    break-words
  "
>
  ACCOMMODATION
</h1>

          <p
            className="
        text-sm sm:text-base md:text-lg
        text-gray-300
        font-mono
        tracking-widest
        uppercase
      "
          >
            Experience Comfort & Convenience
          </p>
        </div>
      </section>


      {/* ================= DETAILS SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* INTRO TEXT */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 font-['Orbitron'] text-primary">YOUR STAY AT METALLUM</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            We ensure a hassle-free stay for all participants coming from across the country.
            Enjoy a comfortable environment within the IIEST Shibpur campus, allowing you to focus entirely on the events and networking.
          </p>
        </div>

        {/* AMENITIES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {amenities.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ================= PRICING CARD ================= */}
        <div className="relative max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl p-1 border border-white/20 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-black font-bold text-xs px-4 py-2 rounded-bl-xl z-20 font-mono">
            LIMITED SLOTS
          </div>

          <div className="bg-[#0f0f0f] rounded-[22px] p-8 md:p-12 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

              {/* Left Side */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2 font-['Orbitron']">STANDARD PACKAGE</h3>
                <ul className="text-gray-400 space-y-2 mt-4 text-sm font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Welcome Kit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Meal Coupons Included
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> 3 Days / 2 Nights Stay
                  </li>
                </ul>
              </div>

              {/* Right Side / CTA */}
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white tracking-tight">₹799</span>
                  <span className="text-gray-500 text-sm block mt-1">per person</span>
                </div>

                <button
                  onClick={handleBookClick}
                  className="btn btn-primary btn-lg px-10 w-full md:w-auto shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] border-none text-white"
                >
                  BOOK ACCOMMODATION
                </button>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ================= MODALS ================= */}

      {/* REGISTRATION FORM MODAL */}
      {showBookModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={() => setShowBookModal(false)}></div>
          <div className="relative bg-[#0a0a0a] rounded-2xl shadow-[0_0_50px_rgba(0,100,255,0.1)] border border-white/10 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-white/5 bg-gradient-to-r from-gray-900 via-black to-gray-900">
              <button onClick={() => setShowBookModal(false)} className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-['Orbitron'] tracking-wide">BOOKING</h3>
              <p className="text-sm text-primary font-mono mt-1 tracking-wider opacity-80">// ACCOMMODATION</p>
            </div>

            {/* Form Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form onSubmit={submitBooking} className="flex flex-col gap-5">

                {/* Name & Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="input bg-black/20 border border-white/10 focus:border-primary/50 text-white w-full placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="Full Name" />
                  </div>
                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required className="select bg-black/20 border border-white/10 focus:border-primary/50 text-white w-full focus:outline-none focus:ring-1 focus:ring-primary/50">
                      <option value="" disabled>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Phone */}
                <div className="form-control group">
                  <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">Phone Number</label>
                  <div className="flex relative">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-white/10 bg-white/5 text-gray-400 font-mono text-sm select-none">+91</span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="input rounded-l-none bg-black/20 border border-white/10 focus:border-primary/50 text-white w-full placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="XXXXXXXXXX" />
                  </div>
                </div>

                {/* College & Department */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">College / Institute</label>
                    <input type="text" name="college" value={formData.college} onChange={handleInputChange} required className="input bg-black/20 border border-white/10 focus:border-primary/50 text-white w-full placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="University Name" />
                  </div>
                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleInputChange} required className="input bg-black/20 border border-white/10 focus:border-primary/50 text-white w-full placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="e.g. CSE, IT" />
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-4 mt-4 bg-white/5 p-4 rounded-lg border border-primary/30">
                  <div className="flex items-center gap-4 my-2">
                    <div className="h-px bg-primary/20 flex-1"></div>
                    <span className="text-xs text-primary font-mono tracking-widest">PAYMENT REQUIRED</span>
                    <div className="h-px bg-primary/20 flex-1"></div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent("upi://pay?pa=9993928756@jio&pn=Yash Chandekar&am=799&cu=INR")}`}
                        alt="Payment QR Code"
                        className="w-32 h-32 mx-auto"
                      />
                      <p className="text-black font-bold text-lg mt-2">₹799</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-400">Scan QR using any UPI App</p>
                      <p className="text-xs text-gray-500">OR</p>
                      <div className="bg-black/30 p-3 rounded text-left space-y-2 text-xs border border-yellow-500">
                        <div className="flex justify-between"><span className="text-gray-400">UPI ID:</span><span className="text-primary font-mono select-all">9993928756@jio</span></div>
                        <div className="flex justify-between"><span className="text-gray-400">Name:</span><span className="text-white select-all">Yash Chandekar</span></div>
                      </div>
                    </div>
                    <a href="upi://pay?pa=9993928756@jio&pn=Yash%20Chandekar&am=799&cu=INR" target="_blank" rel="noreferrer" className="btn btn-outline btn-primary btn-sm w-full">Try 'Pay Now' Button</a>
                  </div>

                  <div className="form-control group mt-4">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">Transaction ID / UTR</label>
                    <input type="text" name="transactionId" value={formData.transactionId} onChange={handleInputChange} required className="input bg-black/40 border border-white/10 focus:border-primary/50 text-white w-full placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="Enter Transaction ID" />
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-primary w-full relative overflow-hidden group border-none text-white font-bold tracking-wider" disabled={loading}>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? <span className="loading loading-spinner loading-sm"></span> : "CONFIRM BOOKING"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* LOGIN ALERT MODAL */}
      {showLoginAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowLoginAlert(false)}></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center animate-[scale-in_0.3s_ease-out]">
            <div className="relative mb-6 group cursor-pointer" onClick={() => setShowLoginAlert(false)}>
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full border-4 border-red-500 flex items-center justify-center bg-black/50 shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                <svg className="w-14 h-14 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-red-500 to-red-700 font-['Orbitron'] mb-2 tracking-tight drop-shadow-lg leading-tight">LOGIN REQUIRED</h2>
            <p className="text-gray-400 text-lg font-mono tracking-widest uppercase mb-8 max-w-md">Access Restricted. Please sign in to book accommodation.</p>
            <a href={`${import.meta.env.VITE_SERVER_URL}/auth/google`} className="px-8 py-3 bg-red-600 text-white font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] skew-x-[-10deg] hover:skew-x-[-10deg] no-underline inline-block"><span className="block skew-x-[10deg]">LOGIN NOW</span></a>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowSuccess(false)}></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center animate-[scale-in_0.3s_ease-out]">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center bg-black/50 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-green-400 to-green-600 font-['Orbitron'] mb-2">BOOKING CONFIRMED!</h2>
            <p className="text-gray-400 text-lg font-mono tracking-widest uppercase mb-8">We will verify your payment and contact you shortly.</p>
            <button onClick={() => setShowSuccess(false)} className="px-8 py-3 bg-white text-black font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200">CONTINUE</button>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="toast toast-end toast-bottom z-[100]">
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} text-white`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default Accomodation;
