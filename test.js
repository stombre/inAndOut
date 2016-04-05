'use strict';

const lib = require('./index');

lib.addCommands(lib.COMMANDS.processEnv);
lib.pipe(lib.PIPE.Console);
