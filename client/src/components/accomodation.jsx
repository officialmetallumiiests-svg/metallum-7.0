import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function Accomodation() {
  const { user } = useContext(UserContext);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBookClick = () => {
    if (!user) {
      setShowLoginAlert(true);
    } else {
      setShowSuccess(true);
    }
  };

  const amenities = [
    { icon: "🛌", title: "Comfortable Stay", desc: "Clean and hygienic dormitories." },
    { icon: "📶", title: "High-Speed Wi-Fi", desc: "24/7 connectivity for all participants." },
    { icon: "🛡️", title: "24/7 Security", desc: "Safe and secure campus environment." },
    { icon: "🍽️", title: "Food & Dining", desc: "Nutritious meals included in the package." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-primary selection:text-black">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full h-full object-cover opacity-40"
            alt="Accommodation"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 animate-[fade-in_1s_ease-out]">
          <h1 className="text-5xl md:text-7xl font-bold font-['Orbitron'] tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-2xl">
            ACCOMMODATION
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-mono tracking-widest uppercase">
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
                    <span className="text-green-500">✓</span> 3 Days / 2 Nights Stay
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Meal Coupons Included
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Welcome Kit
                  </li>
                </ul>
              </div>

              {/* Right Side / CTA */}
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white tracking-tight">₹499</span>
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
            <a href="/auth/google" className="px-8 py-3 bg-red-600 text-white font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] skew-x-[-10deg] hover:skew-x-[-10deg] no-underline inline-block"><span className="block skew-x-[10deg]">LOGIN NOW</span></a>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS STUB MODAL */}
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
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-green-400 to-green-600 font-['Orbitron'] mb-2">REQUEST SENT</h2>
            <p className="text-gray-400 text-lg font-mono tracking-widest uppercase mb-8">We will contact you shortly.</p>
            <button onClick={() => setShowSuccess(false)} className="px-8 py-3 bg-white text-black font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200">CONTINUE</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Accomodation;
