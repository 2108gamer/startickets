const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    AttachmentBuilder,
    Routes,
} = require("discord.js");
const ExtendedClient = require("../../../class/ExtendedClient");

module.exports = {
    structure: new SlashCommandBuilder()
        .setName("set-animated-pfp")
        .setDescription("cambia el avatar del bot pot uno animado.")
        .addAttachmentOption((option) =>
            option
                .setName("attachment")
                .setDescription("El nuevo avatar.")
                .setRequired(true)
        ),
    options: {
        developers: true,
    },
    /**
     * @param {ExtendedClient} client
     * @param {ChatInputCommandInteraction<true>} interaction
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const attachment = interaction.options.getAttachment('attachment', true);

        if (attachment.contentType !== 'image/gif') {
            await interaction.editReply({
                content: 'No es en .gif'
            });

            return;
        };

        await client.user.setAvatar(attachment.proxyURL)
            .then(async () => {
                await interaction.editReply({
                    content: 'El avatar se cambio.'
                });
            })
            .catch(async (err) => {
                await interaction.editReply({
                    content: 'Ocurrio un error:\n' + err
                });
            });

    },
};
