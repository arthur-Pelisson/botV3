const { readdirSync } = require('fs');
const Path = require('../Path.js')
const { join } = require('path');

/**
 * @module SetCommands
 * @param clientDiscord
 * @return {Objet} client discord with commands Set
 */
module.exports = (client) => { //add command config to the client
	// console.log("ok")
	const commandFiles = readdirSync(Path.Commands).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(join(Path.Commands, `${file}`));
		client.commands.set(command.name, command);
	}
	// console.log(client.commands)
}

