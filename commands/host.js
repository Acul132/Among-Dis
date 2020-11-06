module.exports = {
    name: 'host',
    description: 'Initialize a game',
    hostPermission: false,
    async execute(msg, args){
        const bot = require('../bot')

        if(bot.host && bot.host !== msg.author.id){
            await msg.reply("Only the host can start a new lobby!")
            return
        }
        else if(bot.host){
            try{
                await require('./unhost').execute(msg)
            }
            catch(err){
                console.log(err)
            }
        }

        bot.host = msg.author.id
        bot.players = []
        

        if(args.length === 0 || args[0].length !== 6) throw "You must provide a 6 character lobby code in order to host a game!"
        
        bot.lobbyId = args[0]
        let messageContent = `Lobby Code: ${bot.lobbyId}\nCurrent Phase: ${bot.lobbyStatus}\nPlease react to select your colour!\n\n`
        const playerSelect = await msg.channel.send(messageContent)
        await playerSelect.pin({reason: 'Game Lobby'})
        bot.lobbyMessageId = playerSelect.id
        bot.updateLobbyStatus("Creating lobby", msg)

        for(let colour in bot.colours){
            await playerSelect.react(colour)
        }
    }
}