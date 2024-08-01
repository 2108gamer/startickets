const Reaction = require('../../schemas/reaction-roles');
const { objectKeys } = require('distube');
const {EmbedBuilder} = require('discord.js');
module.exports = {
    event: 'messageReactionRemove',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {import('discord.js').GuildBan} ban 
     * @returns 
     */
    run: async (client, reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        const data = await Reaction.findOne({ Message: reaction.message.id });
        

        if (!data) return;

        if (!objectKeys(data.Roles).includes(reaction.emoji.name)) return;

        const [roleId] = data.Roles[reaction.emoji.name];
        const member = reaction.message.guild.members.cache.get(user.id);

        if (!member) {
            console.log(`No se pudo encontrar el miembro con ID ${user.id}`);
            return;
        }

        const role = reaction.message.guild.roles.cache.get(roleId);

        if (!role) {
            console.log(`No se pudo encontrar el rol con ID ${roleId}`);
            return;
        }

        try {
            const embed = new EmbedBuilder()
                .setTitle('Rol eliminado')
                .setDescription(`Has perdido el rol ${role.name}`)
                .setColor("#ea899a")
                .setTimestamp();
            await member.roles.remove(roleId);
            user.send({embeds: [embed]});
        } catch (error) {
            console.error(`Error al añadir el rol: ${error}`);
        }
    }
};