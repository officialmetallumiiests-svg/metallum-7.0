import React from "react";

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
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
        name: "Dr. A. K. Sharma",
        role: "Faculty Advisor",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },{
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
        name: "Sahil Sah",
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
      },{
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },{
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },{
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },
      {
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },{
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },{
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },{
        name: "Ankit Kumar",
        role: "Associate Lead",
        image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
      },
    ],
  };

  const Card = ({ name, role, image, shape }) => (
    <div
      className="group bg-base-100 border border-base-300 rounded-3xl p-6
                 text-center shadow-md hover:shadow-xl
                 transition-all duration-300 hover:-translate-y-2"
    >
      <div className="mx-auto mb-5 w-36 h-36">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover ${shape}
                      border-4 border-primary/20
                      group-hover:border-primary transition`}
        />
      </div>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-primary">{role}</p>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="mb-24">
      <h3 className="text-2xl font-bold text-center mb-12">{title}</h3>
      <div
        className="grid gap-12 justify-center
                   sm:grid-cols-2
                   md:grid-cols-3
                   lg:grid-cols-4"
      >
        {children}
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="uppercase tracking-[0.35em] text-xs font-semibold text-primary mb-4">
            Metallum 2025
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
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
