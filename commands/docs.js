const Discord = require('discord.js')


module.exports.run = async(bot, message, args, color) => {
    let ms = [1000, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 11000, 12000, 13000, 14000, 15000]
    let ec = bot.emojis.find(emoji => emoji.name === "jsbotright");
    let ex = bot.emojis.find(emoji => emoji.name === "jsbotx");
    let es = bot.emojis.find(emoji => emoji.name === "jsbotsettings");


    let EMBED = new Discord.RichEmbed()
        .setTitle('Github Link')
        .setDescription('[Wiki](https://github.com/dgbotdev/jsbot/wiki)\n\n[Read me file](https://github.com/dgbotdev/jsbot/master#jsbot)')

    message.channel.send(EMBED)



}


module.exports.help = {
    name: "docs",
    description: "Documentation for the bot",
    formal: "Docs",
    usage: "\' docs"
}
