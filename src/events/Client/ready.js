const { log } = require("../../functions");
const ExtendedClient = require('../../class/ExtendedClient');
const {EmbedBuilder} = require("discord.js")
module.exports = {
    event: 'ready',
    once: true,
    /**
     * 
     * @param {ExtendedClient} _ 
     * @param {import('discord.js').Client<true>} client 
     * @returns 
     */
    run: (_, client) => {

        log('Iniciado como: ' + client.user.tag, 'done');

      

    }
};