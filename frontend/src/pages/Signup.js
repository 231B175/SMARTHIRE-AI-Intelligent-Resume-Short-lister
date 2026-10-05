import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Signup successful! You can now log in.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Unable to connect to backend. Please ensure it's running.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #4F46E5, #9333EA)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          padding: "40px 50px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "250px",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            textAlign: "center",
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "250px",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            textAlign: "center",
          }}
        />
        <br />
        <button
          onClick={handleSignup}
          style={{
            background: "#10B981",
            padding: "10px 25px",
            borderRadius: "10px",
            border: "none",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
        <br />
        <button
          onClick={() => navigate("/login")}
          style={{
            background: "#F59E0B",
            padding: "10px 25px",
            borderRadius: "10px",
            border: "none",
            marginTop: "15px",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
