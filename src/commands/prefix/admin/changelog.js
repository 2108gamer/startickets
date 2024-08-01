const { Message, PermissionFlagBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, EmbedBuilder, TextInputStyle} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'changelog',
        description: 'anunciare un nuevo anuyncio en starcraft',
        aliases: ["ch", "change"],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    const btnc = new ButtonBuilder()
    .setCustomId("cbtn")
    .setLabel("Ingresar cambios")
    .setStyle(ButtonStyle.Primary)  
    
    const embed = new EmbedBuilder()
    .setTitle("Felicidades por los nuevos cambios")
    .setDescription(`${message.author} Felicidades por los nuevos cambios, usa el boton de abajo para ingresarlos y notificar a todos los usuarios de **StarCraft**`)
    .setColor("Green")
    .setFooter({text: "Cambios StarCraft"})
    .setTimestamp()

    message.reply({embeds: [embed], components: [new ActionRowBuilder().addComponents(btnc)]})
    }
};