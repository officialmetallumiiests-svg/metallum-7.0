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
        {/* FIXED GRID */}
        <div className="grid lg:grid-cols-2 items-center gap-14">

          {/* TEXT CONTENT */}
          <div className="text-center lg:text-left max-w-xl mx-auto">
            <p className="uppercase tracking-[0.35em] text-xs font-semibold text-primary mb-4">
              About The Fest
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              What is <span className="text-primary">METALLUM</span>?
            </h1>

            <p className="text-sm md:text-lg opacity-90 leading-relaxed">
              METALLUM is the annual technical  fest of the department of Metallurgy and Materials Engineering {" "}
              <span className="font-semibold">IIEST Shibpur</span>, celebrating
              innovation, research, and advancements in materials &
              metallurgical science. It unites students, industry professionals,
              and researchers from across nation.
            </p>

            <p className="mt-4 text-sm md:text-lg opacity-90">
              The fest bridges academia and industry through competitions,
              workshops, expert talks, and real-world problem-solving in
              steelmaking, sustainability, and advanced materials.
            </p>

            {/* HIGHLIGHTS */}
       <div
  className="
    mt-8 sm:mt-10
    grid grid-cols-1 sm:grid-cols-2
    gap-4 sm:gap-5 md:gap-6
    text-sm sm:text-base

    transition-all duration-500 ease-out

    md:hover:gap-8

    [&>div]:relative
    [&>div]:overflow-hidden
    [&>div]:rounded-lg sm:rounded-xl
    [&>div]:p-4 sm:p-5
    [&>div]:bg-base-200/70
    [&>div]:backdrop-blur-sm sm:backdrop-blur-md

    [&>div]:transition-all
    [&>div]:duration-300
    [&>div]:ease-out

    md:[&>div]:hover:-translate-y-2
    md:[&>div]:hover:scale-[1.03]
    md:[&>div]:hover:shadow-2xl
  "
>



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
              <span>🗓️ Feb 2026</span>
              <span>⭐ Open to All Departments</span>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
              <img
                src="https://img.jagranjosh.com/images/2022/December/23122022/Indian-Institute-of-Engineering-Science-and-Technology-Iiest-Shibpur-Campus-View-1.jpg"
                alt="Metallum Fest"
                className="w-full h-auto rounded-3xl shadow-2xl border border-base-300 transition duration-500 group-hover:scale-[1.04]"
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
