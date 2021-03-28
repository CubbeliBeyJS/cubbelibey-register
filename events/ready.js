const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const config = require('../tantrumayarlamalar.json')

module.exports = client => {

console.log("Bot Hazır");

client.user.setPresence({ activity: { name: config.botdurum }, status: "idle" });
if(client.channels.cache.has(config.botses)) client.channels.cache.get(config.botses).join().catch()}