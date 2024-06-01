
const{ REST,Routes } =require('discord.js');
const commands = [
  {
    name: 'nokkuman',
    description: 'plays rick roll',
  },
];

const rest = new REST({ version: '10' }).setToken("MTI0NjM3MjQ5MDI4MDk2NDExNg.G05B65.COSK-Bjhm9AcxeOr8XuOGlxAsYyZzZxOM9xyM8");


(async () => {
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1246372490280964116"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
})();