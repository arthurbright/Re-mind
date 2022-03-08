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
}, 30000);
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
            //read in one time time indicator
            acc = 0;
            rep = 0;
            let inputTime = parseFloat(words[2]);
            let inputUnit = (words[3]);
            let inputParsed = Responses.stringToTime(inputTime, inputUnit);
            if (inputParsed === null) {
                Responses.illegal(message.author);
                return;
            }
            acc += inputParsed;

            //read optional following indicators
            i = 5;
            for(; i < words.length; i += 2){
                if(words[i - 1].toLowerCase().startsWith("r")){
                    break; //start reading the repeat time
                }
                inputTime = parseFloat(words[i - 1]);
                inputUnit = (words[i]);
                inputParsed = Responses.stringToTime(inputTime, inputUnit);
                if (inputParsed === null) {
                    Responses.illegal(message.author);
                    return;
                }
                acc += inputParsed;

            }
            //start reading the repeat time
            ++i;
            for(; i < words.length; i += 2){
                inputTime = parseFloat(words[i - 1]);
                inputUnit = (words[i]);
                inputParsed = Responses.stringToTime(inputTime, inputUnit);
                if (inputParsed === null) {
                    Responses.illegal(message.author);
                    return;
                }
                rep += inputParsed;
            }

            //store the reminder
            var rem = {
                userid: message.author.id,
                description: words[1],
                time: Date.now() + acc,
                repeat: rep
            };
            Database.addReminder(rem);
            Responses.confirmAdd(message.author, rem);
        }
        else if (words[0].toLowerCase() === "delete") {
            let num = parseInt(words[1]);
            if(isNan(num) || num < 1){
                Responses.illegal(message.author);
                return;
            }
            Database.deleteReminder(num - 1, message.author.id);

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
