const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
require("dotenv").config();
const OpenAI = require("openai").default;
const pdfParse = require("pdf-parse");
const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 



// ----------------------------------------------------
// 🔐 USER AUTH WITH PERMANENT STORAGE (NEW FIX)
// ----------------------------------------------------
const usersFile = path.join(__dirname, "users.json");

// Load users from users.json
let users = [];
if (fs.existsSync(usersFile)) {
  try {
    users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
  } catch (err) {
    console.error("Error reading users.json:", err);
  }
}

// Save users to file
function saveUsers() {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Signup
app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const exist = users.find((u) => u.email === email);
  if (exist)
    return res.status(400).json({ success: false, message: "User already exists" });

  users.push({ email, password });
  saveUsers();
  res.json({ success: true, message: "Signup successful" });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user)
    return res.status(401).json({ success: false, message: "Invalid email or password" });

  res.json({ success: true, message: "Login successful" });
});


// -------------------------------------------------
// FILE UPLOAD STORAGE (unchanged)
// -------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const resumes = [];
let jobDescriptionFile = null;


// -------------------------------------------------
// UPLOADS (unchanged)
// -------------------------------------------------
app.post("/upload-resume", upload.single("resume"), (req, res) => {
  resumes.push(req.file);
  res.json({ success: true, message: "Resume uploaded successfully" });
});

app.post("/upload-jd", upload.single("jd"), (req, res) => {
  jobDescriptionFile = req.file;
  res.json({ success: true, message: "Job Description uploaded successfully" });
});


