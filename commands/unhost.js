module.exports = {
    name: 'unhost',
    description: 'End the lobby',
    hostPermission: true,
    async execute(msg, args){
        const bot = require('../bot')

        const message = await msg.channel.messages.fetch(bot.lobbyMessageId)
        if(message){
            await message.delete()
            bot.lobbyMessageId = ""
            bot.lobbyId = ""
            bot.host = ""
        }
        for(let player of players){
            try{
                await guild.members.cache.get(player.id).edit({mute: false})
            }
            catch(err){
                console.log(err)
            }
        }
    }
}