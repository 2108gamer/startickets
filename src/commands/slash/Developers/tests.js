const { ChatInputCommandInteraction, SlashCommandBuilder,  ModalBuilder, EmbedBuilder, ActionRowBuilder, TextInputComponent, TextInputBuilder, TextInputStyle} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName("comando")
        .setDescription('Bellako'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {


        const modal = new ModalBuilder()
        .setCustomId('modal2')
        .setTitle('Starcraft')
        


        const asd = new TextInputBuilder()
        .setCustomId('modal3')
        .setLabel("Insano")
       .setStyle(TextInputStyle.Short)

        const row = new ActionRowBuilder()
        .addComponents(asd)

        modal.addComponents(row)

        interaction.showModal(modal)
    }
};