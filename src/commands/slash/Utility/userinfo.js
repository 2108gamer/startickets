const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { time } = require('../../../functions');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Informacion sobre un usuario.')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('El usuario.')
                .setRequired(false)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const user = interaction.options.getUser('user') || interaction.user;

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            await interaction.reply({
                content: 'Este usuario no esta en este server.'
            });

            return;
        };

        const roles = [];
        
        if (member.roles) member.roles.cache.forEach((role) => {
            if (role.id !== interaction.guild.roles.everyone.id) roles.push(`${role.toString()}`);
        });

        const arr = [
            `**Nombre de usuario**: ${user.username}`,
            `**Nombre**: ${member.nickname || user.displayName}`,
            `**ID**: ${user.id}`,
            `**Se unio el**: ${time(user.createdTimestamp, 'd')} (${time(user.createdTimestamp, 'R')})`,
            `**Entro el**: ${time(member.joinedTimestamp, 'd')} (${time(member.joinedTimestamp, 'R')})`,
            `**Roles** [${member.roles?.cache?.size - 1}]: ${roles.join(', ')}`,
            `**Se encuentra en un canal de voz?**: ${member.voice.channel ? 'Si' : 'No'}`,
            `**Es dueño de este server?**: ${interaction.guild.ownerId === user.id ? 'Si' : 'No'}`,
            `**Se encuentra muteado?**: ${member.communicationDisabledUntilTimestamp ? 'Si' : 'No'}`,
        ];

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('User info - ' + user.username)
                    .setThumbnail(member.displayAvatarURL())
                    .setDescription(`${arr.join('\n')}`)
                    .setColor('Blurple')
            ]
        });

    }
};
