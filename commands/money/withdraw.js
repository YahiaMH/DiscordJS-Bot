const Discord = require('discord.js');
let User = require('../../schemas/UserSchema')
const fs = require('fs').promises;

module.exports = {
  run: async (client, message, arg) => {
    const args = Number(arg)
    const targetId = message.author.id;
    const bal = await User.find({ discordId: targetId })
    console.log(arg)
    if (args > bal[0].bank) {
      message.channel.send('You only have ' + bank[message.author.id].bank + ' coins in your bank')
    }
    else if (args <= bal[0].bank && args > 0) {
      await User.findOneAndUpdate({
        discordId: message.author.id,
      }, {
          $inc: {
            coins: args,
            bank: -args
          }
        });
      message.channel.send(args + ' Coins withdrew')
    }

    else if (arg[0] === 'all' || arg[0] === 'a') {
      if (bal[0].bank === 0) {
        message.channel.send("What are you trying to withdraw? The 0 coins in your bank?")
      } else {
        message.channel.send(bal[0].bank + ' Coins withdrew')
        await User.findOneAndUpdate({
          discordId: message.author.id,
        }, {
            $inc: {
              coins: bal[0].bank,
              bank: -bal[0].bank
            }
          });

      }
    }
    else {
      message.channel.send('How much are you trying to withdraw?');
    }
  },
  aliases: ['with', 'wd', 'w', 'withdraw']

}