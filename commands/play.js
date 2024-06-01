
const { REST, Routes, SlashCommandAssertions, SlashCommandBuilder } = require('discord.js');


const rest = new REST({ version: '10' }).setToken("MTI0NjM3MjQ5MDI4MDk2NDExNg.G05B65.COSK-Bjhm9AcxeOr8XuOGlxAsYyZzZxOM9xyM8");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Play")
        .setDescription("Play a song from url")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("song")
                .setDescription("name of the song")
                .addStringOption((option) =>
                    option

                        .setName("url")
                        .setDescription("the songs url"))
                .setRequired(true)
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName("song")
                        .setDescription("name of the song")
                        .addStringOption((option) =>
                            option

                                .setName("url")
                                .setDescription("the songs url"))
                        .setRequired(true)
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName("search")
                        .setDescription("Search name of the song")
                        .addStringOption((option) =>
                            option

                                .setName("search terms")
                                .setDescription("search the keywords"))
                        .setRequired(true)  
)

        )
}

