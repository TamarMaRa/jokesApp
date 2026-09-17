const fs = require("fs");
const Chance = require("chance");
const bee = require("bee-jokes");
const chalk = require("chalk");

const jokesFile = "jokes.json";

const saveJokes = (jokes) => {
  const dataJSON = JSON.stringify(jokes, null, 2);
  fs.writeFileSync(jokesFile, dataJSON);
};

const loadJokes = () => {
  try {
    const dataBuffer = fs.readFileSync(jokesFile);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const jokes = loadJokes();
const joke = new bee.Joke();
const chance = new Chance();

const addJoke = () => {
  let duplicateJoke = true;
  let name;
  let age;
  let randomJoke;

  do {
    name = chance.name();
    age = chance.age();
    randomJoke = joke.getRandomJoke("en").joke;
    duplicateJoke = jokes.find((joke) => {
      return joke.name === name;
    });
  } while (duplicateJoke);

  jokes.push({
    name,
    age,
    joke: randomJoke,
  });
  console.log(chalk.green("joke added!"));
  saveJokes(jokes);
};

//remove
const removeJoke = (name) => {
  const jokesToKeep = jokes.filter((joke) => {
    return joke.name.toLowerCase() !== name.toLowerCase();
  });

  if (jokes.length > jokesToKeep.length) {
    console.log(chalk.green("joke deleted!"));
    saveJokes(jokesToKeep);
  } else {
    console.log(chalk.red("joke doesnt exist"));
  }
};

//list
const listJokes = () => {
  console.log(chalk.underline.yellow("all jokes:"));

  jokes.forEach((joke) => {
    console.log("- " + chalk.yellow(joke.joke));
  });
};

//read
const readJoke = (name) => {
  const jokeToRead = jokes.find((joke) => {
    return joke.name === name;
  });

  if (jokeToRead) {
    console.log(chalk.blue(jokeToRead.joke));
  } else {
    console.log(chalk.red("error, joke doesnt exist"));
  }
};

const searchKeyword = (keyword) => {
  const jokeToFind = joke.getJokeByKeyword(keyword);

  if (jokeToFind) {
    console.log(chalk.blue(jokeToFind[0].joke));
  } else {
    console.log(chalk.red("error, joke doesnt exist"));
  }
};

module.exports = {
  addJoke,
  removeJoke,
  listJokes,
  readJoke,
  searchKeyword,
};
