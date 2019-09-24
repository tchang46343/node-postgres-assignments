require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const movieDataBase = require("./movieDataBase.json");
console.log(process.env.API_TOKEN);
const app = express();
app.use(morgan("dev"));
const PORT = 9000;

app.use(function validateBearerToken(req, res, next) {
  //   const bearerToken = req.get("Authorization").split(" ")[1];
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  console.log("validate bearer token middleware");
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});
app.get("/movie", function handleGetGenre(req, res) {
  let response = movieDataBase;
  if (req.query.genre) {
    response = movieDataBase.filter(genre =>
      genre.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }
  if (req.query.country) {
    response = movieDataBase.filter(country =>
      country.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  if (req.query.avg_vote) {
    response = movieDataBase.filter(
      avg_vote => Number(avg_vote) >= Number(req.query.avg_vote)
    );
  }
  res.json(response);
});

app.listen(9000, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
