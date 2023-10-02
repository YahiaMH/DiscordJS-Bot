module.exports = {
  run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel');
    const music = args.join(" ");
    client.distube.play(message, music);
    client.distube
      .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\``
      ))
      .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name}`
      ))
  },
  aliases: ['p', 'pl', 'play']
}