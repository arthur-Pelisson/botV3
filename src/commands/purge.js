module.exports = {
    name: 'purge',
    description: 'Suprime les message de 2 a 100',
    usage: '[Nombre de message a suprimer]',
    authorization: 11,
    args: true,
    execute(message, args) {
        const deleteCount = parseInt(args, 10);
        if (!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply("Veuiller renseigner le nombre de messages a suprimer entre 2 et 100");
        message.channel.bulkDelete(deleteCount)
    }
}