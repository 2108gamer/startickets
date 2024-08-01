const { ButtonInteraction, Collector, EmbedBuilder, messageLink, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const axios = require('axios');
const { link } = require('superagent');
module.exports = {
    customId: 'buga',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
    
        interaction.message.delete()
        
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId("closee")
            .setLabel("CERRAR")
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId("claim")
            .setLabel("RECLAMAR")
            .setStyle(ButtonStyle.Primary)
        )

        
        const preguntas = ["En que modalidad encontraste el error?", "Adjunta imagen del bug o error?"];    
    let collectCounter = 0;
    let endCounter = 0;
    
    

    const filter = (msg) => msg.author.id === interaction.user.id
    const channel = interaction.channel
    let currentQuestionMessage = null;
    const appStartEmbed = new EmbedBuilder()
    .setColor('#0099ff') // Establece el color del embed
    .setTitle(preguntas[collectCounter++]) // Establece el título del embed con la pregunta
    .setDescription('Por favor, responde a esta pregunta.'); 
    currentQuestionMessage = await channel.send({ embeds: [appStartEmbed] });
    channel.permissionOverwrites.edit(interaction.user.id, {
        ViewChannel: true,
        SendMessages: true,
      });
      let imageUrl = null;
   
    const collector = channel.createMessageCollector({filter: filter})
    let lastQuestionMessage = null;
    collector.on("collect", async (msg) => {

    
     
     
        if (msg.attachments.size > 0) {
            msg.attachments.forEach(async (attachment) => {
                if (attachment.contentType.startsWith('image/')) {
                    // Aquí asumimos que tienes tu Cliente ID de la API de Imgur
                    const imgurClientId = 'bb6abfe3f5e09e9';
                    try {
                        const imageUrl = attachment.proxyURL; // Usar proxyURL para asegurar que es accesible

                        const response = await axios.post('https://api.imgur.com/3/image', {
                            image: imageUrl,
                            type: 'url' // Especificar que el tipo de imagen es una URL
                        }, {
                            headers: {
                                Authorization: `Client-ID ${imgurClientId}`
                            }
                        });
    
                        const link = response.data.data.link;
                        const embed = new EmbedBuilder()
                        .setURL(link)
                        .setTitle('Imagen adjunta')
                        .setColor("Purple")
                        .setDescription(`[Haz clic aquí para ver la imagen](${link})`)
                        .setFooter({ text: 'Imagen subida a Imgur' })
                        await msg.channel.send({ embeds: [embed] });
                    } catch (error) {
                        console.error('Error al subir imagen a Imgur:', error);
                        await msg.channel.send('Hubo un error al subir la imagen a Imgur.');
                    }
                }
            });
        }   
        
        if (currentQuestionMessage) {
            await currentQuestionMessage.delete().catch(console.error);
            currentQuestionMessage = null; // Resetear la referencia
        }
        // Borrar el mensaje de la respuesta
        await msg.delete().catch(console.error);
    
        if(collectCounter < preguntas.length) {
            const questionEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(preguntas[collectCounter++])
            .setDescription('Por favor, responde a esta pregunta.');
            // Guarda la referencia al nuevo mensaje de la pregunta
            currentQuestionMessage = await channel.send({ embeds: [questionEmbed] });
        } else {
            collector.stop("fulfilled")
        } 

        const appChannel = client.channels.cache.get("1255744503239675984")

        
    }) 
    
    collector.on("end", (collected, reason) => {
        if(reason === "fulfilled") {
            let endCounter = 0;
            const mappedResponses = collected.map((msg, idx) => {
                // Verificar si el enlace pertenece a Imgur
                const isImgurLink = typeof link === 'string' && link.includes("https://i.imgur.com");
                // Cambio aquí: Verificar si es la segunda pregunta y si la respuesta está vacía
                if (idx === 1 && msg.content.trim() === "") { 
                    // Si es la segunda pregunta y la respuesta está vacía, añadir "Imagen adjunta abajo"
                    return `**${preguntas[endCounter++]}**\nImagen adjunta abajo.`;
                } else if (idx === 1 && isImgurLink) { 
                    // Si es la segunda pregunta y el enlace es de Imgur, añadir "Imagen adjunta abajo"
                    return `**${preguntas[endCounter++]}**\n \`\`\`${msg.content}\`\`\`\nImagen adjunta abajo.`;
                } else {
                    // Para todas las demás respuestas
                    return `**${preguntas[endCounter++]}**\n \`\`\`${msg.content}\`\`\``;
                }
            })
            .join("\n\n");
            
            const apl = new EmbedBuilder()
            .setDescription(`# TICKET DE TIPO REPORTAR BUG \n\n Hola, ${interaction.user}! Su ticket ha sido creado con éxito. ¡Agradecemos paciencia! Nuestras respuestas pueden demorar de 5 minutos a 24 horas, en caso de no recibir ninguna respuesta en 24 horas, por favor, menciona al encargado del ticket o al staff\n\n
                ${mappedResponses}\n\n`)
            .addFields({ name: `<:numero_ok:1260419933553164400> ${interaction.user.username} aceptó nuestros términos y condiciones adjuntos`, value: `https://shop.starcraftnw.net/faq`})
            .setColor("Gold");
            
            // Añadir el enlace de Imgur como un campo si es válido
            if (typeof link === 'string' && link.includes("imgur.com")) {
                apl.addFields({ name: 'Archivo adjunto', value: link });
            }
            
            interaction.channel.send({embeds: [apl], components: [buttons]});
            
        }
    });
}}
