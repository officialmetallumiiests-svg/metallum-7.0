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

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      className="relative overflow-hidden py-14 sm:py-20 lg:py-28 bg-base-200"
    >
      {/* ---------- BACKGROUND ---------- */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-base-100 via-base-200 to-base-300" />
      <div className="absolute -top-32 -left-32 w-72 sm:w-[420px] h-72 sm:h-[420px] bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 -right-40 w-80 sm:w-[520px] h-80 sm:h-[520px] bg-secondary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/3 w-64 sm:w-[360px] h-64 sm:h-[360px] bg-accent/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ---------- HEADER ---------- */}
        <FadeUp>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <p className="uppercase tracking-[0.3em] text-xs font-semibold text-primary mb-3">
              Metallum 2026
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Past Sponsors
            </h2>
            <p className="text-sm sm:text-base text-base-content/70">
              METALLUM is proudly supported by organizations that believe in
              innovation, research, and engineering excellence.
            </p>
          </div>
        </FadeUp>

        {/* ---------- SPONSOR IMAGE ---------- */}
        <FadeUp delay={0.3}>
          <div className="mb-20 sm:mb-28 flex justify-center">
            <div
              className="
                bg-base-100
                rounded-2xl sm:rounded-3xl
                p-5 sm:p-8 lg:p-12
                shadow-xl
                border border-base-300
                w-full max-w-6xl
                transition-all duration-500
                hover:shadow-2xl
                lg:hover:-translate-y-2
              "
            >
              <img
                src="/photoes/Past sponsors.png"
                alt="Past Sponsors"
                className="
                  w-full
                  h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px]
                  object-contain
                  mx-auto
                "
              />
            </div>
          </div>
        </FadeUp>

        {/* ---------- CTA ---------- */}
        <FadeUp delay={0.4}>
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">
              Interested in Sponsoring METALLUM?
            </h4>
            <p className="text-sm sm:text-base text-base-content/70 mb-6">
  Partner with METALLUM to connect with top engineering talent and
  showcase your brand to future innovators.
</p>

<a
  src="/public/pdf/sponsorship.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-flex items-center justify-center
    btn btn-primary
    px-8 sm:px-10
    transition-all duration-300
    hover:scale-105
    hover:shadow-lg
  "
>
  Sponsorship Brochure
</a>

          </div>
        </FadeUp>
      </div>
    </section>
  );
}
