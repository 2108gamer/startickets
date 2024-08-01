const { ChatInputCommandInteraction, SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName("fifi")
        .setDescription('Mostrare el avatar tuyo o de un usuario')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('Selecciona la persona.')
                .setRequired(false)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;

        const link = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Open the link')
                    .setURL(user.displayAvatarURL({ format: "png", size: 2048 }))
                    .setStyle(ButtonStyle.Link)
            );

        const avatar = new EmbedBuilder()
            .setDescription(`Avatar of ${user.username}!`)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.client.user.displayAvatarURL() })
            .setImage(user.displayAvatarURL({ format: "png", size: 2048 }))
            .setTimestamp()
            .setColor(0x2F3136);

        await interaction.reply({ embeds: [avatar], components: [link] });
    },
};

    