'use strict';

const Command = require('./Command');

function Expression(value) {
  this.valueList = value;
}


function parseOptions(options) {
  const optionsResult = {};
  let equal;
  options.forEach(function(option) {
    option = option.slice(1);
    equal = options.indexOf('=');
    if(equal === -1) {
      optionsResult[option] = true;
    } else {
      optionsResult[option.slice(0, equal)] = option.slice(equal + 1);
    }
  });
  return optionsResult;
}

Expression.prototype.calculate = function calculate(stdIn) {
  if(this.valueList.indexOf('|') !== -1) {
    const pipePosition = this.valueList.indexOf('|');
    this.input = new Expression(this.valueList.slice(0, pipePosition));
    this.output = new Expression(this.valueList.slice(pipePosition + 1));
    return this.output.calculate(this.input.calculate(stdIn));
  }
  const result = [];
  for(let currentValue in this.valueList) {
    const current = this.valueList[currentValue];
    if(current instanceof Expression) {
      result.push(current.calculate());
    } else {
      result.push(current);
    }
  }
  const command = result[0];
  const options = [];
  const params = [];
  for(let index = 1; index < result.length; index++) {
    const value = result[index];
    if(value.startsWith('-')) {
      options.push(value);
    } else {
      params.push(value);
    }
  }
  if(stdIn) {
    params.push(stdIn);
  }

  return new Command(command, params, parseOptions(options));
};

module.exports = Expression;