# 🔥 Ask any GitHub repo questions in seconds (no setup)

A ridiculously simple and lightning-fast tool to ask AI questions about *any* public GitHub repository using their codebase as context.

## What it does
1. **Fetch**: Retrieves the live files straight from the target GitHub repo. 
2. **Read**: Chunks code appropriately.
3. **Analyze**: Sends chunks to GPT-4o-mini to return precise answers based entirely on the repository's code!

## Demo

![Demo Screenshot](/artifacts/demo.png) *(Experience a beautiful glowing dark mode UI answering complex repo questions!)*

## Example questions
- "What does this repository do?"
- "Where is the core authentication logic located?"
- "Explain how the main components interact in simple terms"
- "How do I run this app locally?"

## Setup steps

1. Navigate to the project directory:
   ```bash
   cd repo-chat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Create a `.env` file in the root directory (alongside `package.json`) and add your OpenAI API Key:
   ```env
   OPENAI_API_KEY=sk-your-openai-api-key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *(Server will run on http://localhost:3000)*
5. Open the Web App:
   Simply double-click `client/index.html` in your browser, or serve it using any simple static server like VS Code Live Server.

## How it works

The architecture is minimal:
- **Frontend**: A beautiful HTML/CSS/JS single-page interface powered by a sleek dark-mode design. Takes repo details and your questions.
- **Backend API**: A fast Express.js server which:
  - Uses the GitHub REST API to fetch down target repo contents.
  - Chunks down file outputs to keep context lightweight.
  - Pings the OpenAI Chat Completion API (`gpt-4o-mini`) using the repo's codebase as context to construct a highly context-aware response.
