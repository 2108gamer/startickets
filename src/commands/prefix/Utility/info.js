const { Message, PermissionFlagBits, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'info',
        description: 'informacion',
        aliases: [],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Informacion")
        .setDescription(`${message.author.username} ola`)

        const asd = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Postulate")
            .setEmoji("😂")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/channels/1210241853656662078/1218098318593363979")
        );

        message.channel.send({embeds: [embed], components: [asd]})
        
    }
};