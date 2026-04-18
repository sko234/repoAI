import axios from "axios";

export async function fetchRepoFiles(repoUrl) {
  const [_, owner, repo] = repoUrl.split("/").slice(-3);

  const api = `https://api.github.com/repos/${owner}/${repo}/contents`;

  // Fetch the file listing
  const res = await axios.get(api);

  const fileUrls = res.data
    .filter(file => file.type === "file")
    .filter(file => !['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'].includes(file.name.toLowerCase()))
    .filter(file => !['.png', '.jpg', '.jpeg', '.gif', '.svg', '.pdf', '.zip'].some(ext => file.name.toLowerCase().endsWith(ext)))
    .map(file => file.download_url);

  const fileContents = [];
  
  // Download the actual text content of each file
  for (const url of fileUrls) {
    try {
      const contentRes = await axios.get(url, { responseType: 'text' });
      const textData = typeof contentRes.data === 'string' ? contentRes.data : JSON.stringify(contentRes.data);
      fileContents.push(`\n--- FILE: ${url} ---\n${textData.slice(0, 40000)}`);
    } catch (err) {
      console.warn("Failed to fetch:", url);
    }
  }

  return fileContents;
}
