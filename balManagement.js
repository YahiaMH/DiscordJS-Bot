const User = require('./schemas/UserSchema')

async function add(id, num) {
  await User.findOneAndUpdate({
    discordId: id,
  }, {
      $inc: {
        coins: num,
      }
    });
}


async function subtract(id, num) {
  await User.findOneAndUpdate({
    discordId: id,
  }, {
      $inc: {
        coins: -num,
      }
    });	
}


module.exports = { add, subtract }