const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ActionRow,
    calculateShardId,
  } = require("discord.js");
  const findUser = require("../events/userQuery");
  const profileModel = require("../models/profileSchema");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("gamble")
      .setDescription("Gamble away your banana's!")
      .addSubcommand((option) =>
        option
          .setName("blackjack")
          .setDescription("Start a game of blackjack!")
          .addIntegerOption((option) =>
            option
              .setName("wager")
              .setDescription("The amount of banana's you wish to wager!")
              .setRequired(true)
              .setMinValue(1)
          )
      ),
    async execute(interaction, profileData) {
      const wager = interaction.options.getInteger("wager");
      const { Bananas } = profileData;
      const username = interaction.user;
  
      // Check if profile exists
      if (!profileData) {
        await interaction.deferReply({ ephemeral: true });
        return await interaction.editReply(
          `You're not involved in Monke business! Get started with **/start**`
        );
      }
      console.log(`profileExists: ${interaction.user}`);
      try {
        switch (
          interaction.options.getSubcommand() // Type of gambling
        ) {
          case "blackjack":
            // Check if USER has enough currency.
            if (Bananas < wager) {
              await interaction.deferReply({ ephemeral: true });
              return await interaction.editReply(
                `You do not have enough :banana:'s to make your wager!`
              );
            }
            console.log(`BlackJack Selected - User has enough currency`);
  
            let deck = createDeck();
            let playerHand = [drawCard(deck), drawCard(deck)];
            let dealerHand = [drawCard(deck), drawCard(deck)];
  
            let playerTotal = calculateHand(playerHand);
            let dealerTotal = calculateHand(dealerHand);
  
            let embed = new EmbedBuilder()
              .setColor("Random")
              .setTitle("BlackJack")
              .setDescription(
                "Hit - take another card\nStand - end the game\nDouble Down - double the bet, take one card, then end the game"
              )
              .addFields(
                {
                  name: `Your hand`,
                  value: `${formatHand(playerHand)}\nValue: ${playerTotal}`,
                  inline: true,
                },
                {
                  name: "Dealer's Hand",
                  value: `${formatHand([dealerHand[0]])}, ❓\nValue: ❓`,
                  inline: true,
                }
              );
  
            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId(`hit`)
                .setLabel(`Hit`)
                .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
                .setCustomId(`stand`)
                .setLabel(`Stand`)
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId(`doubleDown`)
                .setLabel(`Double Down`)
                .setStyle(ButtonStyle.Success)
            );
  
            await interaction.reply({ embeds: [embed], components: [row] });
  
            const filter = (i) => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector(
              {
                filter,
                time: 30000,
              }
            );
            
  
            collector.on(`collect`, async (i) => {
              if (!i.isButton()) return;
              await i.deferUpdate();
  
              if (i.customId === `hit`) {
                console.log(`Player Selected Hit`);
                playerHand.push(drawCard(deck));
                playerTotal = calculateHand(playerHand);
  
                if (playerTotal > 21) {
                  //Player is less than 21
                  await profileModel.findOneAndUpdate(
                    { userId: id },
                    {
                      $inc: {
                        Bananas: -wager,
                      },
                    }
                  );
                };
                  
                  embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setTitle(`BlackJack`)
                    .addFields(
                      {
                        name: `Your Hand`,
                        value: `${formatHand(playerHand)}\nValue: ${playerTotal}`,
                        inline: true,
                      },
                      {
                        name: `Dealer\'s hand`,
                        value: `${formatHand(dealerHand)}\nValue: ${dealerTotal}`,
                        inline: true,
                      }
                    );
  
                  const disableRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setCustomId(`hit`)
                      .setLabel(`Hit`)
                      .setStyle(ButtonStyle.Primary)
                      .setDisabled(true),
                    new ButtonBuilder()
                      .setCustomId(`stand`)
                      .setLabel(`Stand`)
                      .setStyle(ButtonStyle.Secondary)
                      .setDisabled(true),
                    new ButtonBuilder()
                      .setCustomId(`doubleDown`)
                      .setLabel(`Double Down`)
                      .setStyle(ButtonStyle.Success)
                      .setDisabled(true)
                  );
  
                  await i.editReply({
                    embeds: [embed],
                    components: [disabledRow],
                  });
                  collector.stop();
                } else {
                  embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setTitle(`Blackjack`)
                    .setDescription(
                      "Hit - take another card\nStand - end the game\nDouble Down - double the bet, take one card, then end the game"
                    )
                    .addFields(
                      {
                        name: `Your hand`,
                        value: `${formatHand(playerHand)}\nValue: ${playerTotal}`,
                        inline: true,
                      },
                      {
                        name: "Dealer's Hand",
                        value: `${formatHand([dealerHand[0]])}, ❓\nValue: ❓`,
                        inline: true,
                      }
                    );
                  await i.editReply({ embeds: [embed] })
            }
        
        
        }
                
                
             else if (i.customId === `stand`) {
                console.log(`Player Selected stand`);
                while (dealerTotal < 17) {
                  dealerHand.push(drawCard(deck));
                  dealerTotal = calculateHand(dealerHand);
                }
  
                if (dealerTotal > 21 || dealerTotal < playerTotal) {
                  await profileModel.findOneAndUpdate(
                    { userId: id },
                    {
                      $set: {
                        dailyLastUsed: Date.now(),
                      },
                      $inc: {
                        Bananas: randomAmt,
                      },
                    }
                  );
                  if (playerTotal > 21) {
                    //Player is less than 21
                    await profileModel.findOneAndUpdate(
                      { userId: id },
                      {
    
                        $inc: {
                          Bananas: wager,
                        },
                      }
                    );
                  }
                  embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setTitle(`BlackJack`)
                    .addFields(
                      {
                        name: `Your Hand`,
                        value: `${formatHand(playerHand)}\nValue: ${playerTotal}`,
                        inline: true,
                      },
                      {
                        name: "Dealers Hand",
                        value: `You won ${wager} :banana:'s`,
                        inline: false,
                      }
                    );
                } else if (dealerTotal === playerTotal) {
                  embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setTitle(`BlackJack`)
                    .addFields(
                      {
                        name: `Your Hand`,
                        value: `${formatHand(playerHand)}\nValue: ${playerTotal}`,
                        inline: true,
                      },
                      {
                        name: "Dealer's Hand",
                        value: `${formatHand(dealerHand)}\nValue: ${dealerTotal}`,
                        inline: true,
                      },
                      {
                        name: "\u200B",
                        value: `Push, wager returned`,
                        inline: false,
                      }
                    );
                } else {
                  if (playerTotal > 21) {
                    //Player is less than 21
                    await profileModel.findOneAndUpdate(
                      { userId: id },
                      {
    
                        $inc: {
                          Bananas: -wager,
                        },
                      }
                    );
                  }
                  embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setTitle(`BlackJack`)
                    .addFields(
                      {
                        name: `Your Hand`,
                        value: `${formatHand(playerHand)}\nValue: ${playerTotal}`,
                        inline: true,
                      },
                      {
                        name: `Dealer\s Hand`,
                        value: `${formatHand(dealerHand)}\nValue: ${dealerTotal}`,
                        inline: true,
                      },
                      {
                        name: "\u200B",
                        value: `You lost ${wager} :banana:'s`,
                        inline: false,
                      }
                    );
                }
  
                const disableRow = new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                    .setCustomId(`hit`)
                    .setLabel(`Hit`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                  new ButtonBuilder()
                    .setCustomId(`stand`)
                    .setLabel(`Stand`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                  new ButtonBuilder()
                    .setCustomId(`doubleDown`)
                    .setLabel(`Double Down`)
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true)
                );
  
                await i.editReply({ embeds: [embed], components: [disableRow] });
                collector.stop();
              } else if (i.customId === `doubleDown`) {
                console.log(`Player Selected double down`);
                playerHand.push(drawCard(deck));
                playerTotal = calculateHand(playerHand);
  
                if (playerTotal > 21) {
                  if (playerTotal > 21) {
                    //Player is less than 21
                    await profileModel.findOneAndUpdate(
                      { userId: id },
                      {
    
                        $inc: {
                          Bananas: -(wager * 2),
                        },
                      }
                    );
                  }
  
                  embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setTitle(`BlackJack`)
                    .addFields(
                      {
                        name: `Your Hand`,
                        value: `${formatHand(playerHand)}\nValue: ${playerTotal}`,
                        inline: true,
                      },
                      {
                        name: `Dealer\s Hand`,
                        value: `${formatHand(dealerHand)}\nValue: ${dealerTotal}`,
                        inline: true,
                      },
                      {
                        name: "U200B",
                        value: `You lost ${wager * 2} :banana:'s`,
                        inline: false,
                      }
                    );
  
                  const disableRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setCustomId(`hit`)
                      .setLabel(`Hit`)
                      .setStyle(ButtonStyle.Primary)
                      .setDisabled(true),
                    new ButtonBuilder()
                      .setCustomId(`stand`)
                      .setLabel(`Stand`)
                      .setStyle(ButtonStyle.Secondary)
                      .setDisabled(true),
                    new ButtonBuilder()
                      .setCustomId(`doubleDown`)
                      .setLabel(`Double Down`)
                      .setStyle(ButtonStyle.Success)
                      .setDisabled(true)
                  );
  
                  await i.editReply({
                    embeds: [embed],
                    components: [disableRow],
                  });
                  collector.stop();
                } else {
                  while (dealerTotal < 17) {
                    dealerHand.push(drawCard(deck));
                    dealerTotal = calculateHand(dealerHand);
                  }
  
                  if (dealerTotal > 21 || dealerTotal < playerTotal) {
                    if (playerTotal > 21) {
                      //Player is less than 21
                      await profileModel.findOneAndUpdate(
                        { userId: id },
                        {
      
                          $inc: {
                            Bananas: (wager * 2),
                          },
                        }
                      );
                    }
                    embed = new EmbedBuilder().setColor(
                      `Random`.setTitle(`BlackJack`).addFields(
                        {
                          name: `Your Hand`,
                          value: `${formatHand(
                            playerHand
                          )}\nValue: ${playerTotal}`,
                          inline: true,
                        },
                        {
                          name: `Dealer\s Hand`,
                          value: `${formatHand(
                            dealerHand
                          )}\nValue: ${dealerTotal}`,
                          inline: true,
                        },
                        {
                          name: "\u200B",
                          value: `You won ${wager * 2} :banana:'s`,
                          inline: false,
                        }
                      )
                    );
                  } else if (dealerTotal === playerTotal) {
                    embed = new EmbedBuilder()
                      .setColor(`Random`)
                      .setTitle(`BlackJack`)
                      .addFields(
                        {
                          name: `Your Hand`,
                          value: `${formatHand(
                            playerHand
                          )}\nValue: ${playerTotal}`,
                          inline: true,
                        },
                        {
                          name: `Dealer\s Hand`,
                          value: `${formatHand(
                            dealerHand
                          )}\nValue: ${dealerTotal}`,
                          inline: true,
                        },
                        {
                          name: "\u200B",
                          value: `Push, wager returned`,
                          inline: false,
                        }
                      )
                      .setTimestamp();
                  } else {
                    if (playerTotal > 21) {
                      //Player is less than 21
                      await profileModel.findOneAndUpdate(
                        { userId: id },
                        {
      
                          $inc: {
                            Bananas: -( wager * 2 ),
                          },
                        }
                      );
                    }
                    embed = new EmbedBuilder()
                      .setColor(`Random`)
                      .setTitle(`BlackJack`)
                      .addFields(
                        {
                          name: `Your Hand`,
                          value: `${formatHand(
                            playerHand
                          )}\nValue: ${playerTotal}`,
                          inline: true,
                        },
                        {
                          name: `Dealer\s Hand`,
                          value: `${formatHand(
                            dealerHand
                          )}\nValue: ${dealerTotal}`,
                          inline: true,
                        },
                        {
                          name: "\u200B",
                          value: `You lost ${wager * 2} :banana:'s`,
                          inline: false,
                        }
                      );
                  }
  
                  const disableRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setCustomId(`hit`)
                      .setLabel(`Hit`)
                      .setStyle(ButtonStyle.Primary)
                      .setDisabled(true),
                    new ButtonBuilder()
                      .setCustomId(`stand`)
                      .setLabel(`Stand`)
                      .setStyle(ButtonStyle.Secondary)
                      .setDisabled(true),
                    new ButtonBuilder()
                      .setCustomId(`doubleDown`)
                      .setLabel(`Double Down`)
                      .setStyle(ButtonStyle.Success)
                      .setDisabled(true)
                  );
  
                  await i.editReply({
                    embeds: [embed],
                    components: [disableRow],
                  })
                
                  collector.stop()
            )
            }
        
            }
        
        
  
            collector.on("end", async (collected) => {
              if (collected.size === 0) {
                const dealerTotal = calculateHand(dealerHand);
                embed = new EmbedBuilder()
                  .setColor(`#0099ff`)
                  .setTitle(`BlackJack`)
                  .setDescription("The game was canceled due to inactivitiy.")
                  .addFields(
                    {
                      name: `Your Hand`,
                      value: `${formatHand(playerHand)}\nValue: ${playerTotal}`,
                      inline: true,
                    },
                    {
                      name: `Dealer\s Hand`,
                      value: `${formatHand(dealerHand)}\nValue: ${dealerHand}`,
                      inline: true,
                    },
                    {
                      name: "\u200B",
                      value: `Push, wager returned`,
                      inline: false,
                    }
                  );
  
                const disableRow = new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                    .setCustomId(`hit`)
                    .setLabel(`Hit`)
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                  new ButtonBuilder()
                    .setCustomId(`stand`)
                    .setLabel(`Stand`)
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
                  new ButtonBuilder()
                    .setCustomId(`doubleDown`)
                    .setLabel(`Double Down`)
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true)
                );
  
                await interaction.reply({
                  embeds: [embed],
                  components: [disableRow],
                });
            }
          });
          break;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
  
  //Function
  
  function createDeck() {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    let deck = [];
  
    for (let suit of suits) {
      for (let value of values) {
        deck.push({ suit, value });
      }
    }
    return deck;
  }
  
  function drawCard(deck) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    return card;
  }
  
  function calculateHand(hand) {
    let total = 0;
    let aces = 0;
  
    for (let card of hand) {
      if (card.value === "A") {
        aces++;
        total += 11;
      } else if (["K", "Q", "J"].includes(card.value)) {
        total += 10;
      } else {
        total += parseInt(card.value);
      }
    }
  
    while ((total > 21) & (aces > 0)) {
      total -= 10;
      aces--;
    }
    return total;
  }
  
  function formatHand(hand) {
    return hand.map((card) => `${card.value}${card.suit}`).join(",");
  }
  1;

