const Discord = require('discord.js');
var bot = new Discord.Client();
const {config, prefix} = require("./config.json")
const fs = require("fs");

bot.commands = new Discord.Collection();
const db = require('quick.db');

bot.on("ready", async () => {
console.log(`${bot.user.tag} is now online`)
})

fs.readdir("./commands/", (err, files) => {
    //console.log(`Loading a total of ${files.length} commands.`);

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("message", (message) => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return 

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

if(cmd == `${prefix}ping`) {
message.channel.send("Pong!")
}

  if(!message.content.startsWith(prefix)) return;

let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
})

bot.login(process.env.TOKEN)