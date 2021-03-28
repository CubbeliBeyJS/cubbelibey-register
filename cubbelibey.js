const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./tantrumayarlamalar.json");
const fs = require("fs");
const db = require("quick.db");
const AsciiTable = require('ascii-table')
const useful = require('useful-tools')
const moment = require('moment')
require('moment-duration-format') 

var commandtable = new AsciiTable('Komutlar');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

commandtable.setHeading("Komut", 'Durum', "Alternatifler")
fs.readdirSync('./commands').forEach(dir => {
const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const komutcuklar = require(`./commands/${dir}/${file}`);




  if (komutcuklar.help.name) {
  client.commands.set(komutcuklar.help.name, komutcuklar);
  commandtable.addRow(komutcuklar.help.name, "Başarılı", komutcuklar.conf.aliases)
} else {
  commandtable.addRow(komutcuklar.help.name, "Başarısız")
  continue;
    }


    
    komutcuklar.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutcuklar.help.name);
    });
  }
})
console.log(commandtable.toString())

Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";

  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 24) hours -= 24;
    if (hours === 0) hours = 24;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

client.on("guildMemberAdd", async member => {
let kanal = member.guild.channels.cache.find(x => x.id === "")
let durum = new Date().getTime() - member.user.createdAt.getTime() < 1000 * 60 * 60 * 24 * 7;
let before = new Date().getTime() - member.user.createdAt.getTime()
const kayıt = useful.tarih(member.user.createdTimestamp)
member.setNickname(`${config.ktag} ${config.kisim}`).catch()
member.roles.add([config.kayıtsız]).catch()

kanal.send(`
      •  ${member} ( \`${member.id}\` ) Sunucumuza Hoş Geldin. Sunucumuz Seninle Beraber ${member.guild.memberCount} Kişi Oldu.

      •  Hesabın \`${kayıt}\` Tarihinde Oluşturmuşsun.

      •  <@&${config.registery}> Rolündeki Yetkili Arkadaşlarımız Seninle İlgilenecektir.
  
      •  \` Tag \` Tagımızı Alıp ya da Boost Basarak Kayıt Olabilirsiniz.`)
});

client.login(config.token).then(console.log("[CUBBELİBEY REGISTER]")).catch(e => console.error(e));