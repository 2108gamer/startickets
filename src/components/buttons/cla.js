const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SelectMenuBuilder } = require('discord.js');
const components = require('../../handlers/components');
const perre = require('../../schemas/Schem');
module.exports = {
    customId: 'cla',
    run: async (client, interaction) => {
        
        const channel = interaction.channel;

        try {
           const data = perre.findOne({user: interaction.user.id})
           console.log(data);
            
            await channel.setTopic(`Claimed by ${interaction.guild.members.cache.get(interaction.user.id).displayName}`);
            const embed = new EmbedBuilder()
            .setTitle('Ticket Claimed')
            .setDescription(`The ticket has been claimed by ${interaction.user}, they will now take care of your issue`)
            .setColor('Green')
            .setFooter({text: `Tickets ${interaction.guild}`, iconURL: interaction.user.displayAvatarURL()});

            await interaction.reply({ embeds: [embed]});
            perre.deleteOne({ user: interaction.user.id});
        } catch (error) {
            console.error('Error updating the channel topic:', error);
            // Optional: Inform the user that there was an error
            await interaction.reply({ content: 'There was an error claiming the ticket.', ephemeral: true });
        }        
    }
};