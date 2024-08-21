const { StringSelectMenuInteraction, EmbedBuilder, ChannelType, PermissionsBitField, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandSubcommandGroupBuilder, UserSelectMenuInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const ticket = require('../../schemas/Schem');
const perre = require('../../schemas/Schem');
module.exports = {
    customId: 'asd',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {
   let value = interaction.values[0]
        
     if (value === "soporte") {
      
      try {
        const data = await ticket.findOne({ user: interaction.user.id })
        console.log(data)
       if(data) {interaction.reply({content: "Ya tienes un ticket abierto en " + `#${data.Channel}`, ephemeral: true})}
        if (data === null){ 
        
        
        const rol_staff = "1254458187306897529"
      
        const canal = await interaction.guild.channels.create({
          name: `comercial-${interaction.user.username}`,
          type: ChannelType.GuildText,
          parent: '1260418482328178800',
        });
    
        canal.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
          SendMessages: false,
        });
    
        canal.permissionOverwrites.create(canal.guild.roles.everyone, {
          ViewChannel: false,
          SendMessages: false,
        });
    
        canal.permissionOverwrites.create(rol_staff, {
          ViewChannel: true,
          SendMessages: true,
        });
        const filtro = { user: interaction.user.id, category: interaction.values[0], Channel: canal.id }
        ticket.create(filtro)
        
        const aem = new EmbedBuilder()
       
        .setColor("Green")
        .setDescription(`# <:numero_ok:1260419933553164400> TICKET CREADO \n${interaction.user} tu ticket a **Soporte General** fue creado, sigue las instrucciones en <#${canal.id}>`)
    
        await interaction.reply({
          embeds: [aem], ephemeral: true
        });
        
          const embed = new EmbedBuilder()
          .setTitle(`<:tickets:1260421798558695426> **TERMINOS Y CONDICIONES**`)
          .setDescription(`<:emoji_99:1251008091856699403> Si deseas continuar, debes estar de acuerdo con nuestras politicas, terminos y condiciones globales\n<:enlace:1260422678922395648>https://shop.starcraftnw.net/faq\n<:enlace:1260422678922395648>https://shop.starcraftnw.net/wiki\n\nAl aceptar, usted confirma haber leido los enlaces adjuntos y estar de acuerto con los mismos`)
          .setTimestamp()
          .setColor(`Green`)
    
        const acep = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId("come")
            .setLabel("ACEPTAR")
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId("niego")
            .setLabel("RECHAZAR")
            .setStyle(ButtonStyle.Danger)
        )
    
    
         
    
      canal.send({ content: `<@${interaction.user.id}>` })
      canal.send({ embeds: [embed], components: [acep] });
        
      }} catch (error) {
        console.log(error)
        interaction.reply({content: "<:emoji_106:1266555245480116267> ocurrio un error al intentar abrir el ticket"+ error , ephemeral: true})
      }
         }
         if (value === "bugs") {
          try {
            const data = await ticket.findOne({user: interaction.user.id})
            console.log(data)
           if(data) {interaction.reply({content: "Ya tienes un ticket abierto", ephemeral: true})}

           if(data === null) {
            const rol_staff = "1254458187306897529"
          
            const canal = await interaction.guild.channels.create({
              name: `bugreport-${interaction.user.username}`,
              type: ChannelType.GuildText,
              parent: '1260418482328178800',
            });
        
            canal.permissionOverwrites.create(interaction.user.id, {
              ViewChannel: true,
              SendMessages: false,
            });
        
            canal.permissionOverwrites.create(canal.guild.roles.everyone, {
              ViewChannel: false,
              SendMessages: false,
            });
        
            canal.permissionOverwrites.create(rol_staff, {
              ViewChannel: true,
              SendMessages: true,
            });
            const filtro = { user: interaction.user.id, category: interaction.values[0], Channel: canal.id }
            ticket.create(filtro)
            
            const aem = new EmbedBuilder()
           
            .setColor("Green")
            .setDescription(`# <:numero_ok:1260419933553164400> TICKET CREADO \n${interaction.user} tu ticket a **Bugs** fue creado, sigue las instrucciones en <#${canal.id}>`)
        
            await interaction.reply({
              embeds: [aem], ephemeral: true
            });
            
              const embed = new EmbedBuilder()
              .setTitle(`<:tickets:1260421798558695426> **TERMINOS Y CONDICIONES**`)
              .setDescription(`<:emoji_99:1251008091856699403> Si deseas continuar, debes estar de acuerdo con nuestras politicas, terminos y condiciones globales\n<:enlace:1260422678922395648>https://shop.starcraftnw.net/faq\n<:enlace:1260422678922395648>https://shop.starcraftnw.net/wiki\n\nAl aceptar, usted confirma haber leido los enlaces adjuntos y estar de acuerto con los mismos`)
              .setTimestamp()
              .setColor(`Green`)
        
            const buga = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("buga")
                .setLabel("ACEPTAR")
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId("niego")
                .setLabel("RECHAZAR")
                .setStyle(ButtonStyle.Danger)
            )
            canal.send({ content: `<@${interaction.user.id}>` })
            canal.send({ embeds: [embed], components: [buga] });
        
        
              const button = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
              .setCustomId("close")
              .setLabel("<:numero_error:1260777715338973216>"))
           }
         
           
          } catch (error) {
            console.log(error)
            interaction.reply({content: "<:emoji_106:1266555245480116267> ocurrio un error aal crear el ticket"})
          } 
        
          
            
            
    
        }
      
       
   if (value === "soporteg") { 
    try {
      const data = await ticket.findOne({user: interaction.user.id})
      console.log(data)

      if(data) { interaction.reply({content: "Ya tienes un ticket abierto", ephemeral: true })}
      
      if(data === null) {
       
        const rol_staff = "1254458187306897529"
      
        const canal = await interaction.guild.channels.create({
          name: `general-${interaction.user.username}`,
          type: ChannelType.GuildText,
          parent: '1260418482328178800',
        });
    
        canal.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
          SendMessages: false,
        });
    
        canal.permissionOverwrites.create(canal.guild.roles.everyone, {
          ViewChannel: false,
          SendMessages: false,
        });
    
        canal.permissionOverwrites.create(rol_staff, {
          ViewChannel: true,
          SendMessages: true,
        });
        const filtro = { user: interaction.user.id, category: interaction.values[0], Channel: canal.id }
        ticket.create(filtro)
        const aem = new EmbedBuilder()
       
        .setColor("Green")
        .setDescription(`#  <:numero_ok:1260419933553164400> TICKET CREADO \n${interaction.user} tu ticket a **Soporte General** fue creado, sigue las instrucciones en <#${canal.id}>`)
        .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
        await interaction.reply({
          embeds: [aem], ephemeral: true
        });
        
          const embed = new EmbedBuilder()
          
          .setDescription(`# <:tickets:1260421798558695426> TERMINOS Y CONDICIONES \n<:emoji_99:1251008091856699403> Si deseas continuar, debes estar de acuerdo con nuestras politicas, terminos y condiciones globales\n<:enlace:1260422678922395648>https://shop.starcraftnw.net/faq\n<:enlace:1260422678922395648>https://shop.starcraftnw.net/wiki\n\nAl aceptar, usted confirma haber leido los enlaces adjuntos y estar de acuerto con los mismos`)
          .setTimestamp()
          .setColor(`Green`)
          .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
    
        const acep = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId("acepto")
            .setLabel("ACEPTAR")
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setCustomId("niego")
            .setLabel("RECHAZAR")
            .setStyle(ButtonStyle.Danger)
        )
    
    
      canal.send({ content: `<@${interaction.user.id}>` })
      canal.send({ embeds: [embed], components: [acep] });
      }
      
    } catch (error) {
     console.log(error)
     interaction.reply({content: "<:emoji_106:1266555245480116267> Ocurrio un error al crear el ticket" + error , ephemeral: true}) 
    }
  
     
   

   }
    
     if(value === "repor") {
     try {
      const filtro = { user: interaction.user.id, category: interaction.values[0]}
      const data = await ticket.findOne({user: interaction.user.id})
      console.log(data)
      if(data) {interaction.reply({content: "ya tienes un ticket abierto", ephemeral: true})}

        if(data === null) {
          
          
          const rol_staff = "1254458187306897529"
          
          const canal = await interaction.guild.channels.create({
            name: `reporte-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: '1260418482328178800',
          });
      
          canal.permissionOverwrites.create(interaction.user.id, {
            ViewChannel: true,
            SendMessages: false,
          });
      
          canal.permissionOverwrites.create(canal.guild.roles.everyone, {
            ViewChannel: false,
            SendMessages: false,
          });
      
          canal.permissionOverwrites.create(rol_staff, {
            ViewChannel: true,
            SendMessages: true,
          });
          const filtro = { user: interaction.user.id, category: interaction.values[0], Channel: canal.id }
          ticket.create(filtro)
          const aem = new EmbedBuilder()
         
          .setColor("Green")
          .setDescription(`#  <:numero_ok:1260419933553164400> TICKET CREADO \n${interaction.user} tu ticket a **Reportar Usuario** fue creado, sigue las instrucciones en <#${canal.id}>`)
          .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
          await interaction.reply({
            embeds: [aem], ephemeral: true
          });
          
            const embed = new EmbedBuilder()
            
            .setDescription(`# <:tickets:1260421798558695426> TERMINOS Y CONDICIONES \n<:emoji_99:1251008091856699403> Si deseas continuar, debes estar de acuerdo con nuestras politicas, terminos y condiciones globales\n<:enlace:1260422678922395648>https://shop.starcraftnw.net/faq\n<:enlace:1260422678922395648>https://shop.starcraftnw.net/wiki\n\nAl aceptar, usted confirma haber leido los enlaces adjuntos y estar de acuerto con los mismos`)
            .setTimestamp()
            .setColor(`Green`)
            .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
      
          const reportu = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
              .setCustomId("report")
              .setLabel("ACEPTAR")
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId("niego")
              .setLabel("RECHAZAR")
              .setStyle(ButtonStyle.Danger)
          )
      
        canal.send({ content: `<@${interaction.user.id}>` })
        canal.send({ embeds: [embed], components: [reportu] });
        }
     } catch (error) {
      console.error(error)
     }

     }
    
    
    
    
    }}
