module.exports = {
	name: 'skip',
	description: 'Passe a la music suivant',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Je suis desoler mais tu a besoin d\'etre dans un channel audio pour jouer une music.');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Il n\'y a pas de music a passer.');
		serverQueue.connection.dispatcher.end('Skip command a ete utilisé!');
	}
};