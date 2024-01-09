import express from 'express';
import fetch from 'node-fetch';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, 'githubData.json');

// Middleware to fetch and save GitHub data
async function fetchAndSaveGitHubData() {
  try {
    const response = await fetch("https://api.github.com/users/yashsuhagiya/repos");
    const githubData = await response.json();

    if (githubData.message) {
      throw new Error("Error fetching GitHub data");
    }

    await writeFile(FILE_PATH, JSON.stringify(githubData));
    console.log("GitHub data updated."); // Log the update for verification
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

app.get('/', (req, res) => {
  res.send("Hello World!");
  setInterval(fetchAndSaveGitHubData, 12 * 60 * 60 * 1000);
});

// Endpoint to retrieve GitHub data
app.get('/githubdata', async (req, res) => {
  try {
    const data = await readFile(FILE_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Error retrieving GitHub data" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
