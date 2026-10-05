import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url("/images/landing-bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
        backdropFilter: "brightness(0.6)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          padding: "60px 80px",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            marginBottom: "20px",
            color: "#FACC15",
          }}
        >
          SMARTHIRE AI
        </h1>
        <h2 style={{ fontSize: "26px", marginBottom: "20px", color: "#E0E7FF" }}>
          Intelligent Resume Shortlister
        </h2>
        <p style={{ fontSize: "16px", maxWidth: "600px", marginBottom: "40px" }}>
          Your smart companion for fast, AI-powered resume analysis and ATS-based shortlisting.
          Upload your job description and resumes to find the best fit instantly.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 28px",
              backgroundColor: "#2563EB",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "12px 28px",
              backgroundColor: "#10B981",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
