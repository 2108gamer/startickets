const { StringSelectMenuInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const discordTranscripts = require("discord-html-transcripts");


module.exports = {
    customId: 'ratingSelect',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {
    const embed = new EmbedBuilder()
    .setTitle("Gracias por puntuar")
    .setDescription(`Gracias por puntuar el ticket Con ${interaction.values[0]} estrellas. \n\n ¡Esperamos verte pronto!`)
    .setTimestamp()
    .setColor("Green");
    await interaction.reply({content: '# <:StarCraft:1262141099242426444>' + `Gracias por puntuar el ticket Con ${interaction.values[0]} estrellas.`});   
    }

}