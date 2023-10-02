const mongoose = require('mongoose');

const BlackjackSchema = new mongoose.Schema({
	discordId : {type: String, required: true, unique:true},
	hitOrStay: {type: String, default: ''},
	dealerCardTotal: {type: Number, default: 0},
	playerCardTotal:{type: Number, default: 0},
	playerCards:{
		card1: {type: String, default: ''},
		card2: {type: String, default: ''},
		card3: {type: String, default: ''},
		card4: {type: String, default: ''},
		card5: {type: String, default: ''}
	},
	dealerCards:{
		card1: {type: String, default: ''},
		card2: {type: String, default: ''},
		card3: {type: String, default: ''},
		card4: {type: String, default: ''},
		card5: {type: String, default: ''}
	}
});

module.exports = mongoose.model('BJ', BlackjackSchema)