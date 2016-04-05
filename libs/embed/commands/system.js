'use strict';

function init(service) {
  return {
    grep: function(params) {
      if(params.length !== 2) {
        return Promise.reject(new Error('grep need two parameters'));
      }
      const search = params[0];
      const stdIn = params[1];

      if(typeof(stdIn) === 'object') {
        if(Array.isArray(stdIn)) {
          const result = [];
          stdIn.forEach(function(e) {
            if(e.indexOf(search) !== -1) {
              result.push(e);
            }
          });
          return Promise.resolve(result);
        }
        const result = {};
        for(let indexName in stdIn) {
          if(indexName.indexOf(search) !== -1 || stdIn[indexName].toString().indexOf(search) !== -1) {
            result[indexName] = stdIn[indexName];
          }
        }
        return Promise.resolve(result);
      }

      return Promise.reject(new Error('missing file line implementation'));
    }
  }
}

module.exports = {
  init
};