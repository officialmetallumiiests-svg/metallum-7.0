import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function EventsAll() {
  const { user } = useContext(UserContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerEvent, setRegisterEvent] = useState(null); // Event being registered for
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    college: "",
    branch: "",
    year: "",
    teamName: ""
  });

  const handleRegisterClick = (event) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    setRegisterEvent(event);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Remove any non-numeric characters
      const numericValue = value.replace(/[^0-9]/g, "");
      // Limit to 10 digits
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* ================= TOAST STATE ================= */
  const [toast, setToast] = useState(null); // { message: "", type: "success" | "error" }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const submitRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.phone.length !== 10) {
      showToast("Phone number must be exactly 10 digits", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone: `+91 ${formData.phone}`,
          email: user.email,
          event: registerEvent.title
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setRegisterEvent(null);
        setFormData({ name: "", phone: "", college: "", branch: "", year: "", teamName: "" });
      } else {
        showToast(data.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const events = [
    {
      id: 1,
      title: "Steel Quest",
      category: "Technical",
      description: "A technical quiz based on metallurgy and materials science.",
      details:
        "Covers physical metallurgy, steelmaking, thermodynamics and industrial practices.",
      image:
        "https://metallum.co.in/wp-content/uploads/2025/02/Prorecruit-1.png",
    }, {
      id: 2,
      title: "Steel Quest",
      category: "Technical",
      description: "A technical quiz based on metallurgy and materials science.",
      details:
        "Covers physical metallurgy, steelmaking, thermodynamics and industrial practices.",
      image:
        "https://metallum.co.in/wp-content/uploads/2025/01/METTRICKS-1.png",
    }, {
      id: 3,
      title: "Steel Quest",
      category: "Technical",
      description: "A technical quiz based on metallurgy and materials science.",
      details:
        "Covers physical metallurgy, steelmaking, thermodynamics and industrial practices.",
      image: "https://metallum.co.in/wp-content/uploads/2025/01/METEXPOSITION.png",
    },
    {
      id: 4,
      title: "META POLISH",
      category: "",
      description: "",
      details: "",
      image: "https://metallum.co.in/wp-content/uploads/2025/01/METAPOLISH.png",
    },
    {
      id: 5,
      title: "AK-SEAL-QUIZ",
      category: "",
      description: "",
      details: "Learn defect detection, process optimization and predictive maintenance.",
      image: "https://metallum.co.in/wp-content/uploads/2025/01/AK-SEAL-QUIZ.png",
    },
    {
      id: 6,
      title: "AK-SEAL-QUIZ",
      category: "",
      description: "",
      details: "Learn defect detection, process optimization and predictive maintenance.",
      image: "https://metallum.co.in/wp-content/uploads/2025/01/AK-SEAL-QUIZ.png",
    }
  ];

  return (
    <div className="min-h-screen bg-base-200 px-6 py-12">

      {/* PAGE TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">All Events</h1>
        <p className="opacity-70 mt-2">
          Each event has More Info and Register buttons
        </p>
      </div>

      {/* EVENTS GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-base-100 rounded-xl shadow-lg overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative h-48">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 badge badge-primary">
                {event.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col">
              <h2 className="text-xl font-bold mb-2">
                {event.title}
              </h2>

              <p className="text-sm opacity-70 mb-6">
                {event.description}
              </p>

              {/* 👇 BOTH BUTTONS (ALWAYS PRESENT) */}
              <div className="mt-auto flex gap-3">
                <button
                  className="btn btn-outline btn-primary btn-sm flex-1"
                  onClick={() => setSelectedEvent(event)}
                >
                  More Info
                </button>

                <button
                  className="btn btn-primary btn-sm flex-1"
                  onClick={() => handleRegisterClick(event)}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL SCREEN EVENT INFO MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          />

          <div className="relative z-10 w-full h-full bg-base-100 overflow-y-auto">
            <div className="relative h-72">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />

              <button
                className="absolute top-4 right-4 btn btn-circle btn-sm  bg-black/50 text-white hover:bg-black/70"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 text-white">
                <span className="badge badge-primary mb-2">
                  {selectedEvent.category}
                </span>
                <h2 className="text-3xl font-bold">
                  {selectedEvent.title}
                </h2>
              </div>
            </div>

            <div className="p-8 max-w-4xl mx-auto">
              <p className="text-lg opacity-80 mb-8">
                {selectedEvent.details}
              </p>

              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedEvent(null);
                  handleRegisterClick(selectedEvent);
                }}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTRATION MODAL */}
      {registerEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setRegisterEvent(null)}
          ></div>

          <div className="relative bg-[#0a0a0a] rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.1)] border border-white/10 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-white/5 bg-gradient-to-r from-gray-900 via-black to-gray-900">
              <button
                onClick={() => setRegisterEvent(null)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-['Orbitron'] tracking-wide">
                REGISTER
              </h3>
              <p className="text-sm text-primary font-mono mt-1 tracking-wider opacity-80">
                 // {registerEvent.title.toUpperCase()}
              </p>
            </div>

            {/* Scrollable Form Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form onSubmit={submitRegistration} className="flex flex-col gap-5">

                {/* User Info (Read-only) */}
                {/* User Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1">Email</label>
                    <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-gray-300 text-sm truncate">
                      {user?.email || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-2">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <span className="text-xs text-gray-500 font-mono">ENTER DETAILS</span>
                  <div className="h-px bg-white/10 flex-1"></div>
                </div>

                {/* Phone */}
                <div className="form-control group">
                  <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                    Phone Number
                  </label>
                  <div className="flex relative">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-white/10 bg-white/5 text-gray-400 font-mono text-sm select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input rounded-l-none bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                      placeholder="XXXXXXXXXX"
                    />
                  </div>
                </div>

                {/* College */}
                <div className="form-control group">
                  <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                    College / Institute
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    required
                    className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                    placeholder="e.g. IIEST SHIBPUR"
                  />
                </div>

                {/* Branch (Full Width for long text) */}
                <div className="form-control group">
                  <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                    className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                    placeholder="e.g. METALLURGY AND MATERIALS ENGINEERING"
                  />
                </div>

                {/* Year & Team Name (Grid) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                      Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                      placeholder="e.g. 3rd"
                    />
                  </div>

                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                      Team Name <span className="text-gray-600 normal-case tracking-normal ml-1">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                      placeholder="Enter team name"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full relative overflow-hidden group border-none text-white font-bold tracking-wider"
                    disabled={loading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          PROCESSING...
                        </>
                      ) : (
                        <>
                          CONFIRM REGISTRATION
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowSuccess(false)}></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center animate-[scale-in_0.3s_ease-out]">

            {/* Animated Checkmark Circle */}
            <div className="relative mb-6 group cursor-pointer" onClick={() => setShowSuccess(false)}>
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center bg-black/50 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                <svg
                  className="w-16 h-16 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                    className="animate-[draw_0.6s_ease-out_forwards]"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                  />
                  <style>{`
                    @keyframes draw {
                      to { stroke-dashoffset: 0; }
                    }
                    @keyframes scale-in {
                      0% { opacity: 0; transform: scale(0.5); }
                      100% { opacity: 1; transform: scale(1); }
                    }
                  `}</style>
                </svg>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-green-400 to-green-600 font-['Orbitron'] mb-2 tracking-tight drop-shadow-lg">
              SUCCESS!
            </h2>

            <p className="text-gray-400 text-lg md:text-xl font-mono tracking-widest uppercase mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              Registration Confirmed
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="px-8 py-3 bg-white text-black font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] skew-x-[-10deg] hover:skew-x-[-10deg]"
            >
              <span className="block skew-x-[10deg]">CONTINUE</span>
            </button>

          </div>
        </div>
      )}

      {/* LOGIN ALERT MODAL */}
      {showLoginAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowLoginAlert(false)}></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center animate-[scale-in_0.3s_ease-out]">

            {/* Animated Lock Circle */}
            <div className="relative mb-6 group cursor-pointer" onClick={() => setShowLoginAlert(false)}>
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full border-4 border-red-500 flex items-center justify-center bg-black/50 shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                <svg
                  className="w-14 h-14 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    className="animate-[draw_0.6s_ease-out_forwards]"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                  />
                  <style>{`
                    @keyframes draw {
                      to { stroke-dashoffset: 0; }
                    }
                    @keyframes scale-in {
                      0% { opacity: 0; transform: scale(0.5); }
                      100% { opacity: 1; transform: scale(1); }
                    }
                  `}</style>
                </svg>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-red-500 to-red-700 font-['Orbitron'] mb-2 tracking-tight drop-shadow-lg leading-tight">
              LOGIN REQUIRED
            </h2>

            <p className="text-gray-400 text-lg font-mono tracking-widest uppercase mb-8 max-w-md">
              Access Restricted. Please sign in to register for events.
            </p>

            <a
              href="/auth/google"
              className="px-8 py-3 bg-red-600 text-white font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] skew-x-[-10deg] hover:skew-x-[-10deg] no-underline inline-block"
            >
              <span className="block skew-x-[10deg]">LOGIN NOW</span>
            </a>

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

export default EventsAll;
