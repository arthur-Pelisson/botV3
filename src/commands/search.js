const search = require('yt-search');
const Path = require('../path.js')
const QueueConstruct = require(Path.Utils + ('QueueConstruct.js')) 
const { play } = require(Path.Utils + 'PlayFunction.js')


module.exports = {
    name: 'search',
    description: 'Cherche une music youtube avec un nom',
    usage: '[Nom de music]',
    args: true,
    async execute(message, args) {
        const { channel } = message.member.voice
        console.log(channel)
        if (!channel) return message.channel.send('Vous devez etre dans un channel audio pour faire cette commande');
        const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('je ne peut pas me connecter a ce channel verifier que j\'ai les bonnes permissions');
		if (!permissions.has('SPEAK')) return message.channel.send('Je ne peut pas parler dans ce channel verifier que j\'ai les bonnes permissions');
        search(args.join(' '), function (err, res) {
            if (err) return message.channel.send('Cela n\a pas marcher dsl')
            const serverQueue = message.client.queue.get(message.guild.id);
            let videos = res.videos.slice(0, 10);
            let resp = '';
            for (var i in videos) {
                resp += `**[${parseInt(i) + 1}]:** \`${videos[i].title}\`\n`;
            }
            resp += `\n**choisie un nomre entre 1 et 10 \`1-${videos.length}\``;
            message.channel.send(resp)

            const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;

            const collector = message.channel.createMessageCollector(filter)

            collector.videos = videos;

            collector.once('collect', async function (m) {
                ///////////////////////prendre tout ce qu'il y a en dessou a partir d'ici pour en faire plusieur function /////////////////////
                const song = {
                id: this.videos[[parseInt(m.content) - 1]].video_id,
                title: this.videos[parseInt(m.content) - 1].title,
                url: this.videos[parseInt(m.content) - 1].url
                }
                if (serverQueue) {
                    serverQueue.songs.push(song);
                    console.log(serverQueue.songs);
                    return message.channel.send(`✅ **${song.title}** A ete ajouter a la queue`);
                }
        
                queueConstruct = QueueConstruct(message, channel)//moduls of creation queuconstructe

                message.client.queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);
        
                try {
                    const connection = await channel.join();
                    queueConstruct.connection = connection;
                    // play is a moduls export for the const function play
                    play(queueConstruct.songs[0], message);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error}`);
                    message.client.queue.delete(message.guild.id, message);
                    await channel.leave();
                    return message.channel.send(`Je n'est pas pus rejoindre le channel audio: ${error}`);
                }
            });
        });
    }
}
