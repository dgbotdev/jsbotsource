const Discord = require('discord.js')


module.exports.run = async (bot, message, args, color) => {
let ms = [1000,2000,2500,3000,3500,4000,4500,5000,5500,6000,6500,7000,7500,8000,8500,9000,9500,10000,11000,12000,13000,14000,15000]
    let ec = bot.emojis.find(emoji => emoji.name === "jsbotright");
    let createembed = new Discord.RichEmbed()
        .setDescription(message.author.username + ', creating a user-account for you, please standby as this usualy takes a few seconds to add you. Once your account has been created a new message will pop-up. ' + ec)
        .setColor('BLURPLE')
    let finishembed = new Discord.RichEmbed()
        .setDescription(message.author.username + ", you're account is finished being created, you have default values for your settings, you can do 'profile help to change your values, you may delete your account by asking dicedtomato! " + ec)
        .setColor('BLURPLE')

    if (!bot.db.has(message.author.id)) {
        message.channel.send(createembed).then(
            setTimeout(() => {
                message.channel.send(finishembed);
                let create = bot.db.set(`${message.author.id}p`, {
            id: message.author.id,
            username: message.author.username,
            avatar: message.author.avatar,
            nick: 'No Nick, \' profile setnick <nick>',
            bio: 'No bio, \' profile setbio <bio>',
            favcolor: 'No color, \' profile setcolor <hexcolor>',
            hobbies: 'No hobbies, \' profile sethobbies <hobbies>',
            mesg: 0
        })
        
            }, 3500));
        

    } else {
        let ex = bot.emojis.find(emoji => emoji.name === "jsbotx");
        message.channel.send(ex + ' | You have an account already! \'profile to view it.')
    }

}


module.exports.help = {
    name: "register",
    description: "Register for your BOT profiles.",
    formal: "New profile!",
    usage: "\' register"
}