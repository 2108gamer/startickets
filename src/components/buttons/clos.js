const { ButtonInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, SelectMenuBuilder, MessageAttachment, Attachment } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const { createTranscript } = require('discord-html-transcripts');
module.exports = {
    customId: 'clos',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
     
     
        const channel = interaction.channel;  
        const yesButton = new ButtonBuilder()
        .setCustomId('confirmYes')
        .setLabel('yes')
        .setStyle(ButtonStyle.Success);

    const noButton = new ButtonBuilder()
        .setCustomId('confirmNo')
        .setLabel('No')
        .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(yesButton, noButton);
    
    const embedClose = new EmbedBuilder()
    .setTitle('Close Ticket')
    .setDescription('Are you sure you want to close the ticket?')
    .setColor(0x0099ff)
    .setFooter({ text: 'StarCraft Tickets' });
    // Enviar mensaje de confirmación
    await interaction.reply({embeds: [embedClose], components: [row] })

    // Escuchar por la interacción de los botones
    const filter = i => ['confirmYes', 'confirmNo'].includes(i.customId) && i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter });
    const load = client.emojis.cache.get("1262131340782866504");
    collector.on('collect', async i => {
        if (i.customId === 'confirmYes') {
            interaction.channel.send({ content: `${load} Closing ticket and generating transcript.`});
            // Create the select menu for rating
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('ratingSelecten')
                .setPlaceholder('Select a rating')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(
                    Array.from({ length: 10 }, (_, i) => ({
                        label: `${i + 1} Star(s)`,
                        value: `${i + 1}`
                    }))
                );
          


            const selectRow = new ActionRowBuilder().addComponents(selectMenu);
            
            const attachment = await createTranscript(channel, {
                limit: -1, // Max amount of messages to fetch. `-1` recursively fetches.
                returnType: 'attachment', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
                filename: `${interaction.user.username}-transcript.html`, // Only valid with returnType is 'attachment'. Name of attachment.
                saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
                footerText: "StarCraft Tickets", // Change text at footer, don't forget to put {number} to show how much messages got exported, and {s} for plural
                poweredBy: false, // Whether to include the "Powered by discord-html-transcripts" footer
                hydrate: true // Whether to hydrate the html server-side
            });

            
            const embed = new EmbedBuilder()
              
            .setDescription('# TICKET CLOSED \n\n <:padlock:1262139671304212572>Hello! Your ticket has been closed. You have received a copy of it in the attached file. Below, you can leave your review about this ticket, don t forget to give your feedback so we can continue to improve the support we provide to our users every day! Thank you for choosing us n.n.\n\n<:numero_warning:1262138350719074394> **IMPORTANT**:\n<:line_red:1262140149840482344>Giving an unjustified review can lead to a permanent ban from support. Be objective when providing it.')
            .setColor(0x0099ff)
            .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")

        await i.user.send({ embeds: [embed], components: [selectRow] , files: [attachment] });

            // Borrar el canal
            await interaction.channel.delete();
        } else if (i.customId === 'confirmNo') {
            // Cancelar la acción
            await i.reply({ content: 'Action canceled.', ephemeral: true });
        }
    });

    }
};