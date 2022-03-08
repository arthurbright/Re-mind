const Discord = require('discord.js');

function sendArr(user, arr){
    

    if(arr.length === 0){
        const embed = new Discord.MessageEmbed()
        .setColor('#26fffb')
        .setTitle('No active reminders!')

        user.send({embeds: [embed]});


        return;
    }

    
    str = ""
    for(i = 0; i < arr.length; i ++){
        let rem = arr[i];
        str = str +  (i + 1) + ". " + rem.description + ": Pings in **";
        str = str + timeToString(rem.time - Date.now()) + "**\n";
    }

    const embed = new Discord.MessageEmbed()
        .setColor('#26fffb')
        .setTitle('List of active reminders:')
        .setDescription(str);

    user.send({embeds: [embed]});
 
}


function timeToString(milli){
    let sec = milli /1000;
    if(sec < 60 * 60){ //in an hour: just say minutes
        let str = Math.round(sec/60) + " minutes"
        return str;
    }
    else if(sec < 60 * 60 * 24){ //in a day: hours + minutes
        let str = Math.floor(sec/(60 * 60)) + " hours, " +  Math.floor((sec/60) % 60) + " minutes";
        return str;
    }
    else{ //in a week: just say days
        let str = Math.round(sec/(60 * 60 * 24)) + " days";
        return str;
    }
}


const minwords = ["m", "mins", "min", "minute", "minutes"];
const hourwords = ["h", "hour", "hours"];
const daywords = ["d", "day", "days"];

//converts ie (5, "min") to milliseconds
function stringToTime(num, unit){
    if(isNaN(num) || num < 1){
        return null;
    }
    if(minwords.includes(unit)){
        return num * 1000 * 60;
    }
    else if(hourwords.includes(unit)){
        return num * 1000 * 60 * 60;
    }
    else if(daywords.includes(unit)){
        return num * 1000 * 60 * 60 * 24;
    }
    return null;
    

}


function confirmAdd(user, rem){

    let embed = new Discord.MessageEmbed()
        .setColor('#26fffb')
        .setTitle('"' + rem.description + '": Set to ping in ' + timeToString(rem.time - Date.now()) + ".");
    if(rem.repeat != 0){
        embed.setDescription('Repeats every ' + timeToString(rem.rep) + ".")
    }

    user.send({embeds: [embed]});
 
}

errorMessages = ["Illegal syntax",
                "Illegal syntax... baka",
                "uwu iwegal syntax uwu",
                "Illegal syntax onii-chan",
                "Yamete kudasai"]
function illegal(user){
    let str = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    const embed = new Discord.MessageEmbed()
        .setColor('#f71e16')
        .setTitle(str);

    user.send({embeds: [embed]});
}

module.exports.illegal = illegal;
module.exports.sendArr = sendArr;
module.exports.timeToString = timeToString;
module.exports.confirmAdd = confirmAdd;
module.exports.stringToTime = stringToTime;