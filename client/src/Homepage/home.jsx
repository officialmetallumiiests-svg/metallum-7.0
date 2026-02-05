import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export default function Home() {
  const { user } = useContext(UserContext);
  /* ================= EVENT DATE ================= */
  const eventDate = new Date("2026-02-19T00:00:00");
const [ringRotation, setRingRotation] = useState(0);

  /* ================= COUNTDOWN LOGIC ================= */
  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = eventDate - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        completed: true,
      };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      completed: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
  const interval = setInterval(() => {
    setRingRotation((prev) => prev + 0.3); // smooth slow rotation
  }, 16); // ~60fps

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= EVENTS DATA ================= */
  const events = [
    

    {
    id: 5,
    title: "MET-TRICKS",
    category: "Main Event",
    description:
      "A PPT-based competition where participants address real-world technical and industrial problems by presenting practical, innovative solutions while learning through idea exchange and discussion.",
    image:
      "/photoes/eventsposter/Metricks.png",
  },
  {
    id: 6,
    title: "METALLOSCAPE",
    category: "Main Event",
    description:
      "A poster presentation event focused on metallurgy, where teams showcase research concepts and technical understanding through creative visuals and clear scientific communication.",
    image:
      "/photoes/eventsposter/Metalloscape.png",
  },
  {
    id: 7,
    title: "PRORECRUIT",
    category: "Main Event",
    description:
      "A mock placement drive that simulates real recruitment processes, helping participants improve professional skills, gain constructive feedback, and build confidence.",
    image:
      "/photoes/eventsposter/Prorecruit.png",
  },
  {
    id: 8,
    title: "निर्माण ",
    category: "Main Event",
    description:
      "An innovation and pitching platform where aspiring entrepreneurs solve real-world problems and present impactful ideas through dynamic pitches and interactive judge sessions.",
    image:
      "/photoes/eventsposter/Nirman.png",
  },
  {
    id: 9,
    title: "Dr. A. K. Seal Memorial Quiz",
    category: "Main Event",
    description:
      "A fast-paced quiz designed to test logical thinking, speed, and clarity, challenging participants from diverse fields with engaging and thought-provoking questions.",
    image:
      "/photoes/eventsposter/Quiz.png",
  },
  {
    id: 10,
    title: "METAPOLISH",
    category: "Main Event",
    description:
      "A hands-on metallography event combining a screening quiz with practical sample preparation and microstructural analysis using grinding, polishing, etching, and microscopy.",
    image:
      "/photoes/eventsposter/Metapolish.png",
  },
    
  ];

  /* ================= RENDER ================= */
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BACKGROUND VIDEO */}
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh]
          min-w-[100vw] min-h-[56.25vw]
          -translate-x-1/2 -translate-y-1/2 pointer-events-none "
          src="/photoes/background image.png"
          allow="autoplay"
        />
        

        {/* DARK OVERLAY */}
<div className="relative z-20 text-center max-w-4xl px-6 mx-auto">
  <h1
    className="
     relative font-heading font-extrabold uppercase tracking-widest
    text-5xl sm:text-6xl md:text-7xl lg:text-8xl
    text-white
    select-none
    "
    style={{
      WebkitTextStroke: "1.5px #1e3a8a", // royal blue outline
      textShadow: "0 12px 28px rgba(30,64,175,0.4)", // depth, not flashy
    }}
  >
    METALLUM 2026
  </h1>

  {/* underline accent */}
  






          <p className="mt-6 text-lg opacity-90">
           The Annual Techincal Fest of Society Of Students Metallurgist IIEST Shibpur
          </p>

          {/* ================= COUNTDOWN ================= */}
          <div className="mt-6 mb-8 flex flex-wrap justify-center gap-6 text-center">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center min-w-[70px]"
              >
                <span className="text-4xl md:text-5xl font-mono text-white drop-shadow">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="text-xs uppercase tracking-widest opacity-80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events" className="btn btn-primary px-10">
              Explore Events →
            </Link>

            {!user && (
              <a href={`${import.meta.env.VITE_SERVER_URL}/auth/google`} className="btn btn-soft px-10">
                Login 
              </a>
            )}
          </div>
        </div>
      </section>


      {/* ================= ABOUT ================= */}
