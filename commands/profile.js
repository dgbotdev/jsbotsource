const Discord = require('discord.js')


module.exports.run = async(bot, message, args, color) => {
    let ms = [1000, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 11000, 12000, 13000, 14000, 15000]
    let ec = bot.emojis.find(emoji => emoji.name === "jsbotright");
    let ex = bot.emojis.find(emoji => emoji.name === "jsbotx");
    let es = bot.emojis.find(emoji => emoji.name === "jsbotsettings");

    if (!bot.db.has(`${message.author.id}p`)) {
        message.channel.send('You need an account to use this command. \'register to create one.')
    }
    else {
        let cmd = args[0]
        if (!cmd) {
            let profilebed = new Discord.RichEmbed()
                .setTitle('JSBOT : Profiles : ' + es)
                .setDescription(bot.db.get(`${message.author.id}p`, 'bio'))
                .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.db.get(`${message.author.id}p`, 'id')}/${bot.db.get(`${message.author.id}p`, 'avatar')}.png?size=2048`)
                .setColor(bot.db.get(`${message.author.id}p`, 'favcolor'))
                .addField('Username:', bot.db.get(`${message.author.id}p`, 'username'), true)
                .addField('ID:', bot.db.get(`${message.author.id}p`, 'id'), )
                .addField('Nickname:', bot.db.get(`${message.author.id}p`, 'nick'), true)
                .addField('Favorite Color (Hex for color):', bot.db.get(`${message.author.id}p`, 'favcolor'), )
                .addField('Hobbies:', bot.db.get(`${message.author.id}p`, 'hobbies'), true)
                .addField('Messages Sent:', bot.db.get(`${message.author.id}p`, 'mesg'))
            message.channel.send(ec + ' | Successfully fetched!', profilebed)

        }
        if (cmd == 'help') {
            let ebed = new Discord.RichEmbed()
                .setTitle('JSBOT : Profiles : Help : ' + es)
                .setDescription(`\'profile - Show your profile\n\n\'profile setbio <bio> - Set your bio on your profile\n\n\'profile setnick - Set your nickname on your profile\n\n\'profile sethobbies <hobbies> - Set your hobbies on your profile\n\n\'profile setclr(setcolor) <color,hexworks> - Set your embed color when people view your embed also your favorite color.\n\n\'profile show <id of user can be from other guild> - Show other persons profile`)

            message.channel.send(ebed)
        }
        if (cmd == 'updatepfp') {
            message.channel.send(`${es} | We are updating your profile picture, usualy takes 0-15 seconds.`).then(sentmsg =>
                setTimeout(() => {
                    sentmsg.edit(ec + ' | Successfully changed your profile picture.')
                    bot.db.set(`${message.author.id}p`, message.author.avatar, 'avatar')
                }, 2500));
        }

        if (cmd == 'setbio') {
            let bioargs = args.slice(1).join(" ")
            message.channel.send(`${ec} | You set your Bio to: ${bioargs}.`)
            bot.db.set(`${message.author.id}p`, bioargs, 'bio')
        }
        if (cmd == 'setnick') {
            let nargs = args.slice(1).join(" ")
            message.channel.send(`${ec} | You set your Nickname to: ${nargs}.`)
            bot.db.set(`${message.author.id}p`, nargs, 'nick')
        }
        if (cmd == 'setcolor') {
            let cargs = args.slice(1).join(" ")
            message.channel.send(`${ec} | You set your HEX-COLOR to: ${cargs}.`)
            bot.db.set(`${message.author.id}p`, cargs, 'favcolor')
        }
        if (cmd == 'setclr') {
            let clargs = args.slice(1).join(" ")
            message.channel.send(`${ec} | You set your HEX-COLOR to: ${clargs}.`)
            bot.db.set(`${message.author.id}p`, clargs, 'favcolor')
        }
        if (cmd == 'sethobbies') {
            let hards = args.slice(1).join(" ")
            message.channel.send(`${ec} | You set your hobbies to: ${hards}.`)
            bot.db.set(`${message.author.id}p`, hards, 'hobbies')
        }
        if (cmd == 'show') {
            let pargs = args.slice(1).join(" ")
            let pbed = new Discord.RichEmbed()
                .setTitle('JSBOT : Profiles : ' + es)
                .setDescription(bot.db.get(`${pargs}p`, 'bio'))
                .setThumbnail(`https://cdn.discordapp.com/avatars/${bot.db.get(`${pargs}p`, 'id')}/${bot.db.get(`${pargs}p`, 'avatar')}.png?size=2048`)
                .setColor(bot.db.get(`${pargs}p`, 'favcolor'))
                .addField('Username:', bot.db.get(`${pargs}p`, 'username'), true)
                .addField('ID:', bot.db.get(pargs, 'id'), )
                .addField('Nickname:', bot.db.get(`${pargs}p`, 'nick'), true)
                .addField('Favorite Color (Hex for color):', bot.db.get(`${pargs}p`, 'favcolor'), )
                .addField('Hobbies:', bot.db.get(`${pargs}p`, 'hobbies'), true)
                .addField('Messages Sent:', bot.db.get(`${pargs}p`, 'mesg'))




            message.channel.send(`${es} We are fetching user: ${pargs}`).then(sentmsg =>
                setTimeout(() => {
                    try {
                        sentmsg.edit(ec + ' | Successfully fetched!', pbed)
                    }
                    catch (err) {
                        return sentmsg.edit(`${ex} | Coulden't fetch user ${pargs}.`)

                    }

                }, 3500));


        }

    }

}


module.exports.help = {
    name: "profile",
    description: "Show your profiles.",
    formal: "Profile",
    usage: "\' profile"
}
