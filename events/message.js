const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const config = require('../tantrumayarlamalar.json')
const db = require('quick.db');

module.exports = async message => {
  let prefix = await db.fetch(`prefix.${message.guild.id}`) || config.prefix;
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    let command = message.content.toLowerCase().split(' ')[0].slice(prefix.length);
    let params = message.content.toLowerCase().split(' ').slice(1);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      cmd.run(client, message, params);
    }

}