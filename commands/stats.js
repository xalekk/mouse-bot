const Discord = require("discord.js");
const pjson = require("../package.json");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");

exports.run = (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    const embed = new Discord.RichEmbed()
        .setTitle(`${client.user.username.toProperCase()} Statistics`)
        .setColor(0x268BD2)
        .setDescription(`**${pjson.name.replace("-", " ").toProperCase()}** v${pjson.version}  |  **Node** ${process.version}  |  **Discord.js** v${Discord.version}`)
        .addField("Servers:", client.guilds.size.toLocaleString(), true)
        .addField("Channels:", client.channels.size.toLocaleString(), true)
        .addField("Users:", client.users.size.toLocaleString(), true)
        .addField("Mem Usage:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField("CPU Load:", `${Math.round(os.loadavg()[0]*10000)/100}%`, true)
        .addField("Uptime:", duration, true);

    message.channel.send({embed});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Miscellaneous",
    description: "Gives useful bot statistics",
    usage: "stats",
    examples: ["stats"]
};
