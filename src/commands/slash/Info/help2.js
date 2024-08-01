const { ChatInputCommandInteraction, SlashCommandBuilder,  EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const GuildSchema = require('../../../schemas/GuildSchema');
const fs = require ('fs');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('testingh')
        .setDescription('insano!'),
    options: {
        cooldown: 15000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const commandFolders = client.applicationcommandsArray.map((v) => `\`${(v.type === 2 || v.type === 3) ? '' : '/'}${v.name}\`: ${v.description || '(Ninguna)'}`);
        const commandsByCategory = {};

        for (const folder of commandFolders) {
            const commandFiles = client.applicationcommandsArray.map((v) => `\`${(v.type === 2 || v.type === 3) ? '' : '/'}${v.name}\`: ${v.description || '(Ninguna)'}`);
            const commands = [];

            for (const file of commandFiles) {
                const { default: command } = await import(`./../${folder}/${file}`);
                commands.push({ name: command.data.name, description: command.data.description });
            }

            commandsByCategory[folder] = commands;
        }

        const dropdownOptions = Object.keys(commandsByCategory).map(folder => ({
            label: folder,
            value: folder
        }));

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('category-select')
            .setPlaceholder('Select a category')
            .addOptions(...dropdownOptions.map(option => ({
                label: option.label,
                value: option.value
            })));

        const embed = new EmbedBuilder()
            .setTitle('Command - Help')
            .setDescription('Select a category from the dropdown menu to view commands')
            .setThumbnail(`${client.user.displayAvatarURL()}`)

            const row = new ActionRowBuilder()
			.addComponents(selectMenu);

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });

        const filter = i => i.isSelectMenu() && i.customId === 'category-select';
        const collector = interaction.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async i => {
            const selectedCategory = i.values[0];
            const categoryCommands = commandsByCategory[selectedCategory];

            const categoryEmbed = new EmbedBuilder()
                .setTitle(`${selectedCategory} Commands`)
                .setDescription('List of available commands in this category:')
                .setThumbnail(`${client.user.displayAvatarURL()}`)
                .addFields(categoryCommands.map(command => ({
                    name: command.name,
                    value: command.description
                })));

            await i.update({ embeds: [categoryEmbed] });
        });
   
    }
};
