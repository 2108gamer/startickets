const { ButtonInteraction, Collector, EmbedBuilder, messageLink, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'acepto',
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

        
        const preguntas = ["Nick en minecraft?", "Cual es tu problema?",];    
    let collectCounter = 0;
    let endCounter = 0;
    
    

    const filter = (msg) => msg.author.id === interaction.user.id
    
    const channel = interaction.channel
    let currentQuestionMessage = null;
    const appStartEmbed = new EmbedBuilder()
        .setColor('#0099ff') // Establece el color del embed
        .setTitle(preguntas[collectCounter++]) // Establece el título del embed con la pregunta
        .setDescription('Por favor, responde a esta pregunta.'); 
    // Elimina la siguiente línea para evitar enviar el embed dos veces
    // await channel.send({ embeds: [appStartEmbed] });
    // Corrige esta línea para guardar correctamente la referencia al mensaje enviado
    currentQuestionMessage = await channel.send({ embeds: [appStartEmbed] });
    
    channel.permissionOverwrites.edit(interaction.user.id, {
        ViewChannel: true,
        SendMessages: true,
    });
    
    const collector = channel.createMessageCollector({filter: filter})
    
    collector.on("collect", async (msg) => {
        // Asegúrate de borrar el mensaje de la pregunta antes de enviar la siguiente
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
    }) 
    
    collector.on("end", async (collected, reason) => {
        if(reason === "fulfilled") {
            let index = 1;
            const mappedResponses = collected.map((msg) => {
                return `**${preguntas[endCounter++]}**\n \`\`\`${msg.content}\`\`\``
            })
            .join("\n\n")
            
            const apl = new EmbedBuilder()
            .setDescription(`# TICKET DE SOPORTE GENERAL \n\n Hola, ${interaction.user}! Su ticket ha sido creado con éxito.¡Agradecemos paciencia! Nuestras respuestas pueden demorar de 5 minutos a 24 horas, en caso de no recibir ninguna respuesta en 24 horas, por favor, menciona al encargado del ticket o al staff\n\n
                ${mappedResponses}\n\n`)
            .addFields({ name: `<:numero_ok:1260419933553164400> ${interaction.user.username} aceptó nuestros términos y condiciones adjuntos`, value: `https://shop.starcraftnw.net/faq`})
            .setColor("Gold");
            interaction.channel.send({embeds: [apl], components: [buttons]});
        }
    })}
}