<section className="relative py-28 bg-black overflow-hidden">

  {/* ================= BACKGROUND FX ================= */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#081a3c] via-[#050b1f] to-black" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.28),transparent_55%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(37,99,235,0.22),transparent_55%)]" />
  <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

  <div className="relative max-w-6xl mx-auto px-5">

    {/* ================= GLASS PANEL ================= */}
    <div className="relative rounded-3xl border border-blue-500/35 bg-black/50 backdrop-blur-xl p-10 md:p-14 overflow-hidden">

      {/* animated border */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none animate-pulse border border-blue-500/15" />

      {/* HUD corners */}
      {["tl","tr","bl","br"].map((c, i) => (
        <span
          key={i}
          className={`
            absolute w-7 h-7 border-blue-500/70
            ${c === "tl" && "top-0 left-0 border-t border-l"}
            ${c === "tr" && "top-0 right-0 border-t border-r"}
            ${c === "bl" && "bottom-0 left-0 border-b border-l"}
            ${c === "br" && "bottom-0 right-0 border-b border-r"}
          `}
        />
      ))}

      {/* ================= BADGE ================= */}
      <div className="flex justify-center mb-6">
        <span className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-xs font-bold tracking-[0.35em] shadow-lg shadow-blue-500/40">
          METALLUM 2026
        </span>
      </div>

      {/* ================= SUBTITLE ================= */}
      <p className="text-center text-[11px] tracking-[0.4em] text-blue-400 mb-6">
        THE METALLURGY AND MATERIALS ENGINEERING FEST • IIEST SHIBPUR
      </p>

     
     

      {/* ================= 7TH EDITION FEATURE CARD ================= */}
      <div className="mt-14 flex justify-center">
        <div className="relative max-w-2xl w-full rounded-2xl bg-gradient-to-r from-blue-900/40 to-cyan-900/30 border border-cyan-400/40 p-6 text-center shadow-xl">
          <p className="text-cyan-300 uppercase tracking-widest text-xs mb-2">
            Legacy Continues
          </p>
          <h3 className="text-2xl font-bold text-white tracking-wide mb-3">
            7<sup>th</sup> Edition of METALLUM
          </h3>
          <p className="text-blue-100/85 text-sm leading-relaxed">
            Building upon years of technical excellence, the 7th edition of
            METALLUM expands its reach with larger participation, deeper
            industry involvement, and next-generation metallurgical challenges.
          </p>
        </div>
      </div>

      {/* ================= EVENTS & DOMAINS ================= */}
   

      {/* ================= TAGLINE ================= */}
      <div className="mt-18 text-center">
        <p className="text-blue-300 tracking-[0.4em] text-xs mt-14">
          ENGINEER • INNOVATE • TRANSFORM
        </p>
      </div>

    </div>
  </div>
</section>




      <section className="relative py-28 overflow-hidden bg-gradient-to-b from-base-100 to-base-200">
  {/* soft glow */}
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]" />

  <div className="max-w-7xl mx-auto px-6">

    {/* ===== Section Header ===== */}
    <div className="text-center mb-16">
      <p className="font-body uppercase tracking-[0.35em] text-xs text-primary mb-3">
        Official Merchandise
      </p>

      <h2 className="font-heading text-4xl md:text-6xl uppercase tracking-wide mb-6">
        METALLUM T-Shirt
      </h2>

      <p className="font-body text-lg opacity-70 max-w-2xl mx-auto">
        Premium METALLUM 2026 T-Shirts crafted for comfort, style, and legacy.
        The wait is almost over.
      </p>
    </div>

    {/* ===== Launch Card ===== */}
    <div className="flex justify-center">
      <div className="relative w-full max-w-xl rounded-3xl border border-primary/20 bg-base-100/70 backdrop-blur-xl p-10 text-center shadow-xl">

        {/* badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full text-xs uppercase tracking-widest bg-primary text-primary-content shadow-lg">
          Launching Soon
        </div>

        {/* spinner */}
        <span className="loading loading-spinner loading-lg text-primary mb-6"></span>

        <h3 className="font-heading text-2xl uppercase tracking-wide mb-3">
          METALLUM 2026 Edition
        </h3>

        <p className="font-body opacity-75 mb-6">
          Limited edition merchandise inspired by engineering, innovation,
          and the spirit of METALLUM.
        </p>

        {/* disabled CTA */}
        <button
          disabled
          className="btn btn-outline btn-primary opacity-60 cursor-not-allowed"
        >
          Notify Me
        </button>
      </div>
    </div>

  </div>
</section>

     {/* ================= EVENTS ================= */}
<section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-3 sm:px-6 bg-[#020617]">

  {/* ===== BACKGROUND ===== */}
  <div
    className="absolute inset-0 -z-30"
    style={{
      background:
        "linear-gradient(135deg, #020617 0%, #061a3a 50%, #020617 100%)",
    }}
  />

  {/* glow layers */}
  <div
    className="absolute inset-0 -z-20"
    style={{
      background:
        "radial-gradient(circle at top, rgba(59,130,246,0.35), transparent 65%)",
    }}
  />
  <div
    className="absolute inset-0 -z-20"
    style={{
      background:
        "radial-gradient(circle at bottom, rgba(37,99,235,0.35), transparent 65%)",
    }}
  />

  {/* blobs */}
 <div className="
  mb-6
  sm:mb-8
  lg:mb-14
  lg:-translate-y-8
  text-center
  z-10
">
  <p className="uppercase tracking-[0.5em] text-[9px] sm:text-xs text-blue-400">
    Featured Events
  </p>
  <h2 className="mt-1 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white">
    Tech Fest
  </h2>
</div>



  {/* ===== 3D CAROUSEL ===== */}
  <div
    className="relative w-full flex justify-center items-center"
    style={{
      height: "clamp(240px, 50vh, 560px)",
      perspective: "clamp(900px, 1200px, 1600px)",
    }}
  >
    <div
      className="relative carousel-3d"
      style={{
        width: "100%",
        maxWidth: "900px",
        height: "clamp(260px, 50vh, 440px)",
        transformStyle: "preserve-3d",
        animation: "spin 40s linear infinite",
      }}
    >
      {events.map((event, index) => {
        const angle = (360 / events.length) * index;

        return (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `
                rotateY(${angle}deg)
                translateZ(clamp(160px, 32vw, 420px))
              `,
            }}
          >
            {/* ===== CARD ===== */}
           <div
  className="
    group relative
    w-[160px] h-[220px]        /* 📱 mobile smaller */
    sm:w-[220px] sm:h-[300px]
    lg:w-[250px] lg:h-[330px]
    rounded-3xl overflow-hidden
    border border-blue-400/30
    transition-transform duration-500
    hover:scale-105
  "
  style={{
    background: "rgba(10,20,40,0.65)",
    boxShadow:
      "0 0 30px rgba(59,130,246,0.6), 0 0 70px rgba(37,99,235,0.45)",
    backdropFilter: "blur(12px)",
  }}
>
            
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                draggable="false"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-end">
                <h3 className="text-sm sm:text-base font-semibold uppercase text-white">
                  {event.title}
                </h3>

                <p className="text-[10px] uppercase tracking-widest text-blue-300 mt-1">
                  {event.category}
                </p>

                <p className="text-xs sm:text-sm text-white/85 mt-2 line-clamp-2 sm:line-clamp-3">
                  {event.description}
                </p>

                <Link
                  to="/events"
                  className="mt-3 btn btn-xs sm:btn-sm bg-blue-600 hover:bg-blue-700 text-white border-0 w-fit"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>

  {/* ===== KEYFRAMES ===== */}
  <style>{`
    @keyframes spin {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }

    .carousel-3d:hover {
      animation-play-state: paused;
    }

    @media (max-width: 640px) {
      .carousel-3d {
        animation-duration: 55s;
      }
    }
  `}</style>
</section>






<section className="py-24 bg-base-200 overflow-hidden">
  <div className="relative w-full overflow-hidden">

    {/* GRADIENT EDGES */}
    <div className="pointer-events-none absolute left-0 top-0 h-full w-40 z-10 bg-gradient-to-r from-base-200 to-transparent" />
    <div className="pointer-events-none absolute right-0 top-0 h-full w-40 z-10 bg-gradient-to-l from-base-200 to-transparent" />

    {/* MOVING TRACK */}
    <div className="rtl-track flex gap-10">
      {[...Array(2)].flatMap(() => [
        "/photoes/gallery.png",
        "/photoes/metallum Collage 2.jpeg",
        "/photoes/metallum collage .png",
        "/photoes/gallery.png",
        "/photoes/metallum collage .png",
        "/photoes/metallum Collage 2.jpeg",
        "/photoes/White Post.png",
      ]).map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Gallery ${index}`}
          className="
            w-[360px] h-[480px]
            object-cover
            rounded-[32px]
            flex-shrink-0
          "
          style={{
            boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
          }}
        />
      ))}
    </div>
  </div>

  {/* INLINE STYLE — SAME PAGE ONLY */}
  <style jsx>{`
    .rtl-track {
      width: max-content;
      animation: rtl-loop 30s linear infinite;
    }

    @keyframes rtl-loop {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `}</style>
</section>




       

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
              Access Restricted. Please sign in to buy.
            </p>

            <a
              href={`${import.meta.env.VITE_SERVER_URL}/auth/google`}
              className="px-8 py-3 bg-red-600 text-white font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] skew-x-[-10deg] hover:skew-x-[-10deg] no-underline inline-block"
            >
              <span className="block skew-x-[10deg]">LOGIN NOW</span>
            </a>

          </div>
        </div>
      )}
    </>
  );
}
