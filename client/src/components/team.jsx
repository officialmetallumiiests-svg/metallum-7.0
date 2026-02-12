import React from "react";

export default function Team() {
  const teamData = {
    head: [
      {
        name: "Harsh Agrawal",
        role: "Main Coordinator",
        image: "/images/Harsh.jpeg",
      },
      {
        name: "Yash Chandekar",
        role: "Main Coordinator",
        image: "/images/yash.jpeg",
      },
      {
        name: "Shubh Ashutosh",
        role: "Student Convener",
        image: "/images/Shubh_Ashutosh.jpeg",
      },
      
      {
        name: "Soumyadeep Das",
        role: "Finance",
        image: "/images/somyadeep.jpeg",
      },
      {
        name: "Swagato Chakraborty",
        role: "Finance",
        image: "/images/SWAGATO.jpg",
      },
      {
        name: "Anjani",
        role: "Finance",
        image: "/images/ANJANI.jpeg",
      },
      {
        name: "Akanksha Gupta",
        role: "Sponsorship",
        image: "/images/AKANKSHA_GUPTA.jpeg",
      },
      {
        name: "Naman Kumar Thakur",
        role: "Sponsorship",
        image: "/images/NaMan.jpeg",
      },
      {
        name: "Aditya Singh",
        role: "Event Management",
        image: "/images/ADITYA.jpg",
      },
      {
        name: "Srijan Yadav",
        role: "Event Management",
        image: "/images/SRIJAN.jpeg",
      },
      {
        name: "Angshu Sengupta",
        role: "Design, Production and Decoration",
        image: "/images/angshu.jpeg",
      },
      {
        name: "Pratyusha Sarkar",
        role: "Design, Production and Decoration",
        image: "/images/PRATYUSHA.jpg",
      },
      {
        name: "Smarjit Adak",
        role: "Web Development",
        image: "/images/SMARAJIT.jpg",
      },
      {
        name: "Jasmine Mallick",
        role: "Alumni Relation and Collection",
        image: "/images/_JASMINE.jpg",
      },
      {
        name: "Parijat Sarkar",
        role: "Cultural",
        image: "/images/PARIJAT.jpg",
      },
      {
        name: "Sayak Bal",
        role: "Cultural",
        image: "/images/SAYAK.jpeg",
      },
      {
        name: "Uddipta Panja",
        role: "Cultural",
        image: "/images/UDDIPTA.jpeg",
      },


    ],
    assistant: [
      {
        name: "Tejaswi Singh",
        role: "Joint Coordinator",
        image: "/images/TEJASWI_SINGH.jpg",
      },
      {
        name: "Sunay Manish Vanerkar",
        role: "Finance",
        image: "/images/sunay.jpeg",
      }, {
        name: "Mansi Verma",
        role: "Sponsorship",
        image: "/images/MANSI_VERMA.jpg",
      }, {
        name: "Supriyo Barman",
        role: "Sponsorship",
        image: "/images/SUPRIYO_BARMAN.jpg",
      }, {
        name: "Shakti Prasad Mohanty",
        role: "Sponsorship",
        image: "/images/SHAKTI_PRASAD MOHANTY.jpg",
      }, {
        name: "Aritra Dutta",
        role: "Event Management",
        image: "/images/ARITRA_DUTTA.jpg",
      }, {
        name: "Gyanshi",
        role: "Event Management",
        image: "/images/GYANSHI_.jpg",
      }, {
        name: "Sandeep Kumawat",
        role: "Event Management",
        image: "/images/SANDEEP_KUMAWAT.jpg",
      }, {
        name: "Joel Varghese Baiju",
        role: "Publicity",
        image: "/images/JOEL_VARGHESE BAIJU.jpg",
      }, {
        name: "Shivraj Jangir",
        role: "Publicity",
        image: "/images/SHIVRAJ_JANGIR.jpg",
      }, {
        name: "Abhishek Kumar",
        role: "Design, Production and Decoration",
        image: "/images/ABHISHEK_KUMAR.png",
      }, {
        name: " Himanshu Kumar",
        role: "Design, Production and Decoration",
        image: "/images/himanshu.jpeg",
      }, {
        name: "Kritika Bairwa ",
        role: "Design, Production and Decoration",
        image: "/images/kritika.jpeg",
      }, {
        name: "Nikhil Sah",
        role: "Web Development ",
        image: "/images/Nikhil.png",
      }, {
        name: "Deb Kumar",
        role: "Alumni Relation and Collection",
        image: "/images/DEBKUMAR_DE.jpg",
      }, {
        name: "Indranil Sarkar",
        role: "Alumni Relation and Collection",
        image: "/images/INDRANIL_SARKAR.png",
      },{
        name: "Arka Mondal",
        role: "Photography and Videography",
        image: "/images/ARKA_MONDAL.jpg",
      },{
        name: "Ayush Sarkar",
        role: "Photography and Videography",
        image: "",
      },{
        name: "Lakavath Tejaswini",
        role: "Cultural",
        image: "/images/LAKAVATH_TEJASWINI.jpg",
      },
    ],

    associate: [
       
      {
        name: "Pratik Raj",
        role: " Sponsorship",
        image:"/images/pratik.jpeg",
      },{
        name: "Tarishi Sharma",
        role: " Sponsorship",
        image:"",
      },{
        name: " Amandeep Singh Rathore",
        role: " Sponsorship",
        image:"/images/amandeep.jpeg",
      },{
        name: "Kumbha Rithwik Sai Venkat",
        role: "Sponsorship",
        image:"",
      },{
        name: "Harshika Tiwari",
        role: "Event Management",
        image:"/images/harshika.jpeg",
      }, {
        name: "Arjodeep Chatterjee",
        role: "Event Management",
        image:"/images/ARJODEEP_CHATTERJEE.jpg",
      }, {
        name: "Suryadeep Pal",
        role: "Event Management",
        image:"",
      }, {
        name: "Anushka Sarkar",
        role: "Publicity",
        image: "/images/ANUSHKA_SARKAR.jpg",
      }, {
        name: "Safra Ashkar",
        role: "Publicity",
        image: "/images/SAFRA_ARAKKAL_ASHKAR.jpg",
      }, {
        name: "Sirshapan Kunda Roy",
        role: "Publicity",
        image: "/images/SIRSHAPAN_KUNDA_ROY.jpg",
      }, {
        name: "Abhradeep Ghorai",
        role: "Publicity",
        image: "",
      }, {
        name: "Abhijeet Kumar",
        role: "Design, Production and Decoration",
        image: "/images/ABHIJEET_KUMAR.jpg",
      }, {
        name: "Drisana Chatterjee",
        role: "Design, Production and Decoration",
        image: "/images/DRISANA_CHATTERJEE.jpg",
      }, {
        name: "Prashant Kumar",
        role: "Design, Production and Decoration",
        image: "",
      }, {
        name: "Pritikana Das",
        role: "Design, Production and Decoration",
        image: "/images/PRITIKANA_DAS.jpg",
      }, {
        name: "Rajdeep Adak",
        role: "Design, Production and Decoration",
        image: "/images/RAJDEEP_ADAK.jpg",
      }, {
        name: "Sreejoyee Banerjee",
        role: "Design, Production and Decoration",
        image: "/images/SREEJOYEE_BANERJEE.jpg",
      }, {
        name: "Tanmay Sarkar",
        role: "Design, Production and Decoration",
        image: "/images/tanmay.jpeg",
      }, {
        name: "Aayush Guria",
        role: "Content",
        image: "/images/AAYUSH_GURIA.jpg",
      }, {
        name: "Nishant Singh",
        role: "Content",
        image: "/images/nishant___.jpeg",
      }, {
        name: "Snehasis HAlder",
        role: "Content",
        image: "",
      }, {
        name: "Vinay Chand Bharat",
        role: "Web Development",
        image: "/images/VINAY_BHARAT.png",
      }, {
        name: "Prekshna Pal",
        role: "Web Development",
        image: "/images/PREKSHANA_PAL.jpg",
      }, {
        name: "Abhisheak Kumar",
        role: "Alumni Relation and Collection",
        image: "",
      }, {
        name: "Ayaswarya Dutta",
        role: "Alumni Relation and Collection",
        image: "/images/AYASWARYA_DUTTA.jpg",
      }, {
        name: "Bidit Sarkar",
        role: "Alumni Relation and Collection",
        image: "/images/BIDIT_SARKAR.jpg",
      }, {
        name: "Anubhav Saha",
        role: "Refreshment and Volunteer",
        image: "/images/ANUBHAV_SAHA.jpg",
      }, {
        name: "Chhote Lal Kumar",
        role: "Refreshment and Volunteer",
        image: "",
      }, {
        name: "Prithviraj Singh",
        role: "Photography and Videography",
        image: "/images/prithvi.jpeg",
      }, {
        name: "Nibedita Dutta",
        role: "Cultural",
        image: "/images/NIBEDITA_DUTTA.jpg",
      }, {
        name: "Arnab Ghosh",
        role: "Travel and Logistics",
        image: "/images/ARNAB_GHOSH.jpg",
      }, {
        name: "Ayan dutta",
        role: "Travel and Logistics",
        image: "/images/ayan.jpeg",
      }, {
        name: "Saptangshu Saha",
        role: "Travel and Logistics",
        image: "/images/saptangshu.jpeg",
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
            Metallum 2026
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

