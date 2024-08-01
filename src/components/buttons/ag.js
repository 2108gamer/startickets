const { ButtonInteraction, Collector, EmbedBuilder, messageLink, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'ag',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
    
        interaction.message.delete()
        
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId("clos")
            .setLabel("CLOSE")
            .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
            .setCustomId("cla")
            .setLabel("CLAIM")
            .setStyle(ButtonStyle.Primary)
        )

        
        const preguntas = ["Nick in minecraft?", "What's your problem?",];    
    let collectCounter = 0;
    let endCounter = 0;
    
    

    const filter = (msg) => msg.author.id === interaction.user.id
    
    const channel = interaction.channel
    let currentQuestionMessage = null;
    const appStartEmbed = new EmbedBuilder()
        .setColor('#0099ff') // Establece el color del embed
        .setTitle(preguntas[collectCounter++]) // Establece el título del embed con la pregunta
        .setDescription('Please answer this question.'); 
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
            .setDescription('Please answer this question.');
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
            .setDescription(`# GENERAL SUPPORT TICKET \n\n Hello, ${interaction.user}! Your ticket has been successfully created. We appreciate your patience! Our responses may take from 5 minutes to 24 hours. If you do not receive a response within 24 hours, please mention the ticket manager or the staff\n\n
                ${mappedResponses}\n\n`)
            .addFields({ name: `<:numero_ok:1260419933553164400> ${interaction.user.username} accepted our attached terms and conditions`, value: `https://shop.starcraftnw.net/faq`})
            .setColor("Gold")
            .setImage("https://imgur.com/BKejfaw.gif")
            interaction.channel.send({embeds: [apl], components: [buttons]});
        }
    })}
}
