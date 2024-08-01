const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const capschema = require('../../../schemas/v1');
const ExtendedClient = require('../../../class/ExtendedClient');
 
module.exports = {
    structure: new SlashCommandBuilder()
    .setName('verificacion')
    .setDescription('Configura tu sistema de verificación usando captcha.')
    .addSubcommand(command => command.setName('setup').setDescription('Configura el sistema de verificación para ti.').addRoleOption(option => option.setName('role').setDescription('Se otorgará un rol específico a los usuarios que estén verificados..').setRequired(true)).addChannelOption(option => option.setName('channel').setDescription('El canal especificado será su canal de verificación.').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)).addStringOption(option => option.setName('content').setDescription('El mensaje especificado se incluirá en la inserción de verificación..').setRequired(false).setMinLength(1).setMaxLength(1000)))
    .addSubcommand(command => command.setName('disable').setDescription('Desactiva tu sistema de verificación.')),
    run: async (client, interaction) => {
 
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && interaction.user.id !== 'Your user id') return await interaction.reply({ content: '**No** tienes permiso para hacer eso.!', ephemeral: true});
 
        const data = await capschema.findOne({ Guild: interaction.guild.id });
        const sub = interaction.options.getSubcommand();
 
        switch (sub) {
            case 'setup':
 
            const role = await interaction.options.getRole('role');
            const channel = await interaction.options.getChannel('channel');
            const message = await interaction.options.getString('content') || 'Haga clic en el botón de abajo para verificar!';
 
            if (data) return await interaction.reply({ content: `¡**Ya** tienes un sistema de verificación **configurado**! \n> Hacer **/verificar desactivar** para deshacer.`, ephemeral: true});
            else {
 
                await capschema.create({
                    Guild: interaction.guild.id,
                    Role: role.id,
                    Channel: channel.id,
                    Message: 'empty',
                    Verified: []
                })
 
                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('verify')
                    .setLabel('✅ Verificarte')
                    .setStyle(ButtonStyle.Success)
                )
 
                const verify = new EmbedBuilder()
                .setColor('Green')
                .setThumbnail('https://cdn.discordapp.com/attachments/1080219392337522718/1081199958704791552/largegreen.png')
                .setTimestamp()
                .setTitle('• Proceso de verificaion')
                .setAuthor({ name: `${interaction.guild.name}`})
                .setFooter({ text: `Verificacion`})
                .setDescription(`> ${message}`)
 
                interaction.reply({ content: `Su **sistema de verificación** ha sido configurado!`, ephemeral: true});
                const msg = await channel.send({ embeds: [verify], components: [buttons] });
 
                await capschema.updateOne({ Guild: interaction.guild.id }, { $set: { Message: msg.id }});
            }
 
            break;
            case 'disable':
 
            if (!data) return await interaction.reply({ content: `El **sistema de verificación** aún no se ha **configurado**, no se puede eliminar **nada**..`, ephemeral: true});
            else {
 
                await capschema.deleteMany({ Guild: interaction.guild.id });
                const deletemsg = await client.channels.cache.get(data.Channel).messages.fetch(data.Message);
                await deletemsg.delete();
 
                await interaction.reply({ content: `Su **sistema de verificación** ha sido **deshabilitado** exitosamente!`, ephemeral: true});
 
            }
        }
    }
}