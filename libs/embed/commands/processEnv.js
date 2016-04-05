'use strict';

function init(service) {
  return {
    processEnv: function(params, options) {
      let mode = 'get';
      let varName;
      if(params.length === 1) {
        varName = params[0];
      }
      if(params.length > 1) {
        varName = params[1];
        mode = params[0];
      }
      if(params.length > 3 || params.length > 2 && mode === 'get') {
        return Promise.reject('bad utilisation of processEnv operation');
      }
      if(mode !== 'get' && mode !== 'set') {
        return Promise.reject('bad utilisation of processEnv operation');
      }
      if(params.length === 0) {
        return Promise.resolve(process.env);
      }
      if(mode === 'set' && params.length === 3) {
        process.env[varName] = params[2];
      }
      return Promise.resolve(process.env[varName]);
    }
  }
}

module.exports = {
  init
};