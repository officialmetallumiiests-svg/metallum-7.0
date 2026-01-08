import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotGrid from "./DotGrid";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const teamData = {
    head: [
      {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },
      {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      }, {
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },
    ],
    assistant: [
      {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      },
      {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      }, {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      }, {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      }, {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      }, {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      }, {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      }, {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      }, {
        name: "Rahul Verma",
        role: "Assistant Coordinator",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      },
    ],
    associate: [
      {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      },
      {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },
      {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      }, {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      }, {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      }, {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },
      {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      }, {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      }, {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      }, {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },
    ],
  };

  /* ================= REF & ANIMATION SETUP ================= */
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ANIMATE EACH SECTION
      gsap.utils.toArray(".team-section").forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".team-card"),
          { y: 50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      });

      // HEADER ANIMATION
      gsap.from(".team-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ================= COMPONENTS ================= */
  const Card = ({ name, role, image, shape }) => (
    <div
      className="team-card group relative bg-blue-900/5 backdrop-blur-md border border-blue-500/20 rounded-3xl p-6
                 text-center shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
                 transition-all duration-300 hover:-translate-y-3 overflow-hidden"
    >
      {/* GLOW EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 mx-auto mb-5 w-40 h-40">
        <div className={`absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-500`}></div>
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover ${shape}
                      border-2 border-blue-500/30
                      group-hover:border-blue-400 group-hover:scale-105 transition-all duration-500 shadow-lg`}
        />
      </div>
      <h3 className="relative z-10 text-xl font-bold text-white group-hover:text-blue-200 transition-colors font-['Orbitron'] tracking-wide">{name}</h3>
      <p className="relative z-10 text-sm text-blue-400 font-mono mt-1">{role}</p>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="team-section mb-32">
      <div className="flex items-center gap-4 mb-12 justify-center">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
        <h3 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white font-['Orbitron'] tracking-wider shadow-blue-500/50 drop-shadow-sm">{title}</h3>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
      </div>

      <div
        className="grid gap-8 justify-center
                   sm:grid-cols-2
                   md:grid-cols-3
                   lg:grid-cols-4"
      >
        {children}
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="py-24 min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f172a] via-[#0a0a0a] to-black text-white relative overflow-hidden">
      {/* Background Grid/Effects */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          baseColor="#172554" // deeply blue 
          activeColor="#3b82f6" // bright blue
          gap={40}
          dotSize={20}
          proximity={200}
          style={{ opacity: 0.5 }}
        />
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="team-header text-center mb-24">
          <p className="uppercase tracking-[0.5em] text-xs font-bold text-blue-500 mb-4 animate-pulse">
            // THE MOVERS & SHAKERS //
          </p>
          <h2 className="text-5xl md:text-7xl font-black mb-6 font-['Orbitron'] text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-900 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            OUR TEAM
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </div>

        <Section title="Head">
          {teamData.head.map((p, i) => (
            <Card key={i} {...p} shape="rounded-full" />
          ))}
        </Section>

        <Section title="Assistant">
          {teamData.assistant.map((p, i) => (
            <Card key={i} {...p} shape="rounded-2xl" />
          ))}
        </Section>

        <Section title="Associate">
          {teamData.associate.map((p, i) => (
            <Card key={i} {...p} shape="rounded-xl" />
          ))}
        </Section>
      </div>
    </section>
  );
}
