import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import ChatbotAssistant from "../components/ChatbotAssistant";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      className="dashboard-wrapper"
      style={{
        backgroundImage: "url('/images/dashboard-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <div className="dashboard-card">
        <h1 className="dash-title">🚀 SMARTHIRE AI Dashboard</h1>
        <p className="dash-subtitle">
          Manage resumes, job descriptions & ATS scores intelligently with AI.
        </p>

        <div className="dash-buttons">
          <button onClick={() => navigate("/upload-resume")} className="dash-btn blue">
            📄 Upload Resume
          </button>
          <button onClick={() => navigate("/upload-jd")} className="dash-btn green">
            📝 Upload Job Description
          </button>
          <button onClick={() => navigate("/ats-score")} className="dash-btn purple">
            📊 ATS Score
          </button>
          <button onClick={() => navigate("/compare")} className="dash-btn orange">
            ⚖️ Compare Resumes
          </button>
          <button onClick={() => navigate("/about")} className="dash-btn pink">
            ℹ️ About
          </button>
          <button onClick={() => navigate("/generate-resume")} className="dash-btn yellow">
            🖨️ Generate Resume
          </button>
        </div>
      </div>

      {/* Floating Chatbot */}
      <ChatbotAssistant />
    </div>
  );
}

export default Dashboard;
