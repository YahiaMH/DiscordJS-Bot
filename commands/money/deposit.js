const Discord = require('discord.js');
let User = require('../../schemas/UserSchema')
const fs = require('fs').promises;

module.exports = {
  run: async (client, message, arg) => {
    const args = Number(arg)
    const targetId = message.author.id;
    const bal = await User.find({ discordId: targetId })
    console.log(arg)
    if (args > bal[0].coins) {
      message.channel.send('You only have ' + bal[0].coins + ' coins in your wallet')
    }
    else if (args <= bal[0].coins && args > 0) {
      await User.findOneAndUpdate({
        discordId: message.author.id,
      }, {
          $inc: {
            coins: -args,
            bank: args
          }
        });
      message.channel.send(args + ' Coins deposited')
    }

    else if (arg[0] === 'all' || arg[0] === 'a') {
      if (bal[0].coins === 0) {
        message.channel.send("What are you trying to withdraw? The 0 coins in your wallet?")
      } else {
        message.channel.send(bal[0].coins + ' Coins deposited')
        await User.findOneAndUpdate({
          discordId: message.author.id,
        }, {
            $inc: {
              bank: bal[0].coins,
              coins: -bal[0].coins
            }
          });
      }
    }
    else {
      message.channel.send('How much are you trying to deposit?');
    }
  },
  aliases: ['dep', 'd', 'deposit']

}