const Discord = require('discord.js');
const config = require('../../ayarlar.json')


exports.run = async(client, message, args) => {
  if(message.author.id !== config.cubbelibey) return;
  if (!args[0] || args[0].includes('token')) return message.channel.send("Kod belirtilmedi `" + this.help.name + "`__`<kod>`__")

  if(args[0] == 'giris') return client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  if(args[0] == 'cikis') return client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
  
	const code = args.join(' ');
	function clean(text) {
		if (typeof text !== 'string')
			text = require('util').inspect(text, { depth: 0 })
		text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
		return text;
	};
    try {
		  var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Yasaklı komut").replace(client.token, "Yasaklı komut").replace(process.env.PROJECT_INVITE_TOKEN, "Yasaklı komut");
		  message.channel.send(`${evaled.replace(client.token, "Yasaklı komut").replace(process.env.PROJECT_INVITE_TOKEN, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) }
};

exports.conf = {
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'eval',
  description: 'Bot sahibi özel.',
  usage: 'eval'
};