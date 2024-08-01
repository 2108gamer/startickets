const { Message, PermissionFlagBits, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { default: axios} = require("axios")

module.exports = {
    structure: {
        name: 'enlargue',
        description: 'Hare grande un emoji',
        aliases: [],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
       let emoji = args[0] 
       if (!emoji) {
        return message.reply("Por favor manda un sticker")
       }
       if(emoji.startsWith`<` && emoji.endsWith`>`){
        const id = emoji.match(/\d{15,}/g)[0]

        const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`)
        .then(image => {
            if(image) return "gif"
            else return "png"
        }).catch(err => {
                return "png"
        })

        emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`

        if(!emoji.startsWith("http")){
            return await message.reply({content: "Ocurrio un error", ephemeral: true })
        }
        if(!emoji.startsWith("https")){
            return await message.reply({content: "Ocurrio un error", ephemeral: true })
        }

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("El emoji fue alargado")
        .setImage(emoji)
        .setTimestamp()
         
       await message.reply({embeds: [embed]})
       }
    }
};