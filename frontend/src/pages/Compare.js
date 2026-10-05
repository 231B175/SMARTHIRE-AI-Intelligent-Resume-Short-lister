import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Compare() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const compareResumes = async () => {
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch("http://localhost:5000/compare", {
        method: "GET",
      });

      const data = await response.json();

      if (data.success && data.comparison.length > 0) {
        setResults(data.comparison);
      } else {
        alert("Please upload at least one Job Description and multiple resumes first.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Unable to connect to backend. Please ensure it’s running.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #4F46E5, #9333EA)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "30px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          padding: "40px 60px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          width: "90%",
          maxWidth: "700px",
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "10px" }}>
          Resume Comparison
        </h2>
        <p style={{ color: "#E0E7FF", marginBottom: "30px", fontSize: "16px" }}>
          Compare all uploaded resumes based on ATS ranking.
        </p>

        <button
          onClick={compareResumes}
          disabled={loading}
          style={{
            padding: "12px 25px",
            marginRight: "15px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #4338CA, #6D28D9)",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {loading ? "Comparing..." : "Compare Resumes"}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "12px 25px",
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

        {results.length > 0 && (
          <div style={{ marginTop: "40px", textAlign: "left" }}>
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              🏆 Resume Comparison Results
            </h3>

            {results.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                <h4 style={{ fontSize: "20px", fontWeight: "600" }}>
                  {index + 1}. {item.resume}
                </h4>
                <p style={{ fontSize: "18px", marginTop: "8px" }}>
                  ATS Score:{" "}
                  <span style={{ color: "#FCD34D", fontSize: "22px" }}>
                    {item.score}%
                  </span>
                </p>
                {index === 0 && (
                  <p
                    style={{
                      color: "#10B981",
                      fontWeight: "600",
                      fontSize: "16px",
                      marginTop: "6px",
                    }}
                  >
                    🥇 Highest Scoring Resume!
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
