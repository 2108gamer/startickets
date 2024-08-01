const { ButtonInteraction, ActionRowBuilder, TextInputBuilder, ModalBuilder, TextInputStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'cbtn',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const vermodal = new ModalBuilder()
        .setTitle(`Cambios`)
        .setCustomId('change')

        const modalidad = new TextInputBuilder()
        .setCustomId('modalidad')
        .setRequired(true)
        .setLabel(`Por favor escribe la modalidad`)
        .setPlaceholder(`Gens por ejemplo`)
        .setStyle(TextInputStyle.Short)
        const cambios = new TextInputBuilder()
        .setCustomId('cambio')
        .setRequired(true)
        .setLabel(`Que cambio se hizo en gens?`)
        .setPlaceholder(`Fix bugs por ejemplo`)
        .setStyle(TextInputStyle.Short)

        const mod = new ActionRowBuilder().addComponents(modalidad);
        const cam = new ActionRowBuilder().addComponents(cambios);
        vermodal.addComponents(mod, cam);

    await interaction.showModal(vermodal);  

    }
};