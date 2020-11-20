//Construct of queueConstruct
module.exports = function (message, channel) { 
    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null,
        songs: [],
        volume: 2,
        playing: true
    };
    return queueConstruct
};