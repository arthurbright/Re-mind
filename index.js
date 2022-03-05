//imports
require('dotenv').config();
var Discord = require('discord.js');
var _a = require('discord.js'), Client = _a.Client, Intents = _a.Intents;
var http = require('http');
var Database = require('./database.js');
var Responses = require('./responses.js');
//login to the client
var client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
    partials: [
        'CHANNEL', // Required to receive DMs
    ]
});
client.login(process.env.BOT_TOKEN);
//on initial startup
client.on('ready', function () {
    console.log("Re:mind online!");
});
//////////////////////////////////////////////////////////////
//BEHAVIOR
//check if any reminders must be posted
setInterval(function () {
    //ping server to keep awake
    if (!process.env.LOCAL) {
        http.get("http://re--mind.herokuapp.com/");
    }
    //check for reminders
    Database.sendReminders(client, Date.now());
}, 60000);
client.on("messageCreate", function (message) {
    if (message.author.bot)
        return; //ignore bot messages
    ///////////////////////////direct message code
    if (message.channel.type === "DM") {
        var words = message.content.split(" ");
        ////get list of all current reminds
        if (words[0].toLowerCase() === "get") {
            Database.getReminders(message.author.id).then(function (arr) {
                Responses.sendArr(message.author, arr);
            });
        }
        ////set a reminder
        else if (words[0].toLowerCase() === "set") {
            var inputTime = parseInt(words[2]);
            if (isNaN(inputTime) || words[1] == null) {
                Responses.illegal(message.author);
                return;
            }
            var rem = {
                userid: message.author.id,
                description: words[1],
                time: Date.now() + 60 * 1000 * parseInt(words[2]),
                repeat: 0
            };
            var repeatTime = parseInt(words[3]);
            if (!isNaN(repeatTime) && repeatTime >= 1) {
                rem.repeat = repeatTime * 60 * 1000; 
            }
            Database.addReminder(rem);
            Responses.confirmAdd(message.author, rem);
        }
    }
});
//////////////////////////////////////////////////////////////
//connecting to port to prevent crash
var PORT = process.env.PORT || 3000;
var server = http.createServer(function (req, res) {
    console.log("pinged");
    res.end('hi');
});
server.listen(PORT, function () {
    console.log("server runnin");
});
