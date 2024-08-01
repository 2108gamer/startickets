const { ModalSubmitInteraction, EmbedBuilder } = require('discord.js');

const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {

    customId: 'sug',

    /**

     * 

     * @param {ExtendedClient} client 

     * @param {ModalSubmitInteraction} interaction 

     */

    run: async (client, interaction) => {

        const sua = interaction.fields.getTextInputValue('suge');
const canal = interaction.guild.channels.cache.get("1181003542786482316");
 
 const embed = new EmbedBuilder()
 .setTitle(`Nueva sugerencia de ${interaction.user}`)
 .setDescription(`Sugerencia: ${sua}`)
 .setColor("Green")
 .setFooter({text: "StarCraft Sugerencias"})
 
interaction.reply({content: "Sugerencia enviada", ephemeral: true })
 canal.send({embeds: [embed]}).then(embed => {

    embed.react("👍");
   embed.react("👎")

});
   
    


}}