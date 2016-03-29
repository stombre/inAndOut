# In&Out
NodeJS tool for communicate with a distant server.

## Basic concept
In&Out is a tool for communicate with a server. There are three mains concepts : Pipe, Commands and Middlewares.
* Pipe are the main basis for communicate with the server. A pipe is the bridge between you and your apps.
* Commands are a set of tools wich you can use when you communicate with your server.
* Middlewares are for add functions on your pipe or on your commands.

## Pipe
```javascript
const inAndOut = require('inAndOut');
const slackInAndOut = require('inAndOut-slack');

const conf = {
  SECRET_KEY: 'rezrezrez',
  BOT_NAME: 'usain bot'
};

inAndOut.addPipe(slackInAndOut.conf(conf));
```

## Commands
```javascript
const inAndOut = require('inAndOut');
const redisInAndOut = require('inAndOut-redis');

const redisInAndOut = redisInAndOut();

inAndOut.addCommands(redisInAndOut);
```

## Middlewares
```javascript

```
