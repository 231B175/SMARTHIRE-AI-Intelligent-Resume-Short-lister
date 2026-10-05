import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    projects: "",
    achievements: "",
    github: "",
    linkedin: "",
    template: "classic",
  });

  const [loading, setLoading] = useState(false);
  const [resumeLink, setResumeLink] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResumeLink("");

    try {
      const response = await fetch("http://localhost:5000/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ Resume generated successfully!");
        setResumeLink(data.link);
      } else {
        alert("⚠️ Failed to generate resume. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Unable to connect to backend. Please ensure it's running.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6366F1, #8B5CF6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: "600px",
          backgroundColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "40px",
          color: "white",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "30px", marginBottom: "20px" }}>
          📝 Resume Generator
        </h2>

        <form onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Phone", name: "phone" },
            { label: "Education", name: "education" },
            { label: "Skills", name: "skills" },
            { label: "Experience", name: "experience" },
            { label: "Projects", name: "projects" },
            { label: "Achievements", name: "achievements" },
            { label: "GitHub", name: "github" },
            { label: "LinkedIn", name: "linkedin" },
          ].map((input) => (
            <div key={input.name} style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "500",
                  color: "#E0E7FF",
                }}
              >
                {input.label}:
              </label>
              <input
                name={input.name}
                value={form[input.name]}
                onChange={handleChange}
                required={input.name !== "github" && input.name !== "linkedin"}
                placeholder={`Enter your ${input.label.toLowerCase()}`}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  color: "#333",
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                color: "#E0E7FF",
              }}
            >
              Select Template:
            </label>
            <select
              name="template"
              value={form.template}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                color: "#333",
              }}
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="creative">Creative</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #4338CA, #6D28D9)",
              border: "none",
              color: "white",
              fontWeight: "600",
              fontSize: "16px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {loading ? "Generating..." : "Generate Resume"}
          </button>

          {resumeLink && (
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "#FCD34D",
                wordBreak: "break-word",
              }}
            >
              <p>🎉 Your resume is ready!</p>
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#FCD34D",
                  textDecoration: "underline",
                  fontWeight: "600",
                }}
              >
                Click here to view or share your resume
              </a>
            </div>
          )}
        </form>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#F59E0B",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
