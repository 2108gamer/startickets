const { Message, PermissionFlagBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'avatar',
        description: 'Mostrare tu avatar o el de un usuario',
        aliases: [],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) ||

    message.guild.members.cache.find(x => x.user.username.toLocaleLowerCase() === args.slice(0).join(" " || x.

        user.username === args[0]));

    const link = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel('Ver en navegador')
            .setURL(user.displayAvatarURL({ format: "png", size: 2048 }))
            .setStyle(ButtonStyle.Link))
            

const avatar = new EmbedBuilder()
    .setDescription(`Avatar de ${user.username}!`)
    .setFooter({ text: message.guild.name, iconURL: message.client.user.displayAvatarURL() })
    .setImage(user.displayAvatarURL({ format: "png", size: 2048 }))
    .setTimestamp()
    .setColor(0x2F3136);

await message.reply({ embeds: [avatar], components: [link] });
},
};

        

