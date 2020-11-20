module.exports = {
	name: 'resume',
	description: 'Reprend la music mis en pause',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Le resumer de la music !');
		}
		return message.channel.send('Il n\'y a rien a jouer.');
	}
};