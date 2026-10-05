import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Unable to connect to backend. Please ensure it's running.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("/images/login-bg.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          padding: "50px 60px",
          borderRadius: "20px",
          backdropFilter: "blur(8px)",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "20px", color: "#FACC15" }}>
          Welcome Back!
        </h2>
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
          onClick={handleLogin}
          style={{
            background: "#2563EB",
            padding: "10px 25px",
            borderRadius: "10px",
            border: "none",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        <br />
        <button
          onClick={() => navigate("/signup")}
          style={{
            background: "#10B981",
            padding: "10px 25px",
            borderRadius: "10px",
            border: "none",
            marginTop: "15px",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
}
