import fs from "fs";

const header = readPage("./util/components/header.html");
const navbar = readPage("./util/components/navbar.html");
const footer = readPage("./util/components/footer.html");

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

export function readPage(path) {
  return fs.readFileSync(path).toString();
}
