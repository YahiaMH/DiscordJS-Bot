const Discord = require('discord.js');
const User = require('../../schemas/UserSchema')
const fs = require('fs').promises;

module.exports = {
  run: async (client, message) => {
    var target = message.mentions.users.first() || message.author;
    targetId = target.id;
    const bal = await User.find({ discordId: targetId });
    const balEmbed = new Discord.MessageEmbed()
      .setTitle(bal[0].username + "'s inventory")
      .setColor('#0000ff')
      .setDescription("Lockpicks: " + bal[0].shopItems.lockpick + '\n8balls: ' + bal[0].shopItems.balls)
    message.channel.send(balEmbed)

  },
  aliases: ['inv', 'inventory', 'i']

}