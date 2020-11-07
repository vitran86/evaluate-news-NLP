console.log(`Hello Vi`);

// Require dotenv & mockAPI.js file for API key process
const dotenv = require("dotenv");
dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);
const mockAPIResponse = require("./mockAPI.js");

// Require Express & path to run server and routes
const path = require("path");
const express = require("express");

// Require Node-fetch to run server
const fetch = require("node-fetch");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("public/script"));

console.log(__dirname);

/* Set up Routers */

// GET route:

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve(".src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

//POST route
API_KEY = "82395d4488369588c28d15cd6c74ab38";
const baseUrl = "https://api.meaningcloud.com/sentiment-2.1?key=";

app.post("/input", async (req, res) => {
  let type = req.body.type;
  let input = req.body.input;

  const res = await fetch(`${baseUrl}${API_KEY}&lang=auto&${type}=${input}`);

  try {
    const data = await res.json();
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log("error", err);
  }
});
