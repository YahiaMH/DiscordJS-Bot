const Discord = require('discord.js');
let User = require("../../schemas/UserSchema");
let balmgnt = require('../../balManagement')
const fs = require('fs').promises;
const talkedRecently = new Set();

module.exports = {
  run: async (client, message) => {
    if (talkedRecently.has(message.author.id)) {
      message.channel.send("You can only do this every 5 minutes");
    } else {
      const randBeg = Math.floor(Math.random() * 2) + 1
      console.log(randBeg)
      if (randBeg == 1) {
        const coinAmnt = Math.floor(Math.random() * 51) + 25
        balmgnt.add(message.author.id,coinAmnt);
        message.channel.send("Alright I'll let you have some")
        message.channel.send(coinAmnt + " coins have been added to your wallet")
      }
      else if (randBeg == 2) {
        const randSike = Math.floor(Math.random() * 5) + 1
        if (randSike == 4) {
          message.channel.send("Alright I'll let you have some")
          setTimeout(function() {
            message.channel.send("Sike, lol")
          }, 2000);
        } else {
          message.channel.send("nah")
        }
      }
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 300000);
    }
  },
  aliases: ['b', 'beg']
}