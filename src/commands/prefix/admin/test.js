const { Message, PermissionFlagBits } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: '',
        description: '',
        aliases: [],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        
    }
};