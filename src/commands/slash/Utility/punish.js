const { ChatInputCommandInteraction, SlashCommandBuilder, ButtonStyle,  ButtonBuilder, ActionRowBuilder,
  EmbedBuilder
 } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const { post } = require('moongose/routes');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('punish')
        .setDescription('Modera a un usuario')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('El usuario a moderar.')
                .setRequired(true)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
     const user = interaction.options.getUser('user')

     if(!user) return interaction.reply({content: "Debes mencionar a un usuario", ephemeral: true})

    const embed = new EmbedBuilder()
    .setColor("Random")
    .setTitle("Opciones de moderacion")
    .setDescription(`Selleciona una opcion de moderacion para ${user.username}`)
    .addFields({ name: "kick", value: "Patea a el usuario del servidor"})
    .addFields({ name: "Ban", value: "Banea a el usuario del servidor"})
    .addFields({ name: "Advierte", value: "Advierte a el usuario del servidor"})
    .addFields({ name: "Mutea", value: "Mutea a el usuario del servidor"})
    .setTimestamp()


    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId("kick")
        .setLabel("kick")
        .setEmoji("😂")
        .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
        .setCustomId("ban")
        .setLabel("ban")
        .setEmoji("😂")
        .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
        .setCustomId("warn")
        .setLabel("Advertir")
        .setEmoji("😂")
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setCustomId("mute")
        .setLabel("Mutear")
        .setEmoji("😂")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({embeds: [embed], components: [row] });


    const filter = (i) => 
        i.customId === "kick" ||
        i.customId === "ban" ||
        i.customId === "warn" ||
        i.customId === "mute";

        const collector = interaction.channel.createMessageComponentCollector
        ({
            filter,
            time: 15000,
        });

        collector.on("collect" , async i => {
            switch (i.customId) {
                case "kick":
                    await interaction.guild.members.kick(user.id)
                    .then(() => {
                        interaction.followUp(`${user.username} fue kickeado del servidor`)
                    })
                    .catch(error => {
                        interaction.followUp(`Ocurrio un error al intentar kickear a ${user.username}: ${error} `);

                    })
                    break;
                    case "ban":
                        await interaction.guild.members.ban(user.id)
                        .then(() => {
                            interaction.followUp(`${user.username} fue baneado del servidor`)
                        })
                        .catch (error => {
                            interaction.followUp(`Ocurrio un error al intentar Banear a ${user.username}: ${error} `)
                        })
                        break;
 
                case "mute":
                    const userTimeout = await interaction.guild.members.cache.get(user.id) 
                    userTimeout.timeout(600000, "Castigado")    
                    .then(() => {
                        interaction.followUp(`${user.username} fue muteado por 10 minutos`)
                    }) 
                    .catch(error => {
                        interaction.followUp(`Ocurrio un error al intentar mutear a *: ${error} `);
                    })
                    break;

                    case "warn":
                        const adver = new EmbedBuilder()
                        .setTitle("Fuiste sancionado")
                        .setDescription(`${user.username} fuiste advertido en ${interaction.guild.name}`)
                        .addFields({ name: "Sancionado por", value: `${interaction.user.username}`})
                        .setColor("#FF0000")
                        user.send({ embeds: [adver]})
                        const post = new EmbedBuilder()
                        .setTitle("test")
                        .setDescription(`${user.username} moderaste a ${user.username} en ${interaction.guild.name}`)
                        .setColor("#FF0000")
                        
                        interaction.member.send({ embeds: [post]})
                        break;
                        default:
                            break;

            }
            collector.stop();
            

        })
        const post = new EmbedBuilder()
            .setTitle(`Usuario moderado`)
            .setDescription(`Para volver a moderar a un usuario usa **/punish**`)
            .addFields({ name: "Usuario moderado por ultima vez", value: `${user.username}`})
            
        collector.on("end", () => {
            interaction.deferReply({content: "asd", ephemeral: true})
        })

    }
};