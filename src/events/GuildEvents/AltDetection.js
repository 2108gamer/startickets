
const ExtendedClient = require('../../class/ExtendedClient');
const ms = require('ms');
const time = ms("30d")
const {EmbedBuilder} = require('discord.js');
module.exports = {
    event: 'guildMemberAdd',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {import('discord.js').GuildBan} ban 
     * @returns 
     */
    run: async (client, member) => {
        const user = await member.guild.members.fetch(member.id);
   const createdAt = new Date (member.user.createdAt).getTime();
   const difference = Date.now() - createdAt;
   if (difference < time) {
    const embed = new EmbedBuilder()
    .setTitle('<:emoji_106:1266555245480116267> Cuenta alternativa detectada')
    .setDescription(`El usuario ${user.user.tag} ha sido expulsado por ser una cuenta alternativa`)
    .setThumbnail(user.user.displayAvatarURL())
    .setColor('Red')
    .setFooter({ text: 'Anti ALT' })
    .setTimestamp();
       
       user.send({embeds: [embed]})
       member.kick()
    }




    }
};