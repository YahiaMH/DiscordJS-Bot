const Discord = require('discord.js');
const User = require('../../schemas/UserSchema')
const fs = require('fs').promises;

module.exports = {
  run: async (client, message) => {
    var target = message.mentions.users.first() || message.author;
    targetId = target.id;
    const bal = await User.find({ discordId: targetId });
    const balEmbed = new Discord.MessageEmbed()
      .setTitle(bal[0].username + "'s balance")
      .setColor('#0000ff')
      .setDescription("Wallet: " + bal[0].coins + '\nBank: ' + bal[0].bank)
    message.channel.send(balEmbed)

  },
  aliases: ['bal', 'c', 'coins', 'coin', 'balance']

}
