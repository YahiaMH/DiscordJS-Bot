const Discord = require('discord.js');
const fs = require('fs').promises;
const BJ = require('../../schemas/BlackjackSchema');
const User = require('../../schemas/UserSchema');
const talkedRecently = new Set();

module.exports = {
	run: async (client, message, arg) => {
		async function createCards() {
			var randNum1 = Math.floor(Math.random() * 13)
			var randSuitNum = Math.floor(Math.random() * 4)
			var randNum2 = Math.floor(Math.random() * 13)
			var randSuitNum2 = Math.floor(Math.random() * 4)
			var randNum3 = Math.floor(Math.random() * 13)
			var randSuitNum3 = Math.floor(Math.random() * 4)
			var randNum4 = Math.floor(Math.random() * 13)
			var randSuitNum4 = Math.floor(Math.random() * 4)
			playerCard1 = getCards(randNum1, randSuitNum);
			playerCardNum1 = getCardNum(randNum1);
			playerCard2 = getCards(randNum2, randSuitNum2);
			playerCardNum2 = getCardNum(randNum2);
			dealerCard1 = getCards(randNum3, randSuitNum3);
			dealerCardNum1 = getCardNum(randNum3);
			dealerCard2 = getCards(randNum4, randSuitNum4);
			dealerCardNum2 = getCardNum(randNum4);
			console.log('im here')
			console.log(playerCard1)
			await BJ.updateOne({ discordId: message.author.id },
				{
					$set: {
						"playerCards.card1": playerCard1,
						"playerCards.card2": playerCard2, "dealerCards.card1": dealerCard1,
						"dealerCards.card2": dealerCard2,
						playerCardTotal: (playerCardNum1 + playerCardNum2),
						dealerCardTotal: (dealerCardNum1 + dealerCardNum2)
					},
				});
		}
		var cards = await BJ.find({ discordId: message.author.id });
		const bal = await User.find({ discordId: message.author.id });
		const targetId = message.author.id;
		const authCoins = bal[0].coins;
		args = Number(arg);
		function getCardNum(num) {
			var cardNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10]
			console.log(cardNum[num])
			return cardNum[num];
		}
		function getCards(num, suitNum) {
			var cardNum = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'J', 'Q', 'K']
			var cardSuit = ['<:diamonds:833122728139161600>', '<:hearts:833123167702351903>', '<:clubs:833123495050608651>', '<:spades:833123797828763699>']
			return cardNum[num] + ' of ' + cardSuit[suitNum];
		} async function deleteDoc() {
			await BJ.updateOne({ "discordId": message.author.id },
				{
					$set: {
						"playerCards.card1": '',
						"playerCards.card2": '',
						"playerCards.card3": '',
						"playerCards.card4": '',
						"playerCards.card5": '',
						"dealerCards.card1": '',
						"dealerCards.card2": '',
						"dealerCards.card3": '',
						"dealerCards.card4": '',
						"dealerCards.card5": '',
						playerCardTotal: 0,
						dealerCardTotal: 0,
						hitOrStay: ''
					},
				});
		}
		if (args < 50) {
			message.reply('You need to bet atleast 50 coins');
		}
		else if (args > authCoins) {
			message.channel.send("You don't have " + args + " coins in your wallet you broke mf")
		} else {
			if (talkedRecently.has(message.author.id)) {
				message.reply("You can only do this every 1 minute");
			} else {
				if (arg[0] == 'all' || arg[0] == 'a') {
					args = authCoins
				} else if (args == NaN) {
					message.reply('How much do you wanna bet?')
				} else {
					for (var i = 1; i > 0; i++) {
						console.log(cards[0].playerCardTotal)
						if (cards[0].playerCardTotal == 0) {
							await createCards();
						}
						setTimeout(function(){
						const playerCardsArr = Object.values(cards[0].playerCards)
						playerCardsArr.shift();
						console.log(playerCardsArr);
						const cardsEmbed = new Discord.MessageEmbed()
							.setTitle('Cards')
							.setDescription('<@' + message.author.id + ">'s cards:\n" + playerCardsArr[0] + '    ' + playerCardsArr[1] + '     ' + playerCardsArr[2] + '     ' + playerCardsArr[3] + '    ' + playerCardsArr[4] + '    ')
						message.channel.send(cardsEmbed);
						setTimeout(function(){
						deleteDoc();
						},5000);
						},5000);
						
						break;
						
					}

				}

				talkedRecently.add(message.author.id);
				setTimeout(() => {
					talkedRecently.delete(message.author.id);
				}, 60000);
			}
		}
	},
	aliases: ['bj', 'blackjack']
}