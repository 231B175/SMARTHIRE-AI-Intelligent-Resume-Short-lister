import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css"; // ✅ create one common css file for both

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5000/upload-resume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert(`File "${file.name}" uploaded successfully!`);
        setFile(null);

        // ✅ AUTO REDIRECT ADDED
        navigate("/dashboard");
      } else {
        alert("Error uploading resume");
      }
    } catch (err) {
      alert("Error uploading resume");
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>📄 Upload Resume</h2>

        <div className="file-box">
          <input type="file" onChange={handleFileChange} />
        </div>

        {file && <p className="file-name">Selected file: {file.name}</p>}

        <div className="btn-group">
          <button className="upload-btn" onClick={handleUpload}>
            🚀 Upload
          </button>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
