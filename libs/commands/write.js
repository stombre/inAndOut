'use strict';

function inject(storage) {

  function write(msg, options) {
    storage.pipes.forEach(function(pipe) {
      pipe.write(msg, options);
    });
  }

  return write;
}

module.exports = inject;