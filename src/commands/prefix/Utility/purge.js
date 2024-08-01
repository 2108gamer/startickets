const { Message, PermissionFlagBits } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'purge',
        description: 'Borra cierta cantidad de mensajes',
        aliases: [],
        permissions: `Administrator`
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        if(!message.member.permissions) return message.reply({content: "No tienes permisos para ejecutar este comando"})

        const amount = parseInt(args[0])
        
        message.channel.bulkDelete(amount)
        .then((deleteMessages) => {
            message.channel.send(`${deleteMessages.size} Mensajes Borrados exitosamente`)
            .then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            })

        })
        .catch((error) => {
            console.error("Error", error)
            message.channel.send({content: "Un error ocurrio"})
        })
    }
};