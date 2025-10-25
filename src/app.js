import express from "express";
import { readPage, renderPage } from "./util/templateEngine/templateEngine.js";

const app = express();

app.use(express.static("public"));

const template = readPage("../../util/templates/page.html");
const navbar = readPage("../../util/components/navbar.html");

app.get("/", (req, res) => {
  const pageContent =
    "<h1>Test</h1>";
  const page = renderPage(template, navbar, pageContent, "Home - Node.js Docs");
  res.send(page);
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
