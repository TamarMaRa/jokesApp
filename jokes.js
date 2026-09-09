const fs = require("fs");
const Chance = require("chance");
const bee = require("bee-jokes");
const chalk = require("chalk");

const addJoke = () => {
  const jokes = loadJokes();
  const joke = new bee.Joke();
  const chance = new Chance();
  let duplicateJoke = true;
  let name;
  let age;
  let randomJoke;

  while (duplicateJoke) {
    name = chance.name();
    age = chance.age();
    randomJoke = joke.getRandomJoke("en").joke;
    duplicateJoke = jokes.find((joke) => {
      return joke.name === name && joke.age === age && joke.joke === joke;
    });
  }

  jokes.push({
    name: name,
    age: age,
    joke: randomJoke,
  });
  console.log(chalk.green("joke added!"));
  saveJokes(jokes);
};

//remove
const removeJoke = (name) => {
  const jokes = loadJokes();
  const jokesToKeep = jokes.filter(function (joke) {
    return joke.name !== name;
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
  const jokes = loadJokes();
  console.log(chalk.underline.yellow("all jokes:"));

  jokes.forEach((joke) => {
    console.log("- " + chalk.yellow(joke.joke));
  });
};

//read
const readJoke = (name) => {
  const jokes = loadJokes();
  const jokeToRead = jokes.find((joke) => {
    return joke.name === name;
  });

  if (jokeToRead) {
    console.log(chalk.blue(jokeToRead.joke));
  } else {
    console.log(chalk.red("error, joke doesnt exsist"));
  }
};

const searchKeyword = (keyword) => {
  const joke = new bee.Joke();
  const jokeToFind = joke.getJokeByKeyword(keyword);

  if (jokeToFind) {
    console.log(chalk.blue(jokeToFind[0].joke));
  } else {
    console.log(chalk.red("error, joke doesnt exsist"));
  }
};

const saveJokes = (jokes) => {
  const dataJSON = JSON.stringify(jokes, null, 2);
  fs.writeFileSync("jokes.json", dataJSON);
};

const loadJokes = () => {
  try {
    const dataBuffer = fs.readFileSync("jokes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addJoke: addJoke,
  removeJoke: removeJoke,
  listJokes: listJokes,
  readJoke: readJoke,
  searchKeyword: searchKeyword,
};
