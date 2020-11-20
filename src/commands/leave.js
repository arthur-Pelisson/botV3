module.exports = {
	name: 'leave',
	description: 'le bot quite le channel',
	execute (message) {
        const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Je suis desoler mais tu a besoin d\'etre dans un channel audio pour cette action !.');
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) {
            console.log('server queue nop')
            channel.leave()
        } else {
            serverQueue.songs = [];
            message.client.queue.delete(message.guild.id);
            channel.leave()
        }
	}
};