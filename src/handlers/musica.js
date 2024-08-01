const { EmbedBuilder } = require('discord.js')
const {DisTube} = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');

module.exports = (client, Discord) => {

    client.distube = new DisTube(client, {
        emitNewSongOnly: false,
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueue: false,
        searchSongs: 0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestaudio",
            format: "audioonly",
            liveBuffer: 60000,
            dlChunkSize: 1024 * 1024 * 4,
        },
        plugins: [
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin(),
        ],
    });

    client.distube.on("playSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                  .setDescription(`\n<:logo1:1104791779317907496><:logo2:1104791792903262309> **| Sistema de Musica** \n<:logo3:1104791808002768957><:logo4:1104791819910397993> **| Reproduciendo**\n\n<:numeral:1104223855255506965> ${song.name}\n<:esperando:1104793092411887786> ${song.formattedDuration}\n\n_La cancion se esta reproduciendo ahora mismo!_`)
                  .setThumbnail('https://cdn.discordapp.com/attachments/1072297927986393138/1101221170872864808/logo_MDPRP.png')
                  .setColor('#737373')
                  .setFooter({
                    text: "MDP Roleplay",
                    iconURL: client.user.displayAvatarURL()
                  })
                  .setTimestamp()
              ],
        })
    })

    client.distube.on("addSong", (queue, song) => {
        queue.textChannel.send({
            embeds: [
                new EmbedBuilder()
                  .setDescription(`\n<:logo1:1104791779317907496><:logo2:1104791792903262309> **| Sistema de Musica** \n<:logo3:1104791808002768957><:logo4:1104791819910397993> **| Cancion agregada**\n\n<:tilde:1104790645857603705> ${song.name}\n<:esperando:1104793092411887786> ${song.formattedDuration}\n\n_La cancion se agrego con exito, espera que termine la actual!_`)
                  .setThumbnail('https://cdn.discordapp.com/attachments/1072297927986393138/1101221170872864808/logo_MDPRP.png')
                  .setColor('#737373')
                  .setFooter({
                    text: "MDP Roleplay",
                    iconURL: client.user.displayAvatarURL()
                  })
                  .setTimestamp()
              ],
        })
    });

    client.distube.on("initQueue", (queue) => {
        queue.autoplay = true;
    });
};