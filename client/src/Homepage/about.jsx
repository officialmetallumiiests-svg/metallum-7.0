import React from "react";

export default function About() {
  return (
    <section className="relative bg-gradient-to-br from-base-200 via-base-100 to-base-200 min-h-screen py-16 overflow-hidden">
      
      {/* SUBTLE BACKGROUND ACCENT */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-12">

          {/* TEXT CONTENT */}
          <div className="text-center lg:text-left max-w-xl mx-auto">
            <p className="uppercase tracking-[0.35em] text-xs font-semibold text-primary mb-4">
              About The Fest
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              What is <span className="text-primary">METALLUM</span>?
            </h1>

            <p className="text-sm md:text-lg opacity-90 leading-relaxed">
              METALLUM is the annual Metallurgical Engineering fest of{" "}
              <span className="font-semibold">IIEST Shibpur</span>, celebrating
              innovation, research, and advancements in materials &
              metallurgical science. It unites students, industry professionals,
              and researchers from across India.
            </p>

            <p className="mt-4 text-sm md:text-lg opacity-90">
              The fest bridges academia and industry through competitions,
              workshops, expert talks, and real-world problem-solving in
              steelmaking, sustainability, and advanced materials.
            </p>

            {/* HIGHLIGHTS */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4 text-sm md:text-base">
              {[
                "🔧 Technical Competitions",
                "🏭 Industrial Workshops",
                "🎙️ Expert Talks & Panels",
                "🤝 Industry Networking",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-base-100/80 backdrop-blur rounded-xl p-4 border border-base-300 shadow-sm hover:shadow-md transition"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* INFO STRIP */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-xs md:text-sm opacity-80">
              <span>📍 IIEST Shibpur</span>
              <span>🗓️ March 2025</span>
              <span>⭐ Open to All Departments</span>
            </div>
          </div>

          {/* VERTICAL TRANSPARENT DIVIDER */}
          <div className="hidden lg:flex justify-center">
            <div className="h-[420px] w-[2px] bg-gradient-to-b from-transparent via-primary/40 to-transparent rounded-full" />
          </div>

          {/* IMAGE CONTENT */}
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Metallum Fest"
                className="w-full max-w-md rounded-3xl shadow-2xl border border-base-300 group-hover:scale-[1.02] transition duration-500"
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 rounded-3xl bg-black/10 opacity-0 group-hover:opacity-100 transition" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
