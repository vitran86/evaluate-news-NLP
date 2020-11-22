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
app.use(bodyParser.text());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

console.log(__dirname);

// designates what port the app will listen to for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`This app is listening on port ${post}!`);
});

/* Set up Routers */

// GET route:

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("dist/index.html"));
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

//POST route

app.post("/input", async (req, res) => {
  let method = req.body.method;
  let content = req.body.content;

  let resp = await fetch("https://api.meaningcloud.com/sentiment-2.1", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: process.env.API_KEY,
      [method]: content,
      lang: "en",
      ilang: "en",
      verbose: "n",
    }),
  });

  if (resp.status === 200) {
    const data = await resp.json();
    console.log(data);

    // set up functions used for descript API data
    function decryptIrony(value) {
      if (data.irony === "NONIRONIC") {
        return "does not have ironic marks.";
      } else if (data.irony === "IRONIC") {
        return "has ironic marks.";
      }
    }
    function decryptSubjectivity(value) {
      if (value === "OBJECTIVE") {
        return "does not have any subjectivity marks";
      } else if (value === "SUBJECTIVE") {
        return "has subjective marks";
      }
    }
    function decryptAgreement(value) {
      if (value === "AGREEMENT") {
        return "The different elements have the same polarity.";
      } else if (value === "DISAGREEMENT") {
        return "There is disagreement between the different elements's polarity.";
      }
    }
    function decryptScoreTag(scoreTag) {
      switch (scoreTag) {
        case "P+":
          return "Strongly Positive";
        case "P":
          return "Positive";
        case "NEU":
          return "Neutral";
        case "N":
          return "Negative";
        case "N+":
          return "Strongly Negative";
        case "NONE":
          return "No sentiment";
      }
    }

    if (data.status.code === "0") {
      // formating API data as an array of objects (detailData)
      let overall = "Global";
      let subjectivity = decryptSubjectivity(data.subjectivity);
      let irony = decryptIrony(data.irony);
      let score_tag = decryptScoreTag(data.score_tag);
      let agreement = decryptAgreement(data.agreement);
      let confidence = data.confidence;

      const detailData = [
        {
          Level: overall,
          Text: `The text ${subjectivity} and ${irony}`,
          Score_tag: score_tag,
          Agreement: agreement,
          Confidence: confidence,
        },
      ];

      if (data.sentence_list) {
        data.sentence_list.forEach((sentence) => {
          detailData.push({
            Level: "Sentence",
            Text: sentence.text,
            Score_tag: decryptScoreTag(sentence.score_tag),
            Agreement: decryptAgreement(sentence.agreement),
            Confidence: sentence.confidence,
          });
        });
      }

      console.log(detailData); // --> expected an array of data : yes

      res.send(detailData); // send formatted data to client
    } else {
      res.send(data);
    }
  } else {
    throw new Error(`Unable to fetch data`);
  }
  try {
    console.log(req.body);
  } catch (error) {
    console.log("error", error);
  }
});
