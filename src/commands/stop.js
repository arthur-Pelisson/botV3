module.exports = {
	name: 'stop',
	description: 'Stop le bot et suprime la file d\'attente',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Je suis desoler mais tu a besoin d\'etre dans un channel audio pour cette action !.');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Il n\'y a pas de music a arreter.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('La command stop a ete utilisé!');
	}
}; 