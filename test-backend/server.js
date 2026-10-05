const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ Backend test is working fine!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Test backend running at http://localhost:${PORT}`);
});
