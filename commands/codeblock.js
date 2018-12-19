const Discord = require('discord.js')


module.exports.run = async (bot, message, args, color) => {
        let argi = args.slice(1).join(" ")
        let lang = args[0]
    message.channel.send(`\`\`\`${lang}\n${argi}\`\`\``)
}

module.exports.help = {
  name: "cb",
  description: "Create a codeblock",
  formal: "Code Block",
  usage: "\' cb [lang] [code]"
}
