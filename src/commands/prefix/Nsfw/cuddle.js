const { Message, PermissionFlagBits, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios')


module.exports = {
    structure: {
        name: 'cuddle',
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
        const action = 'cuddle';
    if (args.length !== 1) {
        message.reply({content: "Por favor menciona a un usuario" ,ephemeral: true})
        return
    }

    const taggedUser = message.mentions.members.first() || message.author

    if(!taggedUser) {
        message.reply({content: "Por favor menciona a un usuario", ephemeral: true})

    }
    
    const apiUrl = `https://nekos.life/api/v2/img/${action}`
    try {
      const response = await axios.get(apiUrl)
      const gifUrl = response.data.url
      console.log(gifUrl)

      const embed = new EmbedBuilder()
      .setColor("Fuchsia")
      .setDescription(`${message.author}, le dio un beso a ${taggedUser}`)
      .setImage(gifUrl)
      .setFooter({text: `${message.guild}`})
      .setTimestamp

      message.channel.send({ embeds: [embed]})

    } catch(error){
        console.error(error)
        message.reply("Hubo un fallo de la api")
    }


    }
};




