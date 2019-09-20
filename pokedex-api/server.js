require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const POKEDEX = require("./pokedex.json");
const PORT = 8000;
//console.log(process.env.API_TOKEN);
const app = express();

app.use(morgan("dev"));

app.use(function validateBearerToken(req, res, next) {
  console.log("validate bearer token middleware");
  debugger;
  next();
  // const bearerToken = req.get("Authorization").split(" ")[1];
  // const apiToken = process.env.API_TOKEN;
  // move to the next middleware
  // if (bearerToken !== apiToken) {
  //   return res.status(401).json({ error: "Unauthorized request" });
  // }
});

app.get("/types", handleGetTypes);

app.get("/pokemon", handleGetPokemon);

// app.listen(PORT, cb);

function handleGetTypes(req, res) {
  // res.json(validTypes);
  app.get("/types", function handleGetTypes(req, res) {
    res.json(validTypes);
  });
}

function handleGetPokemon(req, res) {
  app.get("/pokemon", function handleGetPokemon(req, res) {
    let response = POKEDEX.pokemon;

    if (req.query.name) {
      response = response.filter(pokemon =>
        pokemon.name.toLowerCase().includes(req.query.name.t)
      );
    }
    res.json(response);
  });
}

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

const validTypes = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
  `Water`
];
