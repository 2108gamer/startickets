const { ContextMenuCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonStyle, ButtonBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const Giveaway = require('../../../schemas/giveaway')
const generator = require('generate-password');
const ms = require('ms')
module.exports = {
    structure: new SlashCommandBuilder()
        .setName('gstart')
        .setDescription("Empezare un sorteo en tu servidor")
        .addStringOption(option => option.setName('prize').setDescription('El premio del sorteo.').setRequired(true))
  			.addIntegerOption(option => option.setName('winners').setDescription('Numero de ganadores').setRequired(true))
  			.addStringOption(option => option.setName('duration').setDescription('Duración del sorteo en minutos').setRequired(true))
    		.addChannelOption(option => option.setName('channel').setDescription('Canal para publicar el sorteo.').setRequired(true).addChannelTypes(ChannelType.GuildText).addChannelTypes(ChannelType.GuildNews))
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addUserOption(option => option.setName('patrocinador').setDescription('El patrocinador del sorteo').setRequired(false))
    ,
    /**
     * @param {ExtendedClient} client 
     * @param {UserContextMenuCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const gwID = generator.generate({
        	length: 10,
        	numbers: true
    	});
        const prize = interaction.options.getString('prize');
  		const winnerCount = interaction.options.getInteger('winners');
  		const durationMinutes = interaction.options.getString('duration');
        const channel = interaction.options.getChannel('channel');
        const patrocinador = interaction.options.getUser('patrocinador') || interaction.user;
        const durationMS = ms(durationMinutes)
        const endAt = new Date(Date.now() + durationMS);
		const duration = Math.floor(endAt / 1000);
  		const embed = new EmbedBuilder()
    		.setTitle(`Sorteo de **${prize}**`)
    		.setDescription(`
            ⏰ - Termina en: <t:${duration}:R>!
			🎉 - Patrocinado por: ${patrocinador} 
            👑 - Ganadores: **${winnerCount}**`)
    		.setColor('#800080')
        	.setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024 }))
    		.setFooter({ text: `${interaction.guild} Sorteos` })
        	.setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('participate')
        .setLabel('Participar')
        .setStyle(ButtonStyle.Success),
    );
  const message = await channel.send({ embeds: [embed], components: [row], fetchReply: true });

  const newGiveaway = new Giveaway({
    gwID: gwID,
    messageId: message.id,
    channelId: channel.id,
    guildId: interaction.guild.id,
    hostedBy: interaction.user.id,
    startAt: new Date(),
    endAt: endAt,
    prize: prize,
    winnerCount: winnerCount,
    participants: [],
    isActive: true
  });
  await newGiveaway.save();

  await interaction.reply({ content: 'Giveaway successfully started!', ephemeral: true });
    }
};