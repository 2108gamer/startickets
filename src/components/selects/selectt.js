const { StringSelectMenuInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const discordTranscripts = require("discord-html-transcripts");

const supportticketcategory = "1251016985450512525"; // categoria-ticket-va-qui
const staffrole = "1254458187306897529"; // id-ruolo-staff-va-qui
const User = require("../../schemas/tschem");
module.exports = {
    customId: 'example-select',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        if (interaction.isStringSelectMenu()) {
            const selectedValue = interaction.values[0];
            if (selectedValue === "support") {
              const data = await User.findOne({ username: interaction.user.tag });
              if (data) {
                const embed = new EmbedBuilder()
                  .setTitle("Bilet jest już otwarty")
                  .setDescription("Masz już otwarty bilet.")
                  .setTimestamp()
                  .setColor("Red");
                await interaction.reply({ embeds: [embed], ephemeral: true });
              } else {
                const newChannel = await interaction.guild.channels.create({
                  name: `support-${interaction.user.tag}`,
                  type: ChannelType.GuildText,
                  parent: supportticketcategory,
                  permissionOverwrites: [
                    {
                      id: interaction.guild.id,
                      deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                      id: interaction.user.id,
                      allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                      id: staffrole,
                      allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                  ],
                });
        
                await User.create({
                  username: interaction.user.tag,
                  tickets: `1`,
                  channelid: `${newChannel.id}`,
                });
                await interaction.reply({
                  content: `Twój bilet jest teraz otwarty. Możesz go znaleźć tutaj: ${newChannel}.`,
                  ephemeral: true,
                });
                const embed2 = new EmbedBuilder()
                  .setAuthor({
                    name: ``,
                    iconURL: `${interaction.guild.iconURL()}`,
                  })
                  .setThumbnail(interaction.guild.iconURL())
                  .setTitle("")
                  .setDescription(
                    `
            `
                  )
                  .setTimestamp()
                  .setColor("Green")
                  .setFooter({
                    text: interaction.guild.name,
                    iconURL: "",
                  })
                  .setImage("");
        
                const close = new ButtonBuilder()
                  .setLabel("Zamknij")
                  .setCustomId("chiudi")
                  .setEmoji("🔞")
                  .setStyle(ButtonStyle.Secondary);
        
                const claim = new ButtonBuilder()
                  .setLabel("Przyjmij")
                  .setCustomId("rivendica")
                  .setEmoji("✅")
                  .setStyle(ButtonStyle.Secondary);
        
                const transcript = new ButtonBuilder()
                  .setLabel("Transkrypcja")
                  .setCustomId("trascrizione")
                  .setEmoji("📒")
                  .setStyle(ButtonStyle.Secondary);
        
                const row = new ActionRowBuilder().addComponents(
                  close,
                  claim,
                  transcript
                );
        
                //await newChannel.send({embeds: [embed2], ephemeral: false, components: [row] })
                const roleMention = `<@&1205585314039468033>`;
                await newChannel.send({
                  content: `<@&1205585314039468033>, <@&1205585314039468033>`,
                  embeds: [embed2],
                  ephemeral: false,
                  components: [row],
                });
              }
            }
        
       

    }
    }}
