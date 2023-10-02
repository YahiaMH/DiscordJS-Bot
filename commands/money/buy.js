const Discord = require('discord.js');
const User = require('../../schemas/UserSchema')
const fs = require('fs').promises;

module.exports = {
  run: async(client, message, args) => {
    targetId = message.author.id
    const bal = await User.find({ discordId: targetId});
    authCoins = bal[0].coins

    if (args[0].toLowerCase() == '8ball'){
      if (authCoins < 2750){
        message.channel.send("You don't have enough coins in your wallet to buy this")
      }else{
        await User.findOneAndUpdate({
          discordId: targetId,
        }, {
          $inc: {
            coins: -2750,
            "shopItemsballs": 1
          }
        });
        message.channel.send('You have successfully bought an 8Ball');
        }
      }
      else if(args[0].toLowerCase() == 'lockpick' || args[0].toLowerCase() == 'lp'){
        if (authCoins < 4500){
        message.channel.send("You don't have enough coins in your wallet to buy this")
      }else{
         await User.findOneAndUpdate({
          discordId: targetId,
        }, {
          $inc: {
            coins: -4500
          },
          $inc: {
            "shopItems.lockpick": 1
          }
        });
        message.channel.send('You have successfully bought a lockpick');
          }
      }
      else{
        message.channel.send('What are you trying to buy?')
      }
    },
    aliases: ['buy']
}
  
