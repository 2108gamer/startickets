const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    event: 'modal',
    once: false,
    /**
     * 
     * @param {ExtendedClient} client
     * @param {*} args... 
     * @returns 
     */
    run: (client, interaction) => {
        client.on(events.InteractionCreate, async (interaction) => {
            if (!interaction.isModalSubmit()) return
        
            if (interaction.customId == "modal") {
                const title = interaction.fields.getTextInputValue("title")
                const desc = interaction.fields.getTextInputValue("desc")
                const img = interaction.fields.getTextInputValue("img")
                const tmh = interaction.fields.getTextInputValue("tmh")
                const colo = interaction.fields.getTextInputValue("color")
        
                const embed = new EmbedBuilder()
                .setTitle(`${title}`)
                .setColor(`${colo}`)
                .setDescription(`${desc}`)
                .setImage(`${img}`)
                .setThumbnail(`${tmh}`)
        
                message.reply({embeds: [embed]})
            }
        })
        
    }
};