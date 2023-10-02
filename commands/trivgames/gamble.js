const Discord = require('discord.js');
const fs = require('fs').promises;
const talkedRecently = new Set();
let User = require('../../schemas/UserSchema');
let balmgnt = require('../../balManagement');

module.exports = {
	run: async (client, message, arg) => {
		const bal = await User.find({ discordId: message.author.id });
		args = Number(arg[0]);
		if (arg[0] == 'a' || arg[0] == 'all') {
			args = bal[0].coins;
		}
		if (args > bal[0].coins) {
			return message.reply('You only have ' + bal[0].coins + ' coins in your wallet');
		} else if (args < 50) {
			message.reply('You need atleast 50 coins to play!')
		} else {
			if (talkedRecently.has(message.author.id)) {
				message.reply("You can only do this every 1 minute");
			} else {
				if (args <= bal[0].coins && args > 50) {
					const randNum = Math.floor(Math.random() * 2) + 1;
					const min = args / 1.5;
					const max = args / 1.2;
					const parseThis = Math.floor(Math.random() * (max - min)) + min;
					const coinAmnt = parseInt(parseThis);
					console.log(coinAmnt)
					switch (randNum) {
						case 1:
							balmgnt.add(message.author.id, coinAmnt);
							message.reply('You won ' + coinAmnt + ' coins!');
							break;
						case 2:
							balmgnt.subtract(message.author.id, args);
							message.reply('You lost ' + args + ' coins')
							break;
					}
				} else if (args == NaN) {
					message.reply('How much are you trying to gamble?');
				}
				talkedRecently.add(message.author.id);
				setTimeout(() => {
					talkedRecently.delete(message.author.id);
				}, 60000);
			}
		}
	},
	aliases: ['ga', 'gamble', 'gamb']
}