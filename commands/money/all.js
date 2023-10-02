const Discord = require('discord.js');
let User = require('../../schemas/UserSchema')
const fs = require('fs').promises;

module.exports = {
  run: async (client, message) => {
    const bal = await User.find();
    console.log(bal.length)
    const allEmbed = new Discord.MessageEmbed()
      .setTitle(`SERVER COINS IN WALLET`)
      .setColor(0xCF40FA)
    for (var i = 0; i < bal.length; i++) {
      userID = bal[i].discordID;
      if (bal[i].coins != 0) {
        allEmbed.addField(bal[i].username, (bal[i].coins) + ' Coins', false)
      }
    }
    message.channel.send(allEmbed);
  },
  aliases: ['a', 'al', 'all']
}
