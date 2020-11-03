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
    }
}