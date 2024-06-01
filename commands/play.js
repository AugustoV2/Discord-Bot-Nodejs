
const { REST, Routes, SlashCommandAssertions, SlashCommandBuilder } = require('discord.js');

const { MessageEmbed } = require("discord.js")
//const { QueryType } = require("discord-player")


const rest = new REST({ version: '10' }).setToken("MTI0NjM3MjQ5MDI4MDk2NDExNg.G05B65.COSK-Bjhm9AcxeOr8XuOGlxAsYyZzZxOM9xyM8");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song from url")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("song")
                .setDescription("name of the song")
                .addStringOption((option) =>
                    option

                        .setName("url")
                        .setDescription("the songs url")
                        .setRequired(true))
        )
      
        .addSubcommand((subcommand) =>
            subcommand
                .setName("song")
                .setDescription("name of the song")
                .addStringOption((option) =>
                    option

                        .setName("url")
                        .setDescription("the songs url")
                        .setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("search")
                .setDescription("Search name of the song")
                .addStringOption((option) =>
                    option

                        .setName("searchterms")
                        .setDescription("search the keywords")
                        .setRequired(true)  )
        ),
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel) return interaction.editReply("You need to be in a VC to use this command")

        const queue = await client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        let embed = new MessageEmbed()

        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("No results")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` })

        }
    }
}