// -------------------------------------------------
// ATS SCORE (matched + missing keywords) — unchanged
// -------------------------------------------------
app.get("/ats-score", async (req, res) => {
  if (!jobDescriptionFile || resumes.length === 0)
    return res.json({ success: false, message: "Upload JD & Resumes first" });

  try {
    const jdData = await pdfParse(
      fs.readFileSync(path.join(__dirname, "uploads", jobDescriptionFile.filename))
    );
    const jdText = jdData.text.toLowerCase();
    const jdWords = tokenizer.tokenize(jdText);
    const jdKeywords = jdWords.filter(
      (w) =>
        w.length > 3 &&
        !["with", "from", "this", "that", "have", "been", "your", "and", "the"].includes(w)
    );
    const jdSet = new Set(jdKeywords);

    const scores = [];

    for (const resume of resumes) {
      const resumeData = await pdfParse(
        fs.readFileSync(path.join(__dirname, "uploads", resume.filename))
      );
      const resumeText = resumeData.text.toLowerCase();
      const resumeWords = tokenizer.tokenize(resumeText);
      const resumeSet = new Set(resumeWords);

      const matched = [...jdSet].filter((w) => resumeSet.has(w));
      const missing = [...jdSet].filter((w) => !resumeSet.has(w));

      const score = ((matched.length / jdSet.size) * 100).toFixed(2);

      scores.push({
        resume: resume.originalname,
        score,
        matchedKeywords: matched.slice(0, 10),
        missingKeywords: missing.slice(0, 10),
      });
    }

    res.json({ success: true, scores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error calculating ATS score" });
  }
});


// -------------------------------------------------
// COMPARE RESUMES (unchanged)
// -------------------------------------------------
app.get("/compare", (req, res) => {
  if (!jobDescriptionFile || resumes.length === 0)
    return res.json({ success: false, comparison: [] });

  let comparison = resumes.map((resume) => ({
    resume: resume.originalname,
    score: Math.floor(Math.random() * 41) + 60,
  }));

  comparison.sort((a, b) => b.score - a.score);

  res.json({ success: true, comparison });
});
app.post("/generate-resume", (req, res) => {
  const {
    name,
    email,
    phone,
    education,
    skills,
    experience,
    projects,
    achievements,
    github,
    linkedin,
    template,
  } = req.body;

  const genDir = path.join(__dirname, "uploads/generated");
  if (!fs.existsSync(genDir)) fs.mkdirSync(genDir, { recursive: true });

  const filePath = path.join(genDir, `${Date.now()}_resume.pdf`);
  const doc = new PDFDocument({ margin: 40 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  // COLORS
  let headerColor = "#3F51B5"; 
  let accent = "#3F51B5";

  if (template === "modern") {
    headerColor = "#4A148C";
    accent = "#4A148C";
  } else if (template === "creative") {
    headerColor = "#8E24AA";
    accent = "#8E24AA";
  }

  // HEADER
doc.rect(0, 0, doc.page.width, 90).fill(headerColor);

doc.fillColor("white")
  .fontSize(26)
  .text(name, 40, 30);

doc.fontSize(12);
doc.text(`Email: ${email}`, 40, 65);
doc.text(`Phone: ${phone}`, 200, 65);

// FIXED → LinkedIn & GitHub stay on one line
doc.text(`LinkedIn: ${linkedin || "N/A"}`, 320, 65);
doc.text(`GitHub: ${github || "N/A"}`, 470, 65);


  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // SIMPLE LEFT-ALIGNED CLASSIC SECTION (UPDATED)
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  // -------------------------------
// CLASSIC TEMPLATE (SUPER SIMPLE, LEFT ALIGNED, NO COLORS)
// -------------------------------
// ----------------------------------------------------
// CLASSIC TEMPLATE — SIMPLE BLACK BORDER BOXES + LEFT ALIGN
// ----------------------------------------------------
const classicBox = (title, text) => {
  doc.moveDown(3);

  const boxStartY = doc.y;
  const boxWidth = doc.page.width - 80;

  // Estimate height
  const textHeight = doc.heightOfString(text || "N/A", {
    width: boxWidth - 20,
    align: "left",
  });
  const boxHeight = textHeight + 40;

  // Draw border box
  doc
    .strokeColor("black")
    .lineWidth(1)
    .rect(40, boxStartY, boxWidth, boxHeight)
    .stroke();

  // Write section title
  doc
    .fontSize(15)
    .fillColor("black")
    .text(title, 50, boxStartY + 10);

  // Write content
  doc
    .moveDown()
    .fontSize(12)
    .fillColor("black")
    .text(text || "N/A", 50, boxStartY + 30, {
      width: boxWidth - 20,
      align: "left",
      lineGap: 4,
    });

  doc.y = boxStartY + boxHeight + 10;
};

// Apply ONLY for Classic
// -------------------------------
// CLASSIC TEMPLATE — SUPER SIMPLE, NO BOXES, NO COLORS
// -------------------------------
// -------------------------------
// CLASSIC TEMPLATE — SUPER SIMPLE, LEFT ALIGNED
// -------------------------------
if (template === "classic") {

  // Reset cursor after header to left side
  doc.x = 40;
  doc.y = 120;

  const simpleSection = (title, text) => {

    // Title
    doc.fontSize(16)
       .fillColor("black")
       .text(title, 40, doc.y + 10, {
         align: "left"
       });

    doc.moveDown(0.5);

    // Body
    let lines = (text || "N/A").split("\n");

    lines.forEach(line => {
      doc.fontSize(12)
         .fillColor("black")
         .text("• " + line.trim(), 40, doc.y, {
           align: "left",
           lineGap: 4
         });
      doc.moveDown(0.4);
    });

    doc.moveDown(1.2);
  };

  simpleSection("Education", education);
  simpleSection("Skills", skills);
  simpleSection("Experience", experience);
  simpleSection("Projects", projects);
  simpleSection("Achievements", achievements);
}




  // CREATIVE TEMPLATE (unchanged)
  // ---------------------------------------------
//         CREATIVE TEMPLATE (NO PHOTO)
// ---------------------------------------------
// ---------------------------------------------
//         FINAL FIX — CREATIVE TEMPLATE
// ---------------------------------------------
// ---------------------------------------------
// 💜 FIXED & IMPROVED CREATIVE TEMPLATE
// ---------------------------------------------
// ---------------------------------------------
// 💜 FINAL WORKING CREATIVE TEMPLATE
// ---------------------------------------------
if (template === "creative") {

    // RESET PAGE BACKGROUND (remove header influence)
    doc.fillColor("white");
    doc.rect(0, 0, doc.page.width, doc.page.height).fill("white");

    // FULL LEFT PURPLE SIDEBAR
    doc.fillColor("#8E24AA")
       .rect(0, 0, 200, doc.page.height)
       .fill();

    // CONTACT DETAILS IN SIDEBAR
    doc.fillColor("white")
       .fontSize(26)
       .text(name, 30, 40);

    doc.fontSize(12)
       .text(`Email: ${email}`, 30, doc.y + 10)
       .text(`Phone: ${phone}`, 30, doc.y + 5)
       .text(`LinkedIn: ${linkedin}`, 30, doc.y + 5)
       .text(`GitHub: ${github}`, 30, doc.y + 5);

    // RIGHT CONTENT START
    let startX = 230;
    let y = 60;
    const boxWidth = doc.page.width - startX - 40;

    function creativeSection(title, text) {
        const boxHeight = 110;

        // Soft Pink Box
        doc.fillColor("#F3D1F7")
           .rect(startX, y, boxWidth, boxHeight)
           .fill();

        // Title
        doc.fillColor("#6A1B9A")
           .fontSize(18)
           .text(title, startX + 20, y + 15);

        // Body
        doc.fillColor("black")
           .fontSize(12)
           .text(text || "N/A", startX + 20, y + 45, {
               width: boxWidth - 40,
               align: "left",
               lineGap: 4
           });

        y += boxHeight + 20;
    }

    creativeSection("Education", education);
    creativeSection("Skills", skills);
    creativeSection("Experience", experience);
    creativeSection("Projects", projects);
    creativeSection("Achievements", achievements);

}

  else if (template === "modern") {

  // Modern Header (unchanged)
  doc.rect(0, 0, doc.page.width, 140).fill("#4A148C");

  doc.fillColor("white")
    .fontSize(32)
    .text(name, 40, 40);

  doc.fontSize(13)
    .text(`Email: ${email}   |   Phone: ${phone}`, 40, 85);

  doc.text(`LinkedIn: ${linkedin || "N/A"}   |   GitHub: ${github || "N/A"}`, 40, 105);

  doc.moveDown(2);

  // ⬛ MODERN BOXED SECTION (NEW UPDATE)
  const boxSection = (title, text) => {
    let y = doc.y + 10;
    const boxX = 40;
    const boxWidth = doc.page.width - 80;

    // Estimate height automatically
    const contentHeight = doc.heightOfString(text || "N/A", {
      width: boxWidth - 30,
      align: "left"
    });
    const boxHeight = contentHeight + 50;

    // Draw box
    doc.strokeColor("#4A148C")
       .lineWidth(1.5)
       .rect(boxX, y, boxWidth, boxHeight)
       .stroke();

    // Title
    doc.fillColor("#4A148C")
       .fontSize(17)
       .text(title, boxX + 15, y + 12);

    // Body
    let lines = (text || "N/A").split("\n");
    doc.fillColor("black").fontSize(12);

    let textY = y + 40;
    lines.forEach(line => {
      doc.text("• " + line.trim(), boxX + 20, textY, {
        width: boxWidth - 40,
        lineGap: 4
      });
      textY = doc.y;
    });

    // Move cursor below box
    doc.y = y + boxHeight + 20;
  };

  // Apply each section inside boxed layout
  boxSection("Education", education);
  boxSection("Skills", skills);
  boxSection("Experience", experience);
  boxSection("Projects", projects);
  boxSection("Achievements", achievements);
}


  // END
  doc.end();

  stream.on("finish", () => {
    const link = `http://localhost:${PORT}/uploads/generated/${path.basename(
      filePath
    )}`;
    res.json({ success: true, link });
  });
});


// -------------------------------------------------
// CHATBOT (unchanged)
// -------------------------------------------------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message)
    return res.status(400).json({ success: false, reply: "Message required" });

  try {
    const output = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are SmartHire AI assistant." },
        { role: "user", content: message },
      ],
    });

    res.json({ success: true, reply: output.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ success: false, reply: "AI error" });
  }
});



// -------------------------------------------------
// START SERVER
// -------------------------------------------------
app.listen(PORT, () =>
  console.log(`✅ Backend running at http://localhost:${PORT}`)
);
