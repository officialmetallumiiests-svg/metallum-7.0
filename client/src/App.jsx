import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Homepage/navbar.jsx";
import Footer from "./Homepage/footer.jsx";


import Home from "./Homepage/home.jsx";

import About from "./Homepage/about.jsx";
import EventsAll from "./components/eventsall.jsx";
import Sponsors from "./components/sponsors.jsx";
import Team from "./components/team.jsx";
import Accommodation from "./components/accomodation.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import TShirtBooking from "./components/TShirtBooking.jsx";

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />


      <div className="flex-grow pt-20">

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<EventsAll />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/team" element={<Team />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/tshirt" element={<TShirtBooking />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
