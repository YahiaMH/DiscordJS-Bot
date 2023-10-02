module.exports = {
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel');
    let queue = await client.distube.getQueue(message);

    if (queue) {
      message.channel.send('Stopped playing')
      client.distube.stop(message);
    } else if (!queue){
      return
    };

  },
  aliases: ['leave', 'l']
}