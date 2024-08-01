const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const components = require('../../handlers/components');

module.exports = {
    customId: 'claim',
    run: async (client, interaction) => {
        
        const channel = interaction.channel;

        try {
            // Actualiza el tema del canal y espera a que se complete
            await channel.setTopic(`Reclamado por ${interaction.guild.members.cache.get(interaction.user.id).displayName}`);
            const embed = new EmbedBuilder()
            .setTitle('Ticket reclamado')
            .setDescription(`El ticket ha sido reclamado por ${interaction.user}, ahora el se encargara de tu problema`)
            .setColor('Green')
            .setFooter({text: `Tickets ${interaction.guild}`, IconURL: interaction.user.displayAvatarURL()});

            await interaction.reply({ embeds: [embed]});
        } catch (error) {
            console.error('Error al actualizar el tema del canal:', error);
            // Opcional: Informar al usuario que hubo un error
            await interaction.reply({ content: 'Hubo un error al reclamar el ticket.', ephemeral: true });
        }        
    }
};