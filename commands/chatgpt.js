const Discord = require('discord.js');
let User = require('../schemas/UserSchema')
const fs = require('fs').promises;
const openai = require('../openai');
const countTokens = require('../count-tokens');

module.exports = {
	run: async (client, message, args) => {
		message.channel.startTyping();

		const maxTokens = 4096; 
		let totalTokens = 0;

		const gptMessage = [];
		gptMessage.push({
			role: message.author.bot ? 'assistant' : 'user',
			content: args.join(" "),
		});
		console.log(gptMessage);

		const tokens = countTokens(gptMessage);

		if (tokens < maxTokens) {
			let response = await openai(gptMessage);
			const discordMax = 2000;

			if (response.length > discordMax) {
				response = response.slice(0, discordMax);
			}
			console.log(response);
			message.channel.send({
				content: response,
			});
		}

		message.channel.stopTyping();
	},
	aliases: ['gpt', 'chatgpt']
}
