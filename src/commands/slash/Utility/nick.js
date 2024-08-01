const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

const https = require("https");
async function fetchPreviousNicks(nick) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      "https://laby.net/api/search/get-previous-accounts/" + nick,
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.once("end", () => {
          const response = JSON.parse(data);
          resolve(response);
        });
      }
    );

    req.on("error", (err) => {
      console.error(err);
      reject(err);
    });

    req.end();
  });
}

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('asd')
        .addStringOption((opt) =>
            opt.setName('nick')
                .setDescription('El usuario.')
                .setRequired(true)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.deferReply();

        const nick = interaction.options.getString("nick", true);
    
        try {
          const user = interaction.user;
    
          if (nick.toLowerCase() === "SxVqze") {
            const bEmbed = new EmbedBuilder()
              .setColor("Yellow")
              .setTitle("¿Que intentas mirar?")
              .setDescription(
                 "`😝` Puro chismoso hoy dia..."
               )
              .setTimestamp()
              .setFooter({
                text: client.user.username,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
              })
              .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL({ dynamic: true }),
              });
    
            await interaction.editReply({ embeds: [bEmbed] });
            return;
          }
          
          const { users } = await fetchPreviousNicks(nick);
    
          if (users && users.length > 0 && users[0].history) {
            const previousNicks = users[0].history
              .map(
                (entry, index) =>
                  `${index + 1}. ${entry.name || "-"} - ${new Date(
                    entry.changed_at
                  ).toLocaleDateString()}`
              )
              .join("\n");
            const avatarURL = `https://minotar.net/helm/${nick}/100.png`;
    
            const embed = new EmbedBuilder()
              .setColor("Yellow")
              .setTitle(`Nicks anteriores de ${nick}`)
              .setDescription(`\`\`\`\n${previousNicks}\n\`\`\``)
              .setFooter({
                text: client.user.username,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
              })
              .setAuthor({
                name: user.tag,
                iconURL: user.displayAvatarURL({ dynamic: true }),
              })
              .setThumbnail(avatarURL)
              .setTimestamp();
    
            await interaction.editReply({ embeds: [embed] });
          } else {
            await interaction.editReply(
              "No se encontraron nicks anteriores para este usuario."
            );
          }
        } catch (error) {
          console.error("Error fetching previous nicks:", error);
          await interaction.editReply(
            "Se produjo un error al buscar los nicks anteriores."
          );
        }
    }
};