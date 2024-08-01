const { Message, PermissionFlagBits, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios')
const Kiss = require("../../../schemas/kissSchema")

let currentKissGifIndex = 0;


module.exports = {
    structure: {
        name: 'kiss',
        description: 'asd',
        aliases: [],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        const action = 'kiss';
    if (args.length !== 1) {
        message.reply({content: "Por favor menciona a un usuario" ,ephemeral: true})
        return
    }

    const taggedUser = message.mentions.users.first();

    if(!taggedUser) {
        message.reply({content: "Por favor menciona a un usuario", ephemeral: true})

    }
    
    const apiUrl = `https://nekos.life/api/v2/img/${action}`
    try {
      const response = await axios.get(apiUrl)
      const gifUrl = response.data.url
     

      const embed = new EmbedBuilder()
      .setColor("Fuchsia")
      .setDescription(`${taggedUser}, Le dio un ${action} a ${message.author}`)
      .setImage(gifUrl)

      message.channel.send({ embeds: [embed]})

    } catch(error){
        console.error(error)
        message.reply("Ocurrio un error")
    }


    }
};
