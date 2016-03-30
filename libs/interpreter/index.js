'use strict';

function wordsToExpression(wordsList) {
  const expressionSeparator = ['"', '`'];
  let currentSeparator = null;
  let currentWord;
  let startAt = null;
  let expressionList = [];
  let noSeparator;
  for(var wordIndex in wordsList) {
    currentWord = wordsList[wordIndex];
    noSeparator = true;
    expressionSeparator.forEach(function(separator) {
      if(currentWord.startsWith(separator)) {
        wordsList[wordIndex] = wordsList[wordIndex].slice(1);
        currentSeparator = separator;
        startAt = wordIndex;
        noSeparator = false;
      }
      if(currentWord.endsWith(separator)) {
        if(currentSeparator !== null && currentSeparator === separator) {
          wordsList[wordIndex] = wordsList[wordIndex].slice(0, -1);
          expressionList.push(wordsToExpression(wordsList.slice(startAt, wordIndex)));
          currentSeparator = null;
          startAt = null;
          noSeparator = false;
        }
      }
      if(noSeparator) {
        if(currentSeparator === null) {
          expressionList.push(currentWord);
        }
      }
    });
  }

  return expressionList;
}

function runCommand(commandInput) {
  const list = commandInput.split(' ');
  const expressions = wordsToExpression(list);
}

module.exports = runCommand;