const { ButtonInteraction, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonStyle, ButtonBuilder, PermissionsBitField } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const Giveaway = require('../../schemas/giveaway')
const { updateGiveawayMessage, addParticipant, announceWinners, checkGiveaways, deactivateGiveaway, selectRandomWinners, removeParticipant } = require('../../handlers/giveaway')

module.exports = {
    customId: 'participate',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        if (!interaction.isButton()) return;
        if (interaction.customId === 'participate') {
          const giveaway = await addParticipant(interaction.guild.id, interaction.message.id, interaction.user.id);
            if (giveaway.success) {
              const NewParticipant = new EmbedBuilder()
              .setAuthor({ name: 'Participante', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
              .setDescription(`Entraste al sorteo: **${giveaway.giveaway.prize}**
              Consulta el sorteo haciendo clic [aqui](https://discordapp.com/channels/${interaction.guild.id}/${giveaway.giveaway.channelId}/${giveaway.giveaway.messageId})`)
              .setTimestamp()
              .setColor('Green');
            await updateGiveawayMessage(giveaway.giveaway, client);
            await interaction.reply({ content: 'Detalles en tu DM', ephemeral: true })
            await interaction.user.send({ embeds: [NewParticipant]})
          } else {
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId(`withdraw_${giveaway.giveawayId}_${interaction.user.id}`)
              .setLabel('🎉 Leave 🎉')
              .setStyle(ButtonStyle.Danger),
          );
            await interaction.reply({ content: `Ya estas participando en este sorteo.`,  ephemeral: true });
          }
        } else if (interaction.customId.startsWith('withdraw')) {
            const [action, giveawayId, userId] = interaction.customId.split('_');
              const giveaway = await removeParticipant(giveawayId, interaction.user.id);
              if (giveaway) {
                  await updateGiveawayMessage(giveaway, client);
                    await interaction.reply({ content: 'You have left the giveaway.', ephemeral: true });
              } else {
                  await interaction.reply({ content: `You're not in the giveaway.`, ephemeral: true });
              }
            }

    }
};