require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'], fetchAllMembers: true})
bot.commands = new Discord.Collection() 
const botCommands = require('./commands/commands')

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
const prefix = '!';
const Player = require('./player')

exports.colours = {
    '❤️' : 'RED',
    '🧡' : 'ORANGE',
    '💛' : 'YELLOW',
    '💚' : 'GREEN',
    '💙' : 'BLUE',
    '💜' : 'PURPLE',
    '🖤' : 'BLACK'
}

//Player object will look like {playerId:<string>, username:<string>, isAlive:<bool>, colour:<string>}
exports.players = [];
exports.host = "";
exports.lobbyMessageId = "";
exports.lobbyId = "";

bot.login(TOKEN)

bot.on('ready', async () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async (msg) => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/);;
    const command = args.shift().toLowerCase();

    if (!bot.commands.has(command) || msg.author.bot) return;

    try {
        const commandRef = bot.commands.get(command)
        if(this.host && commandRef.hostPermission && this.host !== msg.author.id){
            await msg.reply('Only the host has permission to use that command!')
            return
        }
        await commandRef.execute(msg, args);
    } catch (error) {
        msg.reply(error);
    }
})

let changingColour = false;

bot.on('messageReactionAdd', async (reaction, user) => {
    if(user.bot || !this.lobbyMessageId || this.lobbyMessageId !== reaction.message.id) return

    if(!Object.keys(this.colours).includes(reaction.emoji.name)){
        await reaction.remove()
        return
    }
        
    const playerColour = this.colours[reaction.emoji.name]

    //Check if player object has already been created
    // if yes: change current colour
    // if no: create player object with reacted colour
    const player = this.players.find(player => player.id === user.id)
    if(player){
        player.changeColour(playerColour)
        let playerReaction = reaction.message.reactions.cache.filter(r => r.users.cache.has(player.id) && r.emoji.name !== reaction.emoji.name)
        if (playerReaction.size){
            player.changingColour = true
            await playerReaction.first().users.remove(player.id)
        } 
    } else{
        this.players.push(new Player(user.id, user.username, playerColour))
    }

    sendLobbyMessage(reaction.message)
})

bot.on('messageReactionRemove', (reaction, user) => {
    if(user.bot || !this.lobbyMessageId || this.lobbyMessageId !== reaction.message.id) return

    //Ensure the reaction removal isn't caused by the player changing their colour
    const player = this.players.find(player => player.id === user.id)
    if(player && player.changingColour){
        player.changingColour = false
    }
    else{
        this.players = this.players.filter(player => player.id !== user.id)
    }
    
    sendLobbyMessage(reaction.message)
})

const sendLobbyMessage = async msgRef => {
    let messageContent = `Lobby Code: ${this.lobbyId}\nPlease react to select your colour! \n\n`
    this.players.map(player => messageContent += `${player.username} has selected -> ${player.colour}\n`)
    await msgRef.edit(messageContent)
}

