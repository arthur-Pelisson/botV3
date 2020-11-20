module.exports = {
	name: 'volume',
	description: 'Montre ou change le volume du bot',
	usage: '[Ci un chifre entre 1 et 5] change le volume',
	cooldown: 5,
	execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Je suis desoler mais tu a besoin d\'etre dans un channel audio pour jouer une music.');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Il n\'y a rien qui joue.');
		if (!args[0]) return message.channel.send(`Le volume et a: **${serverQueue.volume}**`);
		serverQueue.volume = args[0]; // eslint-disable-line
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		return message.channel.send(`${message.member.nickname} a changer le volume a: **${args[0]}/5**`);
	}
};