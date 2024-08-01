const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const GuildSchema = require('../../../schemas/GuildSchema');
const Giveaway = require('../../../schemas/giveaway')
const { updateGiveawayMessage, addParticipant, announceWinners, checkGiveaways, deactivateGiveaway, selectRandomWinners, removeParticipant } = require('../../../handlers/giveaway')

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('gedit')
        .setDescription('Edita un sorteo creado!')
        .addStringOption(option => option
        	.setName('message_id')
      		.setDescription('El ID del mensaje del sorteo..')
      		.setRequired(true))
  		.addStringOption(option => option
        	.setName('prize')
      		.setDescription('El nuevo premio del sorteo.')
      		.setRequired(false))
  		.addIntegerOption(option => option
        	.setName('winners')
      		.setDescription('El nuevo número de ganadores.')
  	    	.setRequired(false))
  		.addStringOption(option => option
        	.setName('end_date')
      		.setDescription('La nueva fecha de finalización del sorteo (AAAA-MM-DD).')
      		.setRequired(false))
    ,
    options: {
        cooldown: 15000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const messageId = interaction.options.getString('message_id');
        const newPrize = interaction.options.getString('prize');
        const newWinnerCount = interaction.options.getInteger('winners');
        const newEndDate = interaction.options.getString('end_date');
        const giveaway = await Giveaway.findOne({ guildId: interaction.guild.id, messageId: messageId });
        
      if (!giveaway) {
          await interaction.reply({ content: 'Sorteo no encontrado.', ephemeral: true });
          return;
        }

        if (newPrize) giveaway.prize = newPrize;
        if (newWinnerCount) giveaway.winnerCount = newWinnerCount;
        if (newEndDate) giveaway.endAt = new Date(newEndDate);
        await giveaway.save();
        await updateGiveawayMessage(giveaway, client);
        await interaction.reply({ content: 'Sorteo actualizado exitosamente.', ephemeral: true });
    }
};
