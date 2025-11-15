import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const header = readPage(path.join(__dirname, "../components/header.html"));
const navbar = readPage(path.join(__dirname, "../components/navbar.html"));
const footer = readPage(path.join(__dirname, "../components/footer.html"));

export function renderPage(pageContent, options = {}) {
  return (
    header
      .replace("$$TAB_TITLE$$", options.tabTitle || "Node.js Documentation")
      .replace(
        "$$CSS_LINKS$$",
        options.cssLinks ||
          '<link rel="stylesheet" href="/assets/css/style.css">'
      ) +
    navbar +
    pageContent +
    footer.replace("$$SCRIPT_LINKS$$", options.scriptLinks || "")
  );
}

export function readPage(filePath) {
  return fs.readFileSync(filePath).toString();
}
