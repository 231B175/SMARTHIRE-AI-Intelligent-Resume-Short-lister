import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ATSScore() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const calculateScore = async () => {
    setLoading(true);
    setScores([]);
    try {
      const response = await fetch("http://localhost:5000/ats-score", {
        method: "GET",
      });

      const data = await response.json();

      if (data.success && data.scores.length > 0) {
        setScores(data.scores);
      } else {
        alert("No resumes or job description found. Please upload both first!");
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
        background: "linear-gradient(to right, #6366F1, #8B5CF6)",
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
          ATS Score Analyzer
        </h2>
        <p style={{ color: "#E0E7FF", marginBottom: "30px", fontSize: "16px" }}>
          Instantly evaluate all your uploaded resumes against the Job Description.
        </p>

        <button
          onClick={calculateScore}
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
          {loading ? "Calculating..." : "Calculate ATS Scores"}
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

        {/* Show scores */}
        {scores.length > 0 && (
          <div style={{ marginTop: "40px", textAlign: "left" }}>
            <h3
              style={{
                fontSize: "26px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              🧾 Resume ATS Scores
            </h3>

            {scores.map((item, index) => (
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
                <h4 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>
                  📄 {item.resume}
                </h4>
                <p style={{ fontSize: "18px" }}>
                  <strong>ATS Score:</strong>{" "}
                  <span style={{ color: "#FCD34D", fontSize: "22px" }}>
                    {item.score}%
                  </span>
                </p>
                <p style={{ fontSize: "14px", color: "#E0E7FF" }}>
                  (A score above 70% indicates a strong match)
                </p>

                <div style={{ marginTop: "15px" }}>
                  <p style={{ fontWeight: "600" }}>✅ Matched Keywords:</p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "6px",
                    }}
                  >
                    {item.matchedKeywords && item.matchedKeywords.length > 0 ? (
                      item.matchedKeywords.map((word, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: "#10B981",
                            padding: "4px 8px",
                            borderRadius: "8px",
                            fontSize: "13px",
                          }}
                        >
                          {word}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: "#FCA5A5" }}>No matches found</span>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <p style={{ fontWeight: "600" }}>❌ Missing Keywords:</p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "6px",
                    }}
                  >
                    {item.missingKeywords && item.missingKeywords.length > 0 ? (
                      item.missingKeywords.map((word, i) => (
                        <span
                          key={i}
                          style={{
                            backgroundColor: "#EF4444",
                            padding: "4px 8px",
                            borderRadius: "8px",
                            fontSize: "13px",
                          }}
                        >
                          {word}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: "#FCD34D" }}>No missing keywords</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
