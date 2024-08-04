const { model, Schema } = require("mongoose");
 
let perre = new Schema({
    user: String,
    Channel: String,
    category: String,
    random: String,

})
 
module.exports = model("perre", perre);