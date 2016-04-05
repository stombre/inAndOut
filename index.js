

const buildStorage = require('./libs/internal/storage');
const storage = buildStorage();

const pipe = require('./libs/pipe')(storage);
const addCommands = require('./libs/commands')(storage);

//Default operations :
addCommands(require('./libs/embed/commands/system'));

module.exports = {
  PIPE: {
    Console: require('./libs/embed/pipe/console')
  },
  COMMANDS: {
    processEnv: require('./libs/embed/commands/processEnv')
  },
  pipe,
  addCommands
};