'use strict';

function inject(storage) {

  function generatePipe(pipeService) {
    let ref;
    const service = {
      listen: function() {
        return new Promise(function(resolve) {
          ref = resolve;
        });
      },
      call: function(commandName) {
        storage.commands[commandName]();
      }
    };
    const pipe = pipeService.inAndOut(service);
    return {
      write: function write(msg, options) {
        ref(msg);
      },
      listen: function listen() {
        return new Promise(function(resolve) {
          service.write = resolve;
        });
      }
    }
  }

  function pipe(pipeService) {
    storage.pipes.push(generatePipe(pipeService));
  }

  return pipe;
}

module.exports = inject;