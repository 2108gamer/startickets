const { Message, PermissionFlagBits, EmbedBuilder, parseEmoji } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const Reaction = require('../../../schemas/reaction-roles');
const { parse } = require('dotenv');
module.exports = {
    structure: {
        name: 'emojiadd',
        description: 'Agrega una reacción a un rol',
        aliases: ["emoadd"],
        permissions: "ADMINISTRATOR"
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    
     const role = message.mentions.roles.first();
     
     let [, emoji] = args;

     if(!emoji) return message.reply('Por favor, mencione um emoji!');

    let ParsedEmoji = parseEmoji(emoji);
     

     let data = await Reaction.findOne({ Guild: message.guild.id}) 
     
        if(data) {
            
            data.Roles[ParsedEmoji.name] = [
                role.id,
                {
                id: ParsedEmoji.id,
                raw: emoji
                } 
            ]
            await Reaction.findOneAndUpdate({ Guild: message.guild.id }, data);
        } else {
            new Reaction({
                Guild: message.guild.id,
                Message: null,
                Roles: {
                    [ParsedEmoji.name]: [
                        role.id,
                        {
                            id: ParsedEmoji.id,
                            raw: emoji
                        }
                    ]
                }
            }).save();
        }
        message.reply('Emoji añadido con exito!');

    }
};