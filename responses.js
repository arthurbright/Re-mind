function sendArr(user, arr){
    if(arr.length === 0){
        user.send("No active reminders!")
        return;
    }

    str = ""
    for(i = 0; i < arr.length; i ++){
        let rem = arr[i];
        str = str + rem.description + ": " +  rem.time + "\n";
    }
    user.send(str);
 
}


module.exports.sendArr = sendArr;