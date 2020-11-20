module.exports = {
	name: 'pause',
	description: 'Met la music en pause',
	
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return message.channel.send(`⏸ Mise en pause de la music pour toi! **${message.member.nickname}**`);
		}
		return message.channel.send("Il n'y a rien a mettre en pause.");
	}
};