module.exports = {
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel');
    let queue = await client.distube.getQueue(message);

    if (queue) {
      message.channel.send('Skipped!')
      client.distube.skip(message);
    } else if (!queue) {
      return
    };

  },
  aliases: ['skip', 'sk']
}