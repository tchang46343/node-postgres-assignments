require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const movieDataBase = require("./movieDataBase.json");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
const PORT = 9000;

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});
app.get("/movie", function handleGetGenre(req, res) {
  let response = movieDataBase;
  if (req.query.genre) {
    response = response.filter(genre =>
      genre.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }
  if (req.query.country) {
    response = response.filter(country =>
      country.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  if (req.query.avg_vote) {
    response = response.filter(
      movieDataBase =>
        Number(movieDataBase.avg_vote) >= Number(req.query.avg_vote)
    );
  }
  res.json(response);
});

app.listen(9000, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
