const { Message, PermissionFlagBits, EmbedBuilder, Embed } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'apply',
        description: 'Contesta algunas preguntas',
        aliases: ["as", "Ask"],
        permissions: "Administrator" 
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    
        const embed = new EmbedBuilder()
        .setTitle("apply")
        .setDescription("Test x2")

        await message.reply({embeds: [embed]})
       
        .then((embed) => {
            setTimeout(() => {
                embed.delete();
            }, 10_00);
        })
    
       
    
    const ask1 = message.channel.createMessageCollector({
        filter: (response) => response.author.id === message.author.id,
        time: 10_000
    });
    let tes = "" 
    ask1.on("collect", (response) => {
       const tes = response.content;
        message.reply(`colector funcionando ${tes}`)
        
       
        
    });
    
   ask1.on("end", (response) => {
    const testt = response.content
    message.reply("Colector al cien")
    ask1.stop()
   })
 const em2 = new EmbedBuilder()
 .setTitle(tes)
 .setDescription(testt)

 await message.reply({embeds: [em2]})

    
    }
};