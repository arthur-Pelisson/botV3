module.exports = {
	name: 'queue',
	description: 'Montre la file d\'attente des music',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Il n\'y a pas de music dans la file.');
        if (serverQueue.songs[0] === undefined) return message.channel.send('Il n\'y a pas de music dans la file.')
        var MessageQueu = `
**Now playing:** ${serverQueue.songs[0].title}
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
        `
        

        if (MessageQueu.length > 1900) {
            // console.log('message > 2000')
           return message.channel.send(MessageQueu.substr(0,1900) + '\n**-**. . . . .') 
        } else {
            // console.log('message < 2000')
           return message.channel.send(MessageQueu);
        }
	}
};