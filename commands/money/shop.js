const Discord = require('discord.js');
const fs = require('fs').promises;

module.exports = {
  run: async (client, message) => {
    const shopEmbed = new Discord.MessageEmbed()
      .setTitle("SHOP")
      .setColor('#0000ff')
    shopEmbed.addField('   <:8ball:833508292571037736>8Ball   -   Price: 2750 <:coin:833510041151209552>', 'Increases the amount of coins you get when playing games/trivia, but be careful because when you do bad in a game/trivia you could also lose more money', false)
    shopEmbed.addField('   <:closed_lock_with_key:833509317009080360>Lockpick   -   Price: 4500 <:coin:833510041151209552>', 'Significantly increase your chance of successfully robbing someone!', false)
    message.channel.send(shopEmbed)
  },
  aliases: ['shop', 's', 'sh']
}
