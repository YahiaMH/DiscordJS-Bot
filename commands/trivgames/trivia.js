const Discord = require('discord.js');
let User = require('../../schemas/UserSchema')
let balmgnt = require('../../balManagement');
const fetch = require("node-fetch");
const fs = require("fs").promises;
const talkedRecently = new Set();

module.exports = {
  run: async (client, message) => {
    if (talkedRecently.has(message.author.id)) {
      message.reply("You can only do this every 15 seconds");
    } else {
      const target = message.mentions.users.first() || message.author;
      const commandAuth = message.author;
      const targetId = target.id;
      if (targetId == message.author.id) {
        const response = await fetch('https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple');
        const data = await response.json();
        var length = data.results.length;
        var randomNumber = Math.floor(Math.random() * length);
        var randomQuestion = data.results[randomNumber];
        var messyQuestion = randomQuestion.question;
        var correctAnswer = randomQuestion.correct_answer;
        console.log(randomQuestion.incorrect_answers);
        console.log(messyQuestion)
        var randAnswer = Math.floor(Math.random() * 3);
        var messQuestion = messyQuestion.replace(/;/g, ' ')
        var mesQuestion = messQuestion.replace(/&/g, '')
        var meQuestion = mesQuestion.replace(/quot/g, '')
        var question = meQuestion.replace(/#309/g, '')
        switch (randAnswer) {
          case 0:
            const triviaEmbed = new Discord.MessageEmbed()
              .setTitle(question)
              .setColor('#0000ff')
              .setDescription("1. " + randomQuestion.correct_answer + "\n2. " + randomQuestion.incorrect_answers[0] + "\n3. " + randomQuestion.incorrect_answers[1] + "\n4. " + randomQuestion.incorrect_answers[2] + "\n\n You have 12 seconds to answer the question")
            message.channel.send(triviaEmbed)
            break;
          case 1:
            const trivia1Embed = new Discord.MessageEmbed()
              .setTitle(question)
              .setColor('#0000ff')
              .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.correct_answer + "\n3. " + randomQuestion.incorrect_answers[1] + "\n4. " + randomQuestion.incorrect_answers[2] + "\n\n You have 12 seconds to answer the question")
            message.channel.send(trivia1Embed)
            break;
          case 2:
            const trivia2Embed = new Discord.MessageEmbed()
              .setTitle(question)
              .setColor('#0000ff')
              .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.incorrect_answers[1] + "\n3. " + randomQuestion.correct_answer + "\n4. " + randomQuestion.incorrect_answers[2] + "\n\n You have 12 seconds to answer the question")
            message.channel.send(trivia2Embed)
            break;
          case 3:
            const trivia3Embed = new Discord.MessageEmbed()
              .setTitle(question)
              .setColor('#0000ff')
              .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.incorrect_answers[1] + "\n3. " + randomQuestion.incorrect_answers[2] + "\n4. " + randomQuestion.correct_answer + "\n\n You have 12 seconds to answer the question")
            message.channel.send(trivia3Embed)
            break;
        }
        const filter = m => m.author.id === message.author.id;
        try {
          const answer = await message.channel.awaitMessages(filter, { max: 1, time: 12000, errors: ['time', 'max'] });
          const ans = answer.first();
          console.log("this is what was sent " + ans.content)
          console.log("this is the correct answer " + (randAnswer + 1))
          if (randAnswer + 1 == ans.content) {
            const coinAmnt = Math.floor(Math.random() * 101) + 100;
            balmgnt.add(message.author.id, coinAmnt);
            var randomNum = Math.floor(Math.random() * 2) + 1;
            if (randomNum == 1) {
              message.reply("That was the correct answer!");
              message.channel.send("You got " + coinAmnt + " coins!");
            }
            else if (randomNum == 2) {
              message.reply("Damn you are pretty smart, that was right!");
              message.channel.send("You got " + coinAmnt + " coins!");
            }
          }
          else {
						message.reply("That was an incorrect answer");
          }
        } catch (e) {
          message.reply("Why didn't you answer in time?")
        }
      } else if (targetId != message.author.id) {
        message.channel.send('<@' + targetId + '> Would you like to play? y or n');
        const filter = (message) => message.author == target;
        try {
          const answer = await message.channel.awaitMessages(filter, { max: 1, time: 12000, errors: ['time', 'max'] });
          const ans = answer.first();
          console.log('here')
          if (ans.content.toLowerCase() == 'y' || ans.content.toLowerCase() == 'yes') {
            var i = 0;
            var s = 0;
            while (3 > i) {
              if (s >= 3) {
                break;
              } else if (i >= 3) {
                break;
              }
              console.log(i);
              console.log(s);
              const response = await fetch('https://opentdb.com/api.php?amount=50&difficulty=easy&type=multiple');
              const data = await response.json();
              var length = data.results.length;
              var randomNumber = Math.floor(Math.random() * length);
              var randomQuestion = data.results[randomNumber];
              var messyQuestion = randomQuestion.question;
              var correctAnswer = randomQuestion.correct_answer;
              console.log(randomQuestion.incorrect_answers);
              console.log(messyQuestion);
              console.log(correctAnswer);
              var randAnswer = Math.floor(Math.random() * 4) + 1;
              var messQuestion = messyQuestion.replace(/;/g, ' ')
              var mesQuestion = messQuestion.replace(/&/g, '')
              var meQuestion = mesQuestion.replace(/quot/g, '')
              var question = meQuestion.replace(/#309/g, '')

              switch (randAnswer) {
                case 1:
                  const triviaEmbed = new Discord.MessageEmbed()
                    .setTitle(question)
                    .setColor('#0000ff')
                    .setDescription("1. " + randomQuestion.correct_answer + "\n2. " + randomQuestion.incorrect_answers[0] + "\n3. " + randomQuestion.incorrect_answers[1] + "\n4. " + randomQuestion.incorrect_answers[2])
                  setTimeout(function() {
                    message.channel.send(triviaEmbed)
                  }, 1500);
                  break;
                case 2:
                  const trivia1Embed = new Discord.MessageEmbed()
                    .setTitle(question)
                    .setColor('#0000ff')
                    .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.correct_answer + "\n3. " + randomQuestion.incorrect_answers[1] + "\n4. " + randomQuestion.incorrect_answers[2])
                  setTimeout(function() {
                    message.channel.send(trivia1Embed)
                  }, 1500);
                  break;
                case 3:
                  const trivia2Embed = new Discord.MessageEmbed()
                    .setTitle(question)
                    .setColor('#0000ff')
                    .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.incorrect_answers[1] + "\n3. " + randomQuestion.correct_answer + "\n4. " + randomQuestion.incorrect_answers[2])
                  setTimeout(function() {
                    message.channel.send(trivia2Embed)
                  }, 1500);
                  break;
                case 4:
                  const trivia3Embed = new Discord.MessageEmbed()
                    .setTitle(question)
                    .setColor('#0000ff')
                    .setDescription("1. " + randomQuestion.incorrect_answers[0] + "\n2. " + randomQuestion.incorrect_answers[1] + "\n3. " + randomQuestion.incorrect_answers[2] + "\n4. " + randomQuestion.correct_answer)
                  setTimeout(function() {
                    message.channel.send(trivia3Embed)
                  }, 1500);
                  break;
              }


              try {
                const filter = (message) => (message.author == commandAuth || message.author == target) && message.content === '1' || message.content === '2' || message.content === '3' || message.content === '4';
                const answer = await message.channel.awaitMessages(filter, { max: 1, time: 12000, errors: ['time', 'max'] });
                const ans = answer.first();
                if (randAnswer == ans.content) {
                  if (ans.author.id === message.author.id) {
                    message.channel.send('<@' + ans.author.id + "> got that right!");
                    i++;
                  } else if (ans.author.id === targetId) {
                    message.channel.send('<@' + ans.author.id + "> got that right!");
                    s++;
                  }
                } else if (randAnswer !== ans.content) {
                  if (ans.author.id == message.author.id) {
                    message.channel.send('Wrong Answer! ' + correctAnswer + ' was the right answer')
                    if (i > 0) {
                      message.channel.send('You lose a point!')
                      i--;
                    } else if (i == 0) {
                    }

                  } else if (ans.author.id === targetId) {
                    message.channel.send('Wrong Answer! ' + correctAnswer + ' was the right answer')
                    if (s > 0) {
                      message.channel.send('You lose a point!')
                      s--;
                    } else {

                    }

                  }
                }
                const ansEmbed = new Discord.MessageEmbed()
                  .setTitle("POINTS")
                  .setColor('#0000ff')
                  .setDescription('<@' + message.author.id + '>: ' + i + ' points \n<@' + targetId + '>: ' + s + ' points')
                setTimeout(function() {
                  message.channel.send(ansEmbed)
                }, 1000);
              } catch (e) {
                message.channel.send('Neither of you responded in time!')
              }

            }

          } else {
            message.channel.send('L');
            return
          };
        } catch (e) {
          message.channel.send('<@' + targetId + "> didn't respond.")
          return;
        }
        const winnerEmbed = new Discord.MessageEmbed()
          .setTitle("Winner")
          .setColor('#0000ff')
          .setDescription('<@' + message.author.id + '>: ' + i + ' points \n<@' + targetId + '>: ' + s + ' points')
        message.channel.send(winnerEmbed)
        if (i > s) {
          const coinAmnt = Math.floor(Math.random() * 101) + 200;
          balmgnt.add(message.author.id, coinAmnt);
          message.channel.send("Congrats on winning <@" + message.author.id + "> you get " + coinAmnt + " Coins!")
        } else {
          const coinAmnt = Math.floor(Math.random() * 101) + 200;
          balmgnt.add(targetId, coinAmnt);
          message.channel.send("Congrats on winning <@" + targetId + "> you get " + coinAmnt + " Coins!")
        }

      }
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 15000);
    }
  },
  aliases: ['t', 'trivia']
}


