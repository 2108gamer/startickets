const { Message, PermissionFlagBits, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder,  ChatInputCommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require("axios")



module.exports = {
    structure: {
        name: 'nicks',
        description: 'Mostrare los nicks anteriores de minecraft',
        aliases: ["n", "nick"],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args,) => {
     
      const nmodal = new ModalBuilder()
      .setTitle(`Ingrese nick`)
      .setCustomId('ning')

      const nicking = new TextInputBuilder()
      .setCustomId('nick')
      .setRequired(true)
      .setLabel(`• Por favor introduzca el nick de la persona`)
      .setPlaceholder(`Entrada de el nick`)
      .setStyle(TextInputStyle.Short)
     
     
     
      const btnsk = new ButtonBuilder()
     .setCustomId("btns")
     .setLabel("Ver skin")
     .setStyle(ButtonStyle.Primary)
      const nick = (args[0]) 
      if(!nick) return message.reply("Debes mencionar un usuario")
     const link = `https://laby.net/api/search/get-previous-accounts/${nick}`
      const name = `https://es.namemc.com/profile/${nick}`
     const res = await axios.get(link)
     const response = res.data

     const { users } = await response;
    
          if (users && users.length > 0 && users[0].history) {
            const previousNicks = users[0].history
              .map(
                (entry, index) =>
                  `${index + 1}. ${entry.name || "?"} - <t:${new Date(
                    entry.changed_at
                  ).getTime() / 1000}>`
              )
              .join("\n");

              const embed = new EmbedBuilder()
              .setURL(name)
              .setColor("#ea899a")
              .setTitle(`Ver en NameMC`)
              .setDescription(`${previousNicks}`)
              .setFooter({
                text: client.user.username,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
              })
              .setTimestamp();


  
           message.reply({embeds: [embed], components: [new ActionRowBuilder().addComponents(btnsk)]});}

            
     
    }
};