const { ButtonInteraction, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'en',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
     const embed = new EmbedBuilder()
     .setAuthor({ name: "Support | Support | StarCraft Network", iconURL: "https://cdn.discordapp.com/emojis/1262141099242426444.png?v=1"})
     .setTitle("Category Selector | Select category")   
     .setDescription("Select an option to open a support ticket.")
     .setImage("https://media.discordapp.net/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=66959111&is=66943f91&hm=b4dfac347ac18685fc2c2835f2bade8b7824edb70c272dd6d8b558303976369b&=")
     .setColor("Green")
     .setFooter({ text: "Tickets | StarCraft Network" })
        
        
        
        let panel = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("enmenu")
                .setPlaceholder("Make a selection")
                .addOptions(
                    {
                        label: "General Support",
                        description: "Open a general type ticket",
                        value: "gene"
                    },
                    {
                        label: "Commercial Support",
                        description: "Open a commercial type ticket",
                        value: "comer"
                    },
                    // Add option for Bugs
                    {
                        label: "Bugs",
                        description: "Report a bug or error in the system",
                        value: "bugs"
                    },
                    // Add option for Reporting User
                    {
                        label: "Report User",
                        description: "Report a user for inappropriate behavior",
                        value: "repor"
                    }
                ))
        
        
        interaction.reply({embeds: [embed], ephemeral: true,components: [panel]})
        
    }
};