const yargs = require("yargs");
const jokes = require("./jokes.js");

yargs.version("1.1.0");

//add a random joke
yargs.command({
  command: "add",
  describe: "add a random joke",
  handler: function () {
    jokes.addJoke();
  }
});

//remove
yargs.command({
  command: "remove",
  describe: "remove a joke",
  builder: {
    name: {
      describe: "name",
      demandOption: true,
      type: "string",
    }
  },
  handler: function (argv) {
    jokes.removeJoke(argv.name);
  }
});

//list
yargs.command({
  command: "list",
  describe: "list your jokes",
  handler: function () {
    jokes.listJokes();
  }
});

//read
yargs.command({
  command: "read",
  describe: "read a joke",
  builder: {
    name: {
      describe: "joke name",
      demandOption: true,
      type: "string",
    }
  },
  handler: function (argv) {
    jokes.readJoke(argv.name);
  }
});

//keyword
yargs.command({
  command: "keyword",
  describe: "search by keyword",
  builder: {
    keyword: {
      describe: "keyword",
      demandOption: true,
      type: "string",
    }
  },
  handler: function (argv) {
    jokes.searchKeyword(argv.keyword);
  }
});

yargs.parse();
