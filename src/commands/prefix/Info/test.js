
const { Message, PermissionFlagBits, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder,SelectMenuBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'est',
        description: 'comando bellako',
        aliases: [],
        permissions: null
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => { 
   
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
        message.reply({content: "Apoco si tilin", components: [panel]})
        
    }
};