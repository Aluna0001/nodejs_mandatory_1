import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readPage(filePath) {
  return fs.readFileSync(path.join(__dirname, filePath), "utf-8");
}

export function renderPage(template, navbar, pageContent, pageTitle) {
  return template
    .replace("$$NAVBAR$$", navbar)
    .replace("$$PAGE_CONTENT$$", pageContent)
    .replace("$$PAGE_TITLE$$", pageTitle);
}
