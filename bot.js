require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
bot.commands = new Discord.Collection() 
const botCommands = require('./commands/commands')

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
const prefix = '!';
exports.colours = {
    '❤️' : 'RED',
    '🧡' : 'ORANGE',
    '💛' : 'YELLOW',
    '💚' : 'GREEN',
    '💙' : 'BLUE',
    '💜' : 'PURPLE',
    '🖤' : 'BLACK'
}

//Player object will look like {playerId:<string>, isAlive:<bool>, colour:<string>}
exports.players = [];
exports.host = null;

bot.login(TOKEN)

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/);;
    const command = args.shift().toLowerCase();

    if (!bot.commands.has(command) || msg.author.bot) return;

    try {
        await bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
})