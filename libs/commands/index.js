'use strict';

function inject(storage) {

  function addCommands(commands) {
    const commandsList = commands.inAndOut(service);
    for(var commandName in commandsList) {
      storage.commands[commandName] = commandsList;
    }
  }

  return addCommands;
}

module.exports = inject;