'use strict';

function injectDependencies(storage) {

  function listen() {
    return new Promise(function(resolve) {
      storage.pipes.forEach(function(pipe) {
        pipe.listen()
          .then(resolve);
      });
    });
  }

  return listen;
}

module.exports = injectDependencies;