const { Message, PermissionsBitField, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'ban',
        description: 'Banea a un usuario',
        aliases: ["b"],
        permissions: 'Administrator'
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(x => x.user.username.toLocaleLowerCase() === args.slice(0).join(" " || x.
        user.username === args[0]));

        if(!message.member.permissions.has(PermissionsBitField.Administrator)) return interaction.reply({content: "No tienes permisos para ejecutar este comando", ephemeral: true});
        if(!member) return message.channel.send({content: "menciona a un usuario valido", ephemeral: true});
        if(message.member === member) return ({content: "No puedes banear a este usuario", ephemeral: true});
        if(!member.kickable) return message.channel.send({content: "Baneaste a este usuario"});
        
        let reason = args.slice(1).join(" ") || "Ninguna"

        const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setDescription(`${member.user} fue baneado de ${message.guild} por la razon ${reason}`)

        message.channel.send({embeds: [embed]}).catch(err => {
            console.log("Error")
        })


        const dmembed = new EmbedBuilder()
        .setColor('#FF0000')
        .setDescription(`Fuiste baneado de ${message.guild.name}`)

        member.send({embeds: [dmembed]}).catch(err => {
            console.log("Error")
        })

        member.ban().catch(err => {
            message.channel.send({content: "ocurrio un fallo por favor comunicalo a un developer"})
        })
        
    }
};