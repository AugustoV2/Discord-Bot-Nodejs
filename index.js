
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs")
const dotenv = require("dotenv")
dotenv.config()
const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID
const { Player } = require("discord-player")
const client = new Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates
        ]
});



client.slashcommands = new Discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})
let commands = []

const slashFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (const file of slashFiles) {
    const slashcmd = require(`./commands/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    if (LOAD_SLASH) commands.push(slashcmd.data.toJson())
}



if (LOAD_SLASH) {
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    console.log("Deploying commands")
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
        .then(() => {
            console.log("Successfully loaded")
            process.exit(0)
        })
        .catch((err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }
        })
}
else {
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on('messageCreate', message => {
        if (message.author.bot) return;
        //console.log(message.content);


        message.reply({
            content: "hello mone"
        });

    })

    client.on('interactionCreate', interaction => {
        async function handleCommand() {

            if (!interaction.commandName) return interaction.reply("invalid command");
            const slashcmd = client.slashcommands.get(interaction.commandName)

            if (!slashcmd) interaction.reply("Not a valid slash command");

            await interaction.deferReply()
            await slashcmd.run({ client, interaction })
        }
        handleCommand()
    })


    client.login("MTI0NjM3MjQ5MDI4MDk2NDExNg.G05B65.COSK-Bjhm9AcxeOr8XuOGlxAsYyZzZxOM9xyM8");
}