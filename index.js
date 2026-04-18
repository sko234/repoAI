import express from "express";
import cors from "cors";
import { fetchRepoFiles } from "./github.js";
import { chunkFiles } from "./chunker.js";
import { askAI } from "./ai.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { repoUrl, question } = req.body;

  try {
    const files = await fetchRepoFiles(repoUrl);
    const chunks = chunkFiles(files);

    const answer = await askAI(chunks, question);

    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on 3000"));
