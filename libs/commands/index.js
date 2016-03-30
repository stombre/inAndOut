'use strict';

function inject(storage) {
  const service = {
    listen: require('./listen')(storage),
    write: require('./write')(storage)
  };

  function addCommands(commands) {
    const commandsList = [].concat(commands.inAndOut(service));
    for(var commandName in commandsList) {
      storage.commands[commandName] = commandsList;
    }
  }

  return addCommands;
}

module.exports = inject;