import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import transcribe from "./transcriber.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.open_api,
});

app.get("/", (req, res) => {
  res.send("YouTube → Telugu Summary API is running");
});

app.post("/", async (req, res) => {
  const { url } = req.body;
  console.log("Received URL:", url);

  if (!url) {
    return res.status(400).json({ error: "YouTube URL is required" });
  }

  try {
//     // 1️⃣ Fetch transcript from YouTube
    const text = await transcribe(url);
    console.log("Extracted Transcript:", text);

    // 2️⃣ Generate Telugu summary
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `Summarize the following YouTube video content in clear, easy-to-understand, and elaborated Telugu:\n\n${text}`,
    });

    res.json({
      summary: response.output_text,
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Failed to extract transcript or generate summary",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
