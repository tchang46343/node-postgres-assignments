const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.get("/sum", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;

  if (!a) {
    return res.status(400).send("Provide a number");
  }

  if (!b) {
    return res.status(400).send("Provide a number");
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (Number.isNaN(numA)) {
    return res.status(400).send("a must be a number");
  }

  if (Number.isNaN(numB)) {
    return res.status(400).send("b must be a number");
  }

  const c = numA + numB;

  const result = `The sum of ${numA} + ${numB} is ${c}`;
  res.send(result);
});

app.get("/cipher", (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;

  if (!text) {
    return res.status(400).send("text is required");
  }
  if (!shift) {
    return res.status(400).send("shift is required");
  }

  const numShift = parseFloat(shift);

  if (Number.isNaN(numShift)) {
    return res.status(400).send("shift must be a number");
  }

  // all valid, perform the task
  // Make the text uppercase for convenience
  // the question did not say what to do with punctuation marks
  // and numbers so we will ignore them and only convert letters.
  // Also just the 26 letters of the alphabet in typical use in the US
  // and UK today. To support an international audience we will have to
  // do more
  // Create a loop over the characters, for each letter, covert
  // using the shift

  const base = "A".charCodeAt(0); // get char code

  const cipher = text
    .toUpperCase()
    .split("") // create an array of characters
    .map(char => {
      // map each original char to a converted char
      const code = char.charCodeAt(0); //get the char code

      // if it is not one of the 26 letters ignore it
      if (code < base || code > base + 26) {
        return char;
      }

      // otherwise convert it
      // get the distance from A
      let diff = code - base;
      diff = diff + numShift;

      // in case shift takes the value past Z, cycle back to the beginning
      diff = diff % 26;

      // convert back to a character
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(""); // construct a String from the array

  res.send(cipher);
});

app.listen(8000, () => {
  console.log("Listening on port 8000!");
});
