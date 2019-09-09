const chalk = require("chalk-animation");

function animateString(string) {
  const animation = chalk.rainbow(string);
  animation.start();

  setTimeout(() => animation.stop(), 2000);
}

module.exports = { animateString: animateString };
