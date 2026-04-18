import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function askAI(chunks, question) {
  const context = chunks.join("\n");

  const prompt = `
You are analyzing a GitHub repository.

Files:
${context}

Question:
${question}
`;

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("The repository files are too large for the AI to process at once.");
    }
    throw error;
  }
}
