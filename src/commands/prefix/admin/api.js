const { Message } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const perre = require('../../../schemas/Schem');
module.exports = {
    structure: {
        name: 'api',
        description: 'comando para test de la api',
        aliases: [],
        permissions: null
    },

    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
       
      try {
            const result = await perre.deleteOne({ user: message.author.id});
            console.log(result);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    
    }
};