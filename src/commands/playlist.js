const YouTube = require('simple-youtube-api');
const youtube = new YouTube(
  'AIzaSyCAzqXTPVoynkdWXgqNuQwxXn8o2T_sT64'
);
const Path = require('../path.js')
const QueueConstruct = require(Path.Utils + ('QueueConstruct.js'))
const { play } = require(Path.Utils + 'PlayFunction.js')
const { RandomFunction } = require(Path.Utils + 'RandomFunction.js')



module.exports = {
    name: 'playlist',
    description: 'Cherche une playlist youtube avec un lien',
    usage: '[Lien de playlist youtube]',
    args: true,
    async execute(message, args) {
        const { channel } = message.member.voice;
        const regex = new RegExp('^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$');        if (!channel) return message.channel.send('Vous devez etre dans un channel audio pour faire cette commande');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('je ne peut pas me connecter a ce channel verifier que j\'ai les bonnes permissions');
		if (!permissions.has('SPEAK')) return message.channel.send('Je ne peut pas parler dans ce channel verifier que j\'ai les bonnes permissions');
        if (!regex.test(args[0])) return (message.channel.send('Seulement les lien youtube son autorisée !'));
        if ( args[1] !== undefined && args[1] !== '!random') {
            message.send.channel("Ce n'es pas l'argument attendu !")
        } else if (args[1] === '!random') {
            random = true
        } else {
            random = false
        }
        const serverQueue = message.client.queue.get(message.guild.id);
        await youtube.getPlaylist(args[0].replace(/<(.+)>/g, '$1'))
            .then(async playlist => {
                console.log(`The playlist's title is ${playlist.title}`);
                await playlist.getVideos()
                .then(async videos => {
                    var length = videos.length
                    for (i = 0 ; i < length; i++) {
                        serverQueueForTheCurls = message.client.queue.get(message.guild.id);
                        if (random === true) {
                            randomInt = RandomFunction(videos.length)
                            const song = {
                                id: videos[randomInt].id,
                                title: videos[randomInt].title,
                                url: videos[randomInt].url
                            }
                            // console.log('server queue =>  ' + serverQueueForTheCurls)
                            if (serverQueueForTheCurls) {
                                // console.log('in server queue')
                                serverQueueForTheCurls.songs.push(song);
                                //  message.channel.send(`✅ **${song.title}** A ete ajouter a la queue`);
                            } else {
                                // console.log('queue construct')
                                queueConstruct = QueueConstruct(message, channel)//moduls of creation queuconstructe
                    
                                message.client.queue.set(message.guild.id, queueConstruct);
                                queueConstruct.songs.push(song);
                            }
                            try {
                                videos.splice(randomInt, 1)
                            } catch(e) {
                                console.log(e)
                            }
                            
                        } else {
                            const song = {
                                id: videos[i].id,
                                title: videos[i].title,
                                url: videos[i].url
                            }
                            // console.log('server queue =>  ' + serverQueueForTheCurls)
                            if (serverQueueForTheCurls) {
                                // console.log('in server queue')
                                serverQueueForTheCurls.songs.push(song);
                                //  message.channel.send(`✅ **${song.title}** A ete ajouter a la queue`);
                            } else {
                                // console.log('queue construct')
                                queueConstruct = QueueConstruct(message, channel)//moduls of creation queuconstructe
                    
                                message.client.queue.set(message.guild.id, queueConstruct);
                                queueConstruct.songs.push(song);
                            }
                        }
                    }
                    
                })
                .catch(console.log);
                message.channel.send(`✅ la playlist **${playlist.title}** a été ajouter a la piste de lecture !`);
            })
            .catch(console.log);
            for (i = 0; i < queueConstruct.songs.length; i++) {
                // console.log(queueConstruct.songs[i])
            }
            if (!serverQueue) {
                try {
                // console.log('try catch play => ')
                const connection = await channel.join();
                queueConstruct.connection = connection;
                // console.log(queueConstruct.songs[0])
                // play is a moduls export for the const function play
                play(queueConstruct.songs[0], message);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                message.client.queue.delete(message.guild.id, message);
                await channel.leave();
                return message.channel.send(`Je n'est pas pus rejoindre le channel audio: ${error}`);
                }
            }
    }

}