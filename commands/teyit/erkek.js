const {MessageEmbed} = require('discord.js');
const config = require("../../ayarlar.json");
const db = require('quick.db')
const kdb = new db.table("kullanici")
const tdb = new db.table("teyitler")

exports.run = async(client, message, args) => {

  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('BLACK')

  if(!message.member.roles.cache.has(config.registery) || message.member.hasPermission('ADMINISTRATOR')) {

    let cb = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let isim = args[1];
    let yas = args[2];

    if(!cb || !isim || !yas || isNaN(yas) || message.mentions.members.size < 1 && isNaN(args[0]) || !isNaN(isim) || dlr.id === message.author.id) {
message.delete({timeout: 5000})
return message.channel.send(embed.setDescription(`Kayıt işlemini gerçekleştirmek için geçerli bir kullanıcı belirtmen gerekmektedir. Örnek Kullanım: [ \`${config.prefix}${this.help.name} @CubbeliBey İsim Yaş\` ]`)).then(msg => msg.delete({timeout: 10000}))}


    let erkekisim;
if(cb.user.username.includes(config.tag)) erkekisim = `${config.tag} ${isim.substr(0,1).toUpperCase()+isim.substr(1,isim.length)} | ${yas}`
if(!cb.user.username.includes(config.tag)) erkekisim = `${config.kayıtsız_tag} ${isim.substr(0,1).toUpperCase()+isim.substr(1,isim.length)} | ${yas}`

    let veri = db.fetch(`isim.${cb.id}`)
    let isimdata = kdb.get(`kullanici.${cb.id}.isimler`)
      
if(isimdata) {
db.add(`isim.${cb.id}`, 1)      

kdb.push(`kullanici.${cb.id}.isimler`, {
 name: erkekisim,
 gender: message.guild.roles.cache.get(config.erkek1).id || "Erkek"
})

tdb.push(`teyitler.${message.author.id}.uyeler`, {
  uye: cb.id,
  gender: message.guild.roles.cache.get(config.erkek1).id || "Erkek"
})

db.add(`erkek.${message.author.id}`, 1)
db.add(`toplam.${message.author.id}`, 1)


await cb.roles.remove(config.kayıtsız)
cb.user.username.includes(config.tag) && !cb.roles.cache.has(config.family) ? await cb.roles.add([config.erkek1, config.erkek2, config.family]).catch() : await cb.roles.add([config.erkek1, config.erkek2]).catch()
await cb.setNickname(erkekisim).catch()
message.react(config.onay)

} else if(!isimdata) {

db.add(`isim.${cb.id}`, 1)      

kdb.push(`kullanici.${cb.id}.isimler`, {
 name: erkekisim,
 gender: message.guild.roles.cache.get(config.erkek1).id || "Erkek"
})

tdb.push(`teyitler.${message.author.id}.uyeler`, {
  uye: cb.id,
  gender: message.guild.roles.cache.get(config.erkek1).id || "Erkek"
})

}else{
    message.delete({timeout: 5000})
    return message.channel.send(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === config.registery).name}\` rolüne sahip olmalısın.`)).then(msg => msg.delete({timeout: 5000}))}};
    

};


exports.conf = {
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: 'erkek',
  description: 'Belirlenen kullanıcıya erkek olarak sunucuya kaydeder.',
  usage: 'erkek'
};