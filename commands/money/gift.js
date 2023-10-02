const Discord = require('discord.js');
let User = require('../../schemas/UserSchema');
let balmgnt = require('../../balManagement');
const fs = require('fs').promises;

module.exports = {
  run: async (client, message, args) => {
    console.log(args) 
    var target = message.mentions.users.first() || message.author;
    var targetId = target.id;
    const bal = await User.find({ discordId: message.author.id });
    if (targetId === message.author.id) return message.channel.send("Who are you trying to gift? \nThe format is '.gift @user <item> <amount>'");
    if (args[1] == '8ball' || args[1] == '8balls' || args[1] == '8b' || args[1] == '8bs') {
      if (bal[0].shopItems.balls < parseInt(args[2])) {
        message.channel.send("You don't have enough 8balls")
      } else {
        await User.findOneAndUpdate({
          discordId: message.author.id,
        }, {
            $inc: {
              "shopItems.balls": parseInt(-args[2]),
            }
          });
        await User.findOneAndUpdate({
          discordId: targetId,
        }, {
            $inc: {
              "shopItems.balls": parseInt(args[2]),
            }
          });
        message.channel.send('Successfully gifted <@' + targetId + '> ' + args[2] + ' 8balls!')
      }
    } else if (args[1] == 'lockpick' || args[1] == 'lp' || args[1] == 'lockpicks') {
      if (bal[0].shopItems.lockpick < parseInt(args[2])) {
        message.channel.send("You don't have enough lockpicks")
      } else {
        await User.findOneAndUpdate({
          discordId: message.author.id,
        }, {
            $inc: {
              "shopItems.lockpick": parseInt(-args[2]),
            }
          });
        await User.findOneAndUpdate({
          discordId: targetId,
        }, {
            $inc: {
              "shopItems.lockpick": parseInt(args[2]),
            }
          });
        message.channel.send('Successfully gifted <@' + targetId + '> ' + args[2] + ' lockpicks!')
      }
    }
    else if (args[1] == 'coins' || args[1] == 'coin' || args[1] == 'c') {
      if (bal[0].coins < parseInt(args[2])) {
        message.channel.send("You don't have enough coins")
      } else {
        balmgnt.subtract(message.author.id,parseInt(args[2]));
        balmgnt.add(targetId,parseInt(args[2]));
        message.channel.send('Successfully gifted <@' + targetId + '> ' + args[2] + ' coins!')
      }
    }
  },
  aliases: ['gift', 'gi', 'g']
}