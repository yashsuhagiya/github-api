import express from 'express';
import fetch from 'node-fetch';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const app = express();
const FILE_PATH = join(__dirname, 'githubData.json');

// Middleware to fetch and save GitHub data
app.use(async (req, res, next) => {
  try {
    const response = await fetch("https://api.github.com/users/yashsuhagiya/repos");
    const githubData = await response.json();

    if (githubData.message) {
      return res.status(500).json({ error: "Error fetching GitHub data" });
    }

    await writeFile(FILE_PATH, JSON.stringify(githubData));
    next();
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error fetching GitHub data" });
  }
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
