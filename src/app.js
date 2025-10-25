"use strict";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile("pages/index.html", { root: __dirname });
});

app.get("/notes/:id", async (req, res) => {
  const notePath = path.join(
    __dirname,
    "pages/notes/",
    `${req.params.id}.html`
  );

  try {
    const file = await fs.promises.readFile(notePath, "utf-8");

    res.send(file);
  } catch (err) {
    res.status(404).send("Note not found:", err);
  }

  //res.sendFile("pages/index.html", { root: __dirname });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
