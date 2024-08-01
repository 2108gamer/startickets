const { Message, PermissionFlagBits, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require("axios")

module.exports = {
    structure: {
        name: 'newss',
        description: 'asds',
        aliases: ["n"],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
   const modo = args[0]  
   
   const api = "https://fortnite-api.com/v2/news/br"

   
   const response = await axios.get(api)
   const data = response.data.data
   const embed = new EmbedBuilder()
   .setTitle("Nuevas cosas agregadas a fornite")
   .setImage(data.image)
   .setColor("Aqua")
   .setFooter({text: "Borren fornite alv"})
   .setTimestamp()

   message.reply({embeds: [embed]})
  
    }
};