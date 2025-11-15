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

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
