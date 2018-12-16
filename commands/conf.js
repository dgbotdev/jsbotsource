const Discord = require('discord.js');


module.exports.run = async(bot, message, args, color) => {

    let cmd = args[0];



    if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == '246867546924384266') {

        if (!cmd) {
            let embed = new Discord.RichEmbed()
                .setTitle('Configuration for ' + message.guild.name)
                .addField('Prefix:', bot.db.get(`${message.guild.id}gs`, 'prefix'))
                .addField('Custom Welcome Message:', bot.db.get(`${message.guild.id}gs`, 'welcomeMsg'))
                .addField('Custom Leave Message:', bot.db.get(`${message.guild.id}gs`, 'leaveMsg'))
                .addField('Custom Loging channel:', `<#${bot.db.get(`${message.guild.id}gs`, 'logsch')}>`)
            message.channel.send(embed)
        }
        if (cmd == 'setprefix') {
            let prefixargs = args[1];
            if (prefixargs == `reset`) {
                bot.db.set(`${message.guild.id}gs`, '\'', 'prefix');
                message.channel.send('You have reset the prefix.');
            }
            else {
                message.channel.send(`prefix is now ${prefixargs}`);
                bot.db.set(`${message.guild.id}gs`, prefixargs, 'prefix');
            }

        }
        if (cmd == 'vars') {
            message.channel.send(`Current list of vars to use in custom leave/welcome messages.\n\n\`\`\`{user} - Get user\n{server} - Get server name\`\`\``)
        }
        if (cmd == 'help') {
            message.channel.send(`Current list configuration commands.\n\n\`\`\`'conf help\n'conf loggers\n'conf vars (shows vars to use in msgs)\n'conf setlogsch <#channelname>\n'conf setprefix <prefix>\n'conf setwelcomemsg <msg>\n'conf setleavemsg <msg>\`\`\``)
        }
        if (cmd == 'loggers') {
            message.channel.send(`Current list logs.\n\n\`\`\`Member Join\nMember Leave\nMember Edit Message\nMember Delete Message\`\`\``)
        }
        if (cmd == 'setlogsch') {
            let ch = message.mentions.channels.first();
            if (!ch) return message.channel.send('Please mention a channel to set the channel to.');
            message.channel.send(`You have set the logs channel in your guild to: <#${ch.id}> , everything to member leave/join and kicks and bans and etc will be logged here.`);
            bot.db.set(`${message.guild.id}gs`, ch.id, 'logsch');
        }
        if (cmd == 'setwelcomemsg') {
            let ag = args.slice(1).join(" ")
            message.channel.send(`You have set the welcome message for your guild to: ${ag}`);
            bot.db.set(`${message.guild.id}gs`, ag, 'welcomeMsg');
        }
        if (cmd == 'setleavemsg') {
            let ag = args.slice(1).join(" ")
            message.channel.send(`You have set the leave message for your guild to: ${ag}`);
            bot.db.set(`${message.guild.id}gs`, ag, 'leaveMsg');
        }

    }
    else {
        message.channel.send('no');
    }



};


module.exports.help = {
    name: "conf",
    description: "Configuration for the server.",
    formal: "Conf",
    usage: "\' conf"
}
