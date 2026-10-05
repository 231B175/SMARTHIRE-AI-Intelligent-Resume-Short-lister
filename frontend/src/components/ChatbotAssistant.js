import { useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";

export default function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 I'm your SmartHire AI Assistant. How can I help you today?" },
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Basic responses
    let reply = "I'm not sure I understand. Could you rephrase?";
    const lower = input.toLowerCase();

    if (lower.includes("ats")) {
      reply =
        "Your ATS score improves if your resume keywords match the job description. Try including skill and job-related terms!";
    } else if (lower.includes("upload")) {
      reply =
        "You can upload your resume and job description from the Dashboard using 'Upload Resume' and 'Upload Job Description' buttons.";
    } else if (lower.includes("resume") && lower.includes("create")) {
      reply =
        "To create a resume, go to 'Generate Resume' page and fill in your details. It will automatically create a PDF for you!";
    } else if (lower.includes("compare")) {
      reply =
        "The Compare feature ranks all uploaded resumes based on their ATS score relevance. Upload multiple resumes to try it!";
    } else if (lower.includes("hi") || lower.includes("hello")) {
      reply = "Hello! 👋 How can I assist you with your SmartHire tasks today?";
    } else if (lower.includes("thank")) {
      reply = "You're most welcome! 😊";
    }

    const botMessage = { sender: "bot", text: reply };
    setTimeout(() => setMessages((prev) => [...prev, botMessage]), 700);
    setInput("");
  };

  return (
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#6D28D9",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            fontSize: "26px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <FaRobot />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            width: "320px",
            height: "420px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#6D28D9",
              color: "white",
              padding: "12px 15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            <span>SmartHire AI Assistant</span>
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={toggleChat}
            />
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#F3F4F6",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    backgroundColor:
                      msg.sender === "user" ? "#6366F1" : "#E5E7EB",
                    color: msg.sender === "user" ? "white" : "#111827",
                    maxWidth: "80%",
                    fontSize: "14px",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #DDD",
              backgroundColor: "#FFF",
              padding: "8px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "14px",
                padding: "8px",
                borderRadius: "8px",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                backgroundColor: "#6D28D9",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "8px 10px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
