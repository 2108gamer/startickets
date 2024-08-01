const { Message, PermissionFlagBits, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');


module.exports = {
    structure: {
        name: 'add',
        description: 'Añade a un usuario a un ticket',
        aliases: [],
        permissions: "MANAGE_CHANNELS",
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    const channel = message.channel;
    const user = message.mentions.users.first();
    
    if (!user) return message.reply('Debes mencionar a un usuario');

    channel.permissionOverwrites.edit(user, {
        ViewChannel: true,
        SendMessages: true,
    });
    const embed = new EmbedBuilder()
    .setTitle('Usuario añadido')
    .setDescription(`El usuario ${user} ha sido añadido al ticket`)
    .setColor('Green')
    .setThumbnail(user.displayAvatarURL())
    .setFooter({text: `Añadido por ${message.author.username}`, IconURL: message.author.displayAvatarURL()});
    message.reply({embeds: [embed]});
    }
};