const { GiveawaysManager: gw} = require('discord-giveaways');
const giveawaysModel = require('./schemas/giveaways')

module.exports = class GiveawaysManager extends gw {
    async getAllGiveaways() {
        return await giveawaysModel.find().lean().exec();

    }
    async  saveGiveaway(messageId, giveawayData) {
        return await giveawaysModel.create(giveawayData);

    }
    async editGiveaway(messageId, giveawayData) {
        return await giveawaysModel.updateOne({messageId}, giveawayData, {onitUndefined: true}).exec();
    }
    async deleteGiveaway(messageId) {
        return await giveawaysModel.deleteOne({messageId}).exec()
    }
}