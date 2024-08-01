const { model, Schema } = require('mongoose');  

let notifySchema = new Schema({
    Guild: String,
    ID: String,
    Channel: String,
    Latest: Array,
    message: String,
    PingRoles: String
})
module.exports = model('notif', notifySchema)


