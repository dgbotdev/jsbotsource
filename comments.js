module.exports = (bot) => {
    const Enmap = require('enmap');
    bot.db = new Enmap({
        name: "Database",
        autoFetch: true,
        fetchAll: false
    });
    bot.guild = new Enmap({
        name: "guildsettingsv001",
        autoFetch: true,
        fetchAll: false
    })
    bot.apple_sauce = { Apple_Sauce: 'It tastes good.' }
    const hastebin = require('hastebin-gen-2')
    bot.hastebin = (code, ext, message) => {
        hastebin(code, ext).then(r => {
            message.channel.send(r)
        })
    }
};
