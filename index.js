const express = require("express");
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs").promises;
const path = require("path");
const mongoose = require("mongoose");
const User = require("./schemas/UserSchema");
const BJ = require("./schemas/BlackjackSchema");
require('dotenv').config();

const prefix = ".";

const server = express();

// Health Check Route
server.all("/", (req, res) => {
	res.send("Bot is running!");
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server is ready on port ${PORT}.`);
});

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

client.commands = new Map();

(async function registerCommands(dir = "commands") {
	let files = await fs.readdir(path.join(__dirname, dir));
	for (let file of files) {
		let stat = await fs.lstat(path.join(__dirname, dir, file));
		if (stat.isDirectory()) registerCommands(path.join(dir, file));
		else {
			if (file.endsWith(".js")) {
				let cmdName = file.substring(0, file.indexOf(".js"));
				let cmdModule = require(path.join(__dirname, dir, file));
				let { aliases } = cmdModule;
				client.commands.set(cmdName, cmdModule);
				if (aliases.length !== 0)
					aliases.forEach((alias) => client.commands.set(alias, cmdModule.run));
			}
		}
	}
})();

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async function (message) {
	if (message.author.bot) return;
	const target = message.mentions.users.first() || message.author;
	const targetId = target.id;

	if (!message.content.startsWith(prefix)) return;
	let cmdArgs = message.content
		.substring(message.content.indexOf(prefix) + 1)
		.split(/\s+/);
	let cmdName = cmdArgs.shift();
	if (client.commands.get(cmdName)) {
		client.commands.get(cmdName)(client, message, cmdArgs);
	} else {
		console.log("Command does not exist");
	}
});

client.on("guildMemberAdd", async (member) => {
	const newMember = await User.create({
		username: member.user.username,
		discordId: member.id,
	});
	const newBJ = await BJ.create({
		discordId: member.id,
	});
});

// Login to Discord
client.login(process.env.TOKEN);
