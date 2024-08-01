const { ButtonInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const Transcript = require('discord-html-transcripts')
module.exports = {
    customId: 'transcript',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        const rol_staff = interaction.member.roles.cache.get("1254458187306897529") // <<<<<<<<<< ROL[ID] DE STAFF

        if(!rol_staff) return interaction.reply({ content: `🚫 **No tienes permitido usar este boton**`, ephemeral: true })

        if(rol_staff) {

            await interaction.channel.edit({
                name: `📜-renyo-tickets`,
            })

            return interaction.reply({ files: [await Transcript.createTranscript(interaction.channel)] });

        }


    }
};