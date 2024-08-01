const { StringSelectMenuInteraction, EmbedBuilder, PermissionsBitField, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'enmenu',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {
        let value = interaction.values[0]
        if (value === "gene") {
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
            
            const aem = new EmbedBuilder()
           
            .setColor("Green")
            .setDescription(`<:numero_ok:1260419933553164400> **TICKET CREATED** \n${interaction.user} your ticket for **General Support** has been created, follow the instructions in <#${canal.id}>`)
            .setImage("https://media.discordapp.net/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=66959111&is=66943f91&hm=b4dfac347ac18685fc2c2835f2bade8b7824edb70c272dd6d8b558303976369b&=")
            await interaction.reply({
              embeds: [aem], ephemeral: true
            });
            
              const embed = new EmbedBuilder()
              .setTitle(`<:tickets:1260421798558695426> **TERMS AND CONDITIONS**`)
              .setDescription(`<:emoji_99:1251008091856699403> If you wish to continue, you must agree with our policies, terms, and global conditions\n<:link:1260422678922395648>https://shop.starcraftnw.net/faq\n<:link:1260422678922395648>https://shop.starcraftnw.net/wiki\n\nBy accepting, you confirm having read the attached links and agree with them`)
              .setTimestamp()
              .setColor(`Green`)
              .setImage("https://media.discordapp.net/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=66959111&is=66943f91&hm=b4dfac347ac18685fc2c2835f2bade8b7824edb70c272dd6d8b558303976369b&=")
        
            const accept = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setCustomId("ag")
                .setLabel("ACCEPT")
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setCustomId("deny")
                .setLabel("DENY")
                .setStyle(ButtonStyle.Danger)
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
        
          canal.send({ content: `<@${interaction.user.id}>` })
          canal.send({ embeds: [embed], components: [accept] });
             }
             if (value === "comer") {
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
                
                const aem = new EmbedBuilder()
               
                .setColor("Green")
                .setDescription(`#  <:numero_ok:1260419933553164400> TICKET CREATED \n${interaction.user} your ticket for **General Support** has been created, follow the instructions in <#${canal.id}>`)
                .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
                await interaction.reply({
                  embeds: [aem], ephemeral: true
                });
                
                const embed = new EmbedBuilder()
                  
                .setDescription(`# <:tickets:1260421798558695426> TERMS AND CONDITIONS \n<:emoji_99:1251008091856699403> If you wish to continue, you must agree with our policies, terms, and global conditions\n<:link:1260422678922395648>https://shop.starcraftnw.net/faq\n<:link:1260422678922395648>https://shop.starcraftnw.net/wiki\n\nBy accepting, you confirm having read the attached links and agree with them`)
                .setTimestamp()
                .setColor(`Green`)
                .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
          
              const come = new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                  .setCustomId("ac")
                  .setLabel("ACCEPT")
                  .setStyle(ButtonStyle.Primary),
                  new ButtonBuilder()
                  .setCustomId("deny")
                  .setLabel("DENY")
                  .setStyle(ButtonStyle.Danger)
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
            
              canal.send({ content: `<@${interaction.user.id}>` })
              canal.send({ embeds: [embed], components: [come] });
                 }
                 if (value === "bugs") {
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
                    
                    const aem = new EmbedBuilder()
                   
                    .setColor("Green")
                    .setDescription(`<:numero_ok:1260419933553164400> **TICKET CREATED** \n${interaction.user} your ticket for **Bugs** has been created, follow the instructions in <#${canal.id}>`)
                    .setImage("https://media.discordapp.net/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=66959111&is=66943f91&hm=b4dfac347ac18685fc2c2835f2bade8b7824edb70c272dd6d8b558303976369b&=")
                    await interaction.reply({
                      embeds: [aem], ephemeral: true
                    });
                    
                    const embed = new EmbedBuilder()
                    .setTitle(`<:tickets:1260421798558695426> **TERMS AND CONDITIONS**`)
                    .setDescription(`<:emoji_99:1251008091856699403> If you wish to continue, you must agree with our policies, terms, and global conditions\n<:link:1260422678922395648>https://shop.starcraftnw.net/faq\n<:link:1260422678922395648>https://shop.starcraftnw.net/wiki\n\nBy accepting, you confirm having read the attached links and agree with them`)
                    .setTimestamp()
                    .setColor(`Green`)
                    .setImage("https://media.discordapp.net/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=66959111&is=66943f91&hm=b4dfac347ac18685fc2c2835f2bade8b7824edb70c272dd6d8b558303976369b&=")
                
                    const buga = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setCustomId("bea")
                        .setLabel("ACEPTAR")
                        .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                        .setCustomId("deny")
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
                  if (value === "repor") {
                    const rol_staff = "1254458187306897529"
                      
                    const canal = await interaction.guild.channels.create({
                      name: `reportuser-${interaction.user.username}`,
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
                    
                    const aem = new EmbedBuilder()
                   
                    .setColor("Green")
                    .setDescription(`#  <:numero_ok:1260419933553164400> TICKET CREATED \n${interaction.user} your ticket to **Report User** has been created, follow the instructions in <#${canal.id}>`)
                    .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
                    await interaction.reply({
                      embeds: [aem], ephemeral: true
                    });
                    
                    const embed = new EmbedBuilder()
                      
                    .setDescription(`# <:tickets:1260421798558695426> TERMS AND CONDITIONS \n<:emoji_99:1251008091856699403> If you wish to continue, you must agree with our policies, terms, and global conditions\n<:link:1260422678922395648>https://shop.starcraftnw.net/faq\n<:link:1260422678922395648>https://shop.starcraftnw.net/wiki\n\nBy accepting, you confirm having read the attached links and agree with them`)
                    .setTimestamp()
                    .setColor(`Green`)
                    .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
                    const reportu = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setCustomId("ra")
                        .setLabel("ACCEPT")
                        .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                        .setCustomId("deny")
                        .setLabel("RECHAZAR")
                        .setStyle(ButtonStyle.Danger)
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
                
                  canal.send({ content: `<@${interaction.user.id}>` })
                  canal.send({ embeds: [embed], components: [reportu] });
                  }
                    
                  
                     
    }};

   