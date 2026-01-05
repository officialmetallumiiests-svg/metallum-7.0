import React from "react";
import { motion } from "framer-motion";

/* ---------- Animation Wrapper ---------- */
const FadeUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
);

/* ---------- Sponsor Card ---------- */
const SponsorCard = ({ logo, size = "md" }) => (
  <div
    className="bg-base-100 rounded-xl p-6 shadow-md border border-base-300
               grayscale hover:grayscale-0 hover:scale-105
               transition-all duration-300 flex items-center justify-center"
  >
    <img
      src={logo}
      alt="Sponsor Logo"
      className={`object-contain ${
        size === "lg"
          ? "h-28"
          : size === "sm"
          ? "h-20"
          : "h-24"
      }`}
    />
  </div>
);

export default function Sponsors() {
  const sponsors = {
    title: [
      "https://dummyimage.com/320x160/000/fff&text=TITLE+SPONSOR",
    ],
    gold: [
      "https://dummyimage.com/260x130/facc15/000&text=GOLD+SPONSOR",
      "https://dummyimage.com/260x130/facc15/000&text=GOLD+SPONSOR",
    ],
    silver: [
      "https://dummyimage.com/220x110/d1d5db/000&text=SILVER+SPONSOR",
      "https://dummyimage.com/220x110/d1d5db/000&text=SILVER+SPONSOR",
      "https://dummyimage.com/220x110/d1d5db/000&text=SILVER+SPONSOR",
    ],
    partners: [
      "https://dummyimage.com/200x100/e5e7eb/000&text=PARTNER",
      "https://dummyimage.com/200x100/e5e7eb/000&text=PARTNER",
      "https://dummyimage.com/200x100/e5e7eb/000&text=PARTNER",
      "https://dummyimage.com/200x100/e5e7eb/000&text=PARTNER",
    ],
  };

  return (
    <section id="sponsors" className="bg-base-200 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* ---------- HEADER ---------- */}
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="uppercase tracking-[0.25em] text-xs font-semibold text-primary mb-2">
              Metallum 2025
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Our Sponsors
            </h2>
            <p className="text-base-content/70">
              METALLUM is proudly supported by industry leaders and partners
              who believe in innovation, research, and engineering excellence.
            </p>
          </div>
        </FadeUp>

        {/* ---------- TITLE SPONSOR ---------- */}
        <FadeUp delay={0.1}>
          <div className="mb-20 text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-6">
              🏆 Title Sponsor
            </h3>
            <div className="flex justify-center">
              <SponsorCard logo={sponsors.title[0]} size="lg" />
            </div>
          </div>
        </FadeUp>

        {/* ---------- GOLD SPONSORS ---------- */}
        <FadeUp delay={0.2}>
          <div className="mb-20 text-center">
            <h3 className="text-lg md:text-xl font-bold mb-8">
              🥇 Gold Sponsors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
              {sponsors.gold.map((logo, i) => (
                <SponsorCard key={i} logo={logo} />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ---------- SILVER SPONSORS ---------- */}
        <FadeUp delay={0.3}>
          <div className="mb-20 text-center">
            <h3 className="text-lg md:text-xl font-bold mb-8">
              🥈 Silver Sponsors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {sponsors.silver.map((logo, i) => (
                <SponsorCard key={i} logo={logo} size="sm" />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ---------- PARTNERS ---------- */}
        <FadeUp delay={0.4}>
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold mb-8">
              🤝 Industry & Media Partners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {sponsors.partners.map((logo, i) => (
                <SponsorCard key={i} logo={logo} size="sm" />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* ---------- CTA ---------- */}
        <FadeUp delay={0.5}>
          <div className="mt-24 text-center">
            <h4 className="text-xl md:text-2xl font-bold mb-4">
              Interested in Sponsoring METALLUM?
            </h4>
            <p className="text-base-content/70 mb-6">
              Partner with METALLUM to connect with top engineering talent and
              showcase your brand to future innovators.
            </p>
            <button className="btn btn-primary px-8">
              Become a Sponsor
            </button>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
