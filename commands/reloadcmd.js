const Discord = require('discord.js')


module.exports.run = async(bot, message, args, color) => {
    let cmd = args[0]
    const ex = bot.emojis.find(emoji => emoji.name === "jsbotx");
    const ec = bot.emojis.find(emoji => emoji.name === "jsbotright");
    if (message.author.id == '246867546924384266') {
        try {

            delete require.cache[require.resolve(`./${cmd}.js`)];
            message.channel.send({ embed: { description: `${ec} | Reloaded ${cmd} succsesfully.` } })
            const props = require(`./${cmd}.js`);
            bot.commands.delete(cmd)
            bot.commands.set(props.help.name.toLowerCase(), props);
            console.info(`A command is being reloaded, ${cmd}.js has finished reloading.`)


        }
        catch (e) {
            return message.channel.send({ embed: { description: `${ex} |  Unable to reload ${cmd}, check logs for errors.` } })
        }
    }
    else {
        message.channel.send('No reloading perms.')
    }

}



module.exports.help = {
    name: "reload",
    description: "Reload command",
    formal: "Reload",
    usage: "\' reload"
}
