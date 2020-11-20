const ytdlDiscord = require('ytdl-core-discord');

/**
 * @function Play Play music in recursive
 * @param {Objet} Song
 * @return Lance la music ou throw erreur
 */

const play = async (song, message) => { //add command config to the client
    const queue = message.client.queue.get(message.guild.id);
    if (!song) {
        message.client.queue.delete(message.guild.id);
        return;
    }
    try {
        const dispatcher = await queue.connection.play( await ytdlDiscord(song.url), {type: 'opus'})
            .on('finish', () => {
                queue.songs.shift();
                play(queue.songs[0], message);
            })
            .on('error', error => console.error('error on finish dispatcher => ' + error));
        dispatcher.setVolumeLogarithmic(queue.volume / 5);
        queue.textChannel.send(`🎶 Start playing: **${song.title}**`);
    } catch(e) {
        console.log('erreur try catch of function play => ' + e)
        message.channel.send('Il y\'a eu une erreur dans la lecture de la music je vais me redémarer')
        message.client.commands.get('reboot').execute(message)
    }
}
exports.play = play