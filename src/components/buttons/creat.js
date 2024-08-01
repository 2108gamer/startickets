const { ButtonInteraction, ChannelType, EmbedBuilder, PermissionsBitField, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'tickets',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

            const rol_staff = "1254458187306897529"
      
            const canal = await interaction.guild.channels.create({
              name: `renyo-tickets`,
              type: ChannelType.GuildText,
              parent: '1251016985450512525',
            });
      
            canal.permissionOverwrites.create(interaction.user.id, {
              ViewChannel: true,
              SendMessages: true,
            });
      
            canal.permissionOverwrites.create(canal.guild.roles.everyone, {
              ViewChannel: false,
              SendMessages: false,
            });
      
            canal.permissionOverwrites.create(rol_staff, {
              ViewChannel: true,
              SendMessages: true,
            });
            
      
            await interaction.reply({
              content: `✅ **El ticket fue abierto correctamente <#${canal.id}>**`,
              ephemeral: true,
            });
            
              const embed = new EmbedBuilder()
              .setTitle(`📩 Aplicacion para **Staff** 📩`)
              .setDescription(`🎟️ **Bienvenid@, aca poner algo con los requisitos**`)
              .setTimestamp()
              .setColor(`#2b2d31`)
      
            const acep = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("acepto")
                .setLabel("Acepto")
                .setStyle(ButtonStyle.Primary)
            )


              const button = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
              .setCustomId("close")
              .setLabel("🗑️")
              .setStyle(ButtonStyle.Secondary),
      
              new ButtonBuilder()
              .setCustomId("transcript")
              .setLabel("📜")
              .setStyle(ButtonStyle.Secondary),
      
              new ButtonBuilder()
              .setCustomId("claim")
              .setLabel("📌")
              .setStyle(ButtonStyle.Secondary),
      
      
            )
      
          canal.send({ content: `👉 **Bienvenido al ticket** <@${interaction.user.id}>` })
          canal.send({ embeds: [embed], components: [acep] });
        }
   
    }
