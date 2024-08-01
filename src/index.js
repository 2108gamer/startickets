require('dotenv').config();
const ExtendedClient = require('./class/ExtendedClient');
const events = require('./handlers/events');

const client = new ExtendedClient();

client.start();


// Handles errors and avoids crashes, better to not remove them.
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);


const { checkGiveaways } = require('../src/handlers/giveaway');

setInterval(() => checkGiveaways(client), 60000)

const db = require('better-sqlite3')('tiw.db')
client.db = db

db.exec(`CREATE TABLE IF NOT EXISTS ticketsystem 
(

    guildId TEXT PRIMARY KEY,
    categoryId TEXT,
    channelId TEXT,
    transcriptToggle BOOLEAN
);
 CREATE INDEX IF NOT EXISTS 
 idx_ticketsystem_guildId 
 ON ticketsystem (guildId)
`
)