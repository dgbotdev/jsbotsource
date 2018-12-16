const Discord = require('discord.js')
const Enmap = require('enmap')


module.exports.run = async(bot, message, args, color) => {
    const ex = bot.emojis.find(emoji => emoji.name === "jsbotx");
    const ec = bot.emojis.find(emoji => emoji.name === "jsbotright");


    let cmd = args[0]

    if (message.author.id == '246867546924384266') {
        if (cmd == 'db.clear') {
            bot.db.clear()
            message.channel.send('The database has been cleared: `bot.db - clear`')
        }
        if (cmd == 'db.check') {
            if (bot.db.has(message.author.id)) {
                message.channel.send('You have an account on bot.db')

            }
            else {
                message.channel.send('You dont have an account on bot.db')
            }
        }
        if (cmd == 'db.addguild') {
            bot.db.set(`${message.guild.id}gs`, {
                name: message.guild.name,
                id: message.guild.id,
                logsch: 'none',
                welcomeMsg: 'Welcome {user} to {server}!',
                leaveMsg: '{user} left {server}!'

            })
        }
        if (cmd == 'db.remguild') {
            bot.db.remove(`${message.guild.id}gs`)
        }
        if (cmd == 'db.set') {
            let pargs = args[1] // id
            let hargs = args[2] // key
            let nargs = args.slice(1).join(" ") // value
            if (!bot.db.has(pargs)) {

                message.channel.send('User not on database try different id.')

            }
            else {
                if (!pargs) {
                    message.channel.send(`${ex} | Usage: \'sudo db.set id key value\nKeys: \`bio,nick,favcolor,hobbies,username,id\``)
                }
                else if (!hargs) {
                    message.channel.send(`${ex} | Usage: \'sudo db.set id key value\nKeys: \`bio,nick,favcolor,hobbies,username,id\``)
                }
                else if (!nargs) {
                    message.channel.send(`${ex} | Usage: \'sudo db.set id key value\nKeys: \`bio,nick,favcolor,hobbies,username,id\``)
                }
                else {

                    message.channel.send(`${ec} | Set user: ${pargs} in ${hargs} to ${nargs}`)
                    bot.db.set(pargs, nargs, hargs)
                }
            }
        }
        if (cmd == 'db.del') {
            bot.db.delete(message.author.id)
            message.channel.send(`${ec} | Removed owner db account.`)
        }
        if (cmd == 'reboot') {
            bot.db.delete(message.author.id)
            message.channel.send('Restarting bot...')
            const botconfig = require('.../diced/botconfig.json')
            bot.destroy(0)
            bot.login(botconfig.token)d
        }
        if (cmd == 'db.check.user') {
            let argi = args.slice(1).join(" ")
            if (bot.db.has(argi)) {
                message.channel.send(`${ex} | ${argi} does have an account`)

            }
            else {
                message.channel.send(`${ex} | ${argi} doesn'nt have an account`)
            }
        }
        if (cmd == 'db.del.user') {
            let argi = args[1]
            if (bot.db.has(argi)) {
                message.channel.send(`${ec} | ${argi}'s account is now non-existant.`)
                bot.db.delete(argi)
            }
            else {
                message.channel.send(`${ec} | ${argi}'s account is not on the database.`)
            }
        }
        if (cmd == 'eval') {
            try {
                const code = args.slice(1).join(" ");
                let evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);

                let codeembed = new Discord.RichEmbed()
                    .setColor(color.red)
                    .addField('Input :inbox_tray:', `\`\`\`xl\n${code}\n\`\`\``)
                    .addField('Output :outbox_tray:', `\`\`\`xl\n${clean(evaled)}\n\`\`\``)
                message.channel.send(codeembed)

                if (code.includes('bot.token')) return message.channel.send('Oh yeah, trying to hack me eh, not today sonny, you anit getting NO TOKEN FROM ME!')
                if (code.includes('process')) return message.channel.send('Oh yeah, trying to hack me eh, not today sonny, you anit getting NOTHING FROM ME!')

            }
            catch (err) {
                let errembed = new Discord.RichEmbed()
                    .setColor(color.red)
                    .addField('Error :outbox_tray:', `\`\`\`xl\n${clean(err)}\n\`\`\``)
                message.channel.send(errembed);
            }
        }
        if (cmd == 'exec') {
            if (!args[1]) return message.channel.send(`${ex} | Please input a command to execute on the terminal.`)
            try {
                const { exec } = require('child_process');
                exec(args.join(" "), (err, stdout, stderr) => {
                    let embed = new Discord.RichEmbed()
                        .setDescription(`\`\`\`${stdout}\`\`\``)
                        .setTitle(`${ec} | Executed successfully: `)
                        .setColor('BLURPLE')
                    if (stdout) message.channel.send(embed)
                    let sembed = new Discord.RichEmbed()
                        .setDescription(`\`\`\`${stderr}\`\`\``)
                        .setTitle(`${ex} | Error: `)
                        .setColor('BLURPLE')

                    if (stderr) message.channel.send(sembed)
                })
            }
            catch (err) {
                message.channel.send(`${ex} | Error: \`${err}\``)
            }

        }

    }
    else {

        message.channel.send({ embed: { description: `${ex} | ${message.author.username}#${message.author.discriminator}, You are not on the list to use sudo permissions.` } })
    }








    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

}


module.exports.help = {
    name: "sudo",
    description: "Profiles for your JSBOT profiles.",
    formal: "New profile!",
    usage: "' profile"
}
