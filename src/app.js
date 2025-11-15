"use strict";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readPage, renderPage } from "./util/templateEngine/templateEngine.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, "public")));

// Homepage
app.get("/", (req, res) => {
  const indexContent = readPage(path.join(__dirname, "pages/notes/index.html"));
  const page = renderPage(indexContent, {
    tabTitle: "Node.js Documentation - Home",
  });
  res.send(page);
});

// Individual notes
app.get("/notes/:id", (req, res) => {
  try {
    const noteContent = readPage(
      path.join(__dirname, `pages/notes/${req.params.id}.html`)
    );
    const page = renderPage(noteContent, {
      tabTitle: `Note ${req.params.id}`,
    });
    res.send(page);
  } catch (err) {
    res.status(404).send("Note not found");
  }
});

// Terminal page
app.get("/terminal", (req, res) => {
  const terminalContent = readPage(path.join(__dirname, "pages/terminal.html"));
  const page = renderPage(terminalContent, {
    tabTitle: "Terminal Commands",
  });
  res.send(page);
});

// Node.js page
app.get("/node", (req, res) => {
  const nodeContent = readPage(path.join(__dirname, "pages/nodejs.html"));
  const page = renderPage(nodeContent, {
    tabTitle: "Node.js",
  });
  res.send(page);
});

// Express page
app.get("/express", (req, res) => {
  const expressContent = readPage(path.join(__dirname, "pages/express.html"));
  const page = renderPage(expressContent, {
    tabTitle: "Express.js",
  });
  res.send(page);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
