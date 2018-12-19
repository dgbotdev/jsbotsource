const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async(bot, message, args, color, prefixn) => {

  let cmd = args[0].toLowerCase();

  if (!cmd) {
    let apiping = `${Math.floor(bot.ping)}ms`
    let somethang = new Date() - message.createdAt;
    let test = 6 * 6
    let botping = `${Math.floor(somethang)}ms`
    let avatar = message.author.displayAvatarURL
    let help = new Discord.RichEmbed()
      .setAuthor("Help", avatar) //prefix is exactly "Anlexa, "
      .setColor(color.red)
      .setDescription(`Do \`${prefixn}help <cmd>\` to get more info about a command. ${test}\n\nWant to vote for the bot: [Click Here!](https://discordbots.org/bot/515315613481304065)\n\nWant to join an awesome server? [Click here!](https://discord.gg/QyQB9Rp)`)
      .addField('Commnads:', bot.commands.map(c => `**-__\`${c.help.name}\`__**`).join("\n"), true)
      .addField('Status:', `**Users: __\`${bot.users.size}\`__\nGuilds: __\`${bot.guilds.size}\`__\nChannels: __\`${bot.channels.size}\`__\nBot Ping: __\`${botping}\`__\nAPI Ping: __\`${apiping}\`__**`, true)
      .addField('Info', `**Username: __\`${message.author.username}\`__\nID: __\`${message.author.id}\`__\nGuild: __\`${message.guild.name}\`__\nGuild ID: __\`${message.guild.id}\`__\nGuild Owner: <@${message.guild.owner.id}>**`, true)
    message.channel.send(help)
  }
  else {
    let info = bot.commands.get(cmd).help
    if (!info) return message.channel.send("Command not found!")

    let moredet = new Discord.RichEmbed()
      .setTitle(info.formal)
      .setColor(color.red)
      .addField('Info:', `**Description:** ${info.description}\n**Usage:** ${info.usage}`)

    message.channel.send(moredet)
  }


}

module.exports.help = {
  name: "help",
  description: "View Commands",
  formal: "Command List",
  usage: "\' help [command - optional]"
}
