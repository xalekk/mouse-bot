exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    const msg = await message.channel.send("Ping?");
    msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ping",
    category: "Miscellaneous",
    description: "Latency information",
    usage: "ping",
    examples: ["ping"]
};
