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

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
