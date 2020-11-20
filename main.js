require('dotenv').config()
const ConfigClient = require('./src/Client/client');
const client = new ConfigClient({ token: process.env.TOKEN, prefix: process.env.PREFIX });

const Path = require('./src/Path.js')
const { Message } = require(Path.Events + 'message.js')
const SetCommands = require(Path.Utils + 'SetCommands.js')
const SetRoles = require(Path.Utils + 'SetRoles.js')

client.on("error", (e) => console.error('erreur'));
client.on("warn", (e) => console.warn(e));
// client.on("debug", (e) => console.info(e));
// client.run  to restart client idk if it work i juste let it here for later 
client.on('disconnect', () => console.log("i juste disconnected"))

client.on('reconnecting', () => console.log("i am reconnecting now !"))

client.on('ready', function () {
  
  console.log("Je suis connecté !")
  client.user.setUsername(process.env.BOT_NAME);
  // console.log(client)
  SetCommands(client)// set command in the client
  SetRoles(client)// set command in the client
  // console.log(client.command)
})

client.on('message', message => {
    return Message(message)
})

client.login(client.config.token)

