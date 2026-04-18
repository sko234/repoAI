async function ask() {
  const repoUrl = document.getElementById("repo").value;
  const question = document.getElementById("question").value;
  const outputElem = document.getElementById("output");

  if (!repoUrl) {
    outputElem.innerText = "Please provide a GitHub repo URL.";
    return;
  }
  
  outputElem.innerText = "Analyzing code, please wait...";
  outputElem.classList.add("loading");

  try {
    const res = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl, question })
    });

    const data = await res.json();
    outputElem.innerText = data.answer || data.error || "No answer received.";
  } catch (error) {
    outputElem.innerText = "Error: Could not connect to the server.";
  } finally {
    outputElem.classList.remove("loading");
  }
}

async function explain() {
  const repoUrl = document.getElementById("repo").value;
  const outputElem = document.getElementById("output");

  if (!repoUrl) {
    outputElem.innerText = "Please provide a GitHub repo URL.";
    return;
  }

  outputElem.innerText = "Studying the repository architecture, please wait...";
  outputElem.classList.add("loading");

  try {
    const res = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        repoUrl,
        question: `Explain this repository in simple terms:\n- What it does\n- Main components\n- How it works`
      })
    });

    const data = await res.json();
    outputElem.innerText = data.answer || data.error || "No answer received.";
  } catch (error) {
    outputElem.innerText = "Error: Could not connect to the server.";
  } finally {
    outputElem.classList.remove("loading");
  }
}
