const { ButtonInteraction, EmbedBuilder } = require('discord.js');

const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {

    customId: 'deny',

    /**

     * 

     * @param {ExtendedClient} client 

     * @param {ButtonInteraction} interaction 

     */

    run: async (client, interaction) => {

        const user = interaction.user;
        await interaction.channel.delete()   
          const embed = new EmbedBuilder()
          .setTitle(`${interaction.user.username} did not accept the terms and conditions`)
    .setAuthor({name: `${interaction.guild}`, iconURL: `https://cdn.discordapp.com/attachments/1251005245224652821/1261012726583394439/logo.png?ex=6691691e&is=6690179e&hm=013f34de7c5e24c39ab4687a667497885aedec7c841f376e2a372c4134c949ff&`})
    .setDescription(`You must accept the terms and conditions set by **${interaction.guild}** to proceed with the ticket creation.`)
    .setColor("Red")
    .setTimestamp()     
     .setFooter({text: `${interaction.guild} Tickets`})  

    user.send({embeds: [embed]})        

    }

};