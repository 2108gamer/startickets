const { ModalSubmitInteraction, EmbedBuilder, Embed } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'change',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        const cambios = interaction.fields.getTextInputValue('cambio');
        const modalidad = interaction.fields.getTextInputValue('modalidad'); 
        const user = interaction.user
        const cambiosc =  interaction.guild.channels.cache.get("1251016987006599301");
        const img = "https://cdn.discordapp.com/attachments/1243752750962049070/1254956106988650496/StarCraft__1_-removebg-preview-removebg-preview.png?ex=667b6073&is=667a0ef3&hm=e4c5838ecd2e4f5b026f2d0f9b9d7c2eba1a9dbed885583f5ec4bf2b9ce0c4b5&"
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Nuevos cambios llegaron!")
        .setDescription(`A continuacion te muestro los cambios que llegaron a **STARCRAFT**\n\n> Cambio ${cambios}\n\n> Modalidad: ${modalidad}\n\n> Desarollador: ${user}`)
        .setFooter({text: "Trabajando por ti <3"})
        .setThumbnail(img)
        .setTimestamp()
 

        await cambiosc.send({content: "@everyone"})
        await cambiosc.send({embeds: [embed]})
        await interaction.reply({content: "Cambios enviados exitosamente", ephemeral: true})

    }
};