const { StringSelectMenuInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const discordTranscripts = require("discord-html-transcripts");


module.exports = {
    customId: 'ratingSelecten',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
        .setTitle("Thank you for rating")
        .setDescription(`Thank you for rating the ticket with ${interaction.values[0]} stars. \n\n We hope to see you soon!`)
        .setTimestamp()
        .setColor("Green");
        await interaction.reply({content: '# <:StarCraft:1262141099242426444>' + `Thank you for rating the ticket with ${interaction.values[0]} stars.`});   
        }
}