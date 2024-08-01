const {ChatInputCommandInteraction, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { structure } = require('../Info/help2');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('sugerencia')
        .setDescription('Envia una sugerencia'),

        run: async (client, interaction) => {
        const modal = new ModalBuilder()
            .setCustomId('sug')
            .setTitle('Sugerencia');

        const feedbackInput = new TextInputBuilder()
            .setCustomId('suge')
            .setLabel('Sugerencia')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Entra aqui tu sugerencia.')
            .setRequired(true);

        const actionRow = new ActionRowBuilder().addComponents(feedbackInput);

        modal.addComponents(actionRow);

        await interaction.showModal(modal);

        
    },
};
