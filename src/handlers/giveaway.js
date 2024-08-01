const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const Giveaway = require('../schemas/giveaway');
const ms = require('ms');
async function announceWinners(giveaway, winnerIds, client) {
    const channel = await client.channels.fetch(giveaway.channelId);
    if (!channel) return;
    const message = await channel.messages.fetch(giveaway.messageId);
    if (!message) return;
    const winnersMention = winnerIds.map(id => `<@${id}>`).join(', ');
    const embed = new EmbedBuilder()
        .setTitle('Sorteo finalizado!')
        .setDescription(`🎉 Felicidades ${winnersMention}!\nGanaste: **${giveaway.prize}**`)
        .setColor('#800080')
        .setTimestamp();
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('end')
        .setLabel('🎉 Ended 🎉')
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true),
    );
    await message.edit({ content: '🎉 **Giveaway Ended** 🎉', embeds: [embed], components: [row] });
    for (const id of winnerIds) {
        const user = await client.users.fetch(id);
        const guild = await client.guilds.fetch(giveaway.guildId);
        const embed = new EmbedBuilder()
            .setTitle('🎉 Felicidades 🎉')
            .setDescription(`Felicidades a  <@${id}>
            ganaste **${giveaway.prize}**
           En el servidor: **${guild.name}**.`)
            .setColor('#800080')
            .setThumbnail(`${client.guilds.cache.get(giveaway.guildId)?.iconURL({ dynamic: true, size: 1024 }) || client.user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
            .setFooter({ text: `Giveaway` })
            .setTimestamp();
        user?.send({ embeds: [embed] });
    }
}

async function checkGiveaways(client) {
  const now = new Date();
  const endedGiveaways = await Giveaway.find({ endAt: { $lte: now }, isActive: true });
  for (const giveaway of endedGiveaways) {
    const winnerIds = selectRandomWinners(giveaway.participants, giveaway.winnerCount);
      announceWinners(giveaway, winnerIds, client);
      giveaway.winners = winnerIds;
      giveaway.isActive = false;
      await giveaway.save();
  }
    const checkGW = await Giveaway.find({ isActive: true });
    for (const giveaway of checkGW) {
        if (giveaway.participants.length != 0) {
            updateGiveawayMessage(giveaway, client)
        }
    }
}

async function deactivateGiveaway(messageId) {
  await Giveaway.updateOne({ messageId: messageId }, { $set: { isActive: false } });
}

function selectRandomWinners(participants, count) {
  const shuffled = participants.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function addParticipant(guildId, messageId, userId, client) {
  try {
    let giveaway = await Giveaway.findOne({ guildId: guildId, messageId: messageId });
    if (!giveaway) {
      console.log('Giveaway not found.');
      return { success: false, message: 'Giveaway not found.' };
    }
    if (giveaway.participants.includes(userId)) {
      return { success: false, message: 'You are already participating.', giveawayId: giveaway.gwID };
    } else {
      giveaway.participants.push(userId);
      await giveaway.save();
      return { success: true, message: 'Added to the giveaway successfully.', giveawayId: giveaway.gwID, giveaway: giveaway };
    }
  } catch (error) {
    console.error('Error adding participant:', error);
    return { success: false, message: 'Error adding participant.' };
  }
}

async function removeParticipant(gwID, userId) {
  try {
    const giveaway = await Giveaway.findOne({ gwID: gwID });
    const index = giveaway.participants.indexOf(userId);
    if (index > -1) {
      giveaway.participants.splice(index, 1);
      await giveaway.save();
      return giveaway;
    }
    return false; 
  } catch (error) {
    console.error('Error removing participant:', error);
    return false; 
  }
}

async function updateGiveawayMessage(giveaway, client) {
    const date = new Date(giveaway.endAt);
    const milliseconds = date.getTime();
    const duration = Math.floor(milliseconds / 1000);
    client.guilds.fetch(giveaway.guildId);
    const embed = new EmbedBuilder()
        .setTitle('Un nuevo sorteo esta activo')
        .setDescription(`🎁 - Premio: **${giveaway.prize}**
        ⏰ - Termina en: <t:${duration}:R>!
        🎉 - Patrocinado Por: <@${giveaway.hostedBy}>
        🫂 - Participantes: **${giveaway.participants.length}**
        👑 - Ganadores: **${giveaway.winnerCount}**
        entra ahora!!`)
        .setColor('#800080')
        .setThumbnail(`${client.guilds.cache.get(giveaway.guildId)?.iconURL({ dynamic: true, size: 1024 }) || client.user.displayAvatarURL({ dynamic: true, size: 1024 })}`)
        .setFooter({ text: `Giveaway` })
        .setTimestamp();
    
  try {
    const guild = await client.guilds.fetch(giveaway.guildId)
    const channel = await guild.channels.fetch(giveaway.channelId)
    const message = await channel.messages.fetch(giveaway.messageId);
    await message.edit({ embeds: [embed] });
  } catch (error) {
    console.error("Error updating giveaway message:", error);
  }
}

async function rerollGiveaway(messageId) {
  try {
    const giveaway = await Giveaway.findOne({ messageId: messageId });
    if (!giveaway) {
      console.log('Giveaway not found.');
      return;
    }

    if (new Date() < giveaway.endAt) {
      console.log('The giveaway has not yet concluded.');
      return;
    }
      
    const newParticipants = giveaway.participants.filter(participant => !giveaway.winners.includes(participant));

    if (newParticipants.length === giveaway.winnerCount) {
      console.log('No available participants for reroll.');
      return;
    }
      
    const newWinners = [];
    for (let i = 0; i < giveaway.winnerCount && newParticipants.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * newParticipants.length);
      newWinners.push(newParticipants[randomIndex]);
      newParticipants.splice(randomIndex, 1);
    }
    giveaway.winners = newWinners;
    await giveaway.save();

    console.log(`New winners selected: ${newWinners.join(', ')}`);

  } catch (error) {
    console.error('Error performing reroll:', error);
  }
}

async function pauseGiveaway(messageId, pause) {
  try {
    const result = await Giveaway.updateOne({ messageId: messageId }, { $set: { isPaused: pause } });
    if (result.modifiedCount === 0) {
      console.log('Giveaway not found or no update required.');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error pausing the giveaway:', error);
    return false;
  }
}


module.exports = { updateGiveawayMessage, addParticipant, announceWinners, checkGiveaways, deactivateGiveaway, selectRandomWinners, removeParticipant, rerollGiveaway, pauseGiveaway }
