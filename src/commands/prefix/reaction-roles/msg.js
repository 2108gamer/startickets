const { Message, PermissionFlagBits, EmbedBuilder, Util } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const Reaction = require('../../../schemas/reaction-roles');
const { parse } = require('dotenv');
module.exports = {
    structure: {
        name: 'panel',
        description: 'Envía un mensaje con los roles a seleccionar',
        aliases: ["pa"],
        permissions: "ADMINISTRATOR"
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    
     const channel = message.mentions.channels.first() || message.channel;
    let data = await Reaction.findOne({ Guild: message.guild.id })
    
        if(data) {
            
            let roles = data.Roles;
            
           const mapped = Object.keys(data.Roles).map((value, index) => {
            const role = message.guild.roles.cache.get(data.Roles[value][0]);
    
            return `${data.Roles[value][1].raw} <:ArrowForward:1266951854504280095> ${role}`; 
           }).join('\n\n');   

           const embed = new EmbedBuilder()
              .setTitle('Panel de roles')
                .setDescription(mapped)
                .setColor("Green")
                .setFooter({text: "Reacciona a los mensajes para obtener el rol correspondiente"})
                .setTimestamp()

                channel.send({ embeds: [embed] }).then((msg) => {
                    data.Message = msg.id
                    data.save();

                    const reactiuons = Object.values(data.Roles).map((val) => val[1].id);

                    reactiuons.map((emoji) => msg.react(emoji));
                })
           
        } else {
            message.reply('No hay roles configurados');
        }
     

    

    }
};