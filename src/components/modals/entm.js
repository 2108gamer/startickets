const { ButtonInteractionEvents, AttachmentBuilder, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, ButtonBuilder, ButtonStyle, TextInputStyle, Interaction, ModalSubmitInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const capschema = require('../../../src/schemas/v1');
const verifyusers = require('../../../src/schemas/v2');
const LeftUsers = require('../../../src/schemas/v3')
const { CaptchaGenerator } = require('captcha-canvas');
const { createCanvas } = require('canvas');

module.exports = {
    customId: 'vermodal',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        if (interaction.customId === 'vermodal') {

            if (!interaction.isModalSubmit()) return;
     
            const userverdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
            const verificationdata = await capschema.findOne({ Guild: interaction.guild.id });
     
            if (verificationdata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: `Ya estas verificado en este servidor!`, ephemeral: true});
     
            const modalanswer = interaction.fields.getTextInputValue('answer');
            if (modalanswer === userverdata.Key) {
     
                const verrole = interaction.guild.roles.cache.get(verificationdata.Role);
     
                try {
                    await interaction.member.roles.add(verrole);
                } catch (err) {
                    return await interaction.reply({ content: `Ocurrio un error al intentar darte el rol **<@&${verificationdata.Role}>**, reintenta de nuevo!`, ephemeral: true})
                }
     
                await capschema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id }});
                const channelLog = interaction.guild.channels.cache.get("Your Channel ID");
                if (!channelLog) {
                    await interaction.reply({ content: '¡Has sido **verificado!**', ephemeral: true});
                    return;
                } else {
                 const channelLogEmbed = new EmbedBuilder()
                 .setColor(`Green`)
                 .setTitle('⚠️ xd! ⚠️')
                 .setDescription(`<@${interaction.user.id}> Ha sido verificado en el servidor.!`)
                 .setTimestamp()
                 .setFooter({ text: `Verified Logs` })

                 await channelLog.send({ embeds: [channelLogEmbed] });
                 await interaction.reply({ content: '¡Has sido **verificado!**', ephemeral: true});
                }
     
            } else {
                const channelLog = interaction.guild.channels.cache.get("1251351346981109860");
                if (!channelLog) { 
                    await interaction.reply({ content: `**¡Ups!** Parece que **no** ingresaste el **código captcha** válido!`, ephemeral: true})
                    return;
                } else {
                 const channelLogEmbed = new EmbedBuilder()
                 .setColor(`Red`)
                 .setTitle('⚠️ Cuidado con un intento de verificación incorrecto! ⚠️')
                 .setDescription(`<@${interaction.user.id}> Intenta un código del captcha pero falló. Era el incorrecto. Echa un vistazo a la persona, tal vez tenga problemas al ingresar el código.\n\nTal vez sea un robot, ¡así que vigílalo!`)
                 .setTimestamp()
                 .setFooter({ text: `Verified Logs` })

                 await channelLog.send({ embeds: [channelLogEmbed] });
                 await interaction.reply({ content: `**¡Ups!** Parece que **no** ingresaste el **código captcha** válido!`, ephemeral: true})
                }
            }
        }

    }
};