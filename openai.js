const OpenAI = require('openai');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

module.exports = async (messages, model = "gpt-4") => {
	try {
		const chatCompletion = await openai.chat.completions.create({
			model,
			messages,
		});
		
		return chatCompletion.choices[0].message.content;
	} catch (err) {
		console.log(err);
	}
};