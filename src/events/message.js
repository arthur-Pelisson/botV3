const dotenv = require('dotenv')
dotenv.config()
const Path = require('../Path.js')
const { RemoveExtraSpace } = require(Path.Utils + 'TrimMessage.js')


const Message = async (message) => {
   console.log('message.content => ' + message.content)
   if (message.author.bot) return //return message if is from the bot
   if (message.content.substr(0,1) !== message.client.config.prefix) return  // return if he dosen't have the prefix
   ///////////////////////////////////////////waiting for crating roles !!!/////////////////////////////////////////////////////////
   if (!message.member.roles.cache.some(r => [ 'THE EXILE', 'the master of balec', 'The kulbutoké', 'the strength of yggdrasil', 'The Miro', 'Dj', "Princesse"].includes(r.name))) return message.reply(`Pardon ${message.member.nickname} mais Tu n\'a pas les droit pour cette action`)
   /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   const TakeOffPrefix = message.content.substr(1)// take off prefix
   const TrimMEssage = RemoveExtraSpace(TakeOffPrefix)// take off extra space
   const args = TrimMEssage.split(' ')// split string
   commandName = args.shift().toLowerCase()// lowercase string
   const command = await message.client.commands.get(commandName)// get the command in config client from the command message 
   // const rolesMember = message.member.roles.cache.first().name
   // const authorization = await message.client.roles.get(rolesMember).authorization
   // console.log(authorization)
   // if (authorization < command.authorization) return message.reply(`Pardon ${message.member.nickname} mais Tu n\'a pas les droit pour cette action`)
   if (!command) return message.reply("Cette commande n'existe pas fdp va !");// if command don't existe return
   if (command.guildOnly && message.channel.type !== 'text') return message.reply('Je ne peut pas ')// if the channel is not a text channel return
   if (command.args && !args.length) { //if the command config have args and not the message from the user we come trough the if
		let reply = `Vous ne m'aves pas passé d'argument ${message.author}!`;
		if (command.usage) reply += `\nL'usage aproprier de cette commande est: \`${message.client.config.prefix}${command.name} ${command.usage}\``;
		return message.channel.send(reply);
   }

   try { //try catche to execute commande
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply(`Il y a eu une erreur dans l'execution de la commande`);
	}
}

exports.Message = Message