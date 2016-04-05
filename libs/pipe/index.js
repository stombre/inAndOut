'use strict';

const EventEmitter = require('events');


function inject(storage) {
  const runExpession = require('../interpreter')(storage);

  function generatePipe(pipeService) {
    let dataBuffer = new EventEmitter();
    const service = {
      listen: function(handler) {
        dataBuffer.on('output', function(data) {
          handler(data.err, data.msg);
        });
      },
      write: function(msg) {
        dataBuffer.emit('input', msg);
      }
    };
    const pipe = pipeService.run(service);
    dataBuffer.on('input', function(data) {
      runExpession(data)
        .then(function(msg) {
          const output = {
            msg,
            err: null
          };
          dataBuffer.emit('output', output);
        })
        .catch(function(err) {
          const output = {
            err
          };
          dataBuffer.emit('output', output);
        })
    });
    return {
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