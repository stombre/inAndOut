'use strict';

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);


function consolePipe(service) {
  service.listen(function(err, msg) {
    if(err) {
      console.error(err);
      return;
    }
    console.log(msg);
  });

  rl.prompt();

  rl.on('line', (line) => {
    service.write(line);
    rl.prompt();
  });
}



module.exports = {
  run: consolePipe
};