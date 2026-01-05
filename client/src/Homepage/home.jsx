import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);
  /* ================= EVENT DATE ================= */
  const eventDate = new Date("2026-02-15T00:00:00");

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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBuyClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLoginAlert(true);
    }
  };

  /* ================= CAROUSEL HELPERS ================= */
  const carouselRef = useRef(null);

  const scrollToSlide = (id) => {
    const slide = carouselRef.current?.querySelector(`#${id}`);
    slide?.scrollIntoView({ behavior: "smooth", inline: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= EVENTS DATA ================= */
  const events = [
    {
      id: 1,
      title: "Steel Quest",
      category: "Technical",
      description: "A technical quiz based on metallurgy and materials science.",
      image:
        "https://metallum.co.in/wp-content/uploads/2025/02/Prorecruit-1.png",
    },
    {
      id: 2,
      title: "MetTricks",
      category: "Technical",
      description: "Brain-teasing metallurgy challenges.",
      image:
        "https://metallum.co.in/wp-content/uploads/2025/01/METTRICKS-1.png",
    },
    {
      id: 3,
      title: "MetExposition",
      category: "Technical",
      description: "Showcase innovative metallurgical ideas.",
      image:
        "https://metallum.co.in/wp-content/uploads/2025/01/METEXPOSITION.png",
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
          -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src="https://www.youtube.com/embed/AATLBElSkVk?autoplay=1&mute=1&loop=1&playlist=AATLBElSkVk&controls=0&playsinline=1"
          allow="autoplay"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* CONTENT */}
        <div className="relative z-20 text-center max-w-3xl px-6 text-white">
          <h1 className="font-heading text-5xl md:text-7xl uppercase tracking-wide">
            METALLUM 2026
          </h1>

          <p className="mt-6 text-lg opacity-90">
            The Annual Metallurgical Fest where Innovation meets Industry.
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
                <span className="text-4xl md:text-5xl font-mono text-primary drop-shadow">
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
              <a href={`${import.meta.env.VITE_SERVER_URL}/auth/google`} className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition">
                Login with Google
              </a>
            )}
          </div>
        </div>
      </section>


      {/* ================= ABOUT ================= */}
      <section className="py-24 bg-base-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary mb-3 font-body">
              About the Fest
            </p>

            <h2 className="font-heading text-4xl md:text-5xl tracking-wide uppercase mb-6">
              Where <span className="text-primary">Metallurgy</span> Meets{" "}
              <span className="text-secondary">Innovation</span>
            </h2>

            <p className="font-body text-lg opacity-80 leading-relaxed">
              METALLUM is the annual Metallurgical Engineering fest of IIEST
              Shibpur, designed to bridge academia and industry through
              competitions, expert talks, workshops, and hands-on challenges.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-5 transition-shadow">
              {[
                "🔧 Technical Competitions",
                "🏭 Industrial Workshops",
                "🎙️ Expert Talks",
                "🤝 Industry Networking",
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 bg-base-100 rounded-xl shadow font-body"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <img
            src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg"
            alt="Metallum"
            className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      <section className="py-28 bg-gradient-to-b from-base-100 to-base-200">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="font-body uppercase tracking-[0.3em] text-xs text-primary mb-3">
              Official Merchandise
            </p>

            <h2 className="font-heading text-4xl md:text-6xl uppercase tracking-wide mb-6">
              METALLUM T-Shirt
            </h2>

            <p className="font-body text-lg opacity-70 max-w-2xl mx-auto">
              Wear the spirit of Metallum — premium quality, industrial design,
              limited edition merchandise.
            </p>
          </div>

          {/* CARD + CTA */}
          <div className="flex flex-col items-center">

            {/* CARD */}
            <div className="hover-3d group w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl">
              <figure className="relative bg-base-100 rounded-3xl overflow-hidden shadow-2xl">

                <img
                  src="https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg"
                  alt="METALLUM Official T-Shirt"
                  className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-body px-3 py-1 rounded-full">
                  Limited Edition
                </span>

                <figcaption className="absolute bottom-0 w-full bg-black/70 text-white p-5 backdrop-blur">
                  <h3 className="font-heading text-lg uppercase tracking-wide">
                    METALLUM 2025 T-Shirt
                  </h3>

                  <p className="font-body text-sm opacity-80 mt-1">
                    Premium Cotton • Unisex Fit • Industrial Print
                  </p>

                  <div className="mt-4">
                    <span className="font-body text-xl font-semibold text-secondary">
                      ₹599
                    </span>
                  </div>
                </figcaption>
              </figure>

              {/* 3D hover layers */}
              <div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div>
            </div>

            {/* CTA BUTTON (OUTSIDE POSTER) */}
            <Link
              to=""
              onClick={(e) => {
                if (!user) {
                  handleBuyClick(e);
                } else {
                  scrollToTop();
                }
              }}
              className="mt-10 btn btn-lg btn-primary px-10"
            >
              Buy Now
            </Link>

          </div>
        </div>
      </section>


      {/* ================= EVENTS ================= */}
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl uppercase tracking-wide mb-6">
              Events & Competitions
            </h2>
            <p className="font-body text-lg opacity-70">
              A curated mix of technology, creativity, learning, and fun.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-base-200 rounded-3xl p-7 shadow-lg hover:-translate-y-2 transition"
              >
                <div className="flex justify-between mb-4 font-body text-xs">
                  <span className="font-semibold">{event.category}</span>
                  <span className="opacity-70">{event.level}</span>
                </div>

                <h3 className="font-heading text-xl tracking-wide uppercase mb-3">
                  {event.title}
                </h3>

                <p className="font-body text-sm opacity-80 mb-6">
                  {event.desc}
                </p>

                <Link
                  to="/events"
                  onClick={scrollToTop}
                  className="btn btn-sm btn-outline font-body"
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/events"
              onClick={scrollToTop}
              className="btn btn-lg btn-primary px-10 font-body"
            >
              ALL Events →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CAROUSEL ================= */}
      <section className="py-24 bg-base-200">
        <div
          ref={carouselRef}
          className="carousel w-full rounded-3xl overflow-hidden shadow-2xl"
        >
          {[
            { id: "slide1", img: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp", prev: "slide4", next: "slide2" },
            { id: "slide2", img: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp", prev: "slide1", next: "slide3" },
            { id: "slide3", img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp", prev: "slide2", next: "slide4" },
            { id: "slide4", img: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp", prev: "slide3", next: "slide1" },
          ].map((slide) => (
            <div key={slide.id} id={slide.id} className="carousel-item relative w-full">
              <img src={slide.img} className="w-full h-[420px] object-cover" alt="" />

              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 flex justify-between">
                <button
                  onClick={() => scrollToSlide(slide.prev)}
                  className="btn btn-circle bg-white/20 backdrop-blur"
                >
                  ❮
                </button>
                <button
                  onClick={() => scrollToSlide(slide.next)}
                  className="btn btn-circle bg-white/20 backdrop-blur"
                >
                  ❯
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm opacity-70 font-body">
          Click arrows to navigate
        </p>
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
