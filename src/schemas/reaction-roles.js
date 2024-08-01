const { Guild, Message } = require("discord.js");
const { model, Schema } = require(`mongoose`);

let Reaction = new Schema({
   Guild: String,
   Message: String,
   Roles: Object, 
});

module.exports = model(`Reaction`, Reaction);
