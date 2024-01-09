const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
});

// Endpoint to retrieve GitHub data
app.get('/githubdata', async (req, res) => {
  try {
    const fileExists = await fs.access(FILE_PATH)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      const data = await fs.readFile(FILE_PATH, 'utf8');
      res.json(JSON.parse(data));
    } else {
      fetchAndSaveGitHubData();
    }
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Error retrieving GitHub data" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
  setInterval(fetchAndSaveGitHubData, 12 * 60 * 60 * 1000);
});
