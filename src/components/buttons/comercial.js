const { ButtonInteraction, EmbedBuilder, MessageCollector, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const axios = require('axios');
const components = require('../../handlers/components');

module.exports = {
    customId: 'come',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        interaction.message.delete().catch(console.error);
         let currentQuestionMessage = null;
         currentQuestionMessage = await interaction.reply({
            content: 'Por favor, proporciona el ID de tu compra en Tebex en el chat.',
            ephemeral: false // Cambiado a false para hacerlo visible para todos
        });
        
        const filter = m =>  m.content.includes('tbx-') && m.author.id === interaction.user.id;
       
        const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });
       
        collector.on('collect', async (msg) => {
            let lastQuestionMessage = null;// Verifica si el mensaje no incluye 'tbx-' y lo borra si es necesario
            if (!msg.content.includes('tbx-')) {
                await msg.delete().catch(console.error);
                 
            }
            
            const tebexId = msg.content;
            const tebexSecretKey = '362cea10a704b2b213f7e2524b427e0f28405180'; // Asegúrate de que esta sea tu clave secreta actual
            try {
                const response = await axios.get(`https://plugin.tebex.io/payments/${tebexId}`, {
                    headers: {
                        'X-Tebex-Secret': tebexSecretKey
                    }
                });
                
                
                const data = response.data;
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
                const embed = new EmbedBuilder()
                    .setTitle('Información de la Compra')
                    .setColor('#0099ff')
                    .addFields(
                        { name: 'Comprado el', value: `<t:${new Date(
                    data.date 
                  ).getTime() / 1000}>`, inline: false },
                        { name: 'Jugador', value: `${data.player.name}`, inline: false },
                        { name: 'Precio', value: `${data.amount}`, inline: false },
                        { name: 'Estado', value: `${data.status}`, inline: false }
                    );
                    interaction.channel.bulkDelete("2")
        .then((deleteMessages) => {
            interaction.channel.send(`> procesando...`)
            .then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            })

        })
        .catch((error) => {
            console.error("Error", error)
            message.channel.send({content: "Un error ocurrio"})
        })
    
                await interaction.followUp({ embeds: [embed], components: [buttons]});
            } catch (error) {
                console.error('Error al obtener información de Tebex:', error);
                if (error.response) {
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                    interaction.followUp({ content: `Error en la solicitud: ${error.response.status}. Por favor, verifica el ID y vuelve a intentarlo.`, ephemeral: true });
                } else if (error.request) {
                    console.error(error.request);
                    interaction.followUp({ content: 'No se recibió respuesta del servidor de Tebex.', ephemeral: true });
                } else {
                    // Error en la configuración de la solicitud
                    console.error('Error', error.message);
                    interaction.followUp({ content: 'Error desconocido al realizar la solicitud.', ephemeral: true });
                }
            }
        });
        const mes = interaction.channel.messages.fetch()
        console.log('Mensaje:', mes);
    }
    }