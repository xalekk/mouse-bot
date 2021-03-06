// This command sends a message to the aChannel (within the config file) of
// every guild that the bot serves
// Useful for server downtime or really important messages

exports.run = async (client, message, cmd, args, level) => { // eslint-disable-line no-unused-vars

    // Grab all of the guilds the bot is serving
    const guilds = await client.guilds.array();
    const msg = args.join(" ");
    let x = 0;
    let shoutMessage;

    let response = await client.awaitReply(message, `${message.author}, this is the message you want to send to **${guilds.length}** servers:\n"${msg}"\nReady to send? (yes/no)`, 30000);
    response = response.toLowerCase();

    if (["y", "yes", "yeah", "yea"].includes(response)) {
        shoutMessage = await message.channel.send("Preparing to send...");
    } else if (response.length > 0) return message.channel.send("Okay, I will not send that.");

    for (let i = 0; i < guilds.length; i++) {
        const id = guilds[i];
        if (!id) continue;
        const settings = id.guild ? client.settings.get(id) : client.config.defaultSettings;
        const shoutChannel = await id.channels.find(r => r.name === settings.aChannel);

        if (shoutChannel && shoutChannel != "undefined") shoutChannel.send(msg).catch(console.error);
        else x++;
    }

    shoutMessage.edit(`Finished! Sent to **${guilds.length-x}** server(s)! **${x}** failed to send.`);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sh"],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "shout",
    category: "System",
    description: "Sends a message to all servers using the bot",
    usage: "shout <message>",
    examples: ["shout Hello World!"]
};
