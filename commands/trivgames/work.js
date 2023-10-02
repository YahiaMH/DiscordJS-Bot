const Discord = require('discord.js');
const fs = require('fs').promises;
let User = require('../../schemas/UserSchema')

module.exports = {
  run: async (client, message, arg) => {
    const targetId = message.author.id;
    if (!coins[targetId]) {
      coins[targetId] = {
        coins: 0
      };
      fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
      });
    }
    if (!work[targetId] || work[targetId].work == 0) {
      work[targetId] = {
        coins: 0
      };
      fs.writeFile("./json/work.json", JSON.stringify(work), (err) => {
        if (err) console.log(err)
      });
      // message.reply("What would you like to work as?");
      // const trivia1Embed = new Discord.MessageEmbed()
      //     .setTitle(question)
      //     .setColor('#0000ff')
      //     .setDescription("1. Coder " "\n2. " + randomQuestion.correct_answer + "\n3. " + randomQuestion.incorrect_answers[1] + "\n4. " + randomQuestion.incorrect_answers[2] + "\n\n You have 12 seconds to answer the question")
      //     message.channel.send(trivia1Embed)  
    }

  },
  aliases: ['work']
}