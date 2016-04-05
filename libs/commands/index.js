'use strict';

function inject(storage) {
  const service = {
    listen: require('./listen')(storage),
    write: require('./write')(storage)
  };

  function addCommands(commands) {
    const commandsList = commands.init(service);
    for(let commandName in commandsList) {
      storage.commands[commandName] = commandsList[commandName];
    }
  }

  return addCommands;
}

module.exports = inject;