const { model, Schema } = require("mongoose");
 
let ticket = new Schema({
    channel: String,
    user: String,
    Channel: String,
    category: String,
    random: String,

})
 
module.exports = model("tickets", ticket);