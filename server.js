const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});const express = require("express");
const path = require("path");

const app = express();

// static
app.use(express.static(path.join(__dirname, "public")));

// test route (باش نتأكدو)
app.get("/test", (req, res) => {
  res.send("OK WORKING");
});

// fallback (مهم بزاف)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});