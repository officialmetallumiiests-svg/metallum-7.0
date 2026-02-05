import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [open, setOpen] = useState(false);
   const scrollToSlide = (id) => {
    const slide = carouselRef.current?.querySelector(`#${id}`);
    slide?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* FOOTER */}
      <footer className="bg-base-300 text-base-content mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14 grid gap-12 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-wide hover:underline">
              METALLUM 7.0
            </h2>
            <p className="mt-4 text-sm opacity-80 leading-relaxed">
              The Annual Techincal Fest of Society Of Students Metallurgist IIEST Shibpur where
              innovation meets industry, culture, and competition.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:underline" to="/"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link></li>
              <li><Link className="hover:underline" to="/about"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>About</Link></li>
              <li><Link className="hover:underline" to="/events"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Events</Link></li>
              <li><Link className="hover:underline" to="/sponsors"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Sponsors</Link></li>
              <li><Link className="hover:underline" to="/accommodation"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Accommodation</Link></li>
              <button
              type="button"
              onClick={() => setOpen(true)}
              className="hover:underline"
            >
              Contact Us
            </button>
            </ul>
          </div>

          {/* LOCATION */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Location</h3>
            <div className="w-full h-40 rounded-xl overflow-hidden border">
              <iframe
                title="IIEST Shibpur"
                className="w-full h-full"
                loading="lazy"
                src="https://www.google.com/maps?q=IIEST+Shibpur&output=embed"
              />
            </div>
          </div>

          {/* CONTACT & SOCIAL */}
         <div>
  <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>

  <div className="flex gap-4">
    {/* Instagram */}
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noreferrer"
      className="hover:scale-110 transition"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
        alt="Instagram"
        className="w-8 h-8"
      />
    </a>

    {/* Facebook */}
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noreferrer"
      className="hover:scale-110 transition"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/174/174848.png"
        alt="Facebook"
        className="w-8 h-8"
      />
    </a>

    {/* YouTube */}
    <a
      href="https://youtube.com"
      target="_blank"
      rel="noreferrer"
      className="hover:scale-110 transition"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
        alt="YouTube"
        className="w-8 h-8"
      />
    </a>
  </div>
</div>

</div>
        {/* BOTTOM BAR */}
        <div className="border-t border-base-content/10 text-center py-4 text-sm opacity-70">
          © {new Date().getFullYear()} Metallum, IIEST Shibpur — All Rights Reserved
        </div>
      </footer>

      {/* CONTACT MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-base-100 rounded-2xl shadow-xl w-[90%] max-w-md p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>

            <div className="space-y-4 text-sm">
              <p><strong>Email:</strong> metallum@iiests.ac.in</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p>
                <strong>Address:</strong>  
                Indian Institute of Engineering Science and Technology,
                Shibpur, Howrah, West Bengal
              </p>
            </div>

            <button
              className="btn btn-primary w-full mt-8"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
} 