const Discord = require('discord.js');
let User = require('../../schemas/UserSchema')
let balmgnt = require('../../balManagement')
const fs = require('fs').promises;
const fetch = require("node-fetch");
const talkedRecently = new Set();

module.exports = {
  run: async (client, message) => {
    const targetId = message.author.id;
    const bal = await User.find({ discordId: targetId });
    if (bal[0].coins < 30) {
      message.reply('You need to have more than 30 coins in your wallet to play')
    } else {
      if (talkedRecently.has(message.author.id)) {
        message.reply("You can only do this every 15 seconds");
      } else {
        const response = await fetch('https://opentdb.com/api.php?amount=50&difficulty=easy&type=boolean');
        const data = await response.json();
        var length = data.results.length;
        var randomNumber = Math.floor(Math.random() * length);
        var randomQuestion = data.results[randomNumber];
        var question = randomQuestion.question;
        var correctAnswer = randomQuestion.correct_answer;

        const quizEmbed = new Discord.MessageEmbed()
          .setTitle(question)
          .setColor('#ff0000')
          .setDescription("\nTrue or False\n\nYou have 8 seconds to answer the question")
        message.channel.send(quizEmbed)
        const filter = m => m.author.id === message.author.id;
        try {
          const answer = await message.channel.awaitMessages(filter, { max: 1, time: 8000, errors: ['time', 'max'] })
          const ans = answer.first();

          if (ans.content.toLowerCase() === correctAnswer.toLowerCase()) {
            const coinAmnt = Math.floor(Math.random() * 21) + 10;
            balmgnt.add(targetId, coinAmnt);
            var randomNum = Math.floor(Math.random() * 4) + 1;
            console.log(randomNum);
            if (randomNum === 1) {
              message.reply("That was the correct answer!");
              message.channel.send("You got " + (coinAmnt) + " coins!")
            }
            else if (randomNum === 2) {
              message.reply("Damn you are pretty smart, that was right!");
              message.channel.send("You got " + (coinAmnt) + " coins!")
            }
            else if (randomNum == 3) {
              message.reply("Sheeeeesh! You got that right!");
              message.channel.send("You got " + (coinAmnt) + " coins!")
            }
            else {
              message.reply("Your brain is humungous!")
              message.channel.send("You got " + (coinAmnt) + " coins!")
            }
          }
          else {
            var coinAmnt = Math.floor(Math.random() * 21) + 10;
            balmgnt.subtract(targetId, coinAmnt);

            var randomNum = Math.floor(Math.random() * 4) + 1;
            console.log(randomNum);
            if (randomNum === 1) {
              message.channel.send("LMAOOOO, what a fuckin retard");
              if ((coins[message.author.id].coins) >= 30) {
                message.reply("You lost " + coinAmnt + " coins for being an idiot")
              }
            }
            else if (randomNum === 2) {
              message.reply("Holy shit, how can one be so fucking stupid");
              if ((coins[message.author.id].coins) >= 30) {
                message.channel.send("You lost " + coinAmnt + " coins for being an idiot")
              }
            }
            else if (randomNum == 3) {
              message.reply("That was the wrong answer fucking idiot");
              if ((coins[message.author.id].coins) >= 30) {
                message.channel.send("You lost " + coinAmnt + " coins for being an idiot")
              }
            }
            else {
              message.reply("With that small brain of yours I wouldn't be surprised if you thought the world was flat");
              if ((coins[message.author.id].coins) >= 30) {
                message.channel.send("You lost " + coinAmnt + " coins for being an idiot")
              }
            }
          }
        } catch (e) {
          balmgnt.subtract(targetId, 30);
          message.reply("You lost 30 coins for not answering in time")
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 15000);
      }
    }

  },
  aliases: ['q', 'quiz']
}