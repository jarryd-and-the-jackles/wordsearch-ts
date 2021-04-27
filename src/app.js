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
function randNumber(max, min) {
    if (max === void 0) { max = 15; }
    if (min === void 0) { min = 0; }
    return Math.floor((Math.random() * (max - min))) + min;
}
function createWordSearch(parentId) {
    if (parentId === void 0) { parentId = "wordsearch-container"; }
    console.log("Creating Word Search...");
    var words = wordCollection();
    var sliceCount = randNumber(10, 5);
    var sliceStartMax = (words.length - sliceCount);
    var sliceStart = randNumber(sliceStartMax, 0);
    WordSearchCreator.debugging = true;
    var wordsearchCreator = new WordSearchCreator({
        height: 10,
        width: 10,
        words: words.slice(sliceStart, (sliceStart + sliceCount)),
        parentId: parentId,
        cellOptions: {
            width: 40,
            height: 40,
        },
    });
    var wordsearch = wordsearchCreator.create();
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
var wordsearch = createWordSearch();
console.log(wordsearch);
setTimeout(function () {
    var wrapper = document.getElementById("wordsearch-container");
    wrapper.innerHTML = "";
    var parent2 = document.createElement("div");
    parent2.id = "wordsearch-container-1";
    document.body.append(parent2);
    setTimeout(function () {
        var wordsearch = createWordSearch("wordsearch-container");
        var wordsearch2 = createWordSearch("wordsearch-container-1");
        console.log(wordsearch);
        console.log(wordsearch2);
    }, 500);
}, 1000);
//# sourceMappingURL=app.js.map