'use strict';

const EventEmitter = require('events');


function inject(storage) {

  function generatePipe(pipeService) {
    let dataBuffer = new EventEmitter();
    const service = {
      listen: function() {
        return new Promise(function(resolve) {
          dataBuffer.on('output', function(data) {
            resolve(data);
          });
        });
      },
      write: function(msg) {
        dataBuffer.emit('input', msg);
      }
    };
    const pipe = pipeService.inAndOut(service);
    return {
      listen: function listen() {
        return new Promise(function(resolve) {
          dataBuffer.on('input', function(data) {
            resolve(data);
          });
        });
      },
      write: function write(msg) {
        dataBuffer.emit('output', msg);
      }
    }
  }

  function pipe(pipeService) {
    storage.pipes.push(generatePipe(pipeService));
  }

  return pipe;
}

module.exports = inject;