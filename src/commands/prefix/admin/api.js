const { Message } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');
const tt = require('../../../schemas/Schem');
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
            const data = await tt.findOne({ user: message.author.username });
            console.log(data);
            
            if (data) {
                await tt.findOneAndDelete({ user: message.author.username });
                console.log('Data deleted for user:', message.author.username);
            } else {
                console.log('No data found for user:', message.author.username);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    
    }
};