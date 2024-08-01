const { ModalSubmitInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'skm',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        const nick = interaction.fields.getTextInputValue('nick');
        const img = `https://visage.surgeplay.com/full/1024/${nick}`
        const embed = new EmbedBuilder()
        .setTitle(`Skin de ${nick}`)
        .setImage(img)
        .setColor("Aqua")
 
        interaction.reply({embeds: [embed]})

    }
};