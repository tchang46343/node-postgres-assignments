const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const googleApps = require("./google-data.js");

app.get("/apps", (req, res) => {
  const { search = " ", sort } = req.query;

  if (search == "") {
    return res.status(400).send("Please enter a search term");
  }

  // if (search != Genres) {
  //   return res.status(400).send("Please enter a valid Genres.");
  //   // else{
  //   // let results = googleApps.filter(genres =>
  //   //     genres.Genres.toLowerCase().includes(search.toLowerCase())
  //   //   );
  //   //}
  // }
  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of Rating or App!");
    }
  }

  let results = googleApps.filter(genres => {
    return genres.Genres.toLowerCase().includes(search.toLowerCase());
  });

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

module.exports = app;
// app.listen(8000, () => {
//   console.log("Server started on port 8000");
// });
