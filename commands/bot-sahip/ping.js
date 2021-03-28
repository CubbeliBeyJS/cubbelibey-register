const Discord = require('discord.js');
const config = require('../../ayarlar.json')


exports.run = (client, message, args) => {

  if(message.author.id !== config.cubbelibey) return;
  message.channel.send(`\`${client.ws.ping}\` ms`)};


exports.conf = {
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'ping',
  description: 'Botun gecikmesini gösterir.',
  usage: 'ping'
};