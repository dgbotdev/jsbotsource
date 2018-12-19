const Discord = require('discord.js');


module.exports.run = async(bot, message, args, color) => {

    let cmd = args[0].toLowerCase();

    let ec = bot.emojis.find(emoji => emoji.name === "jsbotright");
    let ex = bot.emojis.find(emoji => emoji.name === "jsbotx");
    let es = bot.emojis.find(emoji => emoji.name === "jsbotsettings");

    if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == '246867546924384266') {

        if (!cmd) {
            let embed = new Discord.RichEmbed()
                .setTitle('Configuration for ' + message.guild.name)
                .setColor('BLURPLE')
                .addField('Prefix (DEFAULT PREFIX FOR EVERYONE)', 'default fixiing soon')
                .addField('Custom Welcome Message:', bot.db.get(`${message.guild.id}gs`, 'welcomeMsg'))
                .addField('Custom Leave Message:', bot.db.get(`${message.guild.id}gs`, 'leaveMsg'))
                .addField('Custom Loging channel:', `<#${bot.db.get(`${message.guild.id}gs`, 'logsch')}>`)
            message.channel.send(embed)
        }
        if (cmd == 'setprefix') {
            let prefixargs = args[1];
            if (prefixargs == `reset`) {
                bot.db.set(`${message.guild.id}gs`, '\'', 'prefix');
                message.channel.send(`${ec} | Reset the prefix | ${es}`);
            }
            else {
                let embed = new Discord.RichEmbed()
                    .setTitle('JSBOT : Cfg : Prefix : ' + es)
                    .setColor('BLURPLE')
                    .addField('Set Prefix to:', `${ec} | ${prefixargs}`)

                message.channel.send(embed);

                bot.db.set(`${message.guild.id}gs`, prefixargs, 'prefix');
            }

        }
        if (cmd == 'vars') {
            let ebed = new Discord.RichEmbed()
                .setTitle('JSBOT : Cfg : Vars : ' + es)
                .setColor('BLURPLE')
                .setDescription(`\`{user}\` - **Outputs the username of the user that joined/leaved**\n\`{server}\` - **Outputs the server of the user that joined/leaved in**`)

            message.channel.send(ebed)
        }
        if (cmd == 'help') {

            let ebed = new Discord.RichEmbed()
                .setTitle('JSBOT : Cfg : Help : ' + es)
                .setColor('BLURPLE')
                .setDescription(`'conf vars - Show vars\n\n'conf help\n\n'conf loggers - Show list of active event logs\n\n'conf setprefix <prefix> - Set prefix to desired one\n\n'conf setwelcomemsg <msg> - Set a welcome message\n\n'conf setleavemsg <msg> - Set a leave message\n\n'conf setlogsch <#channel> - Set the default log channel where all event logs will happen`)

            message.channel.send(ebed)




        }
        if (cmd == 'loggers') {
            let ebed = new Discord.RichEmbed()
                .setTitle('JSBOT : Cfg : Logs : ' + es)
                .setColor('BLURPLE')
                .setDescription(`\`MEMBER JOIN\` - **Shows when user joins server**\n\`MEMBER LEAVE\` - **Shows when user leaves server**\n\`MEMBER MESSAGE UPDATE\` - **Triggered when user updates a message, edits, etc**\n\`MEMBER DELETE MESSAGE\` - **Triggered when user deletes message**`)

            message.channel.send(ebed)
        }
        if (cmd == 'setlogsch') {
            let ch = message.mentions.channels.first();
            if (!ch) return message.channel.send('Please mention a channel to set the channel to.');
            let embed = new Discord.RichEmbed()
                .setTitle('JSBOT : Cfg : Log Ch : ' + es)
                .setColor('BLURPLE')
                .addField('Set Logs channel to:', `${ec} | <#${ch.id}>`)

            message.channel.send(embed);
            bot.db.set(`${message.guild.id}gs`, ch.id, 'logsch');
        }
        if (cmd == 'setwelcomemsg') {
            let ag = args.slice(1).join(" ")
            let embed = new Discord.RichEmbed()
                .setColor('BLURPLE')
                .setTitle('JSBOT : Cfg : Welcome : ' + es)
                .addField('Set Welcome message to:', `${ec} | ${ag}`)

            message.channel.send(embed);
            bot.db.set(`${message.guild.id}gs`, ag, 'welcomeMsg');
        }
        if (cmd == 'setleavemsg') {
            let ag = args.slice(1).join(" ")
            let embed = new Discord.RichEmbed()
                .setColor('BLURPLE')
                .setTitle('JSBOT : Cfg : Leave : ' + es)
                .addField('Set Leave message to:', `${ec} | ${ag}`)

            message.channel.send(embed);
            bot.db.set(`${message.guild.id}gs`, ag, 'leaveMsg');
        }

    }
    else {
        message.channel.send(`${ex} | You can't change **${message.guild.name}**'s settings, you will need **\`ADMINISTRATOR\`** perms.`);
    }



};


module.exports.help = {
    name: "conf",
    description: "Configuration for the server.",
    formal: "Conf",
    usage: "\' conf"
}
