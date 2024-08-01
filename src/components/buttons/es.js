const { ButtonInteraction, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'es',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
     const embed = new EmbedBuilder()
     .setAuthor({ name: "Soporte | Support | StarCraft Network", iconURL: "https://cdn.discordapp.com/emojis/1262141099242426444.png?v=1"})
     .setTitle("Selector de categoría | Select category")   
     .setDescription("Selecciona una opción para abrir un ticket de soporte.")
     .setColor("Green")
     .setFooter({ text: "Tickets | StarCraft Network" })
        
        
        
        let panel = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("asd")
                .setPlaceholder("Haz una seleccion")
                .addOptions(
                    {
                        label: "Soporte general",
                        description: "Abre un ticket de tipo general",
                        value: "soporteg"
                    },
                    {
                        label: "Soporte Comercial",
                        description: "Abre un ticket de tipo comercial",
                        value: "soporte"
                    },
                    // Agregar opción para Bugs
                    {
                        label: "Bugs",
                        description: "Reporta un bug o error en el sistema",
                        value: "bugs"
                    },
                    // Agregar opción para Reportar Usuario
                    {
                        label: "Reportar Usuario",
                        description: "Reporta a un usuario por comportamiento inadecuado",
                        value: "repor"
                    }
                )
        );
        
        
        interaction.reply({embeds: [embed], ephemeral: true,components: [panel]})
        
    }
};