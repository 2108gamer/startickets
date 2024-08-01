const { Message, PermissionFlagBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'ip',
        description: 'Mostrare la ip del servidor',
        aliases: [],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    const asd = "http://159.54.143.145"
        const btnt = new ButtonBuilder()
    .setLabel("Tienda")
    .setStyle(ButtonStyle.Link) 
    .setURL(asd)   

    const embed = new EmbedBuilder()
    .setTitle("!Entra a nuestro servidor mediante las ip establecidas dependiendo de tu tipo de minecraft!")
    .addFields(
        { name: 'IP JAVA', value: `mc.starcraftnw.net` },
        { name: 'Puerto', value: `25700` },
        { name: 'Compatibilidad entre JAVA y Bedrock?', value: `Puedes entrar mediante java y bedrock con la misma ip, gracias por preferirnos y esperamos que te diviertas!, cualquier duda o reporte puedes hacerlo con !tickets o !help dentro de discord!` }
    )
    .setColor("Aqua")

    message.reply({embeds: [embed], components: [new ActionRowBuilder().addComponents(btnt)]})
    }
};