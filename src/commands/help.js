module.exports = {
	name: 'help',
	description: 'Liste des commands du bot',
	
	execute(message) {
        let reply = ''
        message.client.commands.forEach(command => {
            if (!command.usage) {
                reply += `**!${command.name}** => ${command.description}\n`
            } else {
                reply += `**!${command.name}** : ${command.usage}  => ${command.description} \n`
            }
        });
        message.channel.send(reply)
	}
};