const Discord = require('discord.js')


module.exports.run = async(bot, message, args, color) => {
    let ec = bot.emojis.find(emoji => emoji.name === "jsbotright");
    let ex = bot.emojis.find(emoji => emoji.name === "jsbotx");
    let es = bot.emojis.find(emoji => emoji.name === "jsbotsettings");
    let cmd = args[0]
    let embed = new Discord.RichEmbed()
        .setColor('BLURPLE')
        .setFooter('Updates')
        .setTimestamp()
        .setDescription(`\`\`\`diff\n- ${bot.db.get('UpdateCmd', 'updates')}\`\`\``)

    if (!cmd) return message.channel.send(embed)

    if (message.author.id == '246867546924384266') {
        if (cmd == 'set') {
            let setargs = args.slice(1).join(" ")
            bot.db.set('UpdateCmd', setargs, 'updates')
            message.channel.send(`${ec} | Set the update message to: ${setargs}`)
        }
        if (cmd == 'remove') {
            bot.db.set('UpdateCmd', 'Updates have been cleared, therefore there are no changes.', 'updates')
            message.channel.send(`${ec} | Cleared the updates.`)
        }


    }
    else {

        return message.channel.send(`${ex} | no`)
    }


}

module.exports.help = {
    name: "updates",
    description: "Update system (WIP)",
    formal: "Update",
    usage: "\'update"
}
