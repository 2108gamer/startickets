const { Message, PermissionsBitField, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'say',
        description: 'si',
        aliases: [],
        permissions: "ManageChannels"
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first();
        const m = args.slice(1).join(" ");
        
        if (!message.member.permissions) 
        return message.reply({content: "No tienes permisos para hacer esto"});

        if (!channel) return message.reply({content: "Por favor menciona un canal valido"});

        if (!m) return message.reply({content: "Por favor proporciona un mensaje"});
        const embed = new EmbedBuilder()
        .setDescription(m)
        .setTitle("Nuevo Comentario")
        .setColor("DarkVividPink")
        channel.send({embeds: [embed]})

    }
}
        