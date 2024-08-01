const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionsBitField, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const setup = require('../../../schemas/tschem');
module.exports = {
    structure: new SlashCommandBuilder()
        .setName('ticketse')
        .setDescription('configura el sistema de tickets')
        .addChannelOption(option => 
            option.setName('canal').setDescription('Elije un canal').setRequired(true)
            .addChannelTypes(ChannelType.GuildText))
            .addRoleOption(option => option.setName('rol_staff').setDescription('Elije un rol con permisos para los tickets').setRequired(true))
            .addStringOption(option => option.setName('titulo').setDescription('Escribe un titulo para el panel').setRequired(true))
            .addStringOption(option => option.setName('descripcion').setDescription('Escribe una descripcion del panel').setRequired(true))
            .addStringOption(option => option.setName('boton_label').setDescription('Escribe un label para el boton').setRequired(true))
            .addStringOption(option => option.setName('boton_emoji').setDescription('Elije un emoji para el boton').setRequired(true)),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const canal = interaction.options.getChannel("canal")
        const rol = interaction.options.getRole("rol_staff")
        const titulo = interaction.options.getString("titulo")
        const descripcion = interaction.options.getString("descripcion")
        const label = interaction.options.getString("boton_label")
        const emoji = interaction.options.getString("boton_emoji")
      
            const configembed = new EmbedBuilder()
                  .setTitle(`📩 **Tickets | By Renyo** 📩`)
                  .setDescription(`✅ **El sistema de tickets se configuro correctamente**\n\n📅 **Datos:**\n\n📪 **Canal:** <#${canal.id}>\n💬 **Rol:** <@&${rol.id}>\n🔴 **Titulo[Panel]:** \`${titulo}\`\n🔶 **Descripcion[Panel]:** \`${descripcion}\`\n🟢 **Boton[Label]:** \`${label}\`\n🔷 **Boton[Emoji]:** \`${emoji}\``)
                  .setTimestamp()
                  .setColor(`#2b2d31`)
      
            const panelembed = new EmbedBuilder()
                .setTitle(`${titulo}`)
                .setDescription(`${descripcion}`)
                .setTimestamp()
                .setColor(`#2b2d31`)
      
            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId(`tickets`)
                    .setLabel(`${label}`)
                    .setEmoji(`${emoji}`)
                    .setStyle(ButtonStyle.Secondary)
      
            
          )
          
          interaction.reply({ embeds: [configembed], ephemeral: true});
      
          canal.send({ embeds: [panelembed], components: [button] })
          
    }
};
