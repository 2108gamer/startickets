const { Message, PermissionFlagBits, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'embed',
        description: 'Crea un embed',
        aliases: [],
        permissions: "ADMINISTRATOR"
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        await message.channel.send("Ingresa el titulo del embed")
        const titleFilter = (response) => response.author.id === message.author.id;
        const titleCollector = message.channel.createMessageCollector({filter: titleFilter, time: 60000})

        let title = "";

        titleCollector.on("collect", (response) => {
            title = response.content;
            message.channel.send("Ingresa la descripcion del embed")
            titleCollector.stop();
        });

        titleCollector.on("end", () => {
            const descriptionFilter = (response) => response.author.id === message.author.id;
            const descriptionCollector = message.channel.createMessageCollector({
                filter: descriptionFilter, time: 60000
            });
            descriptionCollector.on("collect", response => {
                const description = response.content;
                descriptionCollector.stop();


                const embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()

                message.channel.send({embeds: [embed]})

            })
        })
        
    }
};