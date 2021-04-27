# jarrydandthejackles-wordsearch-ts

A word search font-end game that is easy to add to any project.

## History

This is a simple that I got a bit carried away with. 

Originally a fork of [Quentin André's WordSearchJS](https://github.com/QuentinAndre/WordSearchJS). 
The environment has been made a bit more strict and a few additional features added. 

## Usage

This is just a quick guide for drawing the word search on any page. 

### NodeJS (Typescript / ES6)

For the guys building their front-ends with ES6 or Typescript, you can import the modules individually. A full list will come soon, please refer to the `./src/` directory for a list of modules available. 

To get started simple import the `Creator` modules, instantiate an instance and call the `{instance}.create()` method: 

```ts
import Creator from "jarrydandthejackles-wordsearch-ts";

const creator = new Creator({
  parentId: "word-search-parent", // the id selector of the parent element 
  words: ["FIND", "ME", "SOMEWHERE"], // list of words to be found
  width: 10, // the number of columns in the grid
  height: 10, // the number of rows in the grid
});

creator.create();
```

### In Browser

For the browser support there is a bundled package available here: 
- [Bundled JS](./dist/wordsearch.bundle.js)
- [Source Maps](./dist/wordsearch.bundle.js.map)

The bundled packed makes the library available through the `JJWordSearch` global. Usage is the same as above except you don't need an import: 

```js
var creator = new JJWordSearch.Creator({
  parentId: "word-search-parent", // the id selector of the parent element 
  words: ["FIND", "ME", "SOMEWHERE"], // list of words to be found
  width: 10, // the number of columns in the grid
  height: 10, // the number of rows in the grid
});

creator.create();
```

> Please see the [`CreatorOptionsInterface` interface](./src/creator.d.ts) for further available options.

## Demo

There is a demo available here: 
- [Page](./dist/index.html)
- [Source](./src/app.ts)

## Available Options

WIP
