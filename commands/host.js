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
        
        if(args.length === 0 || args[0].length !== 6) throw "You must provide a 6 character lobby code in order to host a game!"
        if(args[1] == null || !["SKELD", "POLUS", "MIRA"].includes(args[1].toUpperCase())) throw "You must provide a valid map name (SKELD, MIRA, POLUS)!"
        
        bot.host = msg.author.id
        // bot.players = []
        bot.players = [{
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        },
        {
            id: 83729751549677568,
            username: "Joshua",
            colour: "LIME"
        }]
        bot.lobbyId = args[0]
        bot.map = args[1]
        bot.phase = "Creating Lobby"

        try{
            const embedMessage = require('../lobbyMessage').createLobbyMessage(bot.lobbyId,bot.map)
            const playerSelect = await msg.channel.send({embed: embedMessage})
            await playerSelect.pin({reason: 'Game Lobby'})
            bot.lobbyMessageId = playerSelect.id

            for(let colour in bot.coloursById){
                await playerSelect.react(colour)
            }
        }
        catch(err){
            console.log(error)
        }
    }
}