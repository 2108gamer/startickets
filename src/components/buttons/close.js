const { ButtonInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, SelectMenuBuilder, MessageAttachment, Attachment } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const { createTranscript } = require('discord-html-transcripts');
module.exports = {
    customId: 'closee',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
     
     
        const channel = interaction.channel;  
        const yesButton = new ButtonBuilder()
        .setCustomId('confirmYes')
        .setLabel('Sí')
        .setStyle(ButtonStyle.Success);

    const noButton = new ButtonBuilder()
        .setCustomId('confirmNo')
        .setLabel('No')
        .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(yesButton, noButton);
    
    const embedclose = new EmbedBuilder()
    .setTitle('Cerrar Ticket')
    .setDescription('¿Estás seguro de que quieres cerrar el ticket?')
    .setColor(0x0099ff)
    .setFooter({ text: 'StarCraft Tickets' });
    // Enviar mensaje de confirmación
    await interaction.reply({embeds: [embedclose], components: [row] })

    // Escuchar por la interacción de los botones
    const { Readable } = require('stream');
const FormData = require('form-data');
const axios = require('axios');

// Convert buffer to stream
function bufferToStream(buffer) {
    const readable = new Readable();
    readable._read = () => {}; // _read is required but you can noop it
    readable.push(buffer);
    readable.push(null);
    return readable;
}

const filter = i => ['confirmYes', 'confirmNo'].includes(i.customId) && i.user.id === interaction.user.id;
const collector = interaction.channel.createMessageComponentCollector({ filter });
const load = client.emojis.cache.get("1262131340782866504");
collector.on('collect', async i => {
    if (i.customId === 'confirmYes') {
        interaction.channel.send({ content: `${load} Cerrando ticket y generando transcripcion.` });
        // Crear el select menu para la puntuación
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('ratingSelect')
            .setPlaceholder('Selecciona una puntuación')
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(
                Array.from({ length: 10 }, (_, i) => ({
                    label: `${i + 1} Estrella(s)`,
                    value: `${i + 1}`
                }))
            );

        const selectRow = new ActionRowBuilder().addComponents(selectMenu);

        const attachment = await createTranscript(channel, {
            limit: -1, // Max amount of messages to fetch. `-1` recursively fetches.
            returnType: 'buffer', // Valid options: 'buffer' | 'string' | 'attachment' Default: 'attachment' OR use the enum ExportReturnType
            filename: `${interaction.user.username}-transcript.html`, // Only valid with returnType is 'attachment'. Name of attachment.
            saveImages: true, // Download all images and include the image data in the HTML (allows viewing the image even after it has been deleted) (! WILL INCREASE FILE SIZE !)
            footerText: "StarCraft Tickets", // Change text at footer, don't forget to put {number} to show how much messages got exported, and {s} for plural
            poweredBy: false, // Whether to include the "Powered by discord-html-transcripts" footer
            hydrate: true // Whether to hydrate the html server-side
        });

        // Convert buffer to stream
        const attachmentStream = bufferToStream(attachment);

        // Enviar el archivo a la API
        const form = new FormData();
        form.append('file', attachmentStream, `${interaction.user.username}-transcript.html`);

       
            const response = await axios.post('https://storage.ricadev.fun/upload', form, {
                headers: {
                    ...form.getHeaders()
                }
            });
             

             const data = response.data

        const embed = new EmbedBuilder()
            .setDescription('# TICKET CERRADO \n\n <:padlock:1262139671304212572>¡Hola! Tu ticket ha sido cerrado. Has recibido una copia de tal en el archivo adjunto. A continuación, podrás dejar tu reseña sobre dicho ticket, ¡no olvides opinar para poder mejorar día a día la atención que le brindamos a nuestros usuarios! Gracias por elegirnos n.n.\n\n<:numero_warning:1262138350719074394> **IMPORTANTE**:\n<:line_red:1262140149840482344>El brindar una reseña injustificada puede derivar a prohibición permanente del soporte. Sé objetivo al brindar tal.')
            .setColor(0x0099ff)
            .setImage("https://cdn.discordapp.com/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&")
            .addFields({name: 'Transcripcion', value: `${data}`})
        await i.user.send({ embeds: [embed], components: [selectRow]});

        // Borrar el canal
        await interaction.channel.delete();
    } else if (i.customId === 'confirmNo') {
        // Cancelar la acción
        await i.reply({ content: 'Acción cancelada.', ephemeral: true });
    }
});

    }
};