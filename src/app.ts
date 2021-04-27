import WordSearchCreator from "./index";

function wordCollection() {
  return [
    "CRYSTAL",
    "EXTINCT",
    "SPECIES",
    "BIVALVE",
    "PACIFIC",
    "CHISEL",
    "FOSSIL",
    "PERIOD",
    "HAMMER",
    "ISLAND",
    "MAMMAL",
    "EOCENE",
    "INSECT",
    "LIZARD",
    "PEBBLE",
    "PLANT",
    "CORAL",
    "STONE",
    "AMBER",
    "TOOTH",
    "CLIFF",
    "SHELL",
    "OCEAN",
    "SQUID",
    "COAST",
    "SHARK",
    "SKULL",
    "SPINE",
    "CLAW",
    "CAVE",
    "TIDE",
    "BIRD",
    "LEAF",
    "FISH",
    "BONE",
    "ROCK",
    "PREY",
    "COAL",
    "FERN",
    "LEAF",
    "TAIL",
  ];
}

function randNumber(max = 15, min = 0) {
  return Math.floor((Math.random() * (max - min))) + min;
}

function createWordSearch(parentId = "wordsearch-container") {
  console.log("Creating Word Search...");
  let words = wordCollection();
  let sliceCount = randNumber(10, 5);
  let sliceStartMax = (words.length - sliceCount);
  let sliceStart = randNumber(sliceStartMax, 0);

  WordSearchCreator.debugging = true;
  const wordsearchCreator = new WordSearchCreator({
    height: 10,
    width: 10,
    words: words.slice(sliceStart, (sliceStart + sliceCount)),
    parentId: parentId,
    cellOptions: {
      width: 40,
      height: 40,
    },
  });
  const wordsearch = wordsearchCreator.create();

  console.log("All Words Added: ", wordsearchCreator.areWordsAdded());
  console.log("Word Count: ", wordsearchCreator.getWordCount());
  console.log("Width: ", wordsearchCreator.width);
  console.log("Height: ", wordsearchCreator.height);
  console.log(WordSearchCreator.wordMap);
  console.log("Created Word Search.");

  return {
    wordsearchCreator: wordsearchCreator,
    wordsearch: wordsearch,
  };
}

const wordsearch = createWordSearch();

console.log(wordsearch);

// just to show that you can create multiple
setTimeout(function () {
  const wrapper = document.getElementById("wordsearch-container") as Element;
  wrapper.innerHTML = "";

  const parent2 = document.createElement("div");
  parent2.id = "wordsearch-container-1";
  // noinspection XHTMLIncompatabilitiesJS
  document.body.append(parent2);

  setTimeout(function () {
    const wordsearch = createWordSearch("wordsearch-container");
    const wordsearch2 = createWordSearch("wordsearch-container-1");

    console.log(wordsearch);
    console.log(wordsearch2);
  }, 500);
}, 1000);

export {};
