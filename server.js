const Discord = require("discord.js");
const botconfig = require('../botconfig.json')
const fs = require("fs")
const token = botconfig.token;
const Enmap = require('enmap')
const bot = new Discord.Client({ disableEveryone: true });
require('./comments.js')(bot)



/*

API END

*/

/*

Function

*/

bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {


  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("[Alexa-Log] Can't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`[bot] ${f} loaded.`);
    bot.commands.set(props.help.name.toLowerCase(), props);
  });

});





bot.on("ready", async() => {
  console.log(`[bot] ${bot.user.username} has succsessfully logged on with no errors, if error they will be stated below, or when a command is run.`);

  //status

  let activityTypes = ['WATCHING']
  let randomType = activityTypes[Math.floor((Math.random() * activityTypes.length))]

  setInterval(async() => {
    await bot.user.setActivity(`${bot.users.size} users | js help`, { type: randomType })
    await bot.user.setActivity(`${bot.guilds.size} guilds | js help`, { type: randomType })
    await bot.user.setActivity(`coded with love in d.js`, { type: randomType })


  }, 5000)

  //end status

});




bot.on("message", async(message, err) => {



  if (bot.db.has(`${message.author.id}p`)) {
    bot.db.inc(`${message.author.id}p`, 'mesg');
  }

  let prefixn = '\''

  if (!bot.db.has(`${message.guild.id}gs`)) {
    bot.db.set(`${message.guild.id}gs`, {
      name: message.guild.name,
      id: message.guild.id,
      prefix: '\'',
      logsch: 'none',
      welcomeMsg: 'Welcome {user} to {server}!',
      leaveMsg: '{user} left {server}!'


    })
  }

  if (!prefixn) return;
  const args = message.content.slice(prefixn.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (!message.content.startsWith(prefixn)) return;
  let messageArray = message.content.split(" ");

  if (message.content.startsWith('<@!515315613481304065>')) {
    message.channel.send('You can do \'help for all the commands, and info about you and the guild and the bot.')
  }






  const color = require('./color.json')



  let commandfile = bot.commands.get(command.slice(prefixn));
  if (commandfile) commandfile.run(bot, message, args, color, prefixn);






});

bot.on('guildCreate', async(guild, err) => {
  bot.db.set(`${guild.id}gs`, {
    name: guild.name,
    id: guild.id,
    prefix: '\'',
    logsch: 'none',
    welcomeMsg: 'Welcome {user} to {server}!',
    leaveMsg: '{user} left {server}!'


  })
})

bot.on('guildMemberAdd', async(member, err) => {
  let ec = bot.emojis.find(emoji => emoji.name === "jsbotright");
  let ex = bot.emojis.find(emoji => emoji.name === "jsbotx");

  let embed = new Discord.RichEmbed()
    .setTitle('User joined guild.')
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('BLURPLE')

  let str = bot.db.get(`${member.guild.id}gs`, 'welcomeMsg')
  let res = str.replace(/{user}/gi, member.user.username)
  let fres = res.replace(/{server}/gi, member.guild.name)
  embed.setDescription(fres)


  bot.channels.get(bot.db.get(`${member.guild.id}gs`, 'logsch')).send(embed)
})

bot.on('guildMemberRemove', async(member, err) => {
  let ec = bot.emojis.find(emoji => emoji.name === "jsbotright");
  let ex = bot.emojis.find(emoji => emoji.name === "jsbotx");

  let embed = new Discord.RichEmbed()
    .setTitle('User left guild.')
    .setThumbnail(member.user.displayAvatarURL)
    .setColor('BLURPLE')
  let str = bot.db.get(`${member.guild.id}gs`, 'leaveMsg')
  let res = str.replace(/{user}/gi, member.user.username)
  let fres = res.replace(/{server}/gi, member.guild.name)
  embed.setDescription(fres)


  bot.channels.get(bot.db.get(`${member.guild.id}gs`, 'logsch')).send(embed)
})


bot.login(token);
