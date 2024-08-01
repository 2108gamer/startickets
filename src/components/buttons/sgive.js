const { ButtonInteraction, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonStyle, ButtonBuilder, PermissionsBitField  } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const Giveaway = require('../../schemas/giveaway')
const { updateGiveawayMessage, addParticipant, announceWinners, checkGiveaways, deactivateGiveaway, selectRandomWinners, removeParticipant } = require('../../handlers/giveaway')

module.exports = {
    customId: 'withdraw',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        if (interaction.customId.startsWith('withdraw')) {
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