
const{ Client , GatewayIntentBits } = require("discord.js");
const client = new Client({ 
    intents:
     [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ] 
});

client.on('messageCreate',message =>{
    if(message.author.bot) return;
    //console.log(message.content);
    
   
    message.reply({
        content: "hello mone"
    });

});

client.on('interactionCreate',interaction =>{
    if(interaction.commandName === 'ping'){
    interaction.reply("blaaa");
    }

    if(interaction.commandName === 'nokkuman'){
        interaction.reply("blaaa");
        }
});


client.login("MTI0NjM3MjQ5MDI4MDk2NDExNg.G05B65.COSK-Bjhm9AcxeOr8XuOGlxAsYyZzZxOM9xyM8");