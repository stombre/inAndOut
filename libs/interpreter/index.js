'use strict';

const Expression = require('./Expression');

function subClone(tab, start, end) {
  const result = [];
  for(let i = start; i <= end; i++) {
    result.push(tab[i]);
  }
  return result;
}

function wordsToExpression(wordsList) {
  const expressionSeparator = ['"', '`'];
  const expressionList = [];
  let currentSeparator = null;
  let currentWord;
  let startAt = null;
  let noSeparator;
  for(let wordIndex in wordsList) {
    currentWord = wordsList[wordIndex];
    noSeparator = true;
    expressionSeparator.forEach(function(separator) {
      if(currentWord.startsWith(separator) && currentSeparator === null) {
        wordsList[wordIndex] = wordsList[wordIndex].slice(1);
        currentSeparator = separator;
        startAt = wordIndex;
        noSeparator = false;
      }
      if(currentWord.endsWith(separator)) {
        if(currentSeparator !== null && currentSeparator === separator) {
          wordsList[wordIndex] = wordsList[wordIndex].slice(0, -1);
          expressionList.push(wordsToExpression(subClone(wordsList, startAt, wordIndex)));
          currentSeparator = null;
          startAt = null;
          noSeparator = false;
        }
      }
    });
    if(noSeparator) {
      if(currentSeparator === null) {
        expressionList.push(currentWord);
      }
    }
  }

  return new Expression(expressionList);
}


function injectStorage(storage) {
  function runCommand(commandInput) {
    const list = commandInput.split(' ');
    const expressions = wordsToExpression(list);
    const expressionCompiled = expressions.calculate();
    return expressionCompiled.run(storage);
  }

  return runCommand;
}

module.exports = injectStorage;