const { MessageEmbed } = require('discord.js');
const config = require("../../ayarlar.json");

exports.run = (client, message, args) => {

if(message.member.roles.cache.has(config.commander) || message.member.hasPermission('ADMINISTRATOR')) {
let cb = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(!cb || message.mentions.members.size < 1 && isNaN(args[0])) {
message.delete({timeout: 5000})
return message.channel.send(`Örnek Kullanım: \`${config.prefix}${this.help.name} @CubbeliBey/ID\`
Komut Açıklaması: \`${this.help.description}\``).then(msg => msg.delete({timeout: 5000}))
}

cb.roles.cache.has(config.booster) ? cb.roles.set([config.booster, config.kayıtsız]).catch() : cb.roles.set([config.kayıtsız]).catch()
cb.setNickname(`${config.ktag} ${config.kisim}`).catch()
message.delete({timeout: 5000})
return message.channel.send(`${cb} kullanıcısı kayıtsıza atıldı.`).then(msg => msg.delete({timeout: 5000}))
} else {
message.delete({timeout: 5000})
return message.channel.send(`Bu komutu kullanmak için \`${config.registery}\` rolüne sahip olmalısın.`).then(msg => msg.delete({timeout: 5000}))
}
  

};


exports.conf = {
  aliases: ['ks'],
  permLevel: 0
};

exports.help = {
  name: 'kayıtsız',
  description: 'Belirlenen kullanıcıya kayıtsız rolleri verir.',
  usage: 'kayıtsız'
};