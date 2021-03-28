const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const kdb = new db.table("kullanici");
const config = require("../../ayarlar.json");


exports.run = (client, message, args) => {

let no = config.no; 
let yes = config.yes;

let embed = new Discord.MessageEmbed().setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();

let cb = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

let veri = db.fetch(`isim.${cb.id}`)

let data = kdb.get(`kullanici.${cb.id}.isimler`)

if(!data) {
message.delete({timeout: 5000})
return message.channel.send(hembed.setDescription(`${cb} kullanıcısının herhangi bir isim kaydı bulunmamakta.`)).then(msg => msg.delete({timeout: 5000}))
}
data = data.reverse()

    message.channel.send(embed.setDescription(`
${cb} kullanıcısının **${veri}** adet isim kaydı bulundu.

${data.map((value, index) => `\`${value.name}\` > [<@&${value.gender}>]`).slice(0,30).join('\n')}
      `))

};

exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "isimler",
  description: '',
  usage: ''
};