const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// handlebars setup: engine and views
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Akshit Sahani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Stephanie Plummer",
  });
});

app.get("/weather", ({ query: { address }, res }) => {
  if (!address) {
    return res.send({ error: "Please provide an address!" });
  }
  try {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (forecastError, forecastData) => {
        if (forecastError) return res.send({ error: forecastError });
        return res.send({ address, location, forecast: forecastData });
      });
    });
  } catch (e) {
    res.send({ error: e });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term!" });
  }
  console.log(req.query);
  res.send({ products: [] });
});

app.get("/help", (req, res) => {
  res.render("Help", {
    title: "Help me.....",
    name: "Shivika Sahani",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help page not found",
    name: "Akshit Sahani",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Akshit Sahani",
  });
});

app.listen(port, () => console.log(`Sever is up on port ${port}`));
