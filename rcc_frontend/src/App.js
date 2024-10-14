import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./constants/navbar";
import Home from "./pages/home";
import Rcm from "./pages/rcm";
import Gcm from "./pages/gcm";
import Seasonal from "./pages/seasonal-verification";
import Climatology from "./pages/reference-climatology";
import ClimateChange from "./pages/climate-change";
import Skill from "./pages/skill-diagnostics"
import Footer from "./constants/footer";
import  Verification from "./pages/seasonal-verification";
import Reference from "./pages/reference";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rcm" element={<Rcm />} />
        <Route path="/gcm" element={<Gcm />} />
        <Route path="/seasonal" element={<Seasonal />} />
        <Route path="/reference-climatology" element={<Climatology />} />
        <Route path="/climate-change" element={<ClimateChange />} />
        <Route path="/skill" element={<Skill />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/reference" element={<Reference />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
