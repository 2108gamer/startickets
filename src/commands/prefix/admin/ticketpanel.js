const { Message, PermissionFlagBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const emoji = require('../../../../emojis/emojis.json');

module.exports = {
    structure: {
        name: 'Cara',
        description: 'Testeando',
        aliases: ["ca"],
        permissions: "ADMINISTRATOR",
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
    const es = new ButtonBuilder()
    .setCustomId('es')
    .setLabel('Español')
    .setEmoji(emoji.es)
    .setStyle(ButtonStyle.Success);
    const en = new ButtonBuilder()
    .setCustomId('en')
    .setLabel('English')
    .setEmoji(emoji.en)
    .setStyle(ButtonStyle.Danger);

    const buttons = new ActionRowBuilder().addComponents(en, es);
    
    
        const embed = new EmbedBuilder()
    .setDescription("## <:StarCraft:1262141099242426444>SOPORTE | SUPPORT | STARCRAFT NETWORK\n\n\n :flag_es: ¿Requieres de ayuda o tienes algún problema/duda? Interactúe en el botón :flag_es:.\n\n<:cf_lista:1262162323335020584> **IMPORTANTE**: \n > <:e_cross:1262162566478827693> No menciones al staff masivamente.\n > <:line_green:1262162806204137583> Sé paciente\n > <:line_green:1262162806204137583> Contesta las preguntas, sé amable y coopera con la información al staff.\n\n:flag_us: Need help or have a problem/doubt? Interact on the button :flag_us:.\ns\n<:cf_lista:1262162323335020584> **IMPORTANT**:\n > <:e_cross:1262162566478827693> Don't mention the staff massively.\n > <:line_green:1262162806204137583>Be patient.\n > <:line_green:1262162806204137583> Answer questions, be friendly and cooperate with information to the staff.​")
    .setColor("Purple")
    .setFooter({ text: 'Tickets | StarCraft Network' })
    .setTimestamp()
    .setImage("https://media.discordapp.net/attachments/1190208694298890311/1261067970080407592/Black_and_White_Sports_Football_Ticket_20240711_151257_0001.gif?ex=6694e851&is=669396d1&hm=18a3df61f05705c36433561e8bdc27c4f102bbc99a8e09be18756be35703bcb7&=")
    message.reply({embeds: [embed], components: [buttons]})
}

};