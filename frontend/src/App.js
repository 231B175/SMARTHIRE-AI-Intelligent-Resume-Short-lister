import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import ResumeForm from "./pages/ResumeForm"; // New form page
import UploadResume from "./pages/UploadResume";
import UploadJD from "./pages/UploadJD";
import ATSScore from "./pages/ATSScore";
import Compare from "./pages/Compare";
import About from "./pages/About";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate-resume" element={<ResumeForm />} /> {/* Resume generator */}
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/upload-jd" element={<UploadJD />} />
        <Route path="/ats-score" element={<ATSScore />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
