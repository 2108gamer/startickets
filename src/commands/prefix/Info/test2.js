const { Message, PermissionFlagBits, ModalBuilder, EmbedBuilder, ActionRowBuilder, TextInputComponent, TextInputBuilder, TextInputStyle} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const Reaction= require('../../../schemas/reaction-roles');
module.exports = {
    structure: {
        name: 'test',
        description: 'Testing nomas',
        aliases: ["test"],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    
      const data = await Reaction.findOne({ Guild: message.guild.id });
      data.deleteOne(); 
    }
};