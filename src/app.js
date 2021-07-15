const request = require("request");
const express = require("express");
const hbs = require("hbs");
const app = express();
const port = 3000;
const path = require("path");
const publicDirectory = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialPath);

app.set("view engine", "hbs");
app.set("views", publicDirectory);
const url =
  "https://newsapi.org/v2/top-headlines?country=eg&apiKey=bf93a30272784054aade373348db3510";

request({ url, json: true }, (error, response) => {
  if (error) {
    return error;
  } else {
    app.get("", (req, res) => {
      res.render("index", {
        title: "News App",
        articles: response.body.articles,
      });
    });
  }
});

app.listen(port, () => {
  console.log(`News App is now running at http://localhost:${port}`);
});
