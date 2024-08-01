const ExtendedClient = require('../../class/ExtendedClient');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    event: 'guildCreate',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {import('discord.js').Guild} guild 
     * @returns 
     */
    run: async (client, guild) => {
        let channeltoSend;

        console.log(`Guild name: ${guild.name}`);
        console.log(`Total channels: ${guild.channels.cache.size}`);

        // Ordenar los canales por posición y encontrar el primer canal de texto disponible
        const sortedChannels = guild.channels.cache
            .filter(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
            .sort((a, b) => a.position - b.position);

        if (sortedChannels.size > 0) {
            channeltoSend = sortedChannels.first();
            console.log(`Found channel: ${channeltoSend.name}`);
        }

        if (!channeltoSend) {
            console.log('No se pudo encontrar un canal para enviar el mensaje de bienvenida');
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle('Gracias por añadirme a tu servidor')
            .setDescription('Hola, soy **Mini Ric**, un bot multifuncional con comandos de moderación, diversión, música y más. Para ver la lista de comandos, usa `!help`')
            .setThumbnail(client.user.displayAvatarURL())
            .setColor('Green')
            .setFooter({ text: 'Mini Ric' })
            .setTimestamp();

        try {
            await channeltoSend.send({ embeds: [embed] });
            console.log('Mensaje de bienvenida enviado correctamente');
        } catch (error) {
            console.error('Error al enviar el mensaje de bienvenida:', error);
        }
    }
};