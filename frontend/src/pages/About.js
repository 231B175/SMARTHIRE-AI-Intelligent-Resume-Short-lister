import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/about-bg.jpg')", // you can add a professional background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "white",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      ></div>

      {/* Content Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "900px",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ fontSize: "40px", fontWeight: "800", marginBottom: "20px" }}>
          About SMARTHIRE AI
        </h1>
        <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "30px" }}>
          SMARTHIRE AI: Intelligent Resume Shortlister is a cutting-edge AI-powered platform
          that helps HRs and recruiters automatically analyze, rank, and compare resumes
          efficiently. Our system evaluates resumes against job descriptions using advanced
          keyword and similarity matching techniques to provide an ATS-like scoring.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <div style={{ flex: "1 1 200px", margin: "10px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>Efficient</h2>
            <p>Rank and compare resumes instantly to save time.</p>
          </div>
          <div style={{ flex: "1 1 200px", margin: "10px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>Accurate</h2>
            <p>AI-powered analysis ensures precise scoring based on job requirements.</p>
          </div>
          <div style={{ flex: "1 1 200px", margin: "10px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>User-Friendly</h2>
            <p>Simple UI and interactive features make the recruiting process smooth.</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "14px 40px",
            fontSize: "18px",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(135deg, #4F46E5, #6366F1)",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
