'use strict';


function Command(command, params, options) {
  this.command = command;
  this.params = params || [];
  this.options = options || {};
}

Command.prototype.run = function run(storage) {
  if(typeof(storage.commands[this.command]) === 'undefined') {
    return Promise.reject(new Error('Undefined command: ' + this.command));
  }
  const promiseToDo = [];
  this.params.forEach(function(param) {
    promiseToDo.push(new Promise(function(resolve, reject) {
      if(param instanceof Command) {
        param.run(storage)
        .then(function(result) {
          resolve(result);
        })
        .catch(reject);
      } else {
        resolve(param);
      }
    }));
  });
  const elem = this;
  return new Promise(function (resolve, reject) {
    Promise.all(promiseToDo)
      .then(function(params) {
        return storage.commands[elem.command](params, elem.options);
      })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = Command;