const { ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('embedb')
        .setDescription('Creare un embed para tu servidor'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
  const modal = new ModalBuilder()
    .setTitle("Embed builder")
    .setCustomId("modal")


    const title = new TextInputBuilder()
    .setCustomId("asdd")
    .setLabel("Inicio")
    .setRequired(true)
    .setPlaceholder("Ingresa el titulo aqui")
    .setStyle(TextInputStyle.Short)


    const description = new TextInputBuilder()
    .setCustomId("de")
    .setLabel("Descripcion")
    .setRequired(true)
    .setPlaceholder("Ingresa la descripcion aqui")
    .setStyle(TextInputStyle.Paragraph)

    const color = new TextInputBuilder()
    .setCustomId("co")
    .setLabel("color")
    .setRequired(false)
    .setPlaceholder("Ingresa el color del embed en EX color")
    .setStyle(TextInputStyle.Short)

    const img = new TextInputBuilder()
    .setCustomId("im")
    .setLabel("Imagen")
    .setRequired(false)
    .setPlaceholder("Ingresa el link de la imagen si lo desea")
    .setStyle(TextInputStyle.Shorth)

    const tmh = new TextInputBuilder()
    .setCustomId("tm")
    .setLabel("humbnail")
    .setRequired(false)
    .setPlaceholder("Ingresa el link de el thumbnail si lo desea")
    .setStyle(TextInputStyle.Shorth)

    const firstActionRow = new ActionRowBuilder().addComponents(title);
    const desc = new ActionRowBuilder().addComponents(description);
    const colo= new ActionRowBuilder().addComponents(color)
    const tm = new ActionRowBuilder().addComponents(img)
    const im = new ActionRowBuilder().addComponents(tmh)

    modal.addComponents(
        firstActionRow,
        desc,
        colo,
        tm,
        im
    )
   interaction.showModal(modal)
    }
};