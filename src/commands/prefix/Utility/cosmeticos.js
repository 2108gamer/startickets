const { Message, PermissionFlagBits, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require("axios")

const superagent = require('superagent');

module.exports = {
    name: "cosmetiques",
    aliases: ["c"],
    description: "Envoie cosmetiques",
    run: async (client, message, args, user, text, prefix) => {
        const arguments = message.content.slice(prefix.length).trim().split(' ');

        let { body } = await axios.get('https://fortnite-api.com/v2/cosmetics/br');
        console.log(body)
        let Cosmetiques = new EmbedBuilder()
        .setTitle("Cosmetiques")
        .setDescription(body.data.name)
        .setImage(body.data.images.icon)
        .setFooter('Copyright Intermarket 2021', '../images/logo.png')
        
        message.channel.send({embeds: [embed]})

    }
};