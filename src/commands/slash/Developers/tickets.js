const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder,SelectMenuBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('asd3')
        .setDescription('asd'),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            interaction.reply({content: "No tienes permisos para ejecutar este comando", ephemeral: true})
        } else{
       let embed = new EmbedBuilder()
         .setColor("Random")
         .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true}) })
         .setDescription("Test")


         let  panel = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder()
            .setCustomId("asd")
            .setPlaceholder("Haz una seleccion")
            .addOptions(
            {
              label: "Soporte general",
              description: "Abre un ticket de tipo genereal",
              value: "sg"
            },
            {
                label: "Soporte Comercial",
                description: "Abre un ticket de tipo comercial",
                value: "sc"
           },
            {
                label: "Reportar bug",
                description: "Reporta un bug",
                value: "rb"
             },
            )
         )
         interaction.reply({embeds: [embed], components: [panel] });
         interaction.reply({content: "Panel configurado", ephemeral: true})
         
        }

    }
};
