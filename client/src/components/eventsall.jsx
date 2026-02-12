import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function EventsAll() {
  const { user } = useContext(UserContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registerEvent, setRegisterEvent] = useState(null); // Event being registered for
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    college: "",
    branch: "",
    year: "",
    teamName: "",
    transactionId: ""
  });

  // Teammates State
  const [teammates, setTeammates] = useState([]);

  const handleRegisterClick = (event) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    setRegisterEvent(event);

    // Reset teammates based on event type
    if (event.title === "BGMI") {
      setTeammates([
        { name: "", phone: "" },
        { name: "", phone: "" },
        { name: "", phone: "" }
      ]);
    } else if (event.title === "VALORANT") {
      setTeammates([
        { name: "", phone: "" } // Only 1 teammate for 2v2
      ]);
    } else if (event.title === "M-CODE") {
      setTeammates([
        { name: "", phone: "" },
        { name: "", phone: "" }
      ]);
    } else {
      setTeammates([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Remove any non-numeric characters
      const numericValue = value.replace(/[^0-9]/g, "");
      // Limit to 10 digits
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTeammateChange = (index, field, value) => {
    const updatedTeammates = [...teammates];
    updatedTeammates[index][field] = value;
    setTeammates(updatedTeammates);
  };

  /* ================= TOAST STATE ================= */
  const [toast, setToast] = useState(null); // { message: "", type: "success" | "error" }

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const submitRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.phone.length !== 10) {
      showToast("Phone number must be exactly 10 digits", "error");
      setLoading(false);
      return;
    }

    // Validate Teammates for BGMI or VALORANT or M-CODE
    if (registerEvent?.title === "BGMI" || registerEvent?.title === "VALORANT" || registerEvent?.title === "M-CODE") {
      for (let i = 0; i < teammates.length; i++) {
        if (!teammates[i].name) {
          showToast(`Player ${i + 2} name is required`, "error");
          setLoading(false);
          return;
        }
      }
    }

    // Validate Transaction ID for VALORANT or BGMI
    if ((registerEvent?.title === "VALORANT" || registerEvent?.title === "BGMI") && !formData.transactionId) {
      showToast("Transaction ID is required", "error");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        phone: `+91 ${formData.phone}`,
        email: user.email,
        event: registerEvent.title
      };

      if (registerEvent?.title === "BGMI" || registerEvent?.title === "VALORANT" || registerEvent?.title === "M-CODE") {
        payload.teammates = teammates.map(t => ({
          name: t.name
        }));
      }

      if (registerEvent?.title === "VALORANT") {
        payload.transactionId = formData.transactionId;
        payload.amount = 100;
      }

      if (registerEvent?.title === "BGMI") {
        payload.transactionId = formData.transactionId;
        payload.amount = 50;
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include" // Send cookies
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setRegisterEvent(null);
        setFormData({ name: "", phone: "", college: "", branch: "", year: "", teamName: "", transactionId: "" });
        setTeammates([]);
      } else {
        showToast(data.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const events = [

    /* ...   {
      id: 6,
      title: "METALLOSCAPE",
      category: "Main Event",
      description:
        "A poster presentation event focused on metallurgy, where teams showcase research concepts and technical understanding through creative visuals and clear scientific communication.",
      image: "/photoes/eventsposter/Metalloscape.png",
        details:"Metalloscape is a technical poster presentation competition where participants get to showcase their research and technical skills with a creative and artistic twist. In the first stage, teams will submit a brief abstract on their chosen topic. If selected, they’ll move on to the final round, where they’ll present their posters. Each team will have 8 minutes to present, followed by a 2-minute Q&A session. With great prizes up for grabs, don’t miss out on this exciting opportunity—register now and show off your expertise and creativity! ",
     
     abstractLink:"https://drive.google.com/file/d/1SonksaSBIb8B7zIbZuCHqGBiQk71ehgx/view?usp=sharing",
        guidelines: [
    "#Guidelines for Abstract Submission",
    "The abstract must be on a topic relevant to Metallurgy and Materials Engineering.",
    "Participants may refer to the list of suggested topics provided by the organizers.",
    "The abstract must not exceed 300 words.",
    "The abstract must be submitted in PDF format only.",
    "All submissions will be reviewed for authenticity and plagiarism.",
    "Submissions with excessive plagiarism will be disqualified.",
    "Participants are advised to refer to the sample abstract provided by the organizers.",
  
    "#Guidelines for Poster Presentation",
    "The dimensions of the poster must be 120 cm × 90 cm. Participants are advised to strictly adhere to these dimensions to avoid printing issues.",
    "The poster should include the following sections:",
    "Title and author(s) (placed at the upper portion, spanning the full width of the poster).",
    "Abstract.",
    "Methodology.",
    "Results.",
    "Conclusions.",
    "References.",
    "Each team will be allotted a total of 10 minutes: 8 minutes for presentation followed by 2 minutes for Q&A.",
    "All poster content must be original. Any instance of plagiarism may lead to disqualification.",
    "Participants must submit their posters before the specified deadline to ensure timely and proper printing.",
    "Failure to meet the submission deadline may result in disqualification."],
  
  Judging_Criteria:[
  
    "Technical content and depth of understanding.",
    "Poster design and visual presentation.",
    "Originality and creativity of the work.",
    "Clarity of explanation and communication skills.",
    "Effectiveness in handling the Q&A session.",
    "Event Schedule: 20 February 2026",
      "Venue: Parade Ground"
  
  ],
  contacts: [ { name: "For any queries, contact:", phone: "" },
    { name: "Arjodeep Chatterjee", phone: "9031945823" },
    { name: "Gyanshi", phone: "7678624280" },
    { name: "Srijan Yadav", phone: "9120754845" }
  ]
  
  
  
    },
    {
        id: 8,
      title: "निर्माण ",
      category: "Main Event",
      description:
        "An innovation and pitching platform where aspiring entrepreneurs solve real-world problems and present impactful ideas through dynamic pitches and interactive judge sessions.",
      
  
      image:"/photoes/eventsposter/Nirman.png",
          details:"Startup-oriented problem-solving and idea pitching event designed to encourage innovative thinking and entrepreneurial skills among participants. Participants will be provided with a problem statement on 15th Feb at 6 PM. Based on the given problem, teams are required to develop a startup idea and propose a practical solution in the form of PowerPoint Presentation",
    guidelines: [
    "#Guidelines for Online Submission (Round 1)",
    "Participants will be provided with a total of 6 problem statements from the domains of Core Metallurgy and Non-Core (General Problems) on 15 February 2026 at 6:00 PM.",
    "Teams must submit a PPT presenting their original ideas and solutions by 18 February 2026 before 6:00 PM.",
    "All submitted PPTs will be checked for plagiarism and AI-generated content.",
    "Based on the submitted ideas, teams will be ranked and the top 8 teams will qualify for Round 2.",
  
    "#Rules (Round 1)",
    "The ideas must be original, practical, and feasible.",
    "Copy-paste content or use of AI tools is strictly prohibited.",
    "Ideas should be cost-effective, innovative, and sustainable.",
    "Late submissions will not be accepted.",
  
    "#Guidelines for Presentation (Round 2)",
    "Qualified teams will present their PPT to the judges.",
    "The presentation must contain a maximum of 10 slides, including the cover and thank-you slides.",
    "Total presentation time is 10 minutes: 7–8 minutes for pitching followed by 2 minutes for Q&A.",
  
    "#Rules (Round 2)",
    "Teams must deliver a convincing and well-structured pitch for the assigned problem.",
    "The first slide must include the problem title along with the names of all team members.",
    "Judges will evaluate the presentation based on originality, practicality, and overall aesthetics of the PPT."],
  
   Judging_Criteria:[
  
    "Cost-effectiveness – Affordability and practical implementation of the solution.",
    "Innovation – Uniqueness and creativity of the proposed idea.",
    "Efficiency – Effectiveness of the solution in addressing the problem.",
    "Sustainability – Long-term applicability and environmental or economic impact of the idea.",
     "Event Schedule: 20 February 2026",
      "Venue: Alumni Seminar Hall"
  ],
  contacts: [
    { name: "For any queries, contact:", phone: "" },
    { name: "Tejaswi Singh", phone: "9151613350" },
    { name: "Ankita Kumari", phone: "8252044688" }
  ]
  
        },*/

    {
      id: 9,
      title: "Dr. A. K. Seal Memorial Quiz",
      category: "Main Event",
      description:
        "A fast-paced quiz designed to test logical thinking, speed, and clarity, challenging participants from diverse fields with engaging and thought-provoking questions.",

      details:
        "Get ready to put your knowledge to the test in an exhilarating quiz competition designed for passionate fans of the field. This event challenges your expertise, quick thinking, and problem-solving skills. The competition kicks off with a Qualifier Round, where teams will face tricky general awareness questions, and only the best will advance to the Final Round. In the final round, participants will tackle both general awareness and material-related questions in a thrilling, point-based showdown. The team with the sharpest intellect and the most points will claim victory. Gear up for a fierce competition and may the best team win.",

      image: "/photoes/eventsposter/Quiz.png",

      guidelines: [



        "#General Rules",
        "The use of mobile phones or any unfair means during any stage of the competition is strictly prohibited.",
        "Any violation of rules will result in immediate disqualification.",
        "Event Schedule: 21 February 2026",
        "Venue: Alumni Seminar Hall",
        "Time: 2:00PM – 4:00PM",

      ],
      stages: ["The competition will consist of two stages.",

        "#Stage 1: Qualifier Round",
        "Teams will take a quiz focused on general awareness.",
        "This will be an elimination round.",

        "#Stage 2: Final Round",
        "Top teams from the Qualifier Round will be selected for the Final Round.",
        "The final round will follow a point-based reward system.",
        "The quiz will focus on general awareness and material-related knowledge.",
        "The team with the highest points at the end of the round will be declared the winner.",
        "In case of a tie, the team with fewer negative points will be ranked higher."],

      contacts: [
        { name: "Shubh Ashutosh", phone: "7295946762" },
        { name: "Aritra Dutta", phone: "7865979275" },
        { name: "Ayush Kumar", phone: "9102166734" }
      ]

    },
    {
      id: 10,
      title: "METAPOLISH",
      category: "Main Event",
      description: "A hands-on metallography event combining a screening quiz with practical sample preparation and microstructural analysis using grinding, polishing, etching, and microscopy.",
      image: "/photoes/eventsposter/Metapolish.png",
      details: "Get ready to showcase your skills in metallography with Metapolish! This exciting two-stage competition begins with a metallography quiz, where your knowledge of metallurgy will be put to the test. The top participants will advance to Stage 2, where they’ll work in teams to prepare and analyse metallographic samples. With fantastic prizes at stake, don’t miss out—register now and be part of this exciting challenge!",
      guidelines: [
        "#Date: 19/02/2026",
        "#Time: 6:00 pm – 8:00 pm",

        "#Venue",
        "Stage 1: 4th Year Classroom",
        "Stage 2: Physical Metallurgy Lab",

        "#Eligibility",
        "Open to students from all disciplines.",
        "Individual participation only (no teams for registration)",

        "#Prizes",
        "1st Prize: Rs 3000 + Certificate",
        "2nd Prize: Rs 2000 + Certificate",
        "3rd Prize: Rs 1000 + Certificate",

        "#General Rules",
        "The use of mobile phones or any unfair means during any stage of the competition is strictly prohibited.",
        "Any violation will result in immediate disqualification."
      ],
      stages: [
        "#Stage 1: Metallography Quiz",
        "Participants will take a quiz focused on general metallurgy and metallography.",
        "It is an elimination round.",

        "#Stage 2: Sample Preparation and Analysis",
        "Selected participants from Stage 1 will be paired into groups.",
        "Each group will be provided with a metallography sample.",
        "Groups will prepare the sample using standard metallographic techniques, such as grinding, polishing, and etching, within a specified time limit.",
        "After sample preparation, groups will analyze the microstructure to identify the sample and its key features.",
        "All necessary materials required for sample preparation will be provided to the participants in advance.",
        "The group that performs the most accurate microstructural analysis in the shortest time will be declared the winner."
      ],
      contacts: [
        { name: "Pratyusha Sarkar", phone: "9851709251" },
        { name: "Sunay Vanerkar", phone: "9049593980" },
        { name: "Suryadeep Pal", phone: "9748993477" }
      ]
    },

    {
      id: 5,
      title: "MET-TRICKS",
      category: "Main Event",
      description:
        "A PPT-based competition where participants address real-world technical and industrial problems by presenting practical, innovative solutions while learning through idea exchange and discussion.",
      image: "/photoes/eventsposter/Metricks.png",

      details:
        "Met-tricks encourages young engineers to utilize their knowledge for solving metallurgical-industry issues as well as present their analysis of a topic relevant to material science, in the form of Power-Point Presentation. In the first stage, participants must submit an abstract outlining their problem, proposed solution or research topic. In the second stage, selected students will present their ideas in front of jury, followed by a Q/A session.",

      abstractLink: "/pdf/Problem Statement MET-Tricks.pdf",
      submissionLink: "https://forms.gle/ZTPvZX7KvBYCNeK6A",

      guidelines: [
        "# Abstract Submission :-",
        "The abstract must be based on one of the provided problem statements.",
        "The abstract should not exceed 300 words.",
        "Submissions must be made in PDF format only.",
        "All abstracts will be reviewed for originality and plagiarism.",
        "Submissions with excessive plagiarism will be disqualified.",
        "Deadline for abstract submission: 17th Feb by 11:59 PM.",


        "# Presentation Guidelines :-",
        "Presentation will be held at 20th Feb 2026 in offline mode at IIEST SHIBPUR.",
        "Each team is allowed a maximum of 10 slides.",
        "Exceeding the slide limit may lead to disqualification.",
        "Total time allotted per team is 10 minutes.",
        "Presentation time: 8 minutes, followed by a 2-minute Q&A session.",
        "All presentation content must be original.",
        "Any instance of plagiarism may result in disqualification.",
        "Deadline for presentation submission: 19th Feb by 06:00 PM.",



        "Event Schedule: 20 February 2026",
        "Time: 12:15 pm – 2:00 pm",
        "Venue: Alumni Seminar Hall, IIEST SHIBPUR",

      ],
      Judging_Criteria: [
        "Problem-Solving Approach",
        "Relevance of the Proposed Solution",
        "Technical Feasibility",
        "Clarity and Structure of the Presentation",
        "Effectiveness in Handling Q&A"],
      contacts: [
        { name: "Srijan Yadav", phone: "9120754845" },
        { name: "Sandeep Kumawat", phone: "8003936610" },
        { name: "Ayush", phone: "9102166734" }
      ]
    }
    ,
    {
      id: 7,
      title: "PRORECRUIT",
      category: "Main Event",
      description:
        "A mock placement drive designed to simulate real recruitment processes, enabling participants to enhance professional skills, receive constructive feedback, and build confidence for actual placements.",

      image: "/photoes/eventsposter/Prorecruit.png",

      details:
        "ProRecruit is a mock placement drive that closely replicates the real campus recruitment process. The competition is conducted in three elimination stages. Stage 1 consists of an online assessment focused on aptitude and technical knowledge. Stage 2 involves a group discussion round to evaluate communication skills, teamwork, and clarity of thought. Stage 3 is a one-on-one personal interview conducted by an expert panel. The event provides participants with practical exposure to placement scenarios, valuable feedback, and an opportunity to prepare effectively for real-world recruitment while competing for exciting prizes.",

      guidelines: [
        "All the stages will be held at IIEST SHIBPUR in offline mode on 20th Feb 2026.",
        "Dress code is strictly formal for all participants.",
        "Each participant must bring a printed copy of their resume for the interview round.",
        "Participants must report on time at the venue to ensure smooth conduct of the event.",
        "Any form of misconduct or indiscipline may lead to disqualification.",
        "Event Schedule: 20 February 2026",
        "Venue: 4th Year Classroom (Stage 1)",
        "Main Building (Stage 2 and Stage 3) ",
      ],


      stages: [
        "#Stage 1:-",
        "This stage will test aptitude and technical knowledge.",
        "Participants must bring their own laptops for the assessment.",
        "Remote participation is not allowed.",
        "Only participants present at the designated venue will be eligible for evaluation.",
        "Participants should carry their own stationery; only rough sheets will be provided.",
        "Use of mobile phones or any unfair means will result in immediate disqualification.",



        "#Stage 2:-",
        "Selected participants from Stage 1 will be divided into groups.",
        "Each group will be assigned a discussion topic.",
        "Group discussions will be conducted within a fixed time limit.",
        "Participants must maintain respectful, professional, and ethical conduct during the discussion.",



        "#Stage 3:-",
        "Shortlisted candidates from Stage 2 will appear for a personal interview before an expert panel.",
        "The interview will assess communication skills, confidence, subject knowledge, and overall personality.",
        "Participants must be punctual for the interview round.",
      ],






      contacts: [
        { name: "Srijan Yadav", phone: "9120754845" },
        { name: "Gyanshi", phone: "7678624280" },
        { name: "Prithvi Raj Singh", phone: "6289757984" }

      ]
    }
    ,


    {
      id: 1,
      title: "Chess",
      category: "Pre-Event",
      description:
        "A test of patience, foresight, and mental sharpness where every move can instantly change momentum, rewarding players who think strategically and plan several steps ahead.",
      image: "/photoes/Chess.png",

      details:
        "Prepare for a battle of minds at Metallum 7.0 thrilling Chess Tournament! Whether you're a seasoned strategist or a rising talent, this event promises intense matches, testing your skills and focus. The qualifiers will push players to their limits, with a 60-minute frenzy of rapid (5+2) games. Only the top 8 players will advance to the Final Round with a Time control (10+2) format. Sharpen your tactics and play fair because only the sharpest minds will claim victory!",

      guidelines: [

        "Match Format:",
        "Qualifiers: Participants must play as many games as possible in 60 minutes (Time Control: 5+2).",
        " Final Round: Top 8 players will compete in a Time Control (10+2) format.",
        "Rules:",
        "A win is worth 2 points, a draw is worth 1 point, and a loss is worth 0 points.",
        " Please ensure a stable internet connection during the tournament.",
        " Any form of cheating is strictly prohibited. Violators will be immediately disqualified.",
        "Event Schedule: 10 February 2026",
      ],

      contacts: [
        { name: "For any queries, contact:", phone: "" },
        { name: "Anjani", phone: "9219611024" },
        { name: "Gyanshi", phone: "7678624280" },
      ],
    },

    {
      id: 2,
      title: "BGMI",
      category: "Pre-Event",
      description:
        "A high-intensity battle where squads rely on teamwork, quick decision-making, and adaptability to outplay opponents and survive the chaos of fast-paced matches.",
      image: "/photoes/eventsposter/Bgmi.png",

      details:
        "Get ready for an adrenaline-fueled showdown at the BGMI Tournament in Metallum 7.0, happening from 16th to 18th February. This mobile-only event will feature six intense matches across four iconic maps—Erangel (3), Miramar (1), Sanhok (1), and Vikendi (1). Whether you're a seasoned pro or a passionate fan, this tournament promises thrilling battles, unmatched strategies, and heart-pounding moments.",

      guidelines: [
        "Only mobile players will be allowed.",
        "There will be a total of 6 matches across Erangel (3), Miramar (1), Sanhok (1), and Vikendi (1).",
        "Participants must download all required maps before the event.",
        "Winner will be decided based on the points reward system.",
        "Winner: 10 pts.",
        "2nd Position: 8 pts.",
        "3rd Position: 7 pts.",
        "4th Position: 5 pts.",
        "5th Position: 3 pts.",
        "Per kill: 1 pt.",
        "Use of any unfair means is strictly prohibited.",
        "Team members cannot be changed after registration.",
        "Unauthorized team changes may cause disqualification.",
        "In case of a tie: position points → kills → TDM knockout round.",
        "Registration fees: ₹50 "
      ],

      contacts: [
        { name: "Aritra Dutta", phone: "7865979275" },
        { name: "Sirshapan Kunda Roy", phone: "7478206983" },
      ],
    },

    {
      id: 3,
      title: "VALORANT",
      category: "Pre-Event",
      description:
        "A tactical shooter that demands precise aim, smart utility usage, and seamless communication as teams coordinate strategies to dominate every round.",
      image: "/photoes/eventsposter/Valorant.png",

      details: "Lock in with your duo and enter the most intense 2v2 Valorant showdown at Metallum 7.0. This isn’t about numbers—it's about chemistry. Every peek matters, every utility counts, and one perfectly timed play can decide the round. Expect lightning-fast duels, clutch moments, and pure competitive pressure.",

      guidelines: [
        "General Rules",
        "Participants must comply with all tournament rules and admin decisions.",
        "The administration reserves the right to modify rules to ensure fair play.",
        "All participants must behave respectfully towards admins and other players.",
        "Intentional losing is strictly forbidden.",
        "Vulgar, racist, sexist, or offensive player names are prohibited.",
        "Admins reserve the right to edit inappropriate player names.",

        "Tournament Structure & Schedule",
        "Matches will follow a Round Robin and Double Elimination format.",
        "Teams may be divided into groups based on registrations.",
        "Match schedules will be announced later.",

        "Facility",
        "All matches will be played online.",

        "Game Rules",
        "Each team must consist of exactly 2 players (2v2).",
        "Side selection will be decided by toss.",
        "Players cannot switch teams once the tournament begins.",
        "All players must record their gameplay.",
        "Server Settings: Mode – All Random One Site.",
        "Match Format – Best of 3 (Bo3).",
        "Competitive Settings – Map ban, map select, agent ban.",
        "Tournament Mode – ON. Cheats – OFF.",

        "Penalties",
        "Unsportsmanlike behavior will result in warnings or disqualification.",
        "Trolling or intentionally throwing matches is prohibited.",
        "Cheating (hacking, ghosting, teaming, third-party tools) leads to immediate disqualification.",

        "Miscellaneous",
        "All officials’ decisions are final.",
        "Players must share screenshots of end screens.",
        "Only participating players may stay in match Discord/voice channels.",
        "After each game, teams should exit promptly for the next match.",
        "Registration fees: ₹100 ",
        "Event Schedule: 16-18 February 2026",
      ],

      contacts: [
        { name: "Adarsh Das", phone: "9748890527" },
        { name: "Sandeep Kumawat", phone: "8003936610" },
      ],
    },

    {
      id: 4,
      title: "M-CODE",
      category: "Pre-Event",
      description:
        "A time-bound coding challenge where participants design and implement innovative solutions to real-world problems, with creativity, technical skill, and execution driving success.",
      image: "/photoes/eventsposter/M-Code.png",

      details:
        "METALLUM 7.0 presents M-CODE, a high-intensity 36-hour online hackathon designed to challenge innovation, problem-solving, and technical excellence. From 12th to 15th February 2026, participants will work on real-world problem statements, build impactful solutions, and compete for exciting prizes.",

      guidelines: [
        "Hackathon Structure",
        "Stage 1: Qualifier Round",
        "Teams must submit a fully functional project.",
        "Submission must include a GitHub repository, live application/website link, README file, and a demo video.",
        "Time allotted: 36 hours.",
        "Problem Statement Announcement: 12/02/2026 – 11:59 AM.",
        "Project Submission Deadline: 13/02/2026 – 11:59 PM.",
        "Selected teams will advance to the Presentation Round.",

        "Stage 2: Presentation Round",
        "Presentation Date: 15/02/2026, Time: 06:30 PM (Google Meet).",
        "Teams must present using a PPT (maximum 6 slides).",
        "Evaluation includes presentation clarity, technical soundness, innovation, and execution.",
        "Teams must be prepared for a Q&A session.",

        "General Guidelines",
        "Teams must consist only of registered participants.",
        "All work must be original and developed during the hackathon.",
        "Use of external libraries, APIs, and AI/ML tools is allowed but must be declared.",
        "Any form of plagiarism or unethical behavior will result in immediate disqualification.",

        "Judging Criteria",
        "Innovation and creativity of the idea.",
        "Design, usability, and UI/UX quality.",
        "Real-world impact of the solution.",
        "Technical complexity and stability.",
        "Code quality, documentation, and GitHub repository.",
        "Deployment of the application (deployed projects score higher).",

        "Bonus Points",
        "Use of latest technologies.",
        "Effective integration of AI and Machine Learning.",
      ],

      faq: [
        {
          question: "Can we start working on the project before the hackathon?",
          answer:
            "Participants may study required technologies, but prior development of projects is strictly prohibited.",
        },
        {
          question: "What if we face technical issues during the hackathon?",
          answer:
            "A dedicated support team, mentors, and volunteers will be available to assist.",
        },
        {
          question: "Will my team be disqualified if the project is not deployed?",
          answer:
            "No. Non-deployed projects will not be disqualified, but deployed projects will score higher.",
        },
      ],

      contacts: [
        { name: "Karan Kumar", phone: "8809285699" },
        { name: "Tejaswi Singh", phone: "9151613350" },
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-base-200 px-6 py-12">

      {/* PAGE TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Events</h1>
        <p className="opacity-70 mt-2">
          The road to the fest begins here
        </p>
      </div>

      {/* EVENTS GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-base-100 rounded-xl shadow-lg overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative w-full aspect-[7/5] bg-black">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-contain bg-black"
              />

              <span className="absolute top-3 left-3 badge badge-primary">
                {event.category}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-6 flex flex-col">
              <h2 className="text-xl font-bold mb-2">
                {event.title}
              </h2>

              <p className="text-sm opacity-70 mb-6">
                {event.description}
              </p>

              {/* 👇 BOTH BUTTONS (ALWAYS PRESENT) */}
              <div className="mt-auto flex gap-3">
                <button
                  className="btn btn-outline btn-primary btn-sm flex-1"
                  onClick={() => setSelectedEvent(event)}
                >
                  More Info
                </button>

                <button
                  className="btn btn-outline btn-primary btn-sm flex-1"
                  disabled={loading || event.title === "Chess" || event.title === "M-CODE"}
                  onClick={() => handleRegisterClick(event)}
                >
                  {loading && registerEvent?.id === event.id
                    ? "Processing..."
                    : (event.title === "Chess" || event.title === "M-CODE") ? "Closed" : "Register"}
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL SCREEN EVENT INFO MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          />

          <div className="relative z-10 w-full h-full bg-base-100 overflow-y-auto">
            <div className="relative h-72">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />

              <button
                className="absolute top-4 right-4 btn btn-circle btn-sm  bg-black/50 text-white hover:bg-black/70"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>


              <div className="absolute bottom-4 left-6 text-white">
                <span className="badge badge-primary mb-2">
                  {selectedEvent.category}
                </span>
                <h2 className="text-3xl font-bold">
                  {selectedEvent.title}
                </h2>
              </div>
            </div>

            <div className="p-8 max-w-4xl mx-auto">

              {/* DETAILS */}
              {selectedEvent.details && (
                <p className="text-lg opacity-80 mb-8">
                  {selectedEvent.details}
                </p>
              )}

              {/* GUIDELINES */}
              {selectedEvent.guidelines?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Guidelines</h3>
                  <ul className="list-disc pl-6 space-y-2 opacity-80">
                    {selectedEvent.guidelines.map((rule, i) => (
                      <li
                        key={i}
                        className={rule.trim().startsWith("#") ? "list-none font-bold text-lg -ml-4 mt-2" : ""}
                      >
                        {rule.trim().startsWith("#") ? rule.replace("#", "").trim() : rule}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedEvent.stages?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Stages</h3>
                  <ul className="list-disc pl-6 space-y-2 opacity-80">
                    {selectedEvent.stages.map((stage, i) => (
                      <li
                        key={i}
                        className={stage.trim().startsWith("#") ? "list-none font-bold text-lg -ml-4 mt-2" : ""}
                      >
                        {stage.trim().startsWith("#") ? stage.replace("#", "").trim() : stage}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedEvent.Judging_Criteria?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Judging_Criteria</h3>
                  <ul className="list-disc pl-6 space-y-2 opacity-80">
                    {selectedEvent.Judging_Criteria.map((criteria, i) => (
                      <li key={i}>{criteria}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CONTACTS */}
              {selectedEvent.contacts?.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-4">Contacts</h3>
                  <div className="space-y-2 opacity-80">
                    {selectedEvent.contacts.map((c, i) => (
                      <p key={i}>
                        {c.name} — <span className="font-semibold">{c.phone}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {selectedEvent.abstractLink && (
                <div className="mt-4 mb-4">
                  <a
                    href={selectedEvent.abstractLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      btn w-full sm:w-auto
                      bg-gradient-to-r from-blue-600 to-blue-800
                      hover:from-blue-700 hover:to-blue-900
                      text-white font-semibold tracking-wide
                      px-10 py-3
                      rounded-full
                      shadow-lg hover:shadow-xl
                      transition-all duration-300
                    "
                  >
                    Problem Statement
                  </a>
                </div>
              )}


              {/* REGISTER BUTTON */}
              <button
                disabled={selectedEvent.title === "Chess" || selectedEvent.title === "M-CODE"}
                onClick={() => {
                  if (selectedEvent.title === "Chess" || selectedEvent.title === "M-CODE") return;
                  setSelectedEvent(null);
                  handleRegisterClick(selectedEvent);
                }}
                className="
    btn w-full sm:w-auto
    bg-gradient-to-r from-blue-600 to-blue-800
    hover:from-blue-700 hover:to-blue-900
    text-white font-semibold tracking-wide
    px-10 py-3
    rounded-full
    shadow-lg hover:shadow-xl
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  "
              >
                {(selectedEvent.title === "Chess" || selectedEvent.title === "M-CODE") ? "Closed" : "Register Now"}
              </button>

              {/* ABSTRACT SUBMISSION BUTTON */}
              {selectedEvent.submissionLink && (
                <div className="mt-4">
                  <a
                    href={selectedEvent.submissionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      btn w-full sm:w-auto
                      bg-gradient-to-r from-blue-600 to-blue-800
                      hover:from-blue-700 hover:to-blue-900
                      text-white font-semibold tracking-wide
                      px-10 py-3
                      rounded-full
                      shadow-lg hover:shadow-xl
                      transition-all duration-300
                    "
                  >
                    Abstract Submission
                  </a>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* REGISTRATION MODAL */}
      {registerEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setRegisterEvent(null)}
          ></div>

          <div className="relative bg-[#0a0a0a] rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.1)] border border-white/10 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-white/5 bg-gradient-to-r from-gray-900 via-black to-gray-900">
              <button
                onClick={() => setRegisterEvent(null)}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 font-['Orbitron'] tracking-wide">
                REGISTER
              </h3>
              <p className="text-sm text-primary font-mono mt-1 tracking-wider opacity-80">
                 // {registerEvent.title.toUpperCase()}
              </p>
            </div>

            {/* Scrollable Form Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form onSubmit={submitRegistration} className="flex flex-col gap-5">

                {/* User Info (Read-only) */}
                {/* User Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                      {(registerEvent?.title === "BGMI" || registerEvent?.title === "VALORANT" || registerEvent?.title === "M-CODE") ? "Team Leader Name" : "Name"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1">Email</label>
                    <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/5 text-gray-300 text-sm truncate">
                      {user?.email || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-2">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <span className="text-xs text-gray-500 font-mono">ENTER DETAILS</span>
                  <div className="h-px bg-white/10 flex-1"></div>
                </div>

                {/* Phone */}
                <div className="form-control group">
                  <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                    {(registerEvent?.title === "BGMI" || registerEvent?.title === "VALORANT" || registerEvent?.title === "M-CODE") ? "Team Leader Phone Number" : "Phone Number"}
                  </label>
                  <div className="flex relative">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-white/10 bg-white/5 text-gray-400 font-mono text-sm select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="input rounded-l-none bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                      placeholder="XXXXXXXXXX"
                    />
                  </div>
                </div>

                {/* BGMI & VALORANT Teammates Section */}
                {(registerEvent?.title === "BGMI" || registerEvent?.title === "VALORANT" || registerEvent?.title === "M-CODE") && (
                  <div className="space-y-4 mt-2 mb-2">
                    <div className="flex items-center gap-4 my-2">
                      <div className="h-px bg-white/10 flex-1"></div>
                      <span className="text-xs text-gray-500 font-mono">
                        {registerEvent?.title === "VALORANT" ? "TEAMMATE (1 PLAYER)" : registerEvent?.title === "M-CODE" ? "TEAMMATES (2 PLAYERS)" : "TEAMMATES (3 PLAYERS)"}
                      </span>
                      <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    {teammates.map((member, index) => (
                      <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                        <label className="text-xs text-primary font-bold tracking-wider mb-3 block">PLAYER {index + 2}</label>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="form-control group">
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleTeammateChange(index, "name", e.target.value)}
                              required
                              className="input input-sm bg-black/40 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-600"
                              placeholder="Player Name"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* BGMI & VALORANT Payment Section */}
                {(registerEvent?.title === "BGMI" || registerEvent?.title === "VALORANT") && (
                  <div className="space-y-4 mt-4 bg-white/5 p-4 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center gap-4 my-2">
                      <div className="h-px bg-yellow-500/20 flex-1"></div>
                      <span className="text-xs text-yellow-500 font-mono tracking-widest">PAYMENT REQUIRED</span>
                      <div className="h-px bg-yellow-500/20 flex-1"></div>
                    </div>

                    <div className="text-center space-y-4">

                      {/* QR Code and Amount */}
                      <div className="bg-white p-4 rounded-lg inline-block shadow-lg">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=9993928756@jio&pn=Yash Chandekar&am=${registerEvent?.title === "BGMI" ? "50" : "100"}&cu=INR`)}`}
                          alt="Payment QR Code"
                          className="w-32 h-32 mx-auto"
                        />
                        <p className="text-black font-bold text-lg mt-2">₹{registerEvent?.title === "BGMI" ? "50" : "100"}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-gray-400">
                          Scan the QR Code using any UPI App (GPay, PhonePe, Paytm)
                        </p>
                        <p className="text-xs text-gray-500">OR</p>

                        {/* Manual Payment Details */}
                        <div className="bg-black/30 p-3 rounded text-left space-y-2 text-xs border border-white/5">
                          <div className="flex justify-between">
                            <span className="text-gray-400">UPI ID:</span>
                            <span className="text-yellow-500 font-mono select-all">9993928756@jio</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Name:</span>
                            <span className="text-white select-all">Yash Chandekar</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Mobile:</span>
                            <span className="text-white font-mono select-all">9993928756</span>
                          </div>
                        </div>
                      </div>

                      {/* Pay Now Button (Deep Link) as Backup */}
                      <a
                        href={`upi://pay?pa=9993928756@jio&pn=Yash%20Chandekar&am=${registerEvent?.title === "BGMI" ? "50" : "100"}&cu=INR`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline btn-warning btn-sm w-full"
                      >
                        Try 'Pay Now' Button
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </div>

                    <div className="form-control group mt-4">
                      <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-yellow-500 transition-colors">
                        Transaction ID / UTR
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        required
                        className="input bg-black/40 border border-white/10 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 text-white w-full transition-all duration-300 placeholder:text-gray-600"
                        placeholder="Enter Transaction ID (e.g. T230...)"
                      />
                    </div>
                  </div>
                )}

                {/* College */}
                <div className="form-control group">
                  <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                    College / Institute
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    required
                    className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                    placeholder="e.g. IIEST SHIBPUR"
                  />
                </div>

                {/* Branch & Year (Hidden for BGMI and VALORANT) */}
                {(registerEvent?.title !== "BGMI" && registerEvent?.title !== "VALORANT") && (
                  <>
                    {/* Branch (Full Width for long text) */}
                    <div className="form-control group">
                      <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                        Branch
                      </label>
                      <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        required
                        className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                        placeholder="e.g. METALLURGY AND MATERIALS ENGINEERING"
                      />
                    </div>

                    {/* Year & Team Name (Grid) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control group">
                        <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                          Year
                        </label>
                        <input
                          type="text"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          required
                          className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                          placeholder="e.g. 3rd"
                        />
                      </div>

                      <div className="form-control group">
                        <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                          Team Name <span className="text-gray-600 normal-case tracking-normal ml-1">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          name="teamName"
                          value={formData.teamName}
                          onChange={handleInputChange}
                          className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                          placeholder="Enter team name"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Team Name Only for BGMI or VALORANT */}
                {(registerEvent?.title === "BGMI" || registerEvent?.title === "VALORANT") && (
                  <div className="form-control group">
                    <label className="label text-xs uppercase text-gray-400 font-bold tracking-wider mb-1 pl-1 group-focus-within:text-primary transition-colors">
                      Team Name <span className="text-gray-600 normal-case tracking-normal ml-1">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      className="input bg-black/20 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 text-white w-full transition-all duration-300 placeholder:text-gray-700"
                      placeholder="Enter team name"
                    />
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full relative overflow-hidden group border-none text-white font-bold tracking-wider"
                    disabled={loading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          PROCESSING...
                        </>
                      ) : (
                        <>
                          CONFIRM REGISTRATION
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowSuccess(false)}></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center animate-[scale-in_0.3s_ease-out]">

            {/* Animated Checkmark Circle */}
            <div className="relative mb-6 group cursor-pointer" onClick={() => setShowSuccess(false)}>
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center bg-black/50 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                <svg
                  className="w-16 h-16 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
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

            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-green-400 to-green-600 font-['Orbitron'] mb-2 tracking-tight drop-shadow-lg">
              SUCCESS!
            </h2>

            <p className="text-gray-400 text-lg md:text-xl font-mono tracking-widest uppercase mb-8 opacity-0 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
              Registration Confirmed
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="px-8 py-3 bg-white text-black font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] skew-x-[-10deg] hover:skew-x-[-10deg]"
            >
              <span className="block skew-x-[10deg]">CONTINUE</span>
            </button>

          </div>
        </div>
      )}

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
              Access Restricted. Please sign in to register for events.
            </p>

            <a
              href="/auth/google"
              className="px-8 py-3 bg-red-600 text-white font-bold tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] skew-x-[-10deg] hover:skew-x-[-10deg] no-underline inline-block"
            >
              <span className="block skew-x-[10deg]">LOGIN NOW</span>
            </a>

          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="toast toast-end toast-bottom z-[100]">
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} text-white`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsAll;
