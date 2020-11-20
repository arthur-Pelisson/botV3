const { Util } = require('discord.js');
const ytdlDiscord = require('ytdl-core-discord');
const Path = require('../path.js')
const QueueConstruct = require(Path.Utils + ('QueueConstruct.js')) 
const { play } = require(Path.Utils + 'PlayFunction.js')

module.exports = {
	name: 'play',
	description: 'Joue la music demandée',
	usage: '[Lien youtube]',
	args: true,
	cooldown: 5,
	async execute(message, args) {
        const { channel } = message.member.voice;
        const regex = new RegExp('^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$');
		if (!channel) return message.channel.send('Vous devez etre dans un channel audio pour faire cette commande');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('je ne peut pas me connecter a ce channel verifier que j\'ai les bonnes permissions');
		if (!permissions.has('SPEAK')) return message.channel.send('Je ne peut pas parler dans ce channel verifier que j\'ai les bonnes permissions');
        if (!regex.test(args[0])) return (message.channel.send('Seulement les lien youtube son autorisée !'));
        const serverQueue = message.client.queue.get(message.guild.id);
        console.log('before getinfo')
        const songInfo = await ytdlDiscord.getInfo(args[0].replace(/<(.+)>/g, '$1'));
        console.log('after getinfo')
        
        ///////////////////////prender tout ce qu'il y a en dessou a partir d'ici pour en faire plusieur function /////////////////////
		const song = {
            id: songInfo.video_id,
			title: Util.escapeMarkdown(songInfo.title),
			url: songInfo.video_url
        };
        
        console.log(song)
		if (serverQueue) {
			serverQueue.songs.push(song);
			return message.channel.send(`✅ **${song.title}** A ete ajouter a la queue`);
		}
        queueConstruct = QueueConstruct(message, channel)//moduls of creation queuconstructe
        
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		try {
            console.log('try to join')
			const connection = await channel.join();
            queueConstruct.connection = connection;
            // play is a moduls export for the const function play
			play(queueConstruct.songs[0], message);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`Je n'est pas pus rejoindre le channel audio: ${error}`);
		}
	}
};