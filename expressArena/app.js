const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/pizza/pepperoni", (req, res) => {
  console.log("whatttt uppppp");
  res.send("Your pizza is on the way!");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("We don't serve that here. Never call again!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host:${req.hostname}
        Path:${req.path}
        Protocol:${req.protocol}
        Body:${req.body}
        IP:${req.ip}
        Secure:${req.secure}
    `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end();
});
app.get("/greetings", (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const occupation = req.query.occupation;

  //2.validate the values
  if (!name) {
    //3.name was not provided
    return res.status(400).send("Please provide a name");
  }

  if (!occupation) {
    //3.occupation was not provided
    return res.status(400).send("Please provide a occupation");
  }

  //4. and 5. both name and occupation are valid so do the processing.
  const greeting = `Greetings ${name} you are a ${occupation} you will do well in the monarch society! `;

  //6. send response
  res.send(greeting);
});

app.get("/video", (req, res) => {
  const video = {
    title: "Cats falling over",
    description: "15 minutes of cat videos",
    length: "15.40"
  };
  res.json(video);
});

app.get("/colors", (req, res) => {
  const colors = [
    {
      name: "red",
      rgb: "FF0000"
    },
    {
      name: "green",
      rgb: "00FF00"
    },
    {
      name: "blue",
      rgb: "000FF"
    }
  ];
  res.json(colors);
});

app.get("/grade", (req, res) => {
  //get the mark from the query
  const { mark } = req.query;
  //do some validation
  if (!mark) {
    //mark is required
    return res.status(400).send("Please provide a mark");
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    //mark must be a number
    return res.status(400).send("makr must be a numeric value");
  }

  if (numericMark < 0 || numericMark > 100) {
    //mark must be in range 0 to 100
    return res.status(400).send("Mark must be in range of 0 to 100");
  }

  if (numericMark >= 90) {
    return res.send("A");
  }
  if (numericMark > 80) {
    return res.send("B");
  }
  if (numericMark > 70) {
    return res.send("C");
  }
  res.send("F");
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
