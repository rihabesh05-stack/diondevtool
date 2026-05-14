require("dotenv").config();

const express = require("express");
const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const fs = require("fs");

const app = express();

app.use(express.json());

const upload = multer({ dest: "uploads/" });

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// remove background route
app.post("/remove-bg", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "image file is required"
      });
    }

    const API_KEY = process.env.REMOVE_BG_API_KEY;

    const formData = new FormData();

    formData.append(
      "image_file",
      fs.createReadStream(req.file.path)
    );

    formData.append("size", "auto");

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key": API_KEY
        },
        responseType: "arraybuffer"
      }
    );

    const base64Image = Buffer.from(
      response.data,
      "binary"
    ).toString("base64");

    res.json({
      success: true,
      image: base64Image
    });

  } catch (error) {
    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: "Failed to remove background"
    });
  }
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});