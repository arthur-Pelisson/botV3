module.exports = {
	name: 'reboot',
	description: 'Redemare le bot !',
    cooldown: 5,
    roles: 10,
	async execute(message) {
        await message.channel.send("Je me redémarre veuillez attendre quelques secondes merci !")
        process.exit(1)
	}
};