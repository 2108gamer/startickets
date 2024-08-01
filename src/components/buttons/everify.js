const { ButtonInteractionEvents, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, ButtonBuilder, ButtonStyle, TextInputStyle, Interaction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const capschema = require('../../../src/schemas/v1');
const verifyusers = require('../../../src/schemas/v2');
const LeftUsers = require('../../../src/schemas/v3')
const { CaptchaGenerator } = require('captcha-canvas');
const { createCanvas } = require('canvas');

module.exports = {
    customId: 'captchaenter',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        if (interaction.customId === 'captchaenter') {

            const vermodal = new ModalBuilder()
                .setTitle(`Verificacion`)
                .setCustomId('vermodal')
     
                const answer = new TextInputBuilder()
                .setCustomId('answer')
                .setRequired(true)
                .setLabel(`• Por favor escribe su código Captcha`)
                .setPlaceholder(`Entrada de tu código captcha`)
                .setStyle(TextInputStyle.Short)
     
                const vermodalrow = new ActionRowBuilder().addComponents(answer);
                vermodal.addComponents(vermodalrow);

            await interaction.showModal(vermodal);
        
        }

    }
};