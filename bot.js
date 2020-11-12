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

exports.mapImageUrls = {
    SKELD: "https://i.ibb.co/86G521h/SKELD.jpg",
    POLUS: "https://i.ibb.co/YyN2sp8/POLUS.jpg",
    MIRA: "https://i.ibb.co/mXgKLWw/MIRA.jpg"
}

exports.coloursById = {
    '775574958255505467' : 'YELLOW',
    '775574958042644521' : 'WHITE',
    '775574958159953950' : 'TEAL',
    '775574958105296906' : 'RED',
    '775574957841186817' : 'PURPLE',
    '775574959182839858' : 'PINK',
    '775574957848789022' : 'ORANGE',
    '775574957526745098' : 'LIME',
    '775574957198540801' : 'GREEN',
    '775574957186351124' : 'BROWN',
    '775574956905725993' : 'BLUE',
    '775574956745556009' : 'BLACK'
}

exports.coloursByName = {
    'YELLOW' : '775574958255505467',
    'WHITE' : '775574958042644521',
    'TEAL' : '775574958159953950',
    'RED' : '775574958105296906',
    'PURPLE' : '775574957841186817',
    'PINK' : '775574959182839858',
    'ORANGE' : '775574957848789022',
    'LIME' : '775574957526745098',
    'GREEN' : '775574957198540801',
    'BROWN' : '775574957186351124',
    'BLUE' : '775574956905725993',
    'BLACK' : '775574956745556009'
}

//Player object will look like {playerId:<string>, username:<string>, isAlive:<bool>, colour:<string>}
exports.players = [];
exports.host = "";
exports.lobbyMessageId = "";
exports.lobbyId = "";
exports.map = ""
exports.lobbyPhase = ""

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
        await msg.delete()
    } catch (error) {
        msg.reply(error);
    }
})

bot.on('messageReactionAdd', async (reaction, user) => {
    if(user.bot || !this.lobbyMessageId || this.lobbyMessageId !== reaction.message.id) return

    console.log(user.id)
    if(!Object.keys(this.coloursById).includes(reaction.emoji.id)){
        await reaction.remove()
        return
    }
        
    const playerColour = this.coloursById[reaction.emoji.id]

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

    this.updateLobbyMessage(reaction.message)
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
    
    this.updateLobbyMessage(reaction.message)
})

exports.updateLobbyPhase = async (newPhase, msg) => {
    this.lobbyPhase = newPhase
    await this.updateLobbyMessage(msg)
}

exports.updateLobbyMessage = async (msg) => {
    const lobbyMsgRef = msg.channel.messages.cache.get(this.lobbyMessageId)
    const embedMessage = require('./lobbyMessage').createLobbyMessage(this.lobbyId,this.map, this.lobbyPhase)
    await lobbyMsgRef.edit({embed: embedMessage})
}

exports.resetFields = () => {
    this.lobbyMessageId = ""
    this.lobbyId = ""
    this.host = ""
    this.Lobbyphase = ""
    this.map = ""
}

