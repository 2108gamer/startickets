const config = require('../../config');
const ExtendedClient = require('../../class/ExtendedClient');
const { EmbedBuilder } = require('discord.js');
const { time } = require('../../functions');
const { WelcomeLeave } = require("canvafy");
const welcomeSchema = require("../../schemas/welcome");

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

module.exports = {
    event: 'guildMemberAdd',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {import('discord.js').GuildBan} ban 
     * @returns 
     */
    run: async (client, member) => {

        const data = await welcomeSchema.findOne({
            guildid: member.guild.id,
          });
      
          if (!data) return;
      
          const randomBorderColor = getRandomColor();
          const randomAvatarBorderColor = getRandomColor();
      
          const welcomeImage = await new WelcomeLeave()
            .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
            .setBackground("image", data.imageURL || "https://media.discordapp.net/attachments/1243752750962049070/1258468308127059998/6412e0393e8f5e39d42bd76f75932e22.png?ex=66882771&is=6686d5f1&hm=3ef2a2af2a669a940a72b9b5743b38815b8754459c1155fb85b23769234d428b&")
            .setTitle("Bienvenido")
            .setDescription("Bienvenid@!")
            .setBorder(randomBorderColor)
            .setAvatarBorder(randomAvatarBorderColor)
            .setOverlayOpacity(0.3)
            .build();
      
          member.guild.channels.cache.get(data.channel).send({
            content: data.message
              .replace(/\{mention\}/g, member.user.toString())
              .replace(/\{user\}/g, member.user.username)
              .replace(/\{server\}/g, member.guild.name)
              .replace(/\{members\}/g, member.guild.memberCount),
            files: [{
              attachment: welcomeImage,
              name: `welcome-${member.id}.png`,
            }],
          });

    }
};