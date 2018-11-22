const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return;

message.guild.members.map(x=>x.send(args.join(" ")))
}
    module.exports.help = {
            name: "dm"
    